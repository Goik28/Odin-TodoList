export {addList, removeList, getListContainer};

const listContainer = [];

function addList(list) {
    listContainer.push(list);
}

function removeList(list) {
    listContainer.splice(listContainer.indexOf(list), 1);
}

function getListContainer(){
    return listContainer;
}