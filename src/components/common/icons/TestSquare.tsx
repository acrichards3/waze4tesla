import React from 'react';
import styles from './Icons.module.scss';

const TestSquare = React.forwardRef<HTMLDivElement>((props, ref) => {
  return <div className={styles.square} ref={ref}></div>;
});

TestSquare.displayName = 'TestSquare';

export default TestSquare;
