import { Col, DatePicker, Divider, Tooltip, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Layout from '../Layout/Layout';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import Header from '../NavBar/Header';
import SideWithOutPosts from '../NavBar/Side/SideWithOutPosts';
import StudyLogListItem from './StudyLogListItem';
import styles from '../../styles/StudyLogList.module.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { checkCookieToken } from '../../utils/checkCookieToken';

export default function StudyLog({
  getStudyLogs,
  createStudyLog,
  deleteStudyLog,
  updateStudyLog,
  getComments,
}) {
  const dispatch = useDispatch();
  checkCookieToken(dispatch);

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const loading = useSelector((state) => state.studylog.loading);
  const studyLogList = useSelector(
    (state) => state.studylog.data && state.studylog.data.data
  );
  const total = useSelector((state) => studyLogList && state.studylog.data.total);
  const [list, setList] = useState();
  const [counter, setCounter] = useState(null);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const searchRef = useRef();
  const [moment, setMoment] = useState(null);
  const [dateText, setDateText] = useState('');
  const [query, setQuery] = useState('');

  const [textLength, setTextLength] = useState(0);
  const [textValue, setTextValue] = useState();
  const textRef = useRef();
  const MAX_LENGTH = 1000;

  console.log(list);

  useEffect(() => {
    if (!token) navigate('/');
    fetchData(query, dateText, LIMIT, page);
  }, []);

  const fetchData = async (search, date, limit, offset) => {
    await getStudyLogs(search, date, limit, offset);
  };

  const loadMore = () => {
    fetchData(query, dateText, LIMIT, page + 1);
    setPage(page + 1);
  };

  const initPageAndList = useCallback(() => {
    setPage(1);
    setList(null);
  });

  useEffect(() => {
    setList((prev) => {
      if (page === 1) {
        return studyLogList;
      } else {
        return prev.concat(studyLogList);
      }
    });

    setCounter(total);
  }, [studyLogList]);

  const onChange = (date, dateString) => {
    setDateText(dateString);
    setMoment(date);
  };

  const onSearch = (value) => {
    if (dateText || value) {
      initPageAndList();
      setQuery(value);
      fetchData(value, dateText, LIMIT, 1);
    } else {
      alert('검색 조건을 입력해 주세요.');
    }
  };

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
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

  const handleCreate = () => {
    const body = {
      content: textValue,
    };
    initPageAndList();
    setQuery('');
    setDateText('');
    setMoment(null);
    setTextValue('');
    setTextLength(0);
    textRef.current.style.height = 'auto';
    createStudyLog(body);
    fetchData('', '', LIMIT, page);
    message.success('등록되었습니다.');
  };

  const handleDelete = (id) => {
    initPageAndList();
    deleteStudyLog(id);
    message.success('삭제되었습니다.');
  };

  const handleUpdate = (id, data) => {
    initPageAndList();
    updateStudyLog(id, data);
    message.success('수정되었습니다.');
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
                  <DatePicker size="large" onChange={onChange} value={moment} />
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
                    <StudyLogListItem
                      list={list}
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                      MAX_LENGTH={MAX_LENGTH}
                      getComments={getComments}
                    />
                  </div>
                  {total !== list.length && (
                    <div className={styles.list_more_area} onClick={loadMore}>
                      <div className={styles.list_more}>더 보기</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div>{loading || !list ? <LoadingWithOutHeader /> : null}</div>
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
