import { TOTAL_RAITING_STATUS } from '../const';
import { Size } from '../types/common';

export function getImageSize (size : Size) {
  return size === 'small' ? { width: '150', height: '110' } : { width: '260', height: '200' };
}

export function getRating(number: number) {
  return (number / TOTAL_RAITING_STATUS) * 100;
}
