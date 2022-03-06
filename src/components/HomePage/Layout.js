import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => (
  <Row align="middle" className={styles.layout_row}>
    <Col span={24}>
      <Row justify="center" className={styles.layout_contents}>
        <Col span={12}>{children}</Col>
      </Row>
    </Col>
  </Row>
);

export default Layout;
