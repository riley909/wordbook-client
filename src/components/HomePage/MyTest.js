import styles from '../../styles/MyTest.module.css';
import { FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import MyTestResultCard from './MyTestResultCard';

const MyTest = ({ login }) => {
  const token = useSelector((state) => state.user.auth.token);

  return (
    <div>
      <div className={styles.test_area}>
        <div className={styles.test_title}>
          <div>나의 테스트</div>
          <FaAngleRight className={styles.test_title_icon} />
        </div>
        {!token ? (
          <div>
            <div className={styles.test_contents}>
              <MyTestResultCard total={3} answers={1} date={'2022-03-09'} />
              <MyTestResultCard total={5} answers={2} date={'2022-03-08'} />
              <MyTestResultCard total={10} answers={7} date={'2022-03-06'} />
            </div>
            <div
              onClick={login}
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              내 성적 확인하기
            </div>
          </div>
        ) : (
          <div className={styles.test_contents_login}>
            <div>준비중</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTest;
