
import { FC } from 'react';
import type { IconProps } from './icon-props';

const D3Icon: FC<IconProps> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M4.2 17.4v-11H6V18H3V6h1.2v10.2q0 .5.15.85.15.35.45.55.3.2.75.2.4 0 .7-.2.3-.2.45-.55.15-.35.15-.85V6H7.2v11.4q0 .9-.4 1.5-.4.6-1.2.6-.8 0-1.2-.6-.4-.6-.4-1.5zM10.8 12.6v-1.2h4.8v1.2zM12.6 18q-2.1 0-3.3-1.05-1.2-1.05-1.2-3 0-2 1.2-3.05 1.2-1.05 3.3-1.05 2.1 0 3.3 1.05 1.2 1.05 1.2 3 0 2-1.2 3.05-1.2 1.05-3.3 1.05zm0-1.2q1.5 0 2.25-.7t.75-2.1V15q0-1.4-.75-2.1t-2.25-.7q-1.5 0-2.25.7t-.75 2.1q0 1.4.75 2.1t2.25.7zM21 12.6v-1.2h-3.6v1.2z"/>
    </svg>
);

export default D3Icon;
