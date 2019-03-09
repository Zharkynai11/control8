import React, {Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';


class TaskDetail extends Component {
    state = {
        task: null
    };

    componentDidMount() {
            axios.get(TASKS_URL)
                .then(response => {console.log(response.data); return response.data;})
                .then(tasks => {
                    for (let i of tasks){
                        if (i.id == this.props.match.params.id){
                            this.setState({task: i})
                        }
                    }
                })
                .catch(error => console.log(error));
        }
    render() {
        if (!this.state.task) return null;
        const {summary, description, due_date, status, time_planned} = this.state.task;

        return <div>

            <h1>{summary}</h1>

            <p>{status}</p>

            <p>Срок выполнения: {due_date}</p>
             <p>Планируемое время: {time_planned ? time_planned : "Неизвестно"}</p>
            <pre>Описание:
{description ? <p>{description}</p> : null}</pre>

            <NavLink to='' className="btn btn-primary">tasks</NavLink>
        </div>;
    }
}


export default TaskDetail;
