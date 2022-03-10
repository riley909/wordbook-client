import { Col, Row } from 'antd';
import styles from '../../styles/Encyclopedia.module.css';

const Encyclopedia = ({ url1, title1, url2, title2, url3, title3, url4, title4 }) => (
  <div>
    <div className={styles.pedia_title}>
      <div>언어 백과</div>
    </div>
    <Row className={styles.pedia_contents}>
      <Col span={12}>
        <ul>
          <li>
            <a href={url1} target="_blank">
              {title1}
            </a>
          </li>
          {url2 ? (
            <li>
              <a href={url2} target="_blank">
                {title2}
              </a>
            </li>
          ) : null}
        </ul>
      </Col>
      <Col span={12}>
        {url3 ? (
          <ul>
            <li>
              <a href={url3} target="_blank">
                {title3}
              </a>
            </li>
            {url4 ? (
              <li>
                <a href={url4} target="_blank">
                  {title4}
                </a>
              </li>
            ) : null}
          </ul>
        ) : null}
      </Col>
    </Row>
  </div>
);

export default Encyclopedia;
