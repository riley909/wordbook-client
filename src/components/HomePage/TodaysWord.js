import styles from '../../styles/TodaysWord.module.css';
import { FaAngleRight } from 'react-icons/fa';

const TodaysWord = () => {
  return (
    <div className={styles.todays_word_area}>
      <div className={styles.today_title}>
        <div>오늘의 단어</div>
        <FaAngleRight className={styles.today_title_icon} />
      </div>
      <div className={styles.today_contents}>
        <div className={styles.word_area}>
          <span className={styles.word}>kucing</span>
          <span class={styles.word_parts}>[Nomina : 명사]</span>
        </div>
        <div className={styles.meaning_area}>
          <div className={styles.meaning}>고양이</div>
          <div className={styles.divider} />
          <div>
            hewan atau binatang kecil yang bisa melihat benda di tempat gelap, pandai
            menangkap tikus, dan juga biasa dipelihara orang
          </div>
          <div>
            어두운 곳에서도 사물을 잘 보고 쥐를 잘 잡으며 집 안에서 기르기도 하는 자그마한
            동물.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysWord;
