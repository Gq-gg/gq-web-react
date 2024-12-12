import { Button } from 'antd';
// import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { api } from './services';
function App() {
  const fetchData = async () => {
    const [e, r] = await api.getProjectListApi(
      { pageNumber: 1, pageSize: 10 },
      '1',
    );
    console.log('--====', e, r);
  };
  const fetchData1 = async () => {
    const [e, r] = await api.getUserInfo();
    console.log('--====', e, r);
  };
  useEffect(() => {
    fetchData();
  }, []); // 空依赖数组，确保只在组件挂载时运行一次
  return (
    <div>
      <Button type='primary' onClick={fetchData1}>
        Primary Button123
      </Button>
      {/* <Button>Default Button</Button>
      <Button type='dashed'>Dashed Button</Button>
      <Button type='text'>Text Button</Button>
      <Button type='link'>Link Button</Button> */}
    </div>
  );
}

export default App;
