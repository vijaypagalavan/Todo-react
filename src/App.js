import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todo: [],
            isUpdate: false,
            tempind: ""
        };
        this.handlechange = this.handlechange.bind(this);
        this.txt = React.createRef();
        this.handledel = this.handledel.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCom = this.handleCom.bind(this);
    }
    handlechange() {
        if (this.txt.current.value) {
            this.setState({ todo: [...this.state.todo, this.txt.current.value] });
            this.txt.current.value = "";

        }
        else {
            alert("Enter any Item to Add");
        }
    }
    handledel(i) {
        var tempTodo = [...this.state.todo];
        tempTodo.splice(i, 1);
        this.setState({ todo: [...tempTodo] });

    }
    handleEdit(i, e) {
        this.txt.current.value = this.state.todo[i];
        this.state.todo.splice(i, 1);
        this.setState({ todo: [...this.state.todo], isUpdate: true, tempind: i });
        e.stopPropagation();
    }
    handleUpdate() {
        var tempTodo = [...this.state.todo];
        tempTodo.splice(this.state.tempind, 0, this.txt.current.value);
        this.setState({ todo: [...tempTodo], isUpdate: false, tempind: "" });
        this.txt.current.value = "";
    }
    handleCom(e) {
        e.stopPropagation();
    }
    handlePress(e) {
        if (e.key === 'Enter') {
            if (this.state.isUpdate) {
                this.handleUpdate();
            }
            else {
                this.handlechange();
            }
        }
    }
    render() {
        return (
            <div className="inp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group">
                                <input className="form-control" placeholder="Enter the list of items" onKeyPress={(e) => this.handlePress(e)} ref={this.txt}></input>
                                <span className="input-group-btn">
                                    {this.state.isUpdate ?
                                        <button type="button" className="btn btn-primary" onClick={this.handleUpdate}>Update</button> :
                                        <button type="button" className="btn btn-primary" onClick={this.handlechange}>Add</button>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row inp">
                        <div className="col-md-12">
                            <ul className="list-group">
                                {
                                    this.state.todo.map((T, i) => {
                                        return <li className="list-group-item" onClick={() => !this.state.isUpdate && this.handledel(i)}>
                                            <input type="checkbox" onClick={(e) => this.handleCom(e)} defaultChecked={false}></input>
                                            {i + 1 + ". " + T}
                                            <button className="btn btn-sm itemBtn btn btn-warning" disabled={this.state.isUpdate ? true : false} onClick={(e) => this.handleEdit.call(this, i, e)}>Edit</button>
                                            <div className="clearfix"></div>
                                        </li>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
