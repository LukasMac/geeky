import request from 'superagent';

let requestBuilder = null;

export default class MomentumApi {

  static getInstance() {
    if (!requestBuilder) {
      requestBuilder = {
        build: (method, url) => {
          return request(method, url)
            .set('x-momentum-clientid', '41d97ca9-6398-47a4-9db7-a4c4092072a8');
        }
      }
    }
    return requestBuilder;
  }
}
