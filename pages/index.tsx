import { useState } from 'react';
import styled from 'styled-components';

import data from '../pokemons-data.json';
import Layout from '@/components/Layout';
import PokemonCard from '@/components/PokemonCard';
import SearchInput from '@/components/SearchInput';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  maxWidth: 1200,
  margin: '0 auto',
});

const PokemonsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 1200,
  margin: '0 auto',
});

const Home = () => {
  const [searchText, setSearchText] = useState('');
  // add pokedexNum to existing data
  const modifiedData = data.kanto.map((pokemon, index) => ({
    ...pokemon,
    pokedexNum: index + 1,
  }));
  const filteredPokemons = modifiedData.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchText) ||
      pokemon.type.find((type) => type.toLowerCase().includes(searchText)) ||
      `${pokemon.pokedexNum}` == searchText
    );
  });

  return (
    <div>
      <Layout title="Nextjs Pokedex">
        <Container>
          <SearchInput
            setSearchText={setSearchText}
            placeholder="Search by name, type, number"
          />
          <PokemonsContainer>
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon, index) => {
                const pokemonNum =
                  data.kanto.findIndex((p) => p.name == pokemon.name) + 1;

                return (
                  <PokemonCard
                    key={index}
                    pokemon={pokemon}
                    index={pokemonNum}
                  />
                );
              })
            ) : (
              <h3>Pokemon can not be found. Please try another search term.</h3>
            )}
          </PokemonsContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
