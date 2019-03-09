import React, {Fragment, Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import TaskCard from "../../components/TaskCard/TaskCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './TaskList.css';

class TaskList extends Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(tasks => this.setState({tasks}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='do'>
                <h3>В работе</h3>
                {this.state.tasks.map(task => {
                if (task.status=="в работе")
                    return <div   key={task.id}>

                        <TaskCard task={task}/>
                    </div>
                })}
            </div>
            <div className='wait'>
                <h3>Очередь</h3>
                {this.state.tasks.map(task => {
                    if (task.status=="очередь")
                    return <div   key={task.id}>
                        <TaskCard task={task}/>
                    </div>
                })}
            </div>
            <div className='complete'>
                <h3>Сделано</h3>
                {this.state.tasks.map(task => {
                if (task.status=="сделано")
                    return <div   key={task.id}>

                        <TaskCard task={task}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default TaskList;