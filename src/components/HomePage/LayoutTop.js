import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const LayoutTop = ({ children }) => (
  <Row align="middle" className={styles.layout_top_row}>
    <Col span={24}>
      <Row justify="center" className={styles.layout_top_contents}>
        <Col span={12}>{children}</Col>
      </Row>
    </Col>
  </Row>
);

export default LayoutTop;
