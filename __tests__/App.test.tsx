import { render, screen } from '@testing-library/react';
// import { server } from '../__mocks__/server';
import userEvent from '@testing-library/user-event';
import Index from '../pages/index';

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

test('Should show error message if no pokemon found on search', () => {
  const notValidPokemon = 'dasdasd';
  render(<Index />);
  const searchInput = screen.getByLabelText(/search/i);
  userEvent.type(searchInput, notValidPokemon);
  expect(screen.getByText(/pokemon can not be found/i)).toBeInTheDocument();
});

// Should be able to search a pokemon and get results
// Should fetch images and display as cards
// Should be clickable and fetch pokemon details
