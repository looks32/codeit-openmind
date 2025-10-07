import { useState, useEffect } from "react";
import styled ,{css} from "styled-components";
import right from "./scg/right.png"
import left from "./scg/left.png"

// api 흉내
const allItems = Array.from({ length: 50 }, (_, idx) => `Item ${idx + 1}`);

function Pagination() {
  const itemsPerPage = 10; // 한 페이지당 10개
  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  // api 흉내
  useEffect(() => {
    const fetchData = () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageData = allItems.slice(start, end);
      setData(pageData);
    };

    fetchData();
  }, [currentPage]);

  
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);
  
  const handleBackClick = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }
  const handleNextClick = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }
  
  return (
    <div>
      {/* 현재 페이지  */}
      <h2>Current Page: {currentPage}</h2>
      {/* 데이터 받기 */}
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
        <ButtonWrap>
          <PageNationBtn
            onClick={handleBackClick}
            >
            <ArrowImg src={left}/>
          </PageNationBtn>

          {pageNumbers.map(pageNum => (
            <PageNationBtn
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            active={currentPage === pageNum}
            >
              {pageNum}
            </PageNationBtn>
          ))}

          <PageNationBtn
            onClick={handleNextClick}
            >
            <ArrowImg src={right}/>
          </PageNationBtn>
        </ButtonWrap>
    </div>
  );
}

export default Pagination;

// 스타일
const ArrowImg = styled.img`
  width:10px;
  height:10px;
`
const ButtonWrap = styled.div`
  height:40px;
`
const PageNationBtn = styled.button`

  border:none;
  width:40px;
  color:var(--Gray40);
  font-size:20px;
  line-height:25px;
  background-color:var(--Gray10);
  ${({ active }) =>
    active &&
    css`
      color: var(--Brown40);
      transform: scale(1.1);
    `
  }
`