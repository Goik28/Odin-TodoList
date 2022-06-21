import './list.css';
export default createDOMList;

function createDOMList() {
    const list = document.createElement("div");
    list.className = "list-body";
    const title = document.createElement("input");
    title.className = "list-title";
    title.value = "New List";
    const taskList = document.createElement("div");
    taskList.className = "list-tasks";
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "list-addButton";
    addTaskButton.textContent = "+";

    list.appendChild(title);
    list.appendChild(taskList);
    taskList.appendChild(addTaskButton);
    list.appendChild(createListFooter());

    return list;
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