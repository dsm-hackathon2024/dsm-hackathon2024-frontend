import styled from 'styled-components';
import { Text } from '../../components';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { getMyData } from '../../api';
import { getRank } from '../../api/user/getRank';
import { toast } from '../../utils/toast/toast';
// import lmages from '../images/door.png';

const MyPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [rankData, setRankData] = useState([])

  const getUserData = async (token) => {
    await getMyData(token).then(res => {
      setUserData(res.data)
    })
    await getRank(token).then(res => {
      setRankData(res.data.userLinkList)
    })
  }

  const logout = () => {
    const toastId = toast.loading('로그아웃 중입니다...')
    deleteCookie('access_token')

    const token = getCookie('access_token')

    if (token) {
      toast.error('로그아웃을 실패했습니다...', toastId)
    } else {
      toast.success('성공적으로 로그아웃하였습니다.', toastId)
      navigate('/')
    }
  }

  useEffect(() => {
    const token = getCookie('access_token')

    if (token) {
      getUserData(token)
    } else {
      navigate('/')
    }
  }, [])

  return (
    <Container>
      <ContentBox>
        <UserBox>
          <ProfileBox>
            <ProfileImage src={userData?.profile || 'assets/profile.png'} width={150} height={150} />
            <ProfileTextBox>
              <Text type='titleLarge'>{userData?.userId}</Text>
              <Text type='subTitleLarge'>{userData?.id}</Text>
            </ProfileTextBox>
          </ProfileBox>
          <ButtonBox>
            <EditButton>프로필 편집</EditButton>
            <LogoutButton onClick={logout}>
              <img src='../assets/door.png' width={33} />
              <span>로그아웃</span>
            </LogoutButton>
          </ButtonBox>
        </UserBox>
        <RankContainer>
          <Text type='titleLarge' style={{ paddingLeft: '25px' }}>순위</Text>
          <RankDiv />
          <RankSubTitleBox>
            <span>닉네임</span>
            <span>푼 문제</span>
          </RankSubTitleBox>
          {
            rankData.map((v, i) => (
              <RankBox key={i}>
                <div>
                  <span style={{
                    fontSize: '25px',
                    color: rankColor[i] || '#000000'
                  }}>
                    {i + 1}
                  </span>
                  <ProfileImage src={v.profile || 'assets/profile.png'} width={50} height={50} />
                  <span>{v.username}</span>
                  {i < 3 && <img src={crownList[i]} />}
                </div>
                <span>{v.score}</span>
              </RankBox>
            ))
          }
        </RankContainer>
      </ContentBox>
    </Container>
  )
}

export default MyPage

const rankColor = ['#FFD600', '#8F8F8F', '#9F7C53']
const crownList = ['assets/crownOne.png', 'assets/crownTwo.png', 'assets/crownThree.png']

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 180px 40px 0;
  justify-content: center;
`

const ContentBox = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  gap: 50px
`

const UserBox = styled.div`
  width: 150px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const ProfileTextBox = styled(ProfileBox)`
  gap: 15px
`

const ProfileImage = styled.img`
    border-radius: 150px;
    border: 1px solid #5A90F8;
    object-fit: cover;
    object-position: center center;
`

const LogoutButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 25px;
  background-color: transparent;
`

const EditButton = styled(LogoutButton)`
  width: 150px;
  height: 70px;
  justify-content: center;
  border-radius: 20px;
  background-color: #5A90F8;
  color: #FFFFFF;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const RankContainer = styled.div`
  padding: 40px 0 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 1000px;
`

const RankDiv = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background-color: #5A90F8;
`

const RankSubTitleBox = styled.div`
  padding: 0 70px 0 110px;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`

const RankBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 895px;
  padding: 0 60px 0 20px;
  font-weight: 400;
  font-size: 20px;
  & div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`

// function MyPage() {
//   return (
//     <Container>
//       <h1>최근에 푼 문제</h1>
//       <StyledDiv>
//         <p>날짜 </p>
//         <p>문제이름 </p>
//         <p>정답여부 </p>
//         <p>점수 </p>
//       </StyledDiv>
//       <Profile>
//         <b>닉네임</b>
//         <p>아이디</p>
//       </Profile>
//       <Images>
//         {/* <img src={lmages} alt="로그아웃" width="30px" height="30px"/> */}
//         <b>로그아웃</b>
//       </Images>
//     </Container>
//   );
// }

// export default MyPage;

// const Container = styled.div`
//   position: absolute;
//   top: 200px;
//   left: 500px;
//   font-size: 12px;
// `
// const StyledDiv = styled.div`
//   border: 1px solid black;
//   border-radius: 20px;
//   position: relative;
//   top: 20px;
//   width: 850px;
//   height: 120px;
//   padding: 16px 50px;
//   & p {
//     word-spacing: 160px;
//     display: inline;
//     font-size: 16px;
//   }
// `
// const Profile = styled.div`
//   border-radius: 50%;
//   width: 130px;
//   height: 130px;
//   position: absolute;
//   top: -5px;
//   right: 1000px;
//   & b {
//     font-size: 21px;
//     position: absolute;
//     top: 150px;
//     left: 32px;
//   }
//   & p {
//     font-size: 17px;
//     position: absolute;
//     top: 190px;
//     left: 38px;
//   }
// `
// const Images = styled.div`
//   position: relative;
//   top: 300px;
//   right: 250px;
//   & b {
//     font-size: 20px;
//     position: relative;
//     left: 10px;
//     bottom: 7px;
//   }
// `