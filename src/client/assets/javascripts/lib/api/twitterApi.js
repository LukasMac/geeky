import request from 'superagent';

let requestBuilder = null;
const TWITTER_OAUTH_URL = 'https://api.twitter.com/oauth2/token';

export default class TwitterApi {

  static getOAuthToken(consumerKey, consumerSecret) {
    return request('POST', TWITTER_OAUTH_URL)
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(encodeURI(consumerKey) + ':' + encodeURI(consumerSecret)))
      .send('grant_type=client_credentials');
  }

  static getInstance(accessToken) {
    if (!requestBuilder) {
      requestBuilder = {
        build: (method, url) => {
          return request(method, url)
            .set('Authorization', `Bearer ${accessToken}`);
        }
      }
    }
    return requestBuilder;
  }
}
