import styles from '../../styles/MyTest.module.css';
import { FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const MyTest = () => {
  const token = useSelector((state) => state.user.auth.token);

  return (
    <div>
      <div className={styles.quiz_area}>
        <div className={styles.quiz_title}>
          <div>나의 테스트</div>
          <FaAngleRight className={styles.quiz_title_icon} />
        </div>
        {!token ? (
          <div className={styles.quiz_contents}>내 성적 확인하러 가기!</div>
        ) : (
          <div className={styles.quiz_contents}>내용</div>
        )}
      </div>
    </div>
  );
};

export default MyTest;
