import { cache } from 'swr';

if (typeof window === 'undefined') {
  const { server } = require('./server');

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} else {
  const { worker } = require('./browser');

  beforeAll(() => worker.listen());
  afterEach(() => {
    worker.resetHandlers();
    cache.clear();
  });
  afterAll(() => worker.close());
}

export {};
