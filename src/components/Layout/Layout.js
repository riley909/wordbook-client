import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => (
  <Row align="middle">
    <Col span={24}>
      <Row justify="center" className={styles.layout_contents}>
        {children}
      </Row>
    </Col>
  </Row>
);

export default Layout;
