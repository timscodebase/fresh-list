/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { uuid as uuidv4 } from "https://deno.land/x/unique/uuid.ts";

import Todo from "./Todo.tsx";

export interface Todo {
  id: number,
  text: string,
  completed: boolean
}

export default function TodoList() {
  const [uncompletedTodos, setUncompletedTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  // Add a new item to the list of todos
  const addItem = (e: Event) => {
    e.preventDefault()
    if (value) {
      setUncompletedTodos([...uncompletedTodos, { id: uuidv4(), text: value, completed: false }]);
      setValue("");
    }
  }

  const filterCompleted = (filter: boolean) => {
    setCompletedTodos([...uncompletedTodos.filter(todo => filter ? todo.completed : true)]);
  }

  const filterUncompleted = (filter: boolean) => {
    setUncompletedTodos([...uncompletedTodos.filter(todo => filter ? !todo.completed : false)])
  }
  
  return (
    <form onSubmit={addItem}>
      <label>
        Add a todo:
        <input type="text" value={value} onChange={(e) => {
          e.preventDefault()
          setValue(e.target.value)}
        } />
      </label>
      <button type="submit">Add</button>
      <h3>Uncompleted</h3>
      <ul> 
        {uncompletedTodos.map(todo => (
          <Todo
          todo={todo}
          filterCompleted={filterCompleted}
          filterUncompleted={filterUncompleted}
        />
        ))}
      </ul>
      <h3>Completed</h3>
      <ul>
        {completedTodos.map(todo => (
          <Todo
          todo={todo}
          filterCompleted={filterCompleted}
          filterUncompleted={filterUncompleted}
        />
        ))}
      </ul>
    </form>
  );
}
