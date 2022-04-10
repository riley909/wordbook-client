import { Col, DatePicker, Divider, Tooltip } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Layout from '../Layout/Layout';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import Header from '../NavBar/Header';
import SideWithOutPosts from '../NavBar/Side/SideWithOutPosts';
import StudyLogListItem from './StudyLogListItem';
import styles from '../../styles/StudyLogList.module.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';

export default function StudyLog({ getStudyLogs, createStudyLog, deleteStudyLog }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const loading = useSelector((state) => state.studylog.loading);
  const studyLogList = useSelector(
    (state) => state.studylog.data && state.studylog.data.data
  );
  const total = useSelector((state) => studyLogList && state.studylog.data.total);
  const [list, setList] = useState(null);
  const [counter, setCounter] = useState(null);
  const [page, setPage] = useState(1);
  const [dateText, setDateText] = useState('');
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState();
  const [textLength, setTextLength] = useState(0);
  const [textValue, setTextValue] = useState();
  const target = useRef();
  const searchRef = useRef();
  const textRef = useRef();
  const MAX_LENGTH = 1000;

  const fetchData = (search, date, limit, offset) => {
    getStudyLogs(search, date, limit, offset);
    setPage(offset + 1);
  };

  useEffect(() => {
    if (!token) navigate('/');
    // 처음 보여줄 데이터 가져옴(list !== null 이 된다)
    fetchData('', '', 10, page);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // 관찰 대상의 교차 상태(boolean)를 set 한다
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(target.current);
  }, []);

  // studyLogList가 갱신될때마다 setList 함
  useEffect(() => {
    // observe 하는 타겟이 visible 상태일 때(스크롤 내림)
    if (isVisible) {
      setList((prev) => {
        if (!prev) return studyLogList;
        else return prev.concat(studyLogList);
      });
    } else {
      // 스크롤중이 아닐 때
      setList(studyLogList);
    }

    setCounter(total);
  }, [studyLogList]);

  // 관찰 대상과 교차상태(true)이고 데이터가 존재하면 다음 데이터를 가져온다
  useEffect(() => {
    if (isVisible && list) {
      // 전체 글을 다 불러오면 멈춘다
      if (list.length !== total) {
        fetchData(query, dateText, 10, page);
      }
    }
  }, [isVisible]);

  const onChange = (date, dateString) => {
    setDateText(dateString);
  };

  const onSearch = (value) => {
    setList(null);
    setPage(1);
    setQuery(value);
    if (dateText || value) {
      fetchData(value, dateText, 10, 1);
    } else {
      alert('검색 조건을 입력해 주세요.');
    }
  };

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = '34px';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  const handleTextLength = (e) => {
    const value = e.target.value;
    setTextValue(value);
    setTextLength(value.length);

    if (value.length > MAX_LENGTH) {
      setTextValue(value.slice(0, MAX_LENGTH));
      setTextLength(MAX_LENGTH);
    }
  };

  const handleCreate = async () => {
    const body = {
      content: textValue,
    };
    setPage(1);
    setTextValue('');
    setTextLength(0);
    createStudyLog(body);
  };

  return (
    <div>
      <div className={styles.shadow}>
        <Header />
      </div>
      <Layout>
        <Col span={16}>
          <div className={styles.container}>
            <div className={styles.input_area}>
              <textarea
                placeholder="오늘의 공부 기록을 남겨보세요."
                ref={textRef}
                onInput={handleResizeHeight}
                onChange={handleTextLength}
                value={textValue}
              />
              <div className={styles.input_button_area}>
                <div>
                  {textLength} / {MAX_LENGTH}
                </div>
                <button onClick={handleCreate}>작성하기</button>
              </div>
              <Divider className={styles.divider} />
            </div>

            <div>
              <div className={styles.search_area}>
                <Tooltip title="날짜 선택 또는 검색어 입력 후 검색 버튼을 누르면 검색할 수 있습니다.">
                  <span className={styles.search_tooltip_icon}>
                    <QuestionCircleOutlined />
                  </span>
                </Tooltip>
                <div className={styles.date_picker}>
                  <DatePicker size="large" onChange={onChange} />
                </div>
                <div className={styles.search_input}>
                  <Search
                    size="large"
                    allowClear
                    enterButton
                    onSearch={onSearch}
                    ref={searchRef}
                  />
                </div>
              </div>
            </div>

            <div>
              {list && (
                <>
                  <div className={styles.list_counter_area}>
                    <div className={styles.list_counter}>총 {counter}개의 로그</div>
                  </div>
                  <div>
                    <StudyLogListItem list={list} />
                  </div>
                </>
              )}
            </div>
            <div ref={target}>{loading || !list ? <LoadingWithOutHeader /> : null}</div>
          </div>
        </Col>
        <Col span={6}>
          <SideWithOutPosts />
        </Col>
      </Layout>
      <div>Footer</div>
    </div>
  );
}
