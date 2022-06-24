import './task.css';
import Task from './task';
import { diffDate, newDate } from '../Date/date.js';
export { createDOMTask, createTaskForm };

function createTaskForm() {
    const modal = document.createElement("div");
    modal.className = "task-modal";
    modal.id = "taskModal";

    const taskForm = document.createElement("form");
    taskForm.className = "task-form";
    const header = document.createElement("div");
    header.className = "form-header";
    header.textContent = "Create new task";

    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "formTitle";
    labelTitle.textContent = "Task Title:";
    const inputTitle = document.createElement("input");
    inputTitle.className = "form-input";
    inputTitle.id = "formTitle";
    inputTitle.name = "title";
    inputTitle.placeholder = "Ex: Buy Grocery";

    const labelPriority = document.createElement("label");
    labelPriority.htmlFor = "formPriority";
    labelPriority.textContent = "Task Priority: (Higher shown first)";
    const inputPriority = document.createElement("select");
    inputPriority.className = "form-input";
    inputPriority.id = "formPriority";
    inputPriority.name = "priority";
    for (let index = 1; index <= 10; index++) {
        const element = document.createElement("option");
        element.textContent = index;
        element.value = index;
        inputPriority.appendChild(element);
    }

    const labelDueDate = document.createElement("label");
    labelDueDate.htmlFor = "formDueDate";
    labelDueDate.textContent = "Due Date:";
    const inputDueDate = document.createElement("input");
    inputDueDate.className = "form-input";
    inputDueDate.id = "formDueDate";
    inputDueDate.type = "date";
    inputDueDate.valueAsDate = new Date();
    inputDueDate.name = "dueDate";

    const labelDescription = document.createElement("label");
    labelTitle.htmlFor = "formDescription";
    labelDescription.textContent = "Task Description:";
    const inputDescription = document.createElement("textarea");
    inputDescription.id = "formDescription";
    inputDescription.placeholder = "Ex: Buy 2 tomatoes";
    inputDescription.name = "description";

    const footer = document.createElement("div");
    footer.className = "form-footer";
    const createButton = document.createElement("button");
    createButton.className = "task-createButton";
    createButton.textContent = "Create";
    createButton.type = "submit";
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        const tasks = createTask(taskForm);
        document.body.removeChild(modal);
        e.stopPropagation();
        return tasks;
    });

    const cancelButton = document.createElement("button");
    cancelButton.className = "task-cancelButton";
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";
    cancelButton.addEventListener("click", (e) => {
        document.body.removeChild(modal);
        e.stopPropagation();
    });

    modal.appendChild(taskForm);
    taskForm.appendChild(header);
    taskForm.appendChild(labelTitle);
    taskForm.appendChild(inputTitle);
    taskForm.appendChild(labelPriority);
    taskForm.appendChild(inputPriority);
    taskForm.appendChild(labelDueDate);
    taskForm.appendChild(inputDueDate);
    taskForm.appendChild(labelDescription);
    taskForm.appendChild(inputDescription);
    footer.appendChild(createButton);
    footer.appendChild(cancelButton);
    taskForm.appendChild(footer);

    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            document.body.removeChild(modal);
            e.stopPropagation();
        }
    });

    return modal;
}

function createTask(taskForm) {
    const formData = new FormData(taskForm);
    const data = [];
    for (const [key, value] of formData) {
        data.push(value);
    }
    const task = new Task(...data);
    const taskDOM = createDOMTask(
        formData.get("title"),
        newDate(formData.get("dueDate")),
        formData.get("description")
    );
    return {task, taskDOM};
}

function createDOMTask(title, dueDate, description) {
    const taskDOM = document.createElement("div");
    taskDOM.className = "task-body";

    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent = title;
    const taskDate = document.createElement("div");
    taskDate.className = "task-date";
    taskDate.textContent = dueDate;
    const taskDescription = document.createElement("div");
    taskDescription.className = "task-description";
    taskDescription.textContent = description;
    const taskDaysLeft = document.createElement("div");
    taskDaysLeft.className = "task-daysLeft";
    taskDaysLeft.textContent = diffDate(dueDate);

    taskDOM.appendChild(taskTitle);
    taskDOM.appendChild(taskDate);
    taskDOM.appendChild(taskDescription);
    taskDOM.appendChild(taskDaysLeft);

    return taskDOM;
}