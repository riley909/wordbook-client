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
import Footer from '../Footer/Footer';

export default function StudyLog({
  getStudyLogs,
  createStudyLog,
  deleteStudyLog,
  updateStudyLog,
  getComments,
  createComment,
  deleteComment,
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

  const initStates = useCallback(() => {
    setPage(1);
    setList(null);
    setQuery('');
    setDateText('');
    setMoment(null);
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
      setPage(1);
      setList(null);
      setQuery(value);
      fetchData(value, dateText, LIMIT, page);
    } else {
      alert('?????? ????????? ????????? ?????????.');
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
    initStates();
    setTextValue('');
    setTextLength(0);
    textRef.current.style.height = 'auto';
    createStudyLog(body);
    fetchData('', '', LIMIT, 1);
    message.success('?????????????????????.');
  };

  const handleDelete = (id) => {
    initStates();
    deleteStudyLog(id);
    fetchData('', '', LIMIT, 1);
    message.success('?????????????????????.');
  };

  const handleUpdate = (id, data) => {
    initStates();
    updateStudyLog(id, data);
    fetchData('', '', LIMIT, 1);
    message.success('?????????????????????.');
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
                placeholder="????????? ?????? ????????? ???????????????."
                ref={textRef}
                onInput={handleResizeHeight}
                onChange={handleTextLength}
                value={textValue}
              />
              <div className={styles.input_button_area}>
                <div>
                  {textLength} / {MAX_LENGTH}
                </div>
                <button onClick={handleCreate}>????????????</button>
              </div>
              <Divider className={styles.divider} />
            </div>

            <div>
              <div className={styles.search_area}>
                <Tooltip title="?????? ?????? ?????? ????????? ?????? ??? ?????? ????????? ????????? ????????? ??? ????????????.">
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
                    <div className={styles.list_counter}>??? {counter}?????? ??????</div>
                  </div>
                  <div>
                    <StudyLogListItem
                      list={list}
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                      MAX_LENGTH={MAX_LENGTH}
                      getComments={getComments}
                      createComment={createComment}
                      deleteComment={deleteComment}
                    />
                  </div>
                  {total !== list.length && (
                    <div className={styles.list_more_area} onClick={loadMore}>
                      <div className={styles.list_more}>??? ??????</div>
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
        <div>
          <Footer />
        </div>
      </Layout>
    </div>
  );
}
