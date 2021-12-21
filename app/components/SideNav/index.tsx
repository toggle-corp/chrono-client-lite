import React from 'react';
import { _cs } from '@togglecorp/fujs';

import SmartNavLink from '../../Base/components/SmartNavLink';
import routes from '../../Base/configs/routes';

import styles from './styles.css';

interface Props {
    className?: string;
}

function SideNav(props: Props) {
    const { className } = props;

    return (
        <div className={_cs(className, styles.sideNav)}>
            <div className={styles.logoContainer}>
                Togglecorp
            </div>
            <SmartNavLink
                exact
                route={routes.dashboard}
            />
        </div>
    );
}

export default SideNav;
