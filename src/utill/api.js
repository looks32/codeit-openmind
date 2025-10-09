const BASE_URL = 'https://openmind-api.vercel.app/19-9/';

/********* ANSWERS *********/

// GET /{team}/answers/{id}/
export async function getAnswer(answerId) {
  const res = await fetch(`${BASE_URL}answers/${answerId}/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// PUT /{team}/answers/{id}/

// PATCH /{team}/answers/{id}/
export async function patchAnswer(answerId, content, isRejected = false) {
  const res = await fetch(`${BASE_URL}answers/${answerId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ content, isRejected }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// DELETE /{team}/answers/{id}/

/********* QUESTIONS *********/

// GET /{team}/questions/{id}/
export async function getQuestion(questionId) {
  const res = await fetch(`${BASE_URL}questions/${questionId}/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// DELETE /{team}/questions/{id}/
export async function deleteQuestion(questionId) {
  const res = await fetch(`${BASE_URL}questions/${questionId}/`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return true;
}

// POST /{team}/questions/{id}/reaction/
export async function postReaction(questionId, type) {
  const res = await fetch(`${BASE_URL}questions/${questionId}/reaction/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ type }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// POST /{team}/questions/{question_id}/answers/
export async function postAnswer(questionId, content, isRejected = false) {
  const res = await fetch(`${BASE_URL}questions/${questionId}/answers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ content, isRejected }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

/********* SUBJECTS *********/

// GET /{team}/subjects/
export async function getSubjects() {
  const res = await fetch(`${BASE_URL}subjects/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// POST /{team}/subjects/

// GET /{team}/subjects/{id}/
export async function getSubject(subjectId) {
  const res = await fetch(`${BASE_URL}subjects/${subjectId}/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// DELETE /{team}/subjects/{id}/

// GET /{team}/subjects/{subject_id}/questions/
export async function getQuestionsBySubject(subjectId) {
  const res = await fetch(`${BASE_URL}subjects/${subjectId}/questions/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// POST /{team}/subjects/{subject_id}/questions/
export async function postQuestion(subjectId, content) {
  const res = await fetch(`${BASE_URL}subjects/${subjectId}/questions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${text}`);
  }
  return res.json();
}

// Answer 페이지 '전체 삭제하기' 기능
export async function deleteQuestionsBySubject(subjectId) {
  const res = await getQuestionsBySubject(subjectId);
  const list = Array.isArray(res?.results) ? res.results : [];
  await Promise.all(list.map((el) => deleteQuestion(el.id)));
  return true;
}
