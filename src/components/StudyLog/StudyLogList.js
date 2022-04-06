import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Layout from '../Layout/Layout';
import LoadingWithHeader from '../Loading/LoadingWithHeader';
import Header from '../NavBar/Header';
import SideWithOutPosts from '../NavBar/Side/SideWithOutPosts';
import StudyLogListItem from './StudyLogListItem';
import styles from '../../styles/StudyLogList.module.css';
import StudyLogSearchInput from './StudyLogSearchInput';

export default function StudyLog({ getStudyLogs }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const loading = useSelector((state) => state.studylog.loading);
  const studyLogList = useSelector(
    (state) => state.studylog.data && state.studylog.data.data
  );
  const total = useSelector((state) => studyLogList && state.studylog.data.total);
  const [list, setList] = useState(null);
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    if (!token) navigate('/');
  });

  useEffect(() => {
    setList(studyLogList);
    setCounter(total);
  }, [studyLogList]);

  console.log(list);

  if (loading || !studyLogList || !list) {
    return <LoadingWithHeader header={<Header />} />;
  }

  return (
    <div>
      <Header />
      <Layout>
        <Col span={16}>
          <div className={styles.container}>
            <div>작성창</div>
            <div>
              <StudyLogSearchInput getStudyLogs={getStudyLogs} />
            </div>
            <div className={styles.list_counter_area}>
              <div className={styles.list_counter}>총 {counter}개의 로그</div>
            </div>
            <div>
              <StudyLogListItem list={list} />
            </div>
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
