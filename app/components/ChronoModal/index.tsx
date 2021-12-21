import React, { useCallback, useContext, useState } from 'react';
import {
    AlertContext,
    Button,
    Checkbox,
    DateRangeInput,
    MultiSelectInput,
    SelectInput,
    TextInput,
} from '@the-deep/deep-ui';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

const filterKeySelector = (d: any) => d.key;
const optionLabelSelector = (d: any) => d.value;
const optionKeySelector = (d: any) => d.key;
interface Props {
    className?: string;
    handleModalClose: () => void;
}

function ChronoModal(props: Props) {
    const { addAlert } = useContext(AlertContext);
    const {
        className,
        handleModalClose,
    } = props;

    const [dateRange, setDateRange] = useState<null>();
    const [dateLists, setDateLists] = useState<string[]>();

    return (

        <div>
            <form
                className={_cs(
                    className,
                    styles.entriesFilterForm,
                )}
                onSubmit={handleModalClose}
            >
                {/* <TextInput
                    className={_cs(styles.filter, styles.showFilter)}
                    name="search"
                    value={undefined}
                    onChange={handleModalClose}
                    label="Search"
                /> */}
                <MultiSelectInput
                    className={styles.filter}
                    name="created_by"
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    value={undefined}
                    onChange={handleModalClose}
                    options={undefined}
                    label="Project"
                    placeholder="createdByPlaceholder"
                />
                <MultiSelectInput
                    className={styles.filter}
                    name="comment_assignee"
                    value={undefined}
                    onChange={handleModalClose}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    options={undefined}
                    label="Task"
                    placeholder="createdByPlaceholder"
                />
                <MultiSelectInput
                    className={styles.filter}
                    name="comment_created_by"
                    value={undefined}
                    onChange={handleModalClose}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    options={undefined}
                    label="Tag"
                    placeholder="createdByPlaceholder"
                />
                <DateRangeInput
                    name="created_at"
                    className={styles.filter}
                    label="Date"
                    value={undefined}
                    onChange={handleModalClose}
                />
                <SelectInput
                    className={styles.filter}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    value={undefined}
                    onChange={handleModalClose}
                    name="comment_status"
                    options={undefined}
                    label="User"
                    placeholder="createdByPlaceholder"
                />
            </form>
        </div>
    );
}
export default ChronoModal;
