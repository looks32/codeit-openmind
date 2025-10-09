import styled from 'styled-components';
import { useState, useEffect } from 'react';

import prev from '../assets/ico_pagenation_prev.png';
import next from '../assets/ico_pagenation_next.png';

// api 흉내
// const allItems = Array.from({ length: 50 }, (_, idx) => `Item ${idx + 1}`);

// 스타일
const ArrowImg = styled.img`
  width: 10px;
`;
const ButtonWrap = styled.div`
  text-align: center;
`;

const PageNationBtn = styled.button`
  border: none;
  width: 40px;
  color: var(--Gray40);
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;

  &.active {
    color: var(--Brown40);
  }
`;

function Pagination() {
  // 한 페이지당 10개
  // const itemsPerPage = 10;
  // const totalItems = allItems.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState([]);

  // api 흉내
  // useEffect(() => {
  //   const fetchData = () => {
  //     const start = (currentPage - 1) * itemsPerPage;
  //     const end = start + itemsPerPage;
  //     const pageData = allItems.slice(start, end);
  //     setData(pageData);
  //   };

  // fetchData();
  // }, [currentPage]);

  // const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  // const handleBackClick = () => {
  //   setCurrentPage((page) => Math.max(page - 1, 1));
  // };
  // const handleNextClick = () => {
  //   setCurrentPage((page) => Math.min(page + 1, totalPages));
  // };

  return (
    <div>
      {/* 현재 페이지  */}
      {/* <h2>Current Page: {currentPage}</h2> */}
      {/* 데이터 받기 */}
      {/* <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}
      <ButtonWrap>
        {/* <PageNationBtn onClick={handleBackClick}> */}
        <PageNationBtn>
          <ArrowImg src={prev} />
        </PageNationBtn>

        {/* {pageNumbers.map((pageNum) => ( */}
        {[1, 2, 3, 4, 5].map((pageNum) => (
          <PageNationBtn
            key={pageNum}
            // onClick={() => setCurrentPage(pageNum)}
            // active={currentPage === pageNum}
          >
            {pageNum}
          </PageNationBtn>
        ))}

        {/* <PageNationBtn onClick={handleNextClick}> */}
        <PageNationBtn>
          <ArrowImg src={next} />
        </PageNationBtn>
      </ButtonWrap>
    </div>
  );
}

export default Pagination;
