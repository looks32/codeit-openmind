import styled from 'styled-components';
import prev from '../assets/ico_pagenation_prev.png';
import next from '../assets/ico_pagenation_next.png';

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  font-size: 20px;
  color: ${({ $active }) => ($active ? 'var(--Brown40)' : 'var(--Gray40)')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: none;
  background-color: transparent;
  transition: all 0.2s;

  &:hover {
    color: var(--Brown40);
  }
`;

const ArrowImg = styled.img`
  width: 10px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage < maxPagesToShow - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowImg src={prev} />
      </PageButton>

      {pages.map((page, idx) => (
        <PageButton
          key={idx}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowImg src={next} />
      </PageButton>
    </>
  );
};

export default Pagination;
