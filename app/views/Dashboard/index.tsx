import React, { useCallback, useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    Button,
    DropdownMenu,
    TableView,
} from '@the-deep/deep-ui';
import { IoCalendarOutline } from 'react-icons/io5';
import ChronoModal from '../../components/ChronoModal';

import styles from './styles.css';

interface Props {
    className?: string;
}

const data = [{
    when: '2 minutes ago',
    who: 'Jill Dupre',
    description: 'Created new account',
},
{
    when: '1 hour ago',
    who: 'Lose White',
    description: 'Added first chapter',
},
{
    when: '2 hours ago',
    who: 'Jordan Whash',
    description: 'Created new account',
}];

function Dashboard(props: Props) {
    const { className } = props;
    const [showModal, setShowModal] = useState(false);
    const optionKeySelector = (d: any) => d.key;
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
            <div className={styles.tableListContainer}>
                <div className={styles.title}>Data Table</div>
                <div className={styles.tableList}>
                    <TableView
                        data={data}
                        keySelector={optionKeySelector}
                        columns={[]}
                        emptyMessage="No record to display"
                    />
                    <DropdownMenu className="drop__toggle--caret">
                        <ul className="drop__menu drop__menu--select" role="menu">
                            <li title="project list" />
                            <li> project-list-1 </li>
                            <li> column-2 </li>
                            <li> column-3 </li>
                        </ul>
                    </DropdownMenu>
                    <DropdownMenu className="drop__toggle--caret">
                        <ul className="drop__menu drop__menu--select" role="menu">
                            <li>
                                {/* <a
                                href="#"
                                onClick={handleModalChange}
                            >
                            </a> */}
                            </li>
                            <li> task list -1 </li>
                            <li> column-2 </li>
                            <li> column-3 </li>
                        </ul>
                    </DropdownMenu>
                    <DropdownMenu className="drop__toggle--caret">
                        <ul className="drop__menu drop__menu--select" role="menu">
                            <li>
                                {/* <a
                                href="#"
                                onClick={handleModalChange}
                            >
                            </a> */}
                            </li>
                            <li> task list -1 </li>
                            <li> column-2 </li>
                            <li> column-3 </li>
                        </ul>
                    </DropdownMenu>
                    <DropdownMenu className="drop__toggle--caret">
                        <ul className="drop__menu drop__menu--select" role="menu">
                            <li>
                                {/* <a
                                href="#"
                                onClick={handleModalChange}
                            >
                            </a> */}
                            </li>
                            <li> task list -1 </li>
                            <li> column-2 </li>
                            <li> column-3 </li>
                        </ul>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
