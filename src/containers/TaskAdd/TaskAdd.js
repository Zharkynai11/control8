import React, {Component} from 'react';
import {TASKS_URL} from "../../api-urls";

import DatePicker from "react-datepicker";
import Select from 'react-select';

import axios from 'axios';


class taskAdd extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: "",
            status: "",
            time_planned: "",
        },

        statuses: [ "Очередь", "В работе", "Сделано"],
        alert: null,

        submitDisabled: false
    };

    updatetaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updatetaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updatetaskState(field, date.toISOString().slice(0, 10));
    };
    setStatus = (status) =>{
    this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task.status = status;
            newState.task = task;
            return newState;
        });
    }

 _handleChange = (event) => {
    this.updatetaskState('status',event.target.value)
  }
    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        alert(this.state.task.status)
        axios.post(TASKS_URL, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('task was not created');
            })
            .then(task => this.props.history.replace('/tasks/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        const {summary, description, due_date, status, time_planned} = this.state.task;

        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }
        const due_date_selected = due_date
        const time_planned_selected = time_planned ? new Date(time_planned) : null;


        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Краткое описание </label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Полное описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Срок выполнения</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={due_date_selected} className="form-control"
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Планируемое время</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={time_planned_selected} className="form-control"
                                    name="time_planned" onChange={(date) => this.dateChanged('time_planned', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <select options={this.state.statuses} name='statuses'
                            onChange={this._handleChange}>
                        <option value="Очередь">Очередь</option>
                        <option value="В работе">В работе</option>
                        <option value="Сделано">Сделано</option>
                    </select>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default taskAdd;
