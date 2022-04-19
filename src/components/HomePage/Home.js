import { Col, Divider } from 'antd';
import Search from 'antd/lib/input/Search';
import LayoutTop from './LayoutTop';
import LayoutBottom from './LayoutBottom';
import styles from '../../styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';
import TodaysWord from './TodaysWord';
import MyTest from './MyTest';
import Encyclopedia from './Encyclopedia';
import NextButton from './NextButton';
import Header from '../NavBar/Header';
import Side from '../NavBar/Side/Side';
import { useSelector } from 'react-redux';

export default function Home({ search, login }) {
  const token = useSelector((state) => state.user.auth.token);
  const searchRef = useRef(null);

  // 슬라이드 개수(0부터 시작)
  const totalSlides = 1;
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSearch = () => {
    const query = searchRef.current.state.value;
    if (query) {
      search(query);
    } else {
      alert('검색어를 입력해 주세요.');
    }
  };

  const prev = () => {
    // 현재 1번 슬라이드인데 이전 버튼 누를경우
    if (currentSlide === 0) {
      // 마지막 슬라이드로 이동
      setCurrentSlide(totalSlides);
    } else {
      // 아니면 이전 슬라이드로 이동
      setCurrentSlide(currentSlide - 1);
    }
  };

  const next = () => {
    // 더 넘어갈 슬라이드가 없으면
    if (currentSlide >= totalSlides) {
      // 1번 슬라이드로 이동
      setCurrentSlide(0);
    } else {
      // 아니면 다음 슬라이드로 이동
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    // css overflow = hidden으로 영역 밖의 슬라이드 숨김
    // 슬라이드 이동하는 애니메이션 적용
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <div>
      <Header />
      <LayoutTop>
        <div className={styles.search_area}>
          <div className={styles.search_title}>[한국어 - 인도네시아어 사전]</div>
          <div className={styles.search_subtitle}>
            | Kamus Bahasa Korea - Bahasa Indonesia |
          </div>
          <Search
            size="large"
            allowClear
            enterButton
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
          <MyTest login={login} />
          <Divider className={styles.divider} />
          <div>
            <div className={styles.pedia_area}>
              <div ref={slideRef} className={styles.pedia_container}>
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
            </div>
            <NextButton prev={prev} next={next} />
          </div>
        </Col>
        <div className={styles.side_divider} />
        <Col span={6}>
          <Side />
        </Col>
        <Divider style={{ backgroundColor: 'grey' }} />
        <div>Footer</div>
      </LayoutBottom>
    </div>
  );
}
