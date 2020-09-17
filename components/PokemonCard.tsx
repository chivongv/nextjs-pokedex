import styled from 'styled-components';
import Link from 'next/link';
import { Colors } from '@/styles/colors';

const Container = styled('div')(
  {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    textAlign: 'center',
    cursor: 'pointer',
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

const toCapitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const PokemonCard = ({ pokemon, index }: Props) => {
  const name = toCapitalize(pokemon.name);
  const backgroundColor = Colors[pokemon.type[0]];
  const id = '#' + index.toString().padStart(3, '0');

  return (
    <Link href={`/pokemon/${index}`}>
      <Container backgroundColor={backgroundColor}>
        <ImageContainer>
          <img
            loading="lazy"
            src={`https://pokeres.bastionbot.org/images/pokemon/${index}.png`}
            alt={name}
          />
        </ImageContainer>
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
    </Link>
  );
};