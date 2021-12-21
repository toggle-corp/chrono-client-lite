import React, { useCallback, useContext, useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import { Button } from '@the-deep/deep-ui';
import { IoCalendarOutline, IoHomeSharp } from 'react-icons/io5';
import { gql, useQuery } from '@apollo/client';
import ChronoModal from '../../components/ChronoModal';

import styles from './styles.css';

interface Props {
    className?: string;
}

function Dashboard(props: Props) {
    const { className } = props;
    const [showModal, setShowModal] = useState(false);
    const handleModalChange = useCallback(() => setShowModal(!showModal), [showModal]);

    return (
        <div className={_cs(className, styles.dashboard)}>
            <div className={styles.cardContainer}>
                <div className={styles.cardLeave}>
                    <ChronoModal
                        handleModalClose={handleModalChange}
                    />
                </div>
                <Button
                    onClick={handleModalChange}
                    name="applyLeave"
                    icons={<IoCalendarOutline />}
                >
                    Filter
                </Button>
            </div>
            <div className={styles.todayLeaveContainer}>
                <div className={styles.title}>Data Table</div>
            </div>

        </div>
    );
}

export default Dashboard;
