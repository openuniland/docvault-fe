import classNames from 'classnames/bind';

import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

export const Banner = () => {
  return <div className={cx('container')}>Banner</div>;
};
