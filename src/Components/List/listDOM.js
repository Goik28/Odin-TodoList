import './list.css';
import { addList, removeList, getList } from '../Main/main';
import List from './list';
import { createTaskForm } from '../Task/taskDOM';

export function createDOMList() {
    const list = document.createElement("div");
    list.className = "list-body";


    const taskList = document.createElement("div");
    taskList.className = "list-tasks";
    taskList.id = "taskList";
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "list-addButton";
    addTaskButton.textContent = "+";
    createTask(addTaskButton);

    list.appendChild(createListHeader());
    list.appendChild(taskList);
    taskList.appendChild(addTaskButton);
    list.appendChild(createListFooter());

    addList(new List());
    return list;
}

function createListHeader() {
    const listHeader = document.createElement("div");
    listHeader.className = "list-header";
    const title = document.createElement("input");
    title.className = "list-title";
    title.value = "New List";
    title.addEventListener("change", () => {
        const list = listHeader.parentNode;
        const array = Array.from(list.parentNode.children);
        getList(array.indexOf(list)).name = title.value;
    });
    title.addEventListener("keyup", (e)=>{
        if (e.key == "Enter") {
            e.target.blur();            
        }
    });

    const delListButton = document.createElement("button");
    delListButton.className = "list-delButton";
    delListButton.id = "delListButton";
    delListButton.textContent = "X";
    delListButton.addEventListener("click", killDOMList);

    listHeader.appendChild(title);
    listHeader.appendChild(delListButton)

    return listHeader;
}

function killDOMList(event) {
    const listToBeRemoved = event.target.parentNode.parentNode;
    const array = Array.from(listToBeRemoved.parentNode.children);
    killList(array.indexOf(listToBeRemoved));
    listToBeRemoved.parentNode.removeChild(listToBeRemoved);
}

function killList(index) {
    removeList(index);
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