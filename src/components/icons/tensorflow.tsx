
import { FC } from 'react';
import type { IconProps } from './icon-props';

const TensorflowIcon: FC<IconProps> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M7.459.728l-6.1 3.522v7.04l6.1 3.525 6.1-3.525v-3.52h-2.03v1.742l-4.07 2.35-4.07-2.35V6.028l4.07-2.35 4.07 2.35v1.76h2.03V4.25L7.459.728zM16.541 8.77l-6.1 3.525v7.042l6.1 3.521 6.1-3.521V12.29l-6.1-3.52zm0 10.917l-4.07-2.35v-3.52l4.07-2.35 4.07 2.35v3.52l-4.07 2.35z"/>
    </svg>
);

export default TensorflowIcon;
