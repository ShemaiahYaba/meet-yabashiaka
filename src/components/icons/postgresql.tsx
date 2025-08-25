
import { FC } from 'react';
import type { IconProps } from './icon-props';

const PostgresqlIcon: FC<IconProps> = ({ className, hoverColor, enableGlow = true }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12.003 24C5.467 24 0 18.623 0 12.003S5.467 0 12.003 0c6.533 0 12 5.377 12 12.003s-5.467 12-12 12zm-1.464-3.557h2.895V9.432h2.51v-2.5H8.02v2.5h2.519v11.011zm3.896-12.87c0-.501.166-.94.498-1.314a2.035 2.035 0 0 1 1.285-.563c.476 0 .895.188 1.259.563.364.373.546.813.546 1.314 0 .5-.182.94-.546 1.314a1.83 1.83 0 0 1-1.26.551c-.476 0-.9-.184-1.284-.55a1.99 1.99 0 0 1-.5-1.315z"/>
    </svg>
);

export default PostgresqlIcon;
