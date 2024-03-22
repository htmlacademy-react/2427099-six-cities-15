import dayjs from 'dayjs';
import { AuthorizationStatus, COMMENT_DATE_FORMAT, ISO_DATE_FORMAT, TOTAL_RAITING_STATUS } from '@const';
import { Size } from '@type/size';
import { Offer } from '@type/offer';
import { Comment } from '@type/comment';

export function getImageSize (size : Size) {
  return size === 'small' ? { width: '150', height: '110' } : { width: '260', height: '200' };
}

export function getRating(number: number) {
  return (number / TOTAL_RAITING_STATUS) * 100;
}

export function isAuth(status: AuthorizationStatus): boolean {
  return status === AuthorizationStatus.Auth;
}

export function getFavoriteCitiesFromOffers({offers}: {offers: Offer[]}): string[] {
  const cities = offers.map((offer) => offer.city.name);
  const uniqueCities = [...new Set(cities)];
  return uniqueCities;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function humanizeDate(date: string): string {
  return date ? dayjs(date).format(COMMENT_DATE_FORMAT) : '';
}

export function formatDateToISO(date: string): string {
  return date ? dayjs(date).format(ISO_DATE_FORMAT) : '';
}

export function sortCommentsByDate(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
}
