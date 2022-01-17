import React, { useCallback, useState } from 'react';
import {
    Button,
} from '@the-deep/deep-ui';
import { _cs } from '@togglecorp/fujs';
import { IoCalendarOutline } from 'react-icons/io5';

import ChronoModal from '../../components/ChronoModal';

import styles from './styles.css';

interface Props {
    className?: string;
}
function Filter(props: Props) {
    const { className } = props;
    const [showModal, setShowModal] = useState(false);
    // const columns = ;

    const handleModalChange = useCallback(() => setShowModal(!showModal), [showModal]);

    return (
        <div className={_cs(className, styles.filter)}>
            <div className={styles.btnContainer}>
                <div className={styles.title}> Filters</div>
                <Button
                    onClick={handleModalChange}
                    name="applyFilter"
                    icons={<IoCalendarOutline />}
                >
                    Filter
                </Button>
            </div>
            <ChronoModal
                handleModalClose={handleModalChange}
            />
        </div>
    );
}

export default Filter;
