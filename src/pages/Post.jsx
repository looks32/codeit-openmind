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
  const { id: subjectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
      let mounted = true;
      (async () => {
        if (!subjectId) return;
        try {
          setLoading(true);
          setError(null);
          const { subject: s, questions: q } = await loadData(subjectId);
          if (!mounted) return;
          setSubject(s);
          setQuestions(q.map((question) => ({ ...question, hideAnswer: true })));
        } catch (e) {
          if (!mounted) return;
          setError(e);
        } finally {
          if (!mounted) return;
          setLoading(false);
        }
      })();
      return () => {
        mounted = false;
      };
    }, [subjectId]);
  
    if (loading) return <div style={{ padding: 16 }}>로딩 중…</div>;
    if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;
  
  return (
    <>
      <FloatingButton type="insert" onClick={() => setIsModalOpen(true)}>질문 작성하기</FloatingButton>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
              <img src="/question.svg" alt="질문"/>
            <h2>질문을 작성하세요</h2>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              ✕
            </CloseButton>
          </ModalHeader>
          
          <ModalBody>
          <ProfileSection>
            <span>To.</span>
            <CircleImage src={subject?.imageSource} sizes="32px" />
            <UserName>{subject?.name}</UserName>
          </ProfileSection>
          
            <InputTextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력해주세요"
              height="50%"
            />
          
          <ButtonBox
            disabled={sending || !input.trim()}
            onClick={async () => {
              if (sending) return;
              const content = input.trim();
              setSending(true);
              try {
                await postQuestion(subject?.id, content);
              } catch (e) {
                alert(`처리 실패: ${e?.message || ''}`);
              } finally {
                setSending(false);
                setIsModalOpen(false);
                setInput('');
              }
            }}>
            {sending ? '전송 중...' : '질문 보내기'}
          </ButtonBox>
          </ModalBody>
      </Modal>
    </>
  );
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