import request from 'superagent';

let requestBuilder = null;

export default class HackerNewsApi {

  static getInstance() {
    if (!requestBuilder) {
      requestBuilder = {
        build: (method, url) => {
          return request(method, url)
        }
      }
    }
    return requestBuilder;
  }
}
