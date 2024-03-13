export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const TOTAL_RAITING_STATUS = 5;
export const NEAR_OFFERS_COUNT = 3;

export const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const SORT_TYPES = [
  { name: 'Popular' },
  { name: 'Price: low to high' },
  { name: 'Price: high to low' },
  { name: 'Top rated first' }
];

export const LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const COMMENT_DATE_FORMAT = 'MMMM YYYY';
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
