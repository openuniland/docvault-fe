import classNames from 'classnames/bind';

import styles from './LoginFrame.module.scss';

const cx = classNames.bind(styles);

export const LoginFrame = () => {
  return <div className={cx('container')}>login</div>;
};
