import { Progress } from 'antd';
import styles from '../../styles/MyTest.module.css';

const MyTestResultCard = ({ total, answers, date }) => {
  const percent = (answers / total) * 100;

  return (
    <div className={styles.test_result_card_area}>
      <Progress
        type="circle"
        percent={percent}
        format={(percent) => `${answers} / ${total}`}
        className={styles.test_result_circle}
      />
      <div>{date}</div>
    </div>
  );
};

export default MyTestResultCard;
