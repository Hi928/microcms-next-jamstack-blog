import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'chinublog',
  apiKey: process.env.API_KEY,
});