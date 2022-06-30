import './index.css';
import { createHeader, createList } from './Components/Header/header';
import createFooter from './Components/Footer/footer.js';
import { createMain, redrawMainDOM } from './Components/Main/mainDOM.js';
import { getFromStorage } from './Components/Storage/manager';
import { getListContainer, updateListId } from './Components/Main/main';
import List from './Components/List/list';
import Task from './Components/Task/task';

document.body.appendChild(createHeader());
document.body.appendChild(createMain());
document.body.appendChild(createFooter());
loadStorage();

function loadStorage() {
    const data = getFromStorage();
    if (data != false) {
        data.forEach(dataList => {
            const list = new List(dataList.id, dataList.name);
            dataList.taskContainer.forEach(dataTask => {
                const task = new Task(dataTask.title, dataTask.priority, dataTask.dueDate, dataTask.description);
                list.addTask(task);
            });
            getListContainer().push(list);
        });
        updateListId();
        redrawMainDOM();
    } else {
        console.log("Nothing to load from storage.")
        createList();
    }
}