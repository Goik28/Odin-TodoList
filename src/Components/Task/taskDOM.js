import './task.css';
import { getListById } from '../Main/main';
import Task from './task';
import { diffDate, newDate, formatDate } from '../Date/date.js';
import { updateTotalTasks, updateTotalDueTasks } from '../List/listDOM';
export { createDOMTask, createTaskForm };

function createTaskForm(parentList, task = false) {
    const modal = document.createElement("div");
    modal.className = "task-modal";

    const taskForm = document.createElement("form");
    taskForm.className = "task-form";
    const header = document.createElement("div");
    header.className = "form-header";
    if (arguments.length == 1) {
        header.textContent = "Create new task";
    } else {
        header.textContent = "Update task";
    }

    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "formTitle";
    labelTitle.textContent = "Task Title:";
    const inputTitle = document.createElement("input");
    inputTitle.className = "form-input";
    inputTitle.id = "formTitle";
    inputTitle.name = "title";
    inputTitle.placeholder = "Ex: Buy Grocery";
    if (arguments.length == 1) {
        inputTitle.value = "";
    } else {
        inputTitle.value = task.title;
    }


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
    if (arguments.length == 1) {
        inputPriority.value = 1;
    } else {
        inputPriority.value = task.priority;
    }


    const labelDueDate = document.createElement("label");
    labelDueDate.htmlFor = "formDueDate";
    labelDueDate.textContent = "Due Date:";
    const inputDueDate = document.createElement("input");
    inputDueDate.className = "form-input";
    inputDueDate.id = "formDueDate";
    inputDueDate.type = "date";
    inputDueDate.name = "dueDate";
    if (arguments.length == 1) {
        inputDueDate.valueAsDate = new Date();
    } else {
        inputDueDate.valueAsDate = task.dueDate;
    }

    const labelDescription = document.createElement("label");
    labelTitle.htmlFor = "formDescription";
    labelDescription.textContent = "Task Description:";
    const inputDescription = document.createElement("textarea");
    inputDescription.id = "formDescription";
    inputDescription.placeholder = "Ex: Buy 2 tomatoes";
    inputDescription.name = "description";
    if (arguments.length == 1) {
        inputDescription.value = "";
    } else {
        inputDescription.value = task.description;
    }
    

    const footer = document.createElement("div");
    footer.className = "form-footer";
    const createButton = document.createElement("button");
    createButton.className = "task-createButton";
    createButton.textContent = "Create";
    createButton.type = "submit";
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        const tasks = createTask(taskForm);
        addTaskDOMToList(parentList, tasks);
        document.body.removeChild(modal);
        e.stopPropagation();
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

    /* exit modal clicking anywhere on the screen.
        modal.addEventListener("click", (e) => {
            if (e.target == modal) {
                document.body.removeChild(modal);
                e.stopPropagation();
            }
        });*/

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
    return [task, taskDOM];
}

function createDOMTask(title, dueDate, description) {
    const taskDOM = document.createElement("div");
    taskDOM.className = "task-body";

    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent = title;
    const taskDate = document.createElement("div");
    taskDate.className = "task-date";
    taskDate.textContent = formatDate(dueDate);
    const taskDescription = document.createElement("div");
    taskDescription.className = "task-description";
    taskDescription.textContent = description;
    const taskDaysLeft = document.createElement("div");
    taskDaysLeft.className = "task-daysLeft";
    if (diffDate(dueDate) == 0 || diffDate(dueDate) == 1) {
        taskDaysLeft.textContent = diffDate(dueDate) + " day left";
    } else if (diffDate(dueDate) > 1) {
        taskDaysLeft.textContent = diffDate(dueDate) + " days left";
    } else if (diffDate(dueDate) == -1) {
        taskDaysLeft.textContent = diffDate(dueDate) * (-1) + " day ago";
    } else if (diffDate(dueDate) < -1) {
        taskDaysLeft.textContent = diffDate(dueDate) * (-1) + " days ago";
    }

    taskDOM.appendChild(taskTitle);
    taskDOM.appendChild(taskDate);
    taskDOM.appendChild(taskDescription);
    taskDOM.appendChild(taskDaysLeft);

taskDOM.addEventListener("click", (e)=>{
    const parentListDOM = taskDOM.parentElement.parentElement;
    const main = parentListDOM.parentElement.children;
    const arrayMain = Array.from(main);
    const list = getList(arrayMain.indexOf(parentListDOM));
    const arrayList = Array.from(taskDOM.parentElement.children)   

    const task = list.taskcontainer.indexOf()
})

    return taskDOM;
}

function addTaskDOMToList(parentList, tasks) {
    const array = Array.from(parentList.parentNode.children);
    getList(array.indexOf(parentList)).addTask(tasks[0]);
    parentList.children[1].insertBefore(tasks[1], parentList.children[1].firstChild);

    const main = Array.from(parentList.parentNode.children);
    const list = getList(main.indexOf(parentList));
    updateTotalTasks(parentList, list.totalTasks());
    updateTotalDueTasks(parentList, list.totalDueTasks());
}

function updateTask(parentList, task) {

}