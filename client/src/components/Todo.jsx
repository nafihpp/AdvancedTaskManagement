import "./Todo.css";
import { TodoList } from "./TodoList";
import { useEffect, useRef, useState } from "react";
import { TodoInput } from "./TodoInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Todo = () => {
    const inputTodoRef = useRef(null);
    const [selectedId, setSelectedId] = useState(0);
    const [editInput, setEditInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState("");

    //OnMount gets all the todos from local storage and set to todo
    useEffect(() => {
        inputTodoRef.current.focus();
    }, []);

    //handleChange the Input todo
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };
    //add todo and update state
    const addTodo = async () => {
        if (inputValue !== "") {
            let currentTodo = {
                task_id: uuidv4(),
                task: inputValue,
                completed: false,
            };
            const response = await axios("http://localhost:6136/api/add-task", {
                METHOD: "POST",
                data: {
                    currentTodo,
                },
            });
            toast.success(response.data.message);
        } else {
            toast("enter the Task, It can't be empty");
        }
    };
    //On Mount fetch all tasks and also update the task list whenever tasks get added
    useEffect(() => {
        TaskFetch();
    }, [todo]);

    const TaskFetch = async () => {
        const response = await axios("http://localhost:6136/api/all-tasks", {
            METHOD: "GET",
        });
        setTodo(response.data);
    };

    //press enter to add todo
    const handleEnter = (event) => {
        const { key } = event;
        if (key == "Enter") {
            addTodo();
        }
    };

    //edit Button
    const editTodo = (id) => {
        setSelectedId(id);
    };
    //editAndSave
    const editAndSave = async (id) => {
        console.log("happening");
        const updatedTask = {
            task_id: id,
            task: "updated-da",
            completed: false,
        };
        const response = await axios.put(
            "http://localhost:6136/api/update-task",
            {
                METHOD: "PUT",
                data: {
                    updatedTask,
                },
            }
        );
        console.log(response);
        setSelectedId();
    };
    //completeTodo
    const completeTodo = (id) => {
        const complete = todo?.map((tod) => {
            if (tod.id === id && tod.completed === true) {
                return { ...tod, completed: false };
            } else if (tod.id === id) {
                return { ...tod, completed: true };
            } else {
                return tod;
            }
        });
        setTodo(complete);
    };

    //delete todo and then update localstorage and state
    const deleteTodo = (id) => {
        // let undeleted = parsedData?.filter((todo) => todo?.id !== id);
        // setTodo(undeleted);
    };

    return (
        <div className="todo-container">
            <ToastContainer />
            <h1>Todo List</h1>
            <div className="todo-input-container">
                <TodoInput
                    handleInputValue={handleInputValue}
                    inputValue={inputValue}
                    handleEnter={handleEnter}
                    inputTodoRef={inputTodoRef}
                />
                <button onClick={() => addTodo()} className="add-todo-button">
                    ADD TODO
                </button>
            </div>
            <div className="todo-list-container">
                <TodoList
                    todo={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    editInput={editInput}
                    setEditInput={setEditInput}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    editAndSave={editAndSave}
                    completeTodo={completeTodo}
                />
            </div>
        </div>
    );
};
