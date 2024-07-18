import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getCookie } from "../utils/cookie"
import { Text } from "./Text"
import { getMyData } from "../api"

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [hasToken, setHasToken] = useState(true)
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        const token = getCookie('access_token')
        if (token) {
            await getMyData(token).then(res => {
                setUserData(res.data)
            })
        }
        setHasToken(!!token)
    }

    useEffect(() => {
        getUserData()
    }, [location])

    return (
        <>
            <Container>
                <GapCursor onClick={() => navigate('/')}>
                    <img src="../assets/logo.png" height={52} />
                    <img src="../assets/logoText.png" />
                </GapCursor>
                {
                    hasToken ?
                        <GapCursorProfile onClick={() => navigate('/mypage')}>
                            <Text type='subTitleLarge'>{userData.userId}</Text>
                            <ProfileImage src={userData.profile || "../assets/profile.png"} alt="profile" style={{ objectFit: 'cover' }} />
                        </GapCursorProfile>
                        :
                        <GapBox>
                            <LoginButton onClick={() => navigate('/login')}>Sign In</LoginButton>
                            <SignUpButton onClick={() => navigate('/signup')}>Sign Up</SignUpButton>
                        </GapBox>
                }
            </Container>
            <Outlet />
        </>
    )
}

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #000000;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 0 26px;
`

const GapBox = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`

const GapCursor = styled(GapBox)`
    cursor: pointer;
`

const GapCursorProfile = styled(GapCursor)`
    gap: 12px;
`

const LoginButton = styled.button`
    width: 115px;
    height: 45px;
    border-radius: 5px;
    border: 3px solid #5A90F8;
    color: #5A90F8;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background-color: transparent;
    cursor: pointer;
`

const SignUpButton = styled(LoginButton)`
    background-color: #5A90F8;
    color: #FFFFFF;
`

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #5A90F8;
    object-fit: cover;
    object-position: center center;
`