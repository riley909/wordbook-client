import { useDispatch, useSelector } from 'react-redux';
import Header from '../NavBar/Header';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';
import SenseInfo from './SenseInfo';
import LoadingWithHeader from '../Loading/LoadingWithHeader';
import Layout from '../Layout/Layout';
import styles from '../../styles/DictView.module.css';
import { Col } from 'antd';
import Side from '../NavBar/Side/Side';
import { useState } from 'react';
import AddWordModal from './AddWordModal';
import { checkCookieToken } from '../../utils/checkCookieToken';

export default function DictView({ search, wordClick, target_code }) {
  const dispatch = useDispatch();
  checkCookieToken(dispatch);

  const token = useSelector((state) => state.user.auth.token);
  const searchViewResult = useSelector((state) => state.dict.searchView.data);
  const loading = useSelector((state) => state.dict.searchView.loading);
  const [visible, setVisible] = useState(false);

  if (loading || !searchViewResult) {
    return <LoadingWithHeader header={<Header />} />;
  }

  const item = searchViewResult.channel.item;
  const trans_pos = sortPos(item.word_info.pos[0]);

  // 참고어 클릭시 사용되는 함수
  const onWordClick = (event) => {
    const ref_target_code = event.target.id;
    wordClick(ref_target_code);
  };

  const openModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <AddWordModal visible={visible} setVisible={setVisible} target_code={target_code} />
      <Header />
      <SearchInput search={search} />
      <Layout>
        <Col span={16}>
          <div>
            <div className={styles.word_area}>
              <div className={styles.word}>{item.word_info.word}</div>
              {token && (
                <div className={styles.add_button_area}>
                  <button className={styles.add_button} onClick={openModal}>
                    <span className={styles.add_button_icon}>+</span>단어장 저장
                  </button>
                </div>
              )}
            </div>
            <div className={styles.pos_area}>
              <div className={styles.pos_title_area}>
                <div>품사</div>
                <div>Kelas Kata</div>
              </div>
              <div>
                <div className={styles.pos}>{item.word_info.pos[0]}</div>
                <div className={styles.trans_pos}>{trans_pos}</div>
              </div>
            </div>
            <SenseInfo sense_info={item.word_info.sense_info} onWordClick={onWordClick} />
          </div>
        </Col>
        <div className={styles.side_divider} />
        <Col span={6}>
          <Side />
        </Col>
      </Layout>
      <div>Footer</div>
    </div>
  );
}
