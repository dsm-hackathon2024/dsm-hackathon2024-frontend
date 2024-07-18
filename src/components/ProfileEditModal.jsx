import { useEffect, useState } from "react"
import styled from "styled-components"
import { toast } from "../utils/toast/toast"
import { getCookie } from "../utils/cookie"
import { putProfile, putProfileImage } from "../api"
import { useNavigate } from "react-router-dom"

export const ProfileEditModal = ({ setIsOpenModal, userData }) => {
    const navigate = useNavigate()
    const [nickname, setNickname] = useState('')
    const [profileData, setProfileData] = useState(null)
    const [newProfile, setNewProfile] = useState('')

    const uploadFile = (e) => {
        const selectedFile = e.target.files[0]

        if (selectedFile !== null) {
            if (selectedFile?.name.match(/^.*\.(jpg|jpeg|png|heic|webp)$/)) {
                setProfileData(selectedFile)
                setNewProfile(URL.createObjectURL(selectedFile))
            }
        }
    }

    const submitUpload = async () => {
        const token = getCookie('access_token')
        if (!token) {
            toast.error('token이 필요합니다!')
            return;
        }

        if (profileData) {
            const imageToastId = toast.loading('이미지 업로드 중...')
            await putProfileImage(token, profileData).then(() => {
                toast.success('이미지 업로드에 성공했습니다!', imageToastId)
            }).catch(() => {
                toast.error('이미지 업로드 중 문제가 발생했습니다!', imageToastId)
                return
            })
        }

        if (nickname.length >= 2 && nickname.length <= 20) {
            const nameToastId = toast.loading('닉네임 변경 중...')
            await putProfile(token, nickname).then(() => {
                toast.success('닉네임 변경을 성공했습니다!', nameToastId)
            }).catch(() => {
                toast.error('닉네임 변경 중 문제가 발생했습니다!', nameToastId)
                return
            })
        }

        toast.success('모든 병경 사항이 완료되었습니다.')
        navigate('/')
    }

    useEffect(() => {
        setNickname(userData?.nickId || '')
    }, [userData])

    return (
        <Container onClick={() => setIsOpenModal(false)}>
            <ContentCover onClick={(e) => {
                e.stopPropagation()
                // e.preventDefault()
            }}>
                <ContentBox>
                    <ProfileCover htmlFor="profileImage">
                        <ProfileImage src={newProfile || userData?.profile || '../assets/profile.png'} width={150} height={150} />
                        <PlusIcon src='../assets/plus.png' width={15} height={15} />
                        <ProfileInput type='file' id="profileImage" onChange={uploadFile} />
                    </ProfileCover>
                    <InputCover>
                        <InputLabel htmlFor="profileNick">변경할 닉네임</InputLabel>
                        <Input
                            id="profileNick"
                            placeholder="변경할 닉네임을 입력해주세요"
                            onChange={(e) => setNickname(e.currentTarget.value)}
                            value={nickname}
                        />
                    </InputCover>
                    <ButtonCover>
                        <FinishButton onClick={submitUpload}>완료</FinishButton>
                        <CancelButton onClick={() => setIsOpenModal(false)}>취소</CancelButton>
                    </ButtonCover>
                </ContentBox>
            </ContentCover>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    min-width: fit-content;
    min-height: fit-content;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`

const ContentCover = styled.div`
    width: 100%;
    min-width: 300px;
    max-width: 550px;
    padding: 90px 50px;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 20px;
`

const ContentBox = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`

const InputCover = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    &:focus-within label {
        color: #5A90F8;
    }
`

const ProfileCover = styled.label`
    position: relative;
`

const ProfileInput = styled.input`
    display: none;
`

const ProfileImage = styled.img`
    border-radius: 150px;
    border: 1px solid #5A90F8;
    object-fit: cover;
    object-position: center center;
    cursor: pointer;
`

const PlusIcon = styled(ProfileImage)`
    position: absolute;
    top: 18px;
    right: 14px;
`

const InputLabel = styled.label`
    font-weight: 500;
    font-size: 16px;
    color: currentColor;
`

const Input = styled.input`
    width: 200px;
    outline: none;
    border: none;
    border-bottom: 2px solid black;
    padding: 2px 5px;
    font-weight: 400;
    font-size: 14px;
    
    &:focus {
        border-bottom: 1px solid #5A90F8;
    }

    &::placeholder {
        color: #888888
    }
`

const ButtonCover = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 30px;
`

const FinishButton = styled.div`
    width: 150px;
    height: 50px;
    background-color: #5A90F8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 25px;
    border-radius: 20px;
    cursor: pointer;
`

const CancelButton = styled(FinishButton)`
    background-color: #FFFFFF;
    color: #5A90F8;
    border: 2px solid #5A90F8;
`