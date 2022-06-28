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
    addTaskButton.addEventListener("click", () => {
        callTaskForm(listId);
    });

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
    title.value = getListById(listId).name;
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
        document.body.appendChild(callKillConfirmation(listId));
    });

    listHeader.appendChild(title);
    listHeader.appendChild(delListButton)

    return listHeader;
}

function callKillConfirmation(listId) {
    const confirmationModal = document.createElement("div");
    confirmationModal.className = "confirmation-modal";

    const confirmationMain = document.createElement("div");
    confirmationMain.className = "confirmation-main";
    confirmationMain.textContent = "Are you sure you want to permanently delete this list?";

    const confirmationListName = document.createElement("div");
    confirmationListName.className = "confirmation-listName";
    confirmationListName.textContent = getListById(listId).name;

    const confirmationFooter = document.createElement("div");
    confirmationFooter.className = "confirmation-footer";

    const confirmationKillButton = document.createElement("button");
    confirmationKillButton.className = "confirmation-killButton";
    confirmationKillButton.textContent = "DELETE";
    confirmationKillButton.addEventListener("click", () => {
        killList(listId);
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


function killList(listId) {
    removeList(getListById(listId));
    const listDOMToBeRemoved = document.getElementById(listId).parentElement;
    document.getElementById("mainContainer").removeChild(listDOMToBeRemoved);
};

function callTaskForm(listId) {
    const taskForm = createTaskForm(listId);
    document.body.appendChild(taskForm);
}

function createListFooter(listId) {
    const listFooter = document.createElement("div");
    listFooter.className = "list-footer";

    const totalTasks = document.createElement("div");
    totalTasks.textContent = "Total tasks: ";

    const totalDueTasks = document.createElement("div");
    totalDueTasks.textContent = "Past due: ";

    const dataTotal = document.createElement("span");
    dataTotal.className = "list-dataTotal";
    dataTotal.id = listId + "-total";
    dataTotal.textContent = " " + updateTotalTasks(listId);

    const dataDue = document.createElement("span");
    dataDue.className = "list-dataDue";
    dataDue.id = listId + "-totalDue";
    dataDue.textContent = " " + updateTotalDueTasks(listId);

    listFooter.appendChild(totalTasks);
    totalTasks.appendChild(dataTotal);
    listFooter.appendChild(totalDueTasks);
    totalDueTasks.appendChild(dataDue);

    return listFooter
}

export function updateTotalTasks(listId) {
    return getListById(listId).totalTasks();
}

export function updateTotalDueTasks(listId) {
    return getListById(listId).totalDueTasks();
}