import { saveToStorage } from "../Storage/manager";

let listIdGenerator = -1;
const listContainer = [];

export function getListContainer() {
    return listContainer;
}

export function addList(list) {
    listContainer.push(list);
    saveToStorage();
}

export function removeList(list) {
    listContainer.splice(listContainer.indexOf(list), 1);
    saveToStorage();
}

export function getListById(id) {
    return listContainer.find((value) => {
        return (value.id == id);
    });
}

export function generateListId() {
    listIdGenerator++;
    return listIdGenerator;
}

export function updateListId() {
    listContainer.forEach(element => {
        element.id = "list-" + generateListId();
    });
}