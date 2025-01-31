import "./form.css";
import { useState } from "react";

type Props = {
  putTodo: (value: string) => void;
};

export const Form = (props: Props) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        props.putTodo(value);
        setValue("");
      }}
    >
      <input
        type="text"
        placeholder="Введите задачу"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </form>
  );
};
