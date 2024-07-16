import styled from 'styled-components';
import { Button } from '../components/button/Button';

function App() {
  return (
    <Container>
      <Button/>
      <Button>음음</Button>
      main
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0FABFF;
  color: blue;
`