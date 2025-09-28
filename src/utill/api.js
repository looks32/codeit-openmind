import axios from 'axios';

export const BASE_URL = 'https://openmind-api.vercel.app/19-9/';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

function extractResults(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
}

// 이름으로 기존 피드 검색 (대소문자 무시 정확 일치)
export async function findSubjectByName(name) {
  // 1차: name 파라미터 시도
  try {
    const res = await client.get('subjects/', { params: { name } });
    const list = extractResults(res.data).filter(
      (s) => s?.name?.toLowerCase() === name.toLowerCase()
    );
    if (list.length > 0) return list[0];
  } catch (_) {}

  // 2차: keyword 파라미터 시도 (서버에 따라 검색 파라미터가 다를 수 있음)
  try {
    const res = await client.get('subjects/', { params: { keyword: name } });
    const list = extractResults(res.data).filter(
      (s) => s?.name?.toLowerCase() === name.toLowerCase()
    );
    if (list.length > 0) return list[0];
  } catch (_) {}

  return null;
}

// 피드(Subject) 생성
export async function createSubject(name) {
  const res = await client.post('subjects/', { name });
  return res.data; // { id, name, ... }
}

// 피드(Subject) 단건 조회
export async function getSubject(id) {
  const res = await client.get(`subjects/${id}/`);
  return res.data; // { id, name, ... }
}
