import './list.css';
import { removeList, getListById } from '../Main/main';
import { createTaskForm } from '../Task/taskDOM';

export function createDOMList(listId) {
    const listDOM = document.createElement("div");
    listDOM.className = "list-body";

    const taskList = document.createElement("div");
    taskList.className = "list-tasks";
    taskList.id = listId;
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "list-addButton";
    addTaskButton.textContent = "+";
    createTask(addTaskButton);

    listDOM.appendChild(createListHeader(listId));
    listDOM.appendChild(taskList);
    taskList.appendChild(addTaskButton);
    listDOM.appendChild(createListFooter(listId));

    return listDOM;
}

function createListHeader(listId) {
    const listHeader = document.createElement("div");
    listHeader.className = "list-header";
    const title = document.createElement("input");
    title.className = "list-title";
    title.value = "New List";
    title.addEventListener("change", () => {
        getListById(listId).name = title.value;
    });
    title.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            e.target.blur();
        }
    });

    const delListButton = document.createElement("button");
    delListButton.className = "list-delButton";
    delListButton.textContent = "X";
    delListButton.addEventListener("click", () => {
        killList(listId);
    });

    listHeader.appendChild(title);
    listHeader.appendChild(delListButton)

    return listHeader;
}

function killList(listId) {
    removeList(getListById());
    const listDOMToBeRemoved = document.getElementById(listId).parentElement;
    document.getElementById("mainContainer").removeChild(listDOMToBeRemoved);
};


function createTask(button) {
    button.addEventListener("click", (e) => {
        const parentList = e.target.parentNode.parentNode;
        const taskForm = createTaskForm(parentList);
        document.body.appendChild(taskForm);
    });
}

function createListFooter() {
    const listFooter = document.createElement("div");
    listFooter.className = "list-footer";
    const totalTasks = document.createElement("div");
    const totalDueTasks = document.createElement("div");

    const dataTotal = document.createElement("span");
    dataTotal.className = "list-dataTotal";
    const dataDue = document.createElement("span");
    dataDue.className = "list-dataDue";

    totalTasks.textContent = "Total tasks: ";
    totalDueTasks.textContent = "Past due: ";

    dataTotal.textContent = " 0";
    dataDue.textContent = " 0";

    listFooter.appendChild(totalTasks);
    totalTasks.appendChild(dataTotal);
    listFooter.appendChild(totalDueTasks);
    totalDueTasks.appendChild(dataDue);

    return listFooter
}

export function updateTotalTasks(ListDOM, totalTask) {
    ListDOM.children[2].children[0].children[0].textContent = totalTask;
}

export function updateTotalDueTasks(ListDOM, totalDueTask) {
    ListDOM.children[2].children[1].children[0].textContent = totalDueTask;
}