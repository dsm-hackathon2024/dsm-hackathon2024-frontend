import styled from "styled-components"

export const Button = ({ children }) => {
    return <Continer>{children}</Continer>
}

const Continer = styled.button`
    width: 100px;
    height: 20px;
    background: #000000;
    border-radius: 10px;
    color: white;
`