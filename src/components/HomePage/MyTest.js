import styles from '../../styles/MyTest.module.css';
import { FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Progress } from 'antd';

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
          <div className={styles.test_contents}>
            <div>
              <div>2021-03-09</div>
              <Progress type="circle" percent={50} format={(percent) => `5 / 10`} />
            </div>
            <div onClick={login}>내 성적 확인하기 </div>
          </div>
        ) : (
          <div className={styles.test_contents}>내 성적</div>
        )}
      </div>
    </div>
  );
};

export default MyTest;
