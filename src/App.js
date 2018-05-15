import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ToDo = props => {
  return (
  <li>
  {props.item.title}
    <input type="checkbox"
      id={props.item.id}
      checked={props.item.completed}
      onChange={props.toggleComplete}
    />
    <label htmlFor={props.item.id} />
    <button onClick={props.removeToDo}>
      <i className="fa fa-trash" />
      </button>
  </li>
);
};

const ToDoCount = props => {
  if(props.number > 0){
    return <div>{props.number} todos</div>
  }else {
    return <div>'No todos'</div>
  }
};

const ClearButton = props => {
  return <button onClick={props.removeCompleted}>Remove Completed</button>
};

class App extends Component {
  constructor(){
    super()

    this.state = {
      todos: [
        { id: 0, title: 'Learn React', completed: true},
        { id: 1, title: 'Lear MongoDB', completed: false}
      ]
    }
  }
  addToDo = (event) => {
    event.preventDefault();
    let id = Math.floor(Math.random()*1000000);
    if(this.toDoInput.value) {
      this.setState({
        todos: [...this.state.todos, {id: id, title: this.toDoInput.value, completed: false}]
      });
    }
    this.toDoInput.value = "";
  };

  removeToDo(bla){
    console.log(bla);
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== bla.id
    });
    this.setState({todos: newTodos});
  };
  removeCompleted = () => {
    let NewTodos = this.state.todos.filter((todo) => {
      return todo.completed === false
    });
    this.setState({todos: NewTodos});
  };

  toggleComplete(item) {
    let newTodos = this.state.todos.map(todo => {
      if(item.id === todo.id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({todos: newTodos});
  };

  render() {
    return (
      <div className="todo-list">
        <h1>ToDo React App</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={input => {this.toDoInput = input}} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map((element, i) => (
            <ToDo
            key={i}
            item={element}
            removeToDo={this.removeToDo.bind(this, element)}
            toggleComplete={this.toggleComplete.bind(this, element)}/>))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          <ClearButton removeCompleted={this.removeCompleted} />
        </div>
      </div>
    );
  }
}

export default App;
