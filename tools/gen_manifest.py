import os, re
from PIL import Image
base = 'fusion-burger/public/assets'
out = {}
for folder in sorted(os.listdir(base)):
    d = os.path.join(base, folder)
    if not os.path.isdir(d): continue
    for f in sorted(os.listdir(d)):
        if not f.endswith('.webp'): continue
        m = re.match(r'^(.*?)(?:-(\d+))?\.webp$', f)
        slug, w = m.group(1), m.group(2)
        e = out.setdefault(slug, {'path': f'{folder}/{slug}', 'widths': []})
        im = Image.open(os.path.join(d, f))
        if w is None:
            e['w'], e['h'] = im.size
            e['widths'].append(im.size[0])
            if getattr(im, 'n_frames', 1) > 1: e['animated'] = True
        else:
            e['widths'].append(int(w))
for v in out.values():
    v['widths'] = sorted(set(v['widths']))

lines = [
 "// GENERADO por tools/gen_manifest.py — no editar a mano.",
 "// Manifiesto de los assets originales de Fusion Burger ya optimizados a WebP.",
 "",
 "export interface ImageAsset {",
 "  /** ruta dentro de /assets, sin extensión */",
 "  path: string",
 "  /** ancho intrínseco del archivo base */",
 "  w: number",
 "  /** alto intrínseco del archivo base */",
 "  h: number",
 "  /** anchos disponibles para el srcset */",
 "  widths: readonly number[]",
 "  /** true si el WebP es animado: no se le aplica srcset */",
 "  animated?: boolean",
 "}",
 "",
 "export const IMAGES = {",
]
for k in sorted(out):
    v = out[k]
    an = ', animated: true' if v.get('animated') else ''
    lines.append(f"  '{k}': {{ path: '{v['path']}', w: {v['w']}, h: {v['h']}, widths: [{', '.join(map(str, v['widths']))}]{an} }},")
lines += ["} satisfies Record<string, ImageAsset>", "", "export type ImageId = keyof typeof IMAGES", ""]
open('fusion-burger/src/data/images.ts', 'w').write('\n'.join(lines))
print(len(out), 'assets ->', 'src/data/images.ts')
for k in sorted(out): print(' ', k, out[k]['widths'], out[k].get('animated',''))
