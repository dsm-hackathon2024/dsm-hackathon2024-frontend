import styled from "styled-components"

export const Text = ({ type, children, color, style }) => {
    const TextStyle = TextList[type || 'subTitleMiddle']
    return <TextBase style={{ ...TextStyle, color, ...style }}>{children}</TextBase>
}

const TextBase = styled.span`
    color: black;
    font-family: 'Noto Sans KR';
`

export const TextList = {
    titleLarge: {
        fontWeight: 'bold',
        fontSize: '30px'
    },
    titleMiddle: {
        fontWeight: 'bold',
        fontSize: '20px'
    },
    subTitleLarge: {
        fontSize: '20px'
    },
    subTitleMiddle: {
        fontSize: '15px'
    }
}