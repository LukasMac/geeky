import request from 'superagent';

let requestBuilder = null;

export default class GithubApi {

  static getInstance(url, accessToken) {
    if (!requestBuilder) {
      requestBuilder = {
        url,
        build: (method, url) => {
          return request(method, url)
            .set('Authorization', `token ${accessToken}`);
        }
      }
    }
    return requestBuilder;
  }
}
