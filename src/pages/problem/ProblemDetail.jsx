import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getCookie } from "../../utils/cookie"
import { getProblem, postAnswerCount } from "../../api"
import { toast } from "../../utils/toast/toast"

const answerIndexList = ['①', '②', '③', '④', '⑤']

export const ProblemDatail = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [problemIndex, setProblemIndex] = useState(0)

    const getData = async () => {
        await getProblem().then(res => {
            setData(prev => ([...prev, { ...res.data, result: '' }]))

        }).catch(() => {
            toast.error('뭔가 문제가 발생했습니다.')
        })
    }

    const submitAnswer = async (value) => {
        if (!data[problemIndex].result) {
            if (value === data[problemIndex].answer) {
                toast.success('정답을 맞추셨습니다!')
                const token = getCookie('access_token')
                await postAnswerCount(token, data[problemIndex].level)
            } else {
                toast.error('아쉽게도 정답이 아니었습니다.')
            }
            setData(prev => ([
                ...prev.slice(0, problemIndex),
                {
                    ...prev[problemIndex],
                    result: value
                },
                ...prev.slice(problemIndex + 1)
            ]))
        } else {
            toast.error('정답을 이미 선택하셨습니다.')
        }
    }

    const movePage = (value) => {
        if (!data[problemIndex] || data[problemIndex]?.result == '') {
            toast.error('정답을 골라주세요')
        } else {
            setProblemIndex(prev => prev + value)
        }
    }

    useEffect(() => {
        const token = getCookie('access_token')
        if (data.length <= problemIndex) {
            getData()
        }
        if (token) {
            if (data.length <= problemIndex) {
                getData()
            }
        } else {
            navigate('/')
        }
    }, [problemIndex])

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
                            <ProblemTitle>난이도: {data[problemIndex]?.level}</ProblemTitle>
                            <ProblemSubTitle>{data[problemIndex]?.question}</ProblemSubTitle>
                        </GapBox>
                        <GapBox>
                            <AnswerBox>
                                {
                                    data[problemIndex]?.options.map((v, i) =>
                                        <AnswerText
                                            key={i}
                                            onClick={() => submitAnswer(v)}
                                            style={{
                                                backgroundColor: v === data[problemIndex].result ? '#5A90F8' : 'transparent',
                                                color: v === data[problemIndex].result ? '#FFFFFF' : '#000000',
                                                border: `3px solid ${(data[problemIndex].result && v === data[problemIndex].answer) ? '#3FA6FF' : 'transparent'}`
                                            }}
                                        >
                                            {answerIndexList[i]} {v}
                                        </AnswerText>
                                    )
                                }
                            </AnswerBox>
                        </GapBox>
                        <BetweenBox>
                            <Button onClick={() => navigate('/ai')}>
                                <img src="../assets/aiAnswer.png" alt="ai 해설 이미지" />
                                <ButtonText>AI 해설</ButtonText>
                            </Button>
                            <SideBox>
                                {
                                    problemIndex ?
                                        <Button onClick={() => movePage(-1)}>
                                            <img src="../assets/leftArrow.png" alt="왼쪽 화살표" />
                                            <ButtonText>이전 문제</ButtonText>
                                        </Button>
                                        :
                                        <></>
                                }
                                <Button onClick={() => movePage(1)}>
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
    row-gap: 15px;
    column-gap: 25px;
    flex-wrap: wrap;
`

const AnswerText = styled(ProblemSubTitle)`
    cursor: pointer;
    padding: 3px 3px;
    border-radius: 10px;

    &:hover {
        background-color: #5A90F8 !important;
        color: #FFFFFF !important;
    }
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