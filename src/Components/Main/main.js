export {addList, removeList, getList};

const listContainer = [];

function addList(list) {
    listContainer.push(list);
}

function removeList(list) {
    listContainer.splice(listContainer.indexOf(list), 1);
}

function getList(index){
    return listContainer[index];
}