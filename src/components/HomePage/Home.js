import { Button, Col, Divider, PageHeader } from 'antd';
import Search from 'antd/lib/input/Search';
import { useSelector } from 'react-redux';
import LayoutTop from './LayoutTop';
import LayoutBottom from './LayoutBottom';
import styles from '../../styles/Home.module.css';
import { FaBookMedical } from 'react-icons/fa';
import { getQuery } from '../../utils/api';
import { useRef } from 'react';
import TodaysWord from './TodaysWord';
import MyQuiz from './MyQuiz';
import Encyclopedia from './Encyclopedia';
import NextButton from './NextButton';

export default function Home({ search, login, signup, logout, mybook }) {
  const token = useSelector((state) => state.user.auth.token);
  const searchRef = useRef(null);

  const onSearch = () => {
    const q = searchRef.current.state.value;
    if (q) {
      const queries = getQuery(q);
      search(queries);
    } else {
      alert('검색어를 입력해 주세요.');
    }
  };

  const prev = () => {};
  const next = () => {};

  return (
    <div>
      {!token ? (
        <PageHeader
          title={
            <div className={styles.header_title}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="1" onClick={login} className={styles.button}>
              로그인
            </Button>,
            <Button key="2" onClick={signup} className={styles.button}>
              회원가입
            </Button>,
          ]}
        />
      ) : (
        <PageHeader
          title={
            <div className={styles.header_title}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="1" onClick={mybook} className={styles.button}>
              마이북
            </Button>,
            <Button key="2" onClick={logout} className={styles.button}>
              로그아웃
            </Button>,
          ]}
        />
      )}
      <LayoutTop>
        <div className={styles.search_area}>
          <div className={styles.search_title}>[한국어 - 인도네시아어 사전]</div>
          <div className={styles.search_subtitle}>
            | Kamus Bahasa Korea - Bahasa Indonesia |
          </div>
          <Search
            allowClear
            onPressEnter
            onSearch={onSearch}
            className={styles.search_input}
            ref={searchRef}
          />
        </div>
        <div></div>
      </LayoutTop>
      <LayoutBottom>
        <Col span={16}>
          <TodaysWord />
          <MyQuiz />
          <Divider className={styles.divider} />
          <div>
            <div className={styles.pedia_area}>
              <Encyclopedia
                url1="https://terms.naver.com/entry.naver?docId=3595492&cid=58250&categoryId=58250"
                title1="인도네시아어의 갈래와 사용현황"
                url2="https://terms.naver.com/entry.naver?docId=3595494&categoryId=58250&cid=58250"
                title2="인도네시아어의 기본 문법"
                url3="https://terms.naver.com/entry.naver?docId=3595493&categoryId=58250&cid=58250"
                title3="인도네시아어의 문자와 발음"
                url4="https://terms.naver.com/entry.naver?docId=3595495&categoryId=58250&cid=58250"
                title4="인도네시아어의 인사말과 기본표현"
              />
              <Encyclopedia
                url1="https://terms.naver.com/entry.naver?docId=3595496&categoryId=58250&cid=58250"
                title1="인도네시아어의 언어적 특징"
                url2="https://terms.naver.com/entry.naver?docId=3595497&categoryId=58250&cid=58250"
                title2="인도네시아어의 발달과 역사"
                url3="https://terms.naver.com/entry.naver?docId=3595520&categoryId=58250&cid=58250"
                title3="인도네시아어의 숫자와 날짜"
                url4={null}
                title4={null}
              />
            </div>
            <NextButton prev={prev} next={next} />
          </div>
        </Col>
        <div className={styles.side_divider} />
        <Col span={6}>
          <Divider className={styles.divider} />
          Study Log 최근 글 5개
          <Divider className={styles.divider} />
          최근 검색어 5개
        </Col>
        <Divider style={{ backgroundColor: 'grey' }} />
        <div>Footer</div>
      </LayoutBottom>
    </div>
  );
}
