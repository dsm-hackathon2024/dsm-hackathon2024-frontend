import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export const ProblemReady = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <ContentBox>
                <TitleBox>
                    <Title>NOIZE</Title>
                    <SubTitle>'NOIZE'을 통해 당신의 경제적 사고력을 키워보세요.</SubTitle>
                </TitleBox>
                <Button onClick={() => navigate('/problem/1')}>문제 풀기</Button>
            </ContentBox>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('assets/background.png');
    padding-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
`

const TitleBox = styled(ContentBox)`
    gap: 50px;
`

const Title = styled.span`
    font-weight: bold;
    font-size: 40px;
    color: #FFFFFF;
    `

const SubTitle = styled.span`
    font-weight: 500;
    font-size: 30px;
    color: #FFFFFF;
`

const Button = styled.button`
    width: 300px;
    height: 100px;
    border-radius: 100px;
    background-color: #FFFFFF;
    color: #5A90F8;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
`