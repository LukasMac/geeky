import { MOMENTUM_API_HOST } from './base'

export const getBackgroundsMetadata = (req) =>
  req.build('GET', `${MOMENTUM_API_HOST}/feed/bulk?syncTypes=background&localDate=${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
  // req.build('GET', `https://momentumdash.com/`);

export const getBackground = (req, url) =>
  req.build('GET', url);
  // req.build('GET', `https://momentumdash.com/`);

