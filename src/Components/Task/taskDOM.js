import './task.css';
export default createDOMTask;

function createDOMTask() {
    const task = document.createElement("div");
    task.className = "task-body";


    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent="New Task";
    const taskDate = document.createElement("div");
    taskDate.className = "task-date";
    taskDate.textContent = "01/01/2001";
    const taskDescription = document.createElement("div");
    taskDescription.className = "task-description";
    taskDescription.textContent="This is an exemple of task with a overflowing description";
    const taskDaysLeft = document.createElement("div");
    taskDaysLeft.className = "task-daysLeft";
    taskDaysLeft.textContent = "00 days left";

    task.appendChild(taskTitle);
    task.appendChild(taskDate);
    task.appendChild(taskDescription);
    task.appendChild(taskDaysLeft);

    return task;
}