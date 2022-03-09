import styles from '../../styles/NextButton.module.css';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { Button } from 'antd';

const NextButton = ({ prev, next }) => (
  <div className={styles.next_button_area}>
    <Button size="small" className={styles.next_button} onClick={prev}>
      <FaAngleLeft className={styles.next_button_icon} />
    </Button>
    <Button size="small" className={styles.next_button} onClick={next}>
      <FaAngleRight className={styles.next_button_icon} />
    </Button>
  </div>
);

export default NextButton;
