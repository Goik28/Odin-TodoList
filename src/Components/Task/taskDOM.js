import './task.css';
import Task from './task';
import { diffDate, formatDate } from '../Date/date.js';

export function callTaskForm(list, task = false) {
    const taskFormModal = document.createElement("div");
    taskFormModal.className = "taskForm-modal";

    taskFormModal.appendChild(createTaskForm(list, task));

    return taskFormModal;
}

function createTaskForm(list, task) {
    const taskForm = document.createElement("form");
    taskForm.className = "taskForm-form";
    const header = document.createElement("div");
    header.className = "taskForm-header";
    if (task == false) {
        header.textContent = "Create new task";
    } else {
        header.textContent = "Update task";
    }

    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "formTitle";
    labelTitle.textContent = "Task Title:";
    const inputTitle = document.createElement("input");
    inputTitle.className = "taskForm-input";
    inputTitle.name = "title";
    inputTitle.placeholder = "Ex: Buy Grocery";
    if (task == false) {
        inputTitle.value = "";
    } else {
        inputTitle.value = task.title;
    }

    const labelPriority = document.createElement("label");
    labelPriority.htmlFor = "formPriority";
    labelPriority.textContent = "Task Priority: (Higher shown first)";
    const inputPriority = document.createElement("select");
    inputPriority.className = "taskForm-input";
    inputPriority.name = "priority";
    for (let index = 1; index <= 10; index++) {
        const element = document.createElement("option");
        element.textContent = index;
        element.value = index;
        inputPriority.appendChild(element);
    }
    if (task == false) {
        inputPriority.value = 1;
    } else {
        inputPriority.value = task.priority;
    }

    const labelDueDate = document.createElement("label");
    labelDueDate.htmlFor = "formDueDate";
    labelDueDate.textContent = "Due Date:";
    const inputDueDate = document.createElement("input");
    inputDueDate.className = "taskForm-input";
    inputDueDate.type = "date";
    inputDueDate.name = "dueDate";
    if (task == false) {
        inputDueDate.valueAsDate = new Date();
    } else {
        inputDueDate.valueAsDate = task.dueDate;
    }

    const labelDescription = document.createElement("label");
    labelTitle.htmlFor = "formDescription";
    labelDescription.textContent = "Task Description:";
    const inputDescription = document.createElement("textarea");
    inputDescription.placeholder = "Ex: Buy 2 tomatoes";
    inputDescription.name = "description";
    if (task == false) {
        inputDescription.value = "";
    } else {
        inputDescription.value = task.description;
    }

    taskForm.appendChild(header);
    taskForm.appendChild(labelTitle);
    taskForm.appendChild(inputTitle);
    taskForm.appendChild(labelPriority);
    taskForm.appendChild(inputPriority);
    taskForm.appendChild(labelDueDate);
    taskForm.appendChild(inputDueDate);
    taskForm.appendChild(labelDescription);
    taskForm.appendChild(inputDescription);
    taskForm.appendChild(createTaskFormFooter(taskForm, list, task));

    return taskForm;
}

function createTaskFormFooter(taskForm, list, task) {
    const taskFormFooter = document.createElement("div");
    taskFormFooter.className = "taskForm-footer";

    if (task != false) {
        const deleteButton = document.createElement("button");
        deleteButton.className = "taskForm-deleteButton";
        deleteButton.textContent = "Delete task";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", (e) => {
            deleteTask(list, task);
            document.body.removeChild(taskForm.parentElement);
        });
        taskFormFooter.appendChild(deleteButton);
    }

    const createButton = document.createElement("button");
    createButton.className = "taskForm-createButton";
    if (task == false) {
        createButton.textContent = "Create";
    } else {
        createButton.textContent = "Update";
    }
    createButton.type = "submit";
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (task == false) {
            createTask(taskForm, list);
        } else {
            updateTask(taskForm, list, task);
        }
        document.body.removeChild(taskForm.parentElement);
    });

    const cancelButton = document.createElement("button");
    cancelButton.className = "taskForm-cancelButton";
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";
    cancelButton.addEventListener("click", (e) => {
        document.body.removeChild(taskForm.parentElement);
    });

    taskFormFooter.appendChild(createButton);
    taskFormFooter.appendChild(cancelButton);

    return taskFormFooter;
}

function createDOMTask(list, task) {
    const taskDOM = document.createElement("div");
    taskDOM.className = "task-body";
    taskDOM.addEventListener("click", (e) => {
        document.body.appendChild(callTaskForm(list, task));
    });

    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;
    const taskDate = document.createElement("div");
    taskDate.className = "task-date";
    taskDate.textContent = formatDate(task.dueDate);
    const taskDescription = document.createElement("div");
    taskDescription.className = "task-description";
    taskDescription.textContent = task.description;
    const taskDaysLeft = document.createElement("div");
    taskDaysLeft.className = "task-daysLeft";
    if (diffDate(task.dueDate) == 0 || diffDate(task.dueDate) == 1) {
        taskDaysLeft.textContent = diffDate(task.dueDate) + " day left";
    } else if (diffDate(task.dueDate) > 1) {
        taskDaysLeft.textContent = diffDate(task.dueDate) + " days left";
    } else if (diffDate(task.dueDate) == -1) {
        taskDaysLeft.textContent = diffDate(task.dueDate) * (-1) + " day ago";
    } else if (diffDate(task.dueDate) < -1) {
        taskDaysLeft.textContent = diffDate(task.dueDate) * (-1) + " days ago";
    }

    taskDOM.appendChild(taskTitle);
    taskDOM.appendChild(taskDate);
    taskDOM.appendChild(taskDescription);
    taskDOM.appendChild(taskDaysLeft);

    return taskDOM;
}

function createTask(taskForm, list) {
    const formData = new FormData(taskForm);
    const data = [];
    for (const [key, value] of formData) {
        data.push(value);
    }
    const task = new Task(...data);
    list.addTask(task);
    list.orderTasks();
    redrawListDOM(list);
}

function updateTask(taskForm, list, task) {
    const formData = new FormData(taskForm);
    const data = [];
    for (const [key, value] of formData) {
        data.push(value);
    }
    task.title = data[0];
    task.priority = data[1];
    task.setDueDate(data[2]);
    task.description = data[3];
    list.orderTasks();
    redrawListDOM(list);
}

function deleteTask(list, task) {
    list.removeTask(task);
    list.orderTasks();
    redrawListDOM(list);
}

function redrawListDOM(list) {
    const addButton = document.getElementById(list.id).lastElementChild;
    document.getElementById(list.id).replaceChildren();
    for (let index = 0; index < list.taskContainer.length; index++) {
        const element = list.taskContainer[index];
        const taskDOM = createDOMTask(list, element);
        document.getElementById(list.id).appendChild(taskDOM);
    }
    document.getElementById(list.id).appendChild(addButton);
    document.getElementById(list.id + "-total").textContent = list.totalTasks();
    document.getElementById(list.id + "-totalDue").textContent = list.totalDueTasks();
}