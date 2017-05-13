export const getPullRequests = (req, albumId) =>
  req.build('GET', req.url);
