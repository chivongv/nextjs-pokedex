import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from 'styled-components';

const Container = styled('div')({});

const PokemonDetails = () => {
  const router = useRouter();
  const { pid } = router.query;

  if (!router.isFallback && !pid) {
    return <ErrorPage statusCode={404}></ErrorPage>;
  }

  return <Container>Pokemon details</Container>;
};

// https://pokeapi.co/api/v2/pokemon/1

export default PokemonDetails;
