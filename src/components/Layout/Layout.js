import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => (
  <Row align="middle" className={styles.layout_row}>
    <Col span={24}>
      <div className={styles.layout_contents}>{children}</div>
    </Col>
  </Row>
);

export default Layout;
