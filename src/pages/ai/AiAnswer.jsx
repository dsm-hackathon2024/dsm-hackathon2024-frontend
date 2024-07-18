import { useState } from "react";
import styled from "styled-components"
import { toast } from "../../utils/toast/toast";
import { postPrompt } from "../../api";

const AiAnswer = () => {
    const [questionWord, setQuestionWord] = useState('')
    const [data, setData] = useState([])

    const submitQuestion = async () => {
        const toastId = toast.loading('질문을 업로드하고 있습니다.')
        if (!questionWord) {
            toast.error('질문을 입력해주세요', toastId)
        }

        setData(prev => [...prev, { user: 'me', word: questionWord }])
        setQuestionWord('')
        await postPrompt(questionWord).then(res => {
            setData(prev => [...prev, { user: 'ai', word: res.data.answer }])
        }).catch(() => {
            toast.error('답변을 가져오는데 문제가 발생했습니다.', toastId)
        })
    }

    return (
        <Container>
            <ContentBox>
                <AnswerBox>
                    {
                        data.map((v, i) => {
                            if (v.user === 'me') {
                                return (
                                    <MyAnswerCover key={i}>
                                        <MyAnswerBlock>{v.word}</MyAnswerBlock>
                                    </MyAnswerCover>
                                )
                            }
                            else {
                                return (
                                    <AiAnswerCover key={i}>
                                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                                        <AiAnswerBlock>{v.word}</AiAnswerBlock>
                                    </AiAnswerCover>
                                )
                            }
                        })
                    }
                    {/* <MyAnswerCover>
                        <MyAnswerBlock>잘되는가?</MyAnswerBlock>
                    </MyAnswerCover>
                    <AiAnswerCover>
                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                        <AiAnswerBlock>아마도 그러한 것 같습니다.</AiAnswerBlock>
                    </AiAnswerCover>
                    <AiAnswerCover>
                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                        <AiAnswerBlock>아마도 그러한 것 같습니다.</AiAnswerBlock>
                    </AiAnswerCover>
                    <AiAnswerCover>
                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                        <AiAnswerBlock>아마도 그러한 것 같습니다.</AiAnswerBlock>
                    </AiAnswerCover>
                    <AiAnswerCover>
                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                        <AiAnswerBlock>아마도 그러한 것 같습니다.</AiAnswerBlock>
                    </AiAnswerCover>
                    <AiAnswerCover>
                        <ProfileImage src="assets/logo.png" width={50} height={50} />
                        <AiAnswerBlock>아마도 그러한 것 같습니다.</AiAnswerBlock>
                    </AiAnswerCover> */}
                </AnswerBox>
                <InputCover>
                    <Input
                        placeholder="질문을 입력해주세요"
                        onChange={(e) => setQuestionWord(e.currentTarget.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                submitQuestion()
                            }
                        }}
                        value={questionWord}
                    />
                    <ArrowIcon src="assets/upArrowCircle.png" width={45} height={45} onClick={submitQuestion} />
                </InputCover>
            </ContentBox>
        </Container>
    )
}

export default AiAnswer;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 180px 50px 80px;
    display: flex;
    justify-content: center;
`

const ContentBox = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100%;
    position: relative;
`

const InputCover = styled.div`
    width: 100%;
    max-width: 1000px;
    position: absolute;
    bottom: 0;
    left: 0;
    border: 3px solid #5A90F8;
    background-color: #FFFFFF;
    border-radius: 40px;
    padding: 15px 28px;
    display: flex;
    gap: 15px;
    justify-content: space-between;
`

const ProfileImage = styled.img`
    border-radius: 150px;
    border: 1px solid #5A90F8;
    object-fit: cover;
    object-position: center center;
`

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 24px;
`

const ArrowIcon = styled.img`
    border-radius: 150px;
    object-fit: cover;
    object-position: center center;
    cursor: pointer;
`

const AnswerBox = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    padding-bottom: 200px;
    gap: 60px
`

const MyAnswerCover = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const MyAnswerBlock = styled.p`
    width: fit-content;
    height: fit-content;
    min-width: 130px;
    min-height: 50px;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5A90F8;
    color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid transparent;
`

const AiAnswerCover = styled.div`
    display: flex;
    gap: 28px
`

const AiAnswerBlock = styled(MyAnswerBlock)`
    border: 2px solid #5A90F8;
    background: #FFFFFF;
    color: #5A90F8;
`