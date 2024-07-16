import styled from 'styled-components';
import { Button } from '../components/button/Button';
import lmages from '../images/door.png';

function App() {
  return (
    <Container>
     <h1>최근에 푼 문제</h1>
     <StyledDiv>
     <p>날짜 </p>
     <p>문제이름 </p>
     <p>정답여부 </p>
     <p>점수 </p>
     </StyledDiv>
     <Profile>
      <b>닉네임</b>
      <p>아이디</p>
     </Profile>
     <Images>
      <img src={lmages} alt="로그아웃" width="30px" height="30px"/>
      <b>로그아웃</b>
     </Images>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  top: 200px;
  left: 500px;
  font-size: 12px;
`
const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  position: relative;
  top: 20px;
  width: 850px;
  height: 120px;
  padding: 16px 50px;
  & p {
    word-spacing: 160px;
    display: inline;
    font-size: 16px;
  }
`
const Profile = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  position: absolute;
  top: -5px;
  right: 1000px;
  & b {
    font-size: 21px;
    position: absolute;
    top: 150px;
    left: 32px;
  }
  & p {
    font-size: 17px;
    position: absolute;
    top: 190px;
    left: 38px;
  }
`
const Images = styled.div`
  position: relative;
  top: 300px;
  right: 250px;
  & b {
    font-size: 20px;
    position: relative;
    left: 10px;
    bottom: 7px;
  }
`