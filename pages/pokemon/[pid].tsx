import { GetServerSideProps } from 'next';
import Link from 'next/link';
import ErrorPage from 'next/error';
import styled from 'styled-components';
import pokemons from '@/pokemons-data.json';
import { Colors } from '@/styles/colors';
import { Layout } from '@/components';
import { toCapitalize } from '@/utils/toCapitalize';

const Container = styled('div')(
  {
    borderRadius: 20,
    margin: '0 auto 10px',
    padding: 20,
    width: 340,
    textAlign: 'center',
    boxShadow: '0 3px 15px rgba(100, 100, 100, 0.4)',
    '@media screen and (min-width: 500px)': {
      marginBottom: 70,
    },
  },
  ({ backgroundColor }: { backgroundColor?: string }) => ({
    backgroundColor: backgroundColor ? backgroundColor : '#eee',
  }),
);

const ImageContainer = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '50%',
  textAlign: 'center',
  margin: '0 auto',
  '> img': {
    margin: '20px auto',
    maxWidth: '240px',
  },
});

const Info = styled('div')({
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

const Name = styled('h3')({
  margin: '15px 0 7px',
  letterSpacing: 1,
  display: 'inline-block',
  fontWeight: 700,
});

const Number = styled('span')({
  backgroundColor: 'rgba(0,0,0,0.1)',
  borderRadius: 10,
  fontSize: '0.8rem',
  padding: '5px 10px',
});

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const HomeLink = styled('a')({
  padding: '10px 15px',
  backgroundColor: '#eee',
  cursor: 'pointer',
  borderRadius: 5,
});

type Props = {
  pokemon: any;
};

const PokemonDetails = ({ pokemon }: Props) => {
  if (!pokemon) {
    return <ErrorPage statusCode={404}></ErrorPage>;
  }

  const backgroundColor = Colors[pokemon.types[0].type.name];

  return (
    <div>
      <Layout title={toCapitalize(pokemon.name)}>
        <Container backgroundColor={backgroundColor}>
          <div>
            <Name>{toCapitalize(pokemon.name)}</Name>
            <ImageContainer>
              <img
                loading="lazy"
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
              />
            </ImageContainer>
            <Number>{'#' + pokemon.id.toString().padStart(3, '0')}</Number>
          </div>
          <Info>
            <div>{'Height: ' + pokemon.height * 10 + ' cm'}</div>
            <div>{'Weight: ' + pokemon.weight / 10 + ' kg'}</div>
            <div>
              {'Types: ' +
                pokemon.types.map((item) => item.type.name).join(' | ')}
            </div>
            <div>{`${pokemon.stats[0].stat.name.toUpperCase()}: ${
              pokemon.stats[0].base_stat
            }`}</div>
            <div>{`${toCapitalize(pokemon.stats[1].stat.name)}: ${
              pokemon.stats[1].base_stat
            }`}</div>
            <div>{`${toCapitalize(pokemon.stats[2].stat.name)}: ${
              pokemon.stats[2].base_stat
            }`}</div>
            <div>{`${toCapitalize(
              pokemon.stats[3].stat.name.replace('-', ' '),
            )}: ${pokemon.stats[3].base_stat}`}</div>
            <div>{`${toCapitalize(
              pokemon.stats[4].stat.name.replace('-', ' '),
            )}: ${pokemon.stats[4].base_stat}`}</div>
            <div>{`${toCapitalize(pokemon.stats[5].stat.name)}: ${
              pokemon.stats[5].base_stat
            }`}</div>
          </Info>
        </Container>
        <Center>
          <Link href="/">
            <HomeLink>Back to home</HomeLink>
          </Link>
        </Center>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params.pid;
  const id = pid ? parseInt(pid.toString()) : undefined;
  const nameIndex = pid
    ? pokemons.kanto.findIndex((item) => item.name === pid) + 1
    : undefined;
  const notValidPokemonId = !id || id === NaN || id < 1 || id > 151;
  const notValidPokemonName = nameIndex === undefined || nameIndex < 1;

  if (notValidPokemonId && notValidPokemonName) {
    return {
      props: { pokemon: null },
    };
  }
  const fetchId = id ? id : nameIndex;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${fetchId}`);
  const pokemon = await res.json();

  return {
    props: { pokemon },
  };
};

export default PokemonDetails;
