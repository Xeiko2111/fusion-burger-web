"""
Fusion Burger - pipeline de assets.
1. Los PNG ya recortados conservan su alfa.
2. Los que vienen sobre fondo negro (Oklahoma, Garbanzos, GIFs) se "keyan"
   por flood-fill desde los bordes, de forma que no se abren agujeros dentro
   del producto.
3. Se recorta el bounding box del producto (deja el encuadre limpio).
4. Se exporta WebP en 3 anchos + se calcula el color dominante cálido.
"""
import os, json, shutil
import numpy as np
from scipy import ndimage
from PIL import Image, ImageSequence

SRC = "/home/claude/raw/IMG WEB FUSHION BURGUER"
OUT = "/home/claude/fusion-burger/public/assets"

WIDTHS = [1080, 720, 420]

# slug -> (archivo, carpeta, keyBlack)
MAP = {
    # brand
    "logo":                 ("LOGO-WEB-FUSION.png", "brand", False),
    "logo-square":          ("logo fusion burger.jpg", "brand", False),
    "promo-almuerzos":      ("Promo Menu Almuerzos.png", "brand", False),
    # hero (imagen sin producto asignado en el menu)
    "hero-burger":          ("chossburger.png", "hero", False),
    # starters
    "tequenos":             ("tequenos-1.png", "starters", False),
    "nachos-fusion":        ("Nachos fusion.png", "starters", False),
    "papas-trufadas":       ("Papas Trufadas.png", "starters", False),
    "batatas-fusion":       ("Batatas Fusion.png", "starters", False),
    "papas-cheddar-bacon":  ("Papas Cheddar Beacon.png", "starters", False),
    "tacos-don-carmelo":    ("Tacos Don Carmelo.png", "starters", False),
    "delicias-de-pollo":    ("Delicias de pollo.png", "starters", False),
    "ensalada-cesar":       ("Ensalada Cesar.png", "starters", False),
    # burgers
    "original-fusion":      ("Original Fusion.png", "burgers", False),
    "crispy-burger":        ("Crsipy Burguer.png", "burgers", False),
    "peppibacon":           ("PeppiBeacon.png", "burgers", False),
    "oklahoma-burger":      ("Oklahoma Burger.png", "burgers", True),
    "american-burger":      ("American Burger.png", "burgers", False),
    "rulo-de-cabra":        ("Rulo de cabra.png", "burgers", False),
    "guayaba-burger":       ("GUAYABA Burguer.png", "burgers", False),
    "mexican-burger":       ("Mexican Burguer.png", "burgers", False),
    "santa-burger":         ("Santa Burguer.png", "burgers", False),
    "la-cecina":            ("La Cecina.png", "burgers", False),
    "saoko-burger":         ("Saoko Burger.png", "burgers", False),
    "guayota-burger":       ("Guayota Burger.png", "burgers", False),
    "smoked-burger":        ("Smoked Burger.png", "burgers", False),
    "porky-burger":         ("Porky Burger.png", "burgers", False),
    # kids
    "fusion-baby":          ("Fusion Baby.png", "kids", False),
    "baby-chicken":         ("Baby Chicken.png", "kids", False),
    "delicias-baby":        ("Delicias Baby.png", "kids", False),
    # veggie
    "remolacha-burger":     ("Remolacha Burger.png", "veggie", True),
    "garbanzos-zanahoria":  ("Garbanzos y Zanahoria Burger.jpg", "veggie", True),
    # desserts
    "tarta-de-queso":           ("Tarta de Queso.png", "desserts", False),
    "tarta-de-queso-pistacho":  ("Tarta de Queso y Pistacho.png", "desserts", True),
    "tarta-de-queso-chocolate": ("Tarta de Queso y Chocolate.png", "desserts", False),
    "tarta-de-queso-lotus":     ("Tarta de Queso y Lotus.png", "desserts", False),
}

ANIMATED = {
    "hot-cheddar-burger": ("Hot Cheddar Burger.gif", "burgers"),
    "la-trufada":         ("La trufada.gif", "burgers"),
}


def key_black(im: Image.Image, thr: int = 16) -> Image.Image:
    """Convierte el fondo negro conectado a los bordes en alfa."""
    im = im.convert("RGBA")
    a = np.array(im)
    lum = a[..., :3].max(axis=2)
    dark = lum <= thr
    lbl, n = ndimage.label(dark)
    if n == 0:
        return im
    border = set(lbl[0, :]) | set(lbl[-1, :]) | set(lbl[:, 0]) | set(lbl[:, -1])
    border.discard(0)
    if not border:
        return im
    mask = np.isin(lbl, list(border))
    # feather de 1px para que no queden dientes de sierra
    soft = ndimage.binary_dilation(mask, iterations=1) & ~mask
    alpha = a[..., 3].astype(np.float32)
    alpha[mask] = 0
    alpha[soft] = alpha[soft] * 0.45
    a[..., 3] = alpha.astype(np.uint8)
    return Image.fromarray(a, "RGBA")


def trim(im: Image.Image, pad_ratio: float = 0.015) -> Image.Image:
    im = im.convert("RGBA")
    alpha = np.array(im.getchannel("A"))
    ys, xs = np.where(alpha > 8)
    if len(xs) == 0:
        return im
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = int(max(im.size) * pad_ratio)
    x0 = max(0, x0 - pad); y0 = max(0, y0 - pad)
    x1 = min(im.size[0] - 1, x1 + pad); y1 = min(im.size[1] - 1, y1 + pad)
    return im.crop((x0, y0, x1 + 1, y1 + 1))


def dominant(im: Image.Image) -> str:
    """Color medio de los pixeles opacos y luminosos: sirve de glow por producto."""
    a = np.array(im.convert("RGBA").resize((120, 120)))
    m = (a[..., 3] > 200) & (a[..., :3].max(axis=2) > 70)
    if m.sum() < 50:
        m = a[..., 3] > 200
    if m.sum() == 0:
        return "#C4D745"
    rgb = a[..., :3][m].mean(axis=0)
    # saturamos un poco para que el glow tenga carácter
    mx = rgb.max()
    rgb = np.clip(rgb + (rgb - rgb.mean()) * 0.9, 0, 255)
    if mx > 0:
        rgb = np.clip(rgb * (215 / max(rgb.max(), 1)), 0, 255)
    return "#%02X%02X%02X" % tuple(int(v) for v in rgb)


def export(slug, im, folder):
    d = os.path.join(OUT, folder)
    os.makedirs(d, exist_ok=True)
    w0, h0 = im.size
    out = []
    for w in WIDTHS:
        if w > w0 and w != WIDTHS[0]:
            continue
        tw = min(w, w0)
        th = round(h0 * tw / w0)
        r = im.resize((tw, th), Image.LANCZOS)
        name = f"{slug}-{w}.webp" if w != WIDTHS[0] else f"{slug}.webp"
        r.save(os.path.join(d, name), "WEBP", quality=84, method=3)
        out.append((w, name, os.path.getsize(os.path.join(d, name))))
    return out


meta = {}
for slug, (fn, folder, keyb) in MAP.items():
    p = os.path.join(SRC, fn)
    im = Image.open(p).convert("RGBA")
    if keyb:
        im = key_black(im)
    if folder not in ("brand",):
        im = trim(im)
    elif slug == "logo":
        im = trim(im, 0.0)
    files = export(slug, im, folder)
    meta[slug] = {
        "folder": folder, "src": fn, "w": im.size[0], "h": im.size[1],
        "ratio": round(im.size[0] / im.size[1], 3),
        "glow": dominant(im),
        "files": [f[1] for f in files],
        "kb": round(sum(f[2] for f in files) / 1024),
    }

# GIFs -> WebP animado (1080 max) con el negro keyado
for slug, (fn, folder) in ANIMATED.items():
    im = Image.open(os.path.join(SRC, fn))
    frames = []
    box = None
    for fr in ImageSequence.Iterator(im):
        f = key_black(fr.convert("RGBA"))
        frames.append(f)
    # bounding box comun de todos los frames
    acc = np.zeros(np.array(frames[0].getchannel("A")).shape, dtype=bool)
    for f in frames:
        acc |= np.array(f.getchannel("A")) > 8
    ys, xs = np.where(acc)
    pad = int(max(frames[0].size) * 0.015)
    box = (max(0, xs.min() - pad), max(0, ys.min() - pad),
           min(frames[0].size[0], xs.max() + pad), min(frames[0].size[1], ys.max() + pad))
    frames = [f.crop(box) for f in frames]
    w0, h0 = frames[0].size
    sc = min(1.0, 1080 / w0)
    frames = [f.resize((round(w0 * sc), round(h0 * sc)), Image.LANCZOS) for f in frames]
    d = os.path.join(OUT, folder)
    os.makedirs(d, exist_ok=True)
    dur = im.info.get("duration", 400)
    frames[0].save(os.path.join(d, f"{slug}.webp"), "WEBP", save_all=True,
                   append_images=frames[1:], duration=dur, loop=0, quality=82, method=3)
    # poster estatico para el primer paint
    for w in WIDTHS[1:]:
        r = frames[0].resize((w, round(frames[0].size[1] * w / frames[0].size[0])), Image.LANCZOS)
        r.save(os.path.join(d, f"{slug}-{w}.webp"), "WEBP", quality=84, method=3)
    meta[slug] = {
        "folder": folder, "src": fn, "w": frames[0].size[0], "h": frames[0].size[1],
        "ratio": round(frames[0].size[0] / frames[0].size[1], 3),
        "glow": dominant(frames[0]), "animated": True,
        "files": [f"{slug}.webp"] + [f"{slug}-{w}.webp" for w in WIDTHS[1:]],
        "kb": round(os.path.getsize(os.path.join(d, f"{slug}.webp")) / 1024),
    }

# favicon / og a partir del logo cuadrado original (recorte, no redibujado)
sq = Image.open(os.path.join(SRC, "logo fusion burger.jpg")).convert("RGB")
os.makedirs(os.path.join(OUT, "brand"), exist_ok=True)
sq.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, "brand", "og-image.jpg"), quality=88)
sq.resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, "brand", "apple-touch-icon.png"))
sq.resize((64, 64), Image.LANCZOS).save("/home/claude/fusion-burger/public/favicon.png")

with open("/home/claude/asset-meta.json", "w") as f:
    json.dump(meta, f, indent=1)

total = sum(m["kb"] for m in meta.values())
print(f"{len(meta)} assets procesados - {total} KB totales")
for k, v in sorted(meta.items()):
    print(f'{k:28s} {v["w"]:5d}x{v["h"]:<5d} ratio={v["ratio"]:<6} glow={v["glow"]} {v["kb"]:5d}KB')
