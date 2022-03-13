import React from 'react';
import { useNavigate } from 'react-router';

export default function Pagination({ query, total, limit }) {
  const navigate = useNavigate();
  // 만들어야 할 페이지블록 수
  const pageNumbers = Math.ceil(total / limit);

  return (
    <div>
      {Array(pageNumbers)
        .fill()
        .map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => navigate(`/dict/search?page=${idx + 1}&q=${query}`)}>
            {idx + 1}
          </button>
        ))}
    </div>
  );
}
