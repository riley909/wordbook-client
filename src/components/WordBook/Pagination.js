import React from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/FolderList.module.css';

export default function Pagination({ queryData, total, showingNum, setShowingNum }) {
  const navigate = useNavigate();
  const id = queryData.id;
  const name = queryData.name;
  const sort = queryData.sort;
  const limit = Number(queryData.limit);
  const currentPage = Number(queryData.page);

  // 만들어야 할 페이지블록 수
  const pageNumbers = Math.ceil(total / limit);
  // 보여질 블록 수
  const numLimit = 5;

  const prevPage = () => {
    navigate(
      `/wordbook/folder?id=${id}&name=${name}&sort=${sort}&limit=${limit}&page=${
        currentPage - 1
      }`
    );

    if (currentPage === showingNum.start) {
      setShowingNum((prev) => {
        return {
          start: prev.start - numLimit,
          end: prev.end - numLimit,
        };
      });
    }
  };
  const nextPage = () => {
    navigate(
      `/wordbook/folder?id=${id}&name=${name}&sort=${sort}&limit=${limit}&page=${
        currentPage + 1
      }`
    );

    if (currentPage === showingNum.end) {
      setShowingNum((prev) => {
        return {
          start: prev.start + numLimit,
          end: prev.end + numLimit,
        };
      });
    }
  };

  return (
    <div>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={styles.pagination_button}>
        &lt;
      </button>
      {Array(pageNumbers)
        .fill()
        .map((_, idx) => (
          <>
            {idx + 1 < showingNum.end + 1 && idx + 1 >= showingNum.start && (
              <button
                className={
                  currentPage === idx + 1
                    ? styles.pagination_button_current
                    : styles.pagination_button
                }
                key={idx + 1}
                onClick={() =>
                  navigate(
                    `/wordbook/folder?id=${id}&name=${name}&sort=${sort}&limit=${limit}&page=${
                      idx + 1
                    }`
                  )
                }>
                {idx + 1}
              </button>
            )}
          </>
        ))}
      <button
        onClick={nextPage}
        disabled={currentPage === pageNumbers}
        className={styles.pagination_button}>
        &gt;
      </button>
    </div>
  );
}
