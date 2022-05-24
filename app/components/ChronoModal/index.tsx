import React, { useCallback, useState } from 'react';
import {
    DateRangeInput,
    MultiSelectInput,
    SelectInput,
} from '@the-deep/deep-ui';
import {
    gql,
    useQuery,
} from '@apollo/client';
import {
    ObjectSchema,
    PartialForm,
    useForm,
    requiredCondition,
    PurgeNull,
} from '@togglecorp/toggle-form';
import { _cs } from '@togglecorp/fujs';
import { EnumFix } from '#base/types/enumFix';
import { ProjectListQuery } from '#generated/types';
import styles from './styles.css';

const PROJECTS_LIST = gql`
query ProjectList {
    projects {
        results {
            id
            title
            tasks {
              id
              title
            }
            tags {
              id
              title
            }
            userGroup {
              id
              title
              members {
                email
                id
              }
            }
          }
    }
  }
`;

type ExtraFormField = {
    additionalInformation?: string | undefined | null;
    type: string | undefined;
    startDate?: number | undefined;
    endDate?: number | undefined;
    project?: string | undefined;
    task?: string | undefined;
    tag?: string | undefined;
    user?: string | undefined;
}

type FormType = PurgeNull<PartialForm<EnumFix<ExtraFormField, 'abc' | 'xyz'>>>;
type FormSchema = ObjectSchema<FormType>
type FormSchemaFields = ReturnType<FormSchema['fields']>;

const optionLabelSelector = (d: any) => d.title;
const optionKeySelector = (d: any) => d.id;

const schema: FormSchema = {
    fields: (): FormSchemaFields => ({
        project: [requiredCondition],
        task: [requiredCondition],
        tag: [],
        user: [],
    }),
};

interface Item {
    id: number;
    title: string;
}

interface Props {
    className?: string;
    modalShown?: boolean;
    handleModalClose: () => void;
}

function ChronoModal(props: Props) {
    const {
        className,
        modalShown,
        handleModalClose,
    } = props;

    const [dateRange, setDateRange] = useState<null>();
    const [dateLists, setDateLists] = useState<string[]>();

    const [tasks, setTasks] = useState<Item[]>([]);
    const [tags, setTags] = useState<Item[]>([]);
    const [users, setUser] = useState<Item[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    const {
        data: projects,
        error: projectsError,
        loading: projectsLoading,
    } = useQuery<ProjectListQuery>(PROJECTS_LIST);

    const loading = projectsLoading;

    const getDaysArray = useCallback(
        (start: Date, end: Date) => {
            const arr: string[] = [];
            for (let dt = new Date(start); dt <= end;) {
                dt.setDate(dt.getDate() + 1);
                if (new Date(dt).getDay() !== 0 && new Date(dt).getDay() !== 6) {
                    arr.push(new Date(dt).toISOString().split('T')[0]);
                }
            }
            return arr;
        },
        [],
    );
    console.log('users', users);

    const handleInputChange = (d: number[], name: string) => {
        if (name === 'projects') {
            const projs = projects?.projects?.results?.filter((x: any) => d.includes(x.id));
            setSelectedProjects(d);
            projs?.forEach((x: any) => {
                setTags([...x.tags, ...tags]);
                setTasks([...x.tasks, ...tasks]);
            });
        }
        if (name === 'tasks') {
            const tsk = projects?.projects?.results?.filter((x: any) => d.includes(x.id));
            setTasks(d);
            tsk?.forEach((x: any) => {
                setTags([...x.tags, ...tags]);
            });
        }
        if (name === 'tags') {
            const tag = projects?.projects?.results?.filter((x: any) => d.includes(x.id));
            setUser(d);
            tag?.forEach((x: any) => {
                setUser([...x.users, ...users]);
            });
            console.log('users', users);
        }
    };

    // const handleTasksInputChange = (d: number[], name: string) => {
    //     if (name === 'tasks') {
    //         const tasks = projects?.projects?.results?.filter((x: any) => d.includes(x.id));
    //         setTasks(d);
    //     }
    // }

    const handleDateChange = useCallback(
        (e) => {
            setDateRange(e);
            const dayList = getDaysArray(new Date(e.startDate), new Date(e.endDate));
            setDateLists(dayList);
        },
        [getDaysArray],
    );

    return (
        <div>
            <form
                className={_cs(
                    className,
                    styles.entriesFilterForm,
                )}
                onSubmit={handleModalClose}
            >
                <MultiSelectInput
                    className={styles.input}
                    name="projects"
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    value={selectedProjects}
                    onChange={handleInputChange}
                    options={projects?.projects?.results}
                    label="Project"
                    placeholder="List of Projects"
                />
                <MultiSelectInput
                    className={styles.input}
                    name="tasks"
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    value={tasks}
                    onChange={handleInputChange}
                    options={tasks}
                    label="Task"
                    placeholder="List of Tasks"
                />
                <MultiSelectInput
                    className={styles.input}
                    name="tags"
                    value={tags}
                    onChange={handleModalClose}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    options={tags}
                    label="Tag"
                    placeholder="List of Tags"
                />
                <SelectInput
                    className={styles.input}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    value={users}
                    onChange={handleModalClose}
                    name="users"
                    options={undefined}
                    label="User"
                    placeholder="List of Users"
                />
                <DateRangeInput
                    className={styles.input}
                    variant="form"
                    name="date"
                    label="Date"
                    value={dateRange}
                    onChange={handleDateChange}
                />
            </form>
        </div>
    );
}
export default ChronoModal;
