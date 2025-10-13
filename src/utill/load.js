import { getSubject, getQuestionsBySubject } from './api';
import { formatRelativeTime } from './time';

// 내부 헬퍼: 단일 질문을 UI에서 쓰는 형태로 매핑
function mapQuestionItem(q, subject) {
  const questionTime = formatRelativeTime(q.createdAt);
  const answerTime = q.answer ? formatRelativeTime(q.answer.createdAt) : null;

  return {
    id: q.id,
    questionProps: {
      id: q.id,
      question: q.content,
      timeAgo: questionTime,
    },
    answerProps: q.answer
      ? {
          answerId: q.answer.id,
          state: q.answer.isRejected ? 'rejected' : 'answered',
          userName: subject?.name,
          userImage: subject?.imageSource,
          timeAgo: answerTime,
          answer: q.answer.content,
        }
      : {
          state: 'pending',
          userName: subject?.name,
          userImage: subject?.imageSource,
          timeAgo: null,
          answer: '',
        },
    reactionProps: {
      questionId: q.id,
      likeNumber: q.like ?? 0,
      deLikeNumber: q.dislike ?? 0,
    },
  };
}

// 내부 헬퍼: 배열 매핑
function mapQuestionsList(list, subject) {
  return list.map((q) => mapQuestionItem(q, subject));
}

// 내부 헬퍼: 페이징 메타 추출
function extractPageMeta(pageLike, fallbackLength) {
  const next = pageLike && typeof pageLike === 'object' ? pageLike.next ?? null : null;
  const total =
    pageLike && typeof pageLike === 'object' && typeof pageLike.count === 'number'
      ? pageLike.count
      : fallbackLength;
  return { next, total };
}

export async function loadQuestionsBySubject(subjectId) {
  if (!subjectId) return { subject: null, questions: [] };

  const [s, q] = await Promise.all([
    getSubject(subjectId),
    getQuestionsBySubject(subjectId),
  ]);

  const list = Array.isArray(q?.results)
    ? q.results
    : Array.isArray(q)
      ? q
      : [];

  const mappedQuestions = mapQuestionsList(list, s);
  const { next, total } = extractPageMeta(q, mappedQuestions.length);
  return { subject: s, questions: mappedQuestions, next, total };
}

// 다음 페이지 URL을 받아 이어서 질문을 로드하는 재사용 함수
// subject: { name, imageSource } 형태를 요구 (loadQuestionsBySubject의 subject를 그대로 전달 가능)
export async function loadMoreQuestionsByUrl(nextUrl, subject) {
  if (!nextUrl) return { questions: [], next: null, total: 0 };
  const res = await fetch(nextUrl); // getQuestionsBySubject와 동일한 형식의 응답
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();

  const list = Array.isArray(data?.results) ? data.results : [];
  const mapped = mapQuestionsList(list, subject);
  const { next, total } = extractPageMeta(data, mapped.length);
  return { questions: mapped, next, total };
}
