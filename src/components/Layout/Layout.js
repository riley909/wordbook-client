import { Col, Row } from 'antd';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => (
  <Row align="middle">
    <Col span={24}>
      <div className={styles.layout_contents}>
        <Row justify="center">{children}</Row>
      </div>
    </Col>
  </Row>
);

export default Layout;
