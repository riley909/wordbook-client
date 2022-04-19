import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/NavBar/Side.module.css';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import { IoCloseOutline } from 'react-icons/io5';

export default function History({ token }) {
  const location = useLocation();

  // 최근 검색어를 관리할 useState
  const [words, setWords] = useState([]);
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const query = queryData.q;
  const history = useRef([]);
  const navigate = useNavigate();

  // 로컬스토리지에서 히스토리 불러오기
  useEffect(() => {
    // window === 브라우저가 모두 렌더링된 상태에서 실행
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('history');
      const parsed = JSON.parse(result);

      // 히스토리 10개 저장
      history.current = parsed.splice(0, 10);
      setWords([...history.current]);
    }
  }, []);

  // 로컬스토리지 값 업데이트
  useEffect(() => {
    // 중복된 값은 저장하지 않음
    if (query && history.current.indexOf(query) === -1) {
      history.current.unshift(query);
      localStorage.setItem('history', JSON.stringify(history.current));
    }
  }, [query]);

  const onDeleteClick = (id) => {
    history.current = history.current.filter((el, idx) => idx !== id);
    localStorage.setItem('history', JSON.stringify(history.current));
    setWords([...history.current]);
  };

  const onWordClick = (word) => {
    navigate(`/dict/search?page=1&q=${word}`);
  };

  const toLogin = () => navigate('/login');
  const toWordBook = () => {
    window.open('/wordbook', '단어장', 'width=450, height=700, scrollbars=yes');
  };

  return (
    <div>
      <div className={styles.history_title}>내가 찾은 단어</div>
      <div className={styles.history_container}>
        {words.map((val, idx) => (
          <div key={idx + 1} className={styles.history_word_area}>
            <div onClick={() => onWordClick(val)}>{val}</div>
            <div onClick={() => onDeleteClick(idx)}>
              <IoCloseOutline />
            </div>
          </div>
        ))}
      </div>
      {token ? (
        <button onClick={toWordBook} className={styles.button}>
          내 단어장 가기
        </button>
      ) : (
        <button onClick={toLogin} className={styles.button}>
          내 단어장 가기
        </button>
      )}
    </div>
  );
}
