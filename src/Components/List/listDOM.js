import './list.css';
import createDOMTask from '../Task/taskDOM';
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
    taskList.appendChild(createDOMTask());
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

function createTask(button) {
    button.addEventListener("click", () => {
        const taskForm = createTaskForm();
        document.body.appendChild(taskForm);
        taskForm.style.display = "block";
    });
}

function createTaskForm() {
    const modal = document.createElement("div");
    modal.className = "task-modal";
    modal.id = "taskModal";

    const taskForm = document.createElement("form");
    taskForm.className = "task-form";
    const header = document.createElement("div");
    header.className = "form-header";
    header.textContent = "Create new task";

    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "formTitle";
    labelTitle.textContent = "Task Title:";
    const inputTitle = document.createElement("input");
    inputTitle.className = "form-input";
    inputTitle.id = "formTitle";
    inputTitle.placeholder = "Ex: Buy Grocery";

    const labelPriority = document.createElement("label");
    labelPriority.htmlFor = "formPriority";
    labelPriority.textContent = "Priority: (Number between 1-10)";
    const inputPriority = document.createElement("input");
    inputPriority.className = "form-input";
    inputPriority.id = "formPriority";
    inputPriority.type = "number";
    inputPriority.placeholder = "Higher priority will be on top of the list."
    inputPriority.min = "1";
    inputPriority.max = "10";

    const labelDueDate = document.createElement("label");
    labelDueDate.htmlFor = "formDueDate";
    labelDueDate.textContent = "Due Date:";    
    const inputDueDate = document.createElement("input");
    inputDueDate.className = "form-input";
    inputDueDate.id = "formDueDate";
    inputDueDate.type = "date";

    const labelDescription = document.createElement("label");
    labelTitle.htmlFor = "formDescription";
    labelDescription.textContent = "Task Description:";
    const inputDescription = document.createElement("textarea");
    inputDescription.id = "formDescription";
    inputDescription.placeholder = "Ex: Buy 2 tomatoes";
    
    const footer = document.createElement("div");
    footer.className = "form-footer";
    const createButton = document.createElement("button");
    createButton.className = "task-createButton";
    createButton.textContent = "Create";
    const cancelButton = document.createElement("button");
    cancelButton.className = "task-cancelButton";
    cancelButton.textContent = "Cancel";

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

    return modal;
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