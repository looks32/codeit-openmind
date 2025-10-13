import styled from "styled-components";
import CircleImage from "./Profile";
import { InsertButton } from './Button'
import closeImg from "../assets/Close.png";
import { useState } from "react";

const ModalWrap = styled.div`
    position: fixed; 
    background-color: rgba(0, 0, 0, 0.5);
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%;
    display: flex;
    z-index:9999;
    justify-content: center; 
    align-items: center;
`

const Question = styled.h1`
    font-weight: 400;
    font-style: Regular;
    font-size: 24px;
    leading-trim: NONE;
    line-height: 30px;
    letter-spacing: 0px;
    margin-bottom:40px;

`

const Wraper = styled.div`
    display:flex;
    align-items: center;
    margin-bottom:12px;

`

const Addressee = styled.span`
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 24px;
letter-spacing: 0px;
`


const Name = styled.span`
font-weight: 400;
font-style: Regular;
font-size: 16px;
leading-trim: NONE;
line-height: 22px;
letter-spacing: 0px;
` 

const Textarea = styled.textarea`
    width: 532px;
    height: 180px;
    padding: 8px;
    box-sizing: border-box;
    text-align: left;
    font-size: 16px;
    resize: none; 
    border: none;
    border-radius: 8px;
    background:  rgba(249, 249, 249, 1);
    margin-bottom:8px;

`

const Popup = styled.div`
    width: 612px;
    height: 454px; 
    background-color: white;
    padding: 40px;
    border-radius:24px;
    position:relative;
`
const CloseBtn = styled.button`
    background: url(${closeImg}) no-repeat center / cover;
    width:28px;
    height:28px;
    border:none;
    cursor:pointer;
    position:absolute;
    top:41px;
    right:40px;
`
const SendBtn = styled(InsertButton)`
    background:  rgba(199, 187, 181, 1);
    box-shadow: none;
    border-radius:8px;
    &:disabled{
        background-color: var(--Brown10);
        // pointer-events: none;
    }

`

function Modal ({ openPop , onClose}) {
    const [content, setContent] = useState("");
    // const [items, setItems] = useState([]); 
    
    const handleChange = (e) => {
        setContent(e.target.value);
    };
    
    const handleAdd = async () => {
        if (!content.trim()) return; 
    };
    if (!openPop) return null;
    return(
        <ModalWrap>
            <Popup>
                <Question>질문을 작성하세요</Question>
                <CloseBtn onClick={onClose} />
                <Wraper>
                    <Addressee>To.</Addressee>
                    <CircleImage src={Image} sizes="28px"/>
                    <Name>아초는 고양이</Name>
                </Wraper>
                <Textarea 
                    placeholder="질문을 입력해주세요" 
                    value={content}
                    onChange={handleChange}
                />
                <SendBtn width="532" height="46" onClick={handleAdd}>질문 보내기</SendBtn>
            </Popup>
        </ModalWrap>
    )

};

export default Modal;