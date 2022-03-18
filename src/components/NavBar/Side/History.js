import React, { useEffect, useRef } from 'react';
import styles from '../../../styles/NavBar/Side.module.css';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import { FaTimes } from 'react-icons/fa';

export default function History() {
  const location = useLocation();

  // 최근 검색어를 관리할 useState
  // const [history, setHistory] = useState([]);
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const query = queryData.q;
  const history = useRef([]);

  // 로컬스토리지에서 히스토리 불러오기
  useEffect(() => {
    // window === 브라우저가 모두 렌더링된 상태에서 실행
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('history');
      const parsed = JSON.parse(result);

      // 히스토리 10개 저장
      history.current = parsed.slice(0, 9);
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

  return (
    <div>
      <div className={styles.history_title}>내가 찾은 단어</div>
      <div>
        {history.current.map((val) => (
          <div>
            {val}
            <FaTimes />
          </div>
        ))}
      </div>
      <button className={styles.button}>내 단어장 가기</button>
    </div>
  );
}
