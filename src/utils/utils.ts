import { TOTAL_RAITING_STATUS } from '../const';
import { Size } from '../types/size';
import { Offer } from '../types/offer';

export function getImageSize (size : Size) {
  return size === 'small' ? { width: '150', height: '110' } : { width: '260', height: '200' };
}

export function getRating(number: number) {
  return (number / TOTAL_RAITING_STATUS) * 100;
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
  return new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
}
