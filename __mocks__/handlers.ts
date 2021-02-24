import { rest } from 'msw';
import data from './mocksData.json';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

export const handlers = [
  rest.get(`https://pokeapi.co/api/v2/pokemon`, (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(data));
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.delay(delay),
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' }),
    );
  }),
];
