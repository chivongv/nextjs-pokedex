import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';

import pokemons from '@/pokemons-data.json';
import { Colors } from '@/styles/colors';
import Layout from '@/components/Layout';
import { toCapitalize } from '@/utils/toCapitalize';
import Loader from '@/components/Loader';

const Container = styled('div')(
  {
    borderRadius: 20,
    margin: '10px auto 5',
    padding: 20,
    width: 340,
    textAlign: 'center',
    boxShadow: '0 3px 15px rgba(100, 100, 100, 0.4)',
    '@media screen and (min-width: 500px)': {
      marginBottom: 20,
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

const ButtonLink = styled('a')({
  padding: '10px 15px',
  backgroundColor: '#eee',
  cursor: 'pointer',
  borderRadius: 5,
  margin: '10px auto',
});

const fetcher = (url) => fetch(url).then((r) => r.json());

const PokemonDetails = () => {
  const router = useRouter();
  const { pid } = router.query;
  const nameIndex = pid
    ? pokemons.kanto.findIndex((item) => item.name === pid) + 1
    : undefined;
  const id = pid ? parseInt(pid.toString()) : undefined;
  const fetchId = id ? id : nameIndex;
  const notValidPokemonId = !id || id === NaN || id < 1 || id > 151;
  const notValidPokemonName = nameIndex === undefined || nameIndex < 1;
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${fetchId}`,
    fetcher,
    { refreshInterval: 0 },
  );

  if ((notValidPokemonId && notValidPokemonName) || error) {
    return (
      <Layout title="Error">
        <Container>
          {notValidPokemonId && notValidPokemonName && (
            <div>
              Invalid pokemon id or name. Please try again or return to
              homepage.
            </div>
          )}
          {error && (
            <div>
              Error on fetching the pokemon. Please try again or return to
              homepage.
            </div>
          )}
        </Container>
        <Center>
          <ButtonLink onClick={() => window.location.reload()}>
            Try again
          </ButtonLink>
          <Link href="/" passHref>
            <ButtonLink>Back to home</ButtonLink>
          </Link>
        </Center>
      </Layout>
    );
  }

  if (!data) return <Loader />;

  const backgroundColor = Colors[data.types[0].type.name];

  return (
    <div>
      <Layout title={toCapitalize(data.name)}>
        <Container backgroundColor={backgroundColor}>
          <div>
            <Name>{toCapitalize(data.name)}</Name>
            <ImageContainer>
              <img
                loading="lazy"
                src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`}
              />
            </ImageContainer>
            <Number>{'#' + data.id.toString().padStart(3, '0')}</Number>
          </div>
          <Info>
            <div>{'Height: ' + data.height * 10 + ' cm'}</div>
            <div>{'Weight: ' + data.weight / 10 + ' kg'}</div>
            <div>
              {'Types: ' + data.types.map((item) => item.type.name).join(' | ')}
            </div>
            <div>{`${data.stats[0].stat.name.toUpperCase()}: ${
              data.stats[0].base_stat
            }`}</div>
            <div>{`${toCapitalize(data.stats[1].stat.name)}: ${
              data.stats[1].base_stat
            }`}</div>
            <div>{`${toCapitalize(data.stats[2].stat.name)}: ${
              data.stats[2].base_stat
            }`}</div>
            <div>{`${toCapitalize(
              data.stats[3].stat.name.replace('-', ' '),
            )}: ${data.stats[3].base_stat}`}</div>
            <div>{`${toCapitalize(
              data.stats[4].stat.name.replace('-', ' '),
            )}: ${data.stats[4].base_stat}`}</div>
            <div>{`${toCapitalize(data.stats[5].stat.name)}: ${
              data.stats[5].base_stat
            }`}</div>
          </Info>
        </Container>
        <Center>
          <Link href="/" passHref>
            <ButtonLink>Back to home</ButtonLink>
          </Link>
        </Center>
      </Layout>
    </div>
  );
};

export default PokemonDetails;
