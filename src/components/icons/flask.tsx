
import { FC } from 'react';
import type { IconProps } from './icon-props';

const FlaskIcon: FC<IconProps> = ({ className, hoverColor, enableGlow = true }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 22a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8V2z"/>
    <path d="M22 12a10 10 0 0 0-10-10v2a8 8 0 0 1 8 8h2z"/>
    <path d="M12 2a10 10 0 0 0-10 10h2a8 8 0 0 1 8-8V2z"/>
    <path d="M2 12a10 10 0 0 0 10 10v-2a8 8 0 0 1-8-8H2z"/>
    <path d="M8 12a4 4 0 0 1 4-4v8a4 4 0 0 1-4-4z"/>
  </svg>
);

export default FlaskIcon;
