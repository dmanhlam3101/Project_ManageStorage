import React from 'react';
import { Button, Result } from 'antd';
const Unthorized = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button href='/storage' type="primary">Back Home</Button>}
  />
);
export default Unthorized;