import React, { useEffect, useRef, useState } from "react";
import "./TodoList.css";
import editButton from "../../assets/image-7.png";
import deleteButton from "../../assets/image-9.png";

export const TodoList = ({
    todo,
    deleteTodo,
    editTodo,
    editInput,
    setEditInput,
    selectedId,
    setSelectedId,
    editAndSave,
    completeTodo,
}) => {
    console.log(todo, "===heretodo");
    return (
        <div className="completed-todo-container">
            {todo &&
                todo?.map((tod) => (
                    <div className="completed-todo-box" key={tod.task_id}>
                        {tod?.task_id && selectedId !== tod.task_id ? (
                            <div className="box">
                                <div
                                    className="todo-title"
                                    onClick={() => completeTodo(tod.task_id)}
                                >
                                    {!tod?.completed ? (
                                        <p className="todo-title-p">
                                            {tod?.task}
                                        </p>
                                    ) : (
                                        <s className="todo-title-s">
                                            {tod?.task}
                                        </s>
                                    )}
                                </div>
                                <div className="icons-container">
                                    <div
                                        className="todo-editIcon-container"
                                        onClick={() => {
                                            editTodo(tod?.task_id);
                                        }}
                                    >
                                        <img src={editButton} alt="edit-icon" />
                                    </div>
                                    <div
                                        className="todo-deleteIcon-container"
                                        onClick={() => deleteTodo(tod?.task_id)}
                                    >
                                        <img
                                            src={deleteButton}
                                            alt="delete-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            tod?.task_id === selectedId && (
                                <div className="edit-todo-container">
                                    <div className="edit-box">
                                        <input
                                            value={editInput}
                                            onChange={(e) =>
                                                setEditInput(e.target.value)
                                            }
                                            className="edit-input"
                                        />
                                        <button
                                            className="save-button"
                                            onClick={() =>
                                                editAndSave(tod?.task_id)
                                            }
                                        >
                                            SAVE
                                        </button>
                                        <button
                                            className="cancel-button"
                                            onClick={() => setSelectedId()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
        </div>
    );
};
