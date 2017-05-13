import { TWITTER_API_HOST } from './base'

// export const twitterOAuth = (req, consumerKey, consumerSecret) =>
//   req.build('POST', TWITTER_OAUTH_URL).
//     set('Authorization', 'Bearer ');
//
export const twitterSearch = (req, q) =>
  req.build('GET', `${TWITTER_API_HOST}/search/tweets.json?q=${q}`);
