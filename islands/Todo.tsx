/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { uuid as uuidv4 } from "https://deno.land/x/unique/uuid.ts"

import { Todo } from "./TodoList.tsx";

interface TodoProps {
  todo: Todo;
  filterCompleted: (filter: boolean) => void;
  filterUncompleted: (filter: boolean) => void;
}

export default function TodoList(props: TodoProps) {
  const { todo, filterCompleted, filterUncompleted } = props;
  console.log("Todo", todo);

  const handleChange = (e: Event) => {
    todo.completed = (e.target as HTMLInputElement).checked;
    console.log("Todo #21:", todo.completed);
    filterCompleted(e.target.checked);
    filterUncompleted(!e.target.checked);
  }

  return (
    <li key={todo.id}>
      <label>{""}
        <input
          label="isCompleted"
          type="checkbox"
          onChange={(e) => handleChange(e)}
        />
      </label>
      {todo.text}
    </li>
  )
}