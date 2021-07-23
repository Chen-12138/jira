import { render } from "@testing-library/react";
import { Table, TableProps } from "antd";
import { Pin } from "components/pin";
import React from "react"
import { Link } from "react-router-dom";
import { User } from 'screens/project-list/search-panel';
import { useEditProject } from "utils/project";

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<any>{
    // list: Project[];
    users: User[];
    refresh?: () => void
}
export const List = ({ users, /* list */ ...props }: ListProps) => {
    const {mutate} = useEditProject();
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh);
    return <Table
        pagination={false}
        columns={[
            {
                title: <Pin checked={true} disabled={true}/>,
                render(value, project){
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
                }
            },
            {
                title: "名称",
                // dataIndex: "name",
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={String(project.id)}>{project.name}</Link>
                }
            },
            {
                title: "部门",
                dataIndex: "organization",
            },
            {
                title: "负责人",
                render(value, project) {
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            /* {
                title: '创建时间',
                render(value, project) {
                    return <span>
                        {project.created ? }
                    </span>
                }
            } */
        ]} 
        /* dataSource={list} */
        {...props}
        >
    </Table>
}