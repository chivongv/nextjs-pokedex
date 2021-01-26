import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  //   alignSelf: 'center',
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
});

const Input = styled.input({
  background: 'transparent',
  border: 'none',
  width: '100%',
  height: '100%',
  padding: 16,
  paddingLeft: 34,
});

const SearchInput = ({ setSearchText, ...rest }) => {
  function handleChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  return (
    <Container>
      <SearchIcon />
      <Input {...rest} onChange={handleChange} />
    </Container>
  );
};

export default SearchInput;
