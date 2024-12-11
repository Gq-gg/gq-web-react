import React from 'react';
import styles from './you-compoent.module.less';
const YouCompoent: React.FC = () => {
  return (
    <div className={styles.style}>
      <div className='text'>公共组件</div>
    </div>
  );
};
export default YouCompoent;
