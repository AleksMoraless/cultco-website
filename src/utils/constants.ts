/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
// export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
// export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

// export const settings = {};

export enum eventsList {
  'catalogItems:changed' = 'catalogItems:changed',
  'linkForm:open' = 'linkForm:open',
  'catalogItem:picked' = 'catalogItem:picked',
  'modal:close' = 'modal:close',
  'popularItems: picked' = 'popularItems: picked',
  'catalog:scrolledBack' = 'catalog:scrolledBack',
  'catalog:scrolledForward' = 'catalog:scrolledForward',
  'catalog:scrolled' = 'catalog:scrolled',

}

