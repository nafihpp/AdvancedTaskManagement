import React from "react";
import "./TodoInput.css";

export const TodoInput = ({
    handleInputValue,
    inputValue,
    handleEnter,
    inputTodoRef,
}) => {
    return (
        <div className="todo-input-container">
            <input
                placeholder="New Todo"
                name="todo"
                ref={inputTodoRef}
                value={inputValue}
                onChange={handleInputValue}
                onKeyPress={handleEnter}
            />
        </div>
    );
};
