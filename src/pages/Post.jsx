import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { loadQuestionsBySubject as loadData } from "../utill/load";
import { postQuestion } from "../utill/api";
import styled from "styled-components";
import CircleImage from "../components/Profile";
import InputTextArea from "../components/InputTextArea";
import ButtonBox from "../components/ButtonBox";
import Button from "../components/Button";

function Post() {
  return <div>post</div>;
}

export default Post;

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  `;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
  position: relative;

  h2 {
  font-size: 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -4px;
  right: 0;
  background: none;
  border: none;
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 14px;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;