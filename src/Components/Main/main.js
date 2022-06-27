const listContainer = [];

export function getListContainer(){
    return listContainer;
}

export function addList(list) {
    listContainer.push(list);
}

export function removeList(list) {
    listContainer.splice(listContainer.indexOf(list), 1);
}

export function getListById(id){
    return listContainer.find((value)=>{
        return (value.id == id);
    });
}