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

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    //onMount focus to the input
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
            const response = await axios(`${BASE_URL}/api/add-task`, {
                method: "POST",
                data: {
                    currentTodo,
                },
            });
            toast.success(response.data.message);
            setInputValue("");
            TaskFetch();
        } else {
            toast("enter the Task, It can't be empty");
        }
    };
    //On Mount fetch all tasks and also update the task list whenever tasks get added
    useEffect(() => {
        TaskFetch();
    }, []);

    const TaskFetch = async () => {
        const response = await axios(`${BASE_URL}/api/all-tasks`, {
            method: "GET",
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

    //edit Button which Enable Editing screen
    const editTodo = (id) => {
        setSelectedId(id);
    };
    //editAndSave
    const editAndSave = async (id) => {
        try {
            const updatedTask = {
                task_id: id,
                task: editInput,
                completed: false,
            };
            const response = await axios(`${BASE_URL}/api/update-task`, {
                method: "PUT",
                data: {
                    data: {
                        updatedTask,
                    },
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message);
            }
            setSelectedId();
            TaskFetch();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    //completeTodo
    const completeTodo = async (id) => {
        try {
            const response = await axios(
                `${BASE_URL}/api/mark-as-complete/${id}`,
                {
                    method: "POST",
                }
            );
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }

        TaskFetch();
    };

    //delete todo and then update localstorage and state
    const deleteTodo = async (id) => {
        await axios(`${BASE_URL}/api/remove-task`, {
            method: "DELETE",
            params: { remove: id },
        });
        TaskFetch();
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
