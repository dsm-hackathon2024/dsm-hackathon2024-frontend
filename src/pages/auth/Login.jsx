import styled from "styled-components"
import { Text } from "../../components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "../../utils/toast/toast"
import { getCookie, setCookie } from "../../utils/cookie"
import { postSignin } from "../../api"

export const Login = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const submitSignin = async () => {
        const toastId = toast.loading('로그인 중입니다...')
        if (id.length < 6 || id.length > 12) {
            toast.error('아이디는 6에서 12의 길이여야합니다.', toastId)
        }
        else if (password.length < 6 || password.length > 12) {
            toast.error('비밀번호는 8에서 20의 길이여야합니다.', toastId)
        } else {
            await postSignin({
                id,
                password
            }).then((res) => {
                toast.success('로그인에 성공했습니다!', toastId)
                setCookie('access_token', res.data.accessToken)
                navigate('/')
            }).catch(() => {
                toast.error('로그인에 실패했습니다...', toastId)
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
            <Image src="assets/authCircle.png" />
            <LoginBox>
                <Text type='titleLarge'>로그인</Text>
                <Text type='subTitleLarge'>가입하신 아이디로 로그인하세요.</Text>
                <InputContianer>
                    <InputPadding>
                        <InputBox placeholder="아이디를 입력하세요." onChange={e => setId(e.currentTarget.value)} />
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
                </InputContianer>
                <ButtonContainer>
                    <Button onClick={submitSignin}>로그인</Button>
                    <ButtonDiv>
                        <ButtonDivLine />
                        <Text type='subTitleLarge' color='#B6B4B4'>또는</Text>
                        <ButtonDivLine />
                    </ButtonDiv>
                    <Button onClick={() => navigate('/signup')}>회원가입</Button>
                </ButtonContainer>
            </LoginBox>
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