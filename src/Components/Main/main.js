let listIdGenerator = -1;
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

export function generateListId(){  
    listIdGenerator++;
    return listIdGenerator;    
}