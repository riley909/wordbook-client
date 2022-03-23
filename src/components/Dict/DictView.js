import { useSelector } from 'react-redux';
import Header from '../NavBar/Header';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';
import SenseInfo from './SenseInfo';
import LoadingWithHeader from '../Loading/LoadingWithHeader';
import Layout from '../Layout/Layout';
import styles from '../../styles/DictView.module.css';
import { Col } from 'antd';
import Side from '../NavBar/Side/Side';

export default function DictView({ search, wordClick }) {
  const searchViewResult = useSelector((state) => state.dict.searchView.data);
  const loading = useSelector((state) => state.dict.searchView.loading);

  if (loading || !searchViewResult) {
    return <LoadingWithHeader />;
  }

  const item = searchViewResult.channel.item;
  const trans_pos = sortPos(item.word_info.pos[0]);

  const onWordClick = (event) => {
    const target_code = event.target.id;
    wordClick(target_code);
  };

  return (
    <div>
      <Header />
      <SearchInput search={search} />
      <Layout>
        <Col span={16}>
          <div>
            <div className={styles.word}>{item.word_info.word}</div>
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
