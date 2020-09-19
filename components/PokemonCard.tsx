import styled from 'styled-components';
import Link from 'next/link';
import { Colors } from '@/styles/colors';
import { toCapitalize } from '@/utils/toCapitalize';

const Container = styled('div')(
  {
    borderRadius: 20,
    margin: 5,
    padding: 20,
    textAlign: 'center',
    boxShadow: '0 3px 15px rgba(100, 100, 100, 0.4)',
    '@media screen and (min-width: 500px)': {
      margin: 10,
    },
  },
  ({ backgroundColor }: { backgroundColor?: string }) => ({
    backgroundColor: backgroundColor ? backgroundColor : '#eee',
  }),
);

const ImageContainer = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '50%',
  width: 120,
  height: 120,
  textAlign: 'center',
  '> img': {
    marginTop: 20,
    maxWidth: '90%',
  },
});

const Info = styled('div')({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column',
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

const Type = styled('small')({
  fontWeight: 450,
  '> span': {
    marginLeft: 5,
  },
});

type Props = {
  pokemon: {
    name: string;
    type: string[];
    url: string;
  };
  index: number;
};

export const PokemonCard = ({ pokemon, index }: Props) => {
  const name = toCapitalize(pokemon.name);
  const backgroundColor = Colors[pokemon.type[0]];
  const id = '#' + index.toString().padStart(3, '0');

  return (
    <Container backgroundColor={backgroundColor}>
      <Link href={`/pokemon/${index}`} passHref>
        <a>
          <ImageContainer>
            <img
              loading="lazy"
              src={`https://pokeres.bastionbot.org/images/pokemon/${index}.png`}
            />
          </ImageContainer>
        </a>
      </Link>
      <Info>
        <Number>{id}</Number>
        <Name>{name}</Name>
        <Type>
          Type:
          {pokemon.type.map((type, i) => (
            <span key={i}>{toCapitalize(type)}</span>
          ))}
        </Type>
      </Info>
    </Container>
  );
};
