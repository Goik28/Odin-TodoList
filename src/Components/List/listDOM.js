import './list.css';
export default createDOMList;

function createDOMList() {
    const list = document.createElement("div");
    list.className = "list-body";


    const taskList = document.createElement("div");
    taskList.className = "list-tasks";
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "list-addButton";
    addTaskButton.textContent = "+";

    list.appendChild(createListHeader());
    list.appendChild(taskList);
    taskList.appendChild(addTaskButton);
    list.appendChild(createListFooter());

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

    delListButton.addEventListener("click", delList);

    listHeader.appendChild(title);
    listHeader.appendChild(delListButton)

    return listHeader;
}

function delList(event) {
    const listToBeRemoved = event.target.parentNode.parentNode;
    listToBeRemoved.parentNode.removeChild(listToBeRemoved);
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