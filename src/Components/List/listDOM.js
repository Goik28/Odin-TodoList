import './list.css';
import { addList, removeList } from '../Main/main';
import List from './list';
import { createTaskForm } from '../Task/taskDOM';
export default createDOMList;

function createDOMList() {
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
    killList(listToBeRemoved.parentNode.children.indexOf(listToBeRemoved));
    listToBeRemoved.parentNode.removeChild(listToBeRemoved);
}

function killList(index){
    removeList(index);
};


function createTask(button) {
    button.addEventListener("click", () => {
        const taskForm = createTaskForm();
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