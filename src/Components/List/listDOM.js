import './list.css';
import { removeList } from '../Main/main';
import { callTaskForm } from '../Task/taskDOM';
import List from './list';

export function createDOMList() {
    const list = createList();
    const listDOM = document.createElement("div");
    listDOM.className = "list-body";

    const taskList = document.createElement("div");
    taskList.className = "list-tasks";
    taskList.id = list.id;
    const addTaskButton = document.createElement("button");
    addTaskButton.className = "list-addButton";
    addTaskButton.textContent = "+";
    addTaskButton.addEventListener("click", () => {
        addTask(list);
    });

    listDOM.appendChild(createListHeader(list));
    listDOM.appendChild(taskList);
    taskList.appendChild(addTaskButton);
    listDOM.appendChild(createListFooter(list));

    return listDOM;
}

function createListHeader(list) {
    const listHeader = document.createElement("div");
    listHeader.className = "list-header";
    const title = document.createElement("input");
    title.className = "list-title";
    title.value = list.name;
    title.addEventListener("change", () => {
        list.name = title.value;
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
        document.body.appendChild(callKillConfirmation(list));
    });

    listHeader.appendChild(title);
    listHeader.appendChild(delListButton)

    return listHeader;
}

function createListFooter(list) {
    const listFooter = document.createElement("div");
    listFooter.className = "list-footer";

    const totalTasks = document.createElement("div");
    totalTasks.textContent = "Total tasks: ";

    const totalDueTasks = document.createElement("div");
    totalDueTasks.textContent = "Past due: ";

    const dataTotal = document.createElement("span");
    dataTotal.className = "list-dataTotal";
    dataTotal.id = list.id + "-total";
    dataTotal.textContent = " " + list.totalTasks();

    const dataDue = document.createElement("span");
    dataDue.className = "list-dataDue";
    dataDue.id = list.id + "-totalDue";
    dataDue.textContent = " " + list.totalDueTasks();;

    listFooter.appendChild(totalTasks);
    totalTasks.appendChild(dataTotal);
    listFooter.appendChild(totalDueTasks);
    totalDueTasks.appendChild(dataDue);

    return listFooter
}

function createList(){
    const list = new List("list-" + generateListId());
    addList(list);
    return list;
}

function callKillConfirmation(list) {
    const confirmationModal = document.createElement("div");
    confirmationModal.className = "confirmation-modal";

    const confirmationMain = document.createElement("div");
    confirmationMain.className = "confirmation-main";
    confirmationMain.textContent = "Are you sure you want to permanently delete this list?";

    const confirmationListName = document.createElement("div");
    confirmationListName.className = "confirmation-listName";
    confirmationListName.textContent = list.name;

    const confirmationFooter = document.createElement("div");
    confirmationFooter.className = "confirmation-footer";

    const confirmationKillButton = document.createElement("button");
    confirmationKillButton.className = "confirmation-killButton";
    confirmationKillButton.textContent = "DELETE";
    confirmationKillButton.addEventListener("click", () => {
        killList(list);
        document.body.removeChild(confirmationModal);
    });

    const confirmationCancelButton = document.createElement("button");
    confirmationCancelButton.className = "confirmation-cancelButton";
    confirmationCancelButton.textContent = "Cancel";
    confirmationCancelButton.addEventListener("click", () => {
        document.body.removeChild(confirmationModal);
    });

    confirmationModal.appendChild(confirmationMain);
    confirmationMain.appendChild(confirmationListName);
    confirmationMain.appendChild(confirmationFooter);
    confirmationFooter.appendChild(confirmationKillButton);
    confirmationFooter.appendChild(confirmationCancelButton);

    return confirmationModal;
}

function killList(list) {
    removeList(list);
    const listDOMToBeRemoved = document.getElementById(list.id).parentElement;
    document.getElementById("mainContainer").removeChild(listDOMToBeRemoved);
};

function addTask(list) {
    const taskForm = callTaskForm(list);
    document.body.appendChild(taskForm);
}