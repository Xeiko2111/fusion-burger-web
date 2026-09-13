import { scrollToSection } from './hooks'

export const OPEN_MENU_ITEM = 'fb:open-menu-item'

export interface OpenMenuItemDetail {
  categoryId: string
  itemId: string
}


export function openMenuItem(categoryId: string, itemId: string) {
  window.dispatchEvent(
    new CustomEvent<OpenMenuItemDetail>(OPEN_MENU_ITEM, { detail: { categoryId, itemId } }),
  )
  window.setTimeout(() => scrollToSection('carta'), 60)
}
