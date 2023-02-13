import classNames from 'classnames/bind';

import { LoginFrame } from 'app/components/LoginFrame';
import { ButtonCustomization } from 'app/components/Button';

import styles from './LoginWrapper.module.scss';

const cx = classNames.bind(styles);

export const LoginWrapper = () => {
  return (
    <div className={cx('container')}>
      container
      <LoginFrame />
      <ButtonCustomization>Login with gg</ButtonCustomization>
    </div>
  );
};
