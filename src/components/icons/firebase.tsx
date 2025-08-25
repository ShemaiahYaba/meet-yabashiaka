
import { FC } from 'react';
import type { IconProps } from './icon-props';

const FirebaseIcon: FC<IconProps> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M4.469 18.99l-1.42 1.42C3.521 21.03 4.41 22.5 5.625 22.5c.18 0 .36-.02.53-.06l13.68-3.8c.84-.23 1.25-1.28.9-2.05l-1.42-3.08-11.08 3.08-1.365 2.98zM22.5 6.42l-6.93 2.2-3.47 7.55 6-6.1L22.5 6.42zM12.23 6.08l-3.32.92.24 3.73 3.08-4.65zm-1.8-4.65l-1.48.4L3.6 15.35l-1.42-1.42c-.57-.57-.28-1.57.57-1.8l10.37-2.88c.84-.23 1.7.35 1.93 1.18l1.42 5.1-3.78-5.78z"/>
    </svg>
);

export default FirebaseIcon;
