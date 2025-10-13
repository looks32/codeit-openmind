// 상대시간 포맷터: ISO 시간을 받아 '방금/분/시간/일/주/개월/년 전'으로 변환
export function formatRelativeTime(isoString) {
  if (!isoString) return '방금';
  const then = new Date(isoString).getTime();
  if (Number.isNaN(then)) return '방금';
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return '방금';
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
}
