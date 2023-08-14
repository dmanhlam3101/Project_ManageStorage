import { Button } from 'antd';

import { getListOrders } from '../../services/testService';

import { useCallback, useEffect, useState } from 'react';
function Home() {

  getListOrders()
  
  .then(console.log)

  return (
    <>
      <Button type="primary">Primary Button</Button>
    </>
  );
};

export default Home;
