import { useState } from "react"
import styled from "styled-components"

const answerIndexList = ['①', '②', '③', '④', '⑤']

export const ProblemDatail = () => {
    const [data, setData] = useState(['시장 실패는 재화의 비경합성으로 인해 발생한다.', '시장 실패는 재화의 비경합성으로 인해 발생한다.', '시장 실패는 재화의 비경합성으로 인해 발생한다.'])
    return (
        <Container>
            <TitleBox>
                <Title>NOIZE</Title>
                <SubTitle>'NOIZE'은 당신의 경제적 사고를 키워줍니다.</SubTitle>
            </TitleBox>
            <ContentBox>
                <ProblemBox>
                    <BlockBox>
                        <GapBox>
                            <ProblemTitle>[1] 시장 실패 이해하기</ProblemTitle>
                            <ProblemSubTitle>다음 사례에서 도출 할 수 있는 결론으로 가장 적절한 것은?</ProblemSubTitle>
                        </GapBox>
                        <GapBox>
                            <AnswerBox>
                                {
                                    data.map((v, i) => <AnswerText key={i}>{answerIndexList[i]} {v}</AnswerText>)
                                }
                            </AnswerBox>
                        </GapBox>
                        <BetweenBox>
                            <Button>
                                <img src="../assets/aiAnswer.png" alt="ai 해설 이미지" />
                                <ButtonText>AI 해설</ButtonText>
                            </Button>
                            <SideBox>
                                <Button>
                                    <img src="../assets/leftArrow.png" alt="왼쪽 화살표" />
                                    <ButtonText>이전 문제</ButtonText>
                                </Button>
                                <Button>
                                    <ButtonText>다음 문제</ButtonText>
                                    <img src="../assets/rightArrow.png" alt="오른쪽 화살표" />
                                </Button>
                            </SideBox>
                        </BetweenBox>
                    </BlockBox>
                </ProblemBox>
            </ContentBox>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/background.png');
    padding-top: 135px;
    gap: 190px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const ContentBox = styled.div`
    width: 100vw;
    padding: 145px 20px 315px;
    border-radius: 200px 200px 0 0;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
`

const ProblemBox = styled.div`
    width: 100%;
    max-width: 1200px;
    border-radius: 50px;
    border: 1px solid #000000;
    padding: 65px 90px;
    gap: 170px;
`

const GapBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 37px;
`

const BlockBox = styled(GapBox)`
    width: 100%;
    max-width: 1000px;
    gap: 60px;
`

const ProblemTitle = styled.span`
    font-weight: 700;
    font-size: 35px;
`

const ProblemSubTitle = styled.span`
    font-weight: 400;
    font-size: 30px;
`

const AnswerBox = styled.div`
    display: flex;
    row-gap: 20px;
    column-gap: 15px;
    flex-wrap: wrap;
`

const AnswerText = styled(ProblemSubTitle)`
    cursor: pointer;
`

const BetweenBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const SideBox = styled.div`
    display: flex;
    gap: 34px;
`

const Button = styled.button`
    outline: none;
    border: 3px solid #5A90F8;
    background-color: transparent;
    width: 160px;
    height: 55px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`

const ButtonText = styled.span`
    font-weight: 500;
    font-size: 20px;
    color: #5A90F8;
`