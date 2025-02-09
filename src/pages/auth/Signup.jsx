import styled from "styled-components"
import { Text } from "../../components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "../../utils/toast/toast"
import { postSignup } from "../../api"
import { getCookie } from "../../utils/cookie"

export const Signup = () => {
    const [id, setId] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rePassword, setRePassword] = useState('')
    const [showRePassword, setShowRePassword] = useState(false)
    const navigate = useNavigate()

    const submitSignup = async () => {
        const toastId = toast.loading('회원가입 중입니다...')
        if (id.length < 6 || id.length > 12) {
            toast.error('아이디는 6에서 12의 길이여야합니다.', toastId)
        }
        else if (nickname.length < 2 || nickname.length > 20) {
            toast.error('닉네임은 2에서 20의 길이여야합니다.', toastId)
        }
        else if (password !== rePassword) {
            toast.error('비밀번호를 올바르게 작성했는지 확인해주세요', toastId)
        }
        else if (password.length < 6 || password.length > 12) {
            toast.error('비밀번호는 8에서 20의 길이여야합니다.', toastId)
        } else {
            await postSignup({
                id,
                password,
                username: nickname
            }).then(() => {
                toast.success('회원가입에 성공했습니다!', toastId)
            }).catch(() => {
                toast.error('회원가입에 실패했습니다...', toastId)
            })
        }
    }

    useEffect(() => {
        const token = getCookie('access_token')
        if (token) {
            navigate('/')
        }
    }, [])

    return (
        <Container>
            <LoginBox>
                <Text type='titleLarge'>회원가입</Text>
                <Text type='subTitleLarge'>가입하실 아이디와 비밀번호를 입력하세요</Text>
                <InputContianer>
                    <InputPadding>
                        <InputBox placeholder="아이디를 입력하세요." onChange={e => setId(e.currentTarget.value)} />
                    </InputPadding>
                    <InputDiv />
                    <InputPadding>
                        <InputBox placeholder="닉네임을 입력하세요." onChange={e => setNickname(e.currentTarget.value)} />
                    </InputPadding>
                    <InputDiv />
                    <InputPadding>
                        <InputBox type={showPassword ? 'text' : 'password'} placeholder="비밀번호를 입력하세요." onChange={e => setPassword(e.currentTarget.value)} />
                        {
                            showPassword ?
                                <ImageButton src="assets/eyeOff.png" onClick={() => setShowPassword(false)} />
                                :
                                <ImageButton src="assets/eye.png" onClick={() => setShowPassword(true)} />
                        }
                    </InputPadding>
                    <InputDiv />
                    <InputPadding>
                        <InputBox type={showRePassword ? 'text' : 'password'} placeholder="비밀번호를 다시 입력하세요." onChange={e => setRePassword(e.currentTarget.value)} />
                        {
                            showRePassword ?
                                <ImageButton src="assets/eyeOff.png" onClick={() => setShowRePassword(false)} />
                                :
                                <ImageButton src="assets/eye.png" onClick={() => setShowRePassword(true)} />
                        }
                    </InputPadding>
                </InputContianer>
                <ButtonContainer>
                    <Button onClick={submitSignup}>회원가입</Button>
                    <ButtonDiv>
                        <ButtonDivLine />
                        <Text type='subTitleLarge' color='#B6B4B4'>이미 가입 하셨나요?</Text>
                        <ButtonDivLine />
                    </ButtonDiv>
                    <Button onClick={() => navigate('/login')}>로그인</Button>
                </ButtonContainer>
            </LoginBox>
            <Image src="assets/authCircle.png" />
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 150px;
`

const Image = styled.img`
    width: 700px;
    height: 530px;
`

const ImageButton = styled.img`
    cursor: pointer;
`

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
    gap: 20px;
`

const InputContianer = styled.div`
    width: 100%;
    border: 1px solid rgba(0,0,0,0.6);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    gap: 12px;
`

const InputDiv = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.6);
`

const InputPadding = styled.div`
    padding: 0 25px 0 20px;
    gap: 20px;
    display: flex;
    align-items: center;
`

const InputBox = styled.input`
    color: black;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    height: 40px;
    width: 100%;
    outline: none;
    border: none;
    &::placeholder {
        color: #B6B4B4;
    }
`

const ButtonDiv = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    white-space: nowrap;
`

const ButtonDivLine = styled.div`
    width: 100%;
    max-width: 300px;
    height: 0px;
    border-top: 1px dashed #000000;
`

const Button = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5A90F8;
    border-radius: 20px;
    color: #FFFFFF;
    font-family: 'Noto Sans KR';
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
`

const ButtonContainer = styled.div`
    padding-top: 50px;
    gap: 24px;
    display: flex;
    flex-direction: column;
`