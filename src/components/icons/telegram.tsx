
import { FC } from 'react';
import type { IconProps } from './icon-props';

const TelegramIcon: FC<IconProps> = ({ className, hoverColor, enableGlow = true }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.253 8.219l-2.032 9.535c-.176.829-.656 1.021-1.328.635l-3.093-2.266-1.505 1.451c-.168.172-.308.312-.604.312l.219-3.168 5.756-5.222c.24-.213-.053-.332-.373-.122l-7.14 4.493-3.04-1.022c-.829-.272-.843-.888.167-1.312l11.493-4.42c.67-.263 1.237.151 1.021.984z"/>
  </svg>
);

export default TelegramIcon;
