import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import PokemonDetails from '@/pages/pokemon/[pid]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('Should show loading spinner and then pokemon details', async () => {
  useRouter.mockImplementation(() => ({
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {
      pid: 4,
    },
  }));

  render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <PokemonDetails />
    </SWRConfig>,
  );

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
});
