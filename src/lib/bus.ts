import { scrollToSection } from './hooks'

export const OPEN_MENU_ITEM = 'fb:open-menu-item'

export interface OpenMenuItemDetail {
  categoryId: string
  itemId: string
}

/**
 * Enlaza el showcase con la carta: al pulsar «verla en la carta» se abre la
 * categoría correcta, se resalta el producto y se baja hasta él. Un evento del
 * DOM basta y evita montar un store para una sola interacción.
 */
export function openMenuItem(categoryId: string, itemId: string) {
  window.dispatchEvent(
    new CustomEvent<OpenMenuItemDetail>(OPEN_MENU_ITEM, { detail: { categoryId, itemId } }),
  )
  window.setTimeout(() => scrollToSection('carta'), 60)
}
