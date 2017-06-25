import { HACKER_NEWS_API_HOST } from './base'

export const hackerNewsTopStories = (req) =>
  req.build('GET', `${HACKER_NEWS_API_HOST}/topstories.json`);

export const hackerNewsStory = (req, id) =>
  req.build('GET', `${HACKER_NEWS_API_HOST}/item/${id}.json`);
