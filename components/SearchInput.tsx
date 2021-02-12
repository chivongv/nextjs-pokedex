import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.1)',
  borderRadius: 8,
  width: '100%',
  maxWidth: 600,
  position: 'relative',
  margin: '5px auto 10px',
});

const SearchIcon = styled(FaSearch)({
  position: 'absolute',
  top: '50%',
  left: 18,
  transform: 'translate(-50%, -50%)',
  color: 'rgba(0,0,0,0.5)',
});

const Input = styled.input({
  background: 'transparent',
  border: 'none',
  width: '100%',
  height: '100%',
  padding: 16,
  paddingLeft: 34,
  '::placeholder': {
    fontSize: '0.875rem',
  },
});

const SearchInput = ({ setSearchText, ...rest }) => {
  function handleChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  return (
    <Container>
      <SearchIcon />
      <Input type="text" {...rest} onChange={handleChange} />
    </Container>
  );
};

export default SearchInput;
