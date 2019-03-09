import React from 'react';
import Card from "../UI/Card/Card";


const TaskCard = props => {
    const {task, className} = props;

    const {summary, description, due_date, status, time_planned,id} = task;

    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    return <Card header={summary}  description={description} due_date = {due_date} status={status} time_planned={time_planned} link={link} className='h-100'/>;
};


export default TaskCard;
