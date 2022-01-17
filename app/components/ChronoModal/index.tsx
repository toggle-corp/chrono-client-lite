import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    DateRangeInput,
    MultiSelectInput,
    RadioInput,
    SelectInput,
} from '@the-deep/deep-ui';
import {
    gql,
    useMutation,
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
    numOfDays?: number | undefined;
    startDate?: number | undefined;
    project?: string | undefined;
    task?: string | undefined;
    tag?: string | undefined;
    user?: string | undefined;
}

type FormType = PurgeNull<PartialForm<EnumFix<ExtraFormField, 'designation' | 'gender'>>>;

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
    handleModalClose: () => void;
}

function ChronoModal(props: Props) {
    const {
        className,
        handleModalClose,
    } = props;

    const [tasks, setTasks] = useState<Item[]>([]);
    const [tags, setTags] = useState<Item[]>([]);
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

    const handleInputChange = (d: number[], name: string) => {
        if (name === 'projects') {
            const projs = projects?.projects?.results?.filter((x: any) => d.includes(x.id));
            setSelectedProjects(d);
            projs?.forEach((x: any) => {
                setTags([...x.tags, ...tags]);
                setTasks([...x.tasks, ...tasks]);
            });
        }
    };
    // useEffect(() =>{
    //     if(!loading){

    //     }
    // },[loading])

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
                    value={[]}
                    onChange={handleModalClose}
                    keySelector={optionKeySelector}
                    labelSelector={optionLabelSelector}
                    options={tasks}
                    label="Task"
                    placeholder="List of Tasks"
                />
                <MultiSelectInput
                    className={styles.input}
                    name="tags"
                    value={[]}
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
                    value={[]}
                    onChange={handleModalClose}
                    name="users"
                    options={undefined}
                    label="User"
                    placeholder="List of Users"
                />
                {/* <DateRangeInput
                    className={styles.input}
                    name="date"
                    label="Date"
                    // value={dateTimestampInSeconds.name}
                    onChange={handleModalClose}
                /> */}
                {/* {dateLists && dateLists.map((el) => (
                    <RadioInput
                        key={el}
                        label={el}
                        name={el}
                        value={undefined}
                        onChange={handleModalClose}
                        keySelector={optionKeySelector}
                        labelSelector={optionLabelSelector}
                        options={undefined}
                    />
                ))} */}
            </form>
        </div>
    );
}
export default ChronoModal;
