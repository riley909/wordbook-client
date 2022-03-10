import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const LayoutBottom = ({ children }) => (
  <Row align="middle" className={styles.layout_bottom_row}>
    <Col span={24}>
      <Row justify="center" className={styles.layout_top_contents}>
        {children}
      </Row>
    </Col>
  </Row>
);

export default LayoutBottom;
