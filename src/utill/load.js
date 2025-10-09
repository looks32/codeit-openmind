import { getSubject, getQuestionsBySubject } from './api';
import { formatRelativeTime } from './time';

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

  const mappedQuestions = list.map((q) => {
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
            userName: s?.name,
            userImage: s?.imageSource,
            timeAgo: answerTime,
            answer: q.answer.content,
          }
        : {
            state: 'pending',
            userName: s?.name,
            userImage: s?.imageSource,
            timeAgo: null,
            answer: '',
          },
      reactionProps: {
        questionId: q.id,
        likeNumber: q.like ?? 0,
        deLikeNumber: q.dislike ?? 0,
      },
    };
  });

  return { subject: s, questions: mappedQuestions };
}
