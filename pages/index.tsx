import styled from 'styled-components';

import data from '../pokemons-data.json';
import { Layout, PokemonCard } from '@/components';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  maxWidth: 1200,
  margin: '0 auto',
});

const PageHeader = styled('h2')({
  fontSize: '2rem',
  textAlign: 'center',
  margin: '0.5rem 0',
});

const PokemonsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 1200,
  margin: '0 auto',
});

const Home = () => {
  return (
    <div>
      <Layout title="Nextjs Pokedex">
        <Container>
          <PageHeader>NextJS Pokedex</PageHeader>
          <PokemonsContainer>
            {data.kanto.map((pokemon, index) => {
              return (
                <PokemonCard key={index} pokemon={pokemon} index={index + 1} />
              );
            })}
          </PokemonsContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
