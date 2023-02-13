import classNames from 'classnames/bind';
import { ButtonBase } from '@mui/material';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ButtonCustomization = (props: Props) => {
  const { children, onClick } = props;

  return (
    <ButtonBase onClick={onClick} className={cx('button')}>
      {children}
    </ButtonBase>
  );
};
