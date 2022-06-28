import './header.css'
import { createDOMList } from '../List/listDOM.js';
import List from '../List/list';
import { addList, generateListId } from '../Main/main';

export function createHeader() {
    const header = document.createElement('header');
    const about = document.createElement('div');
    about.textContent = "Your to-do list!";

    header.appendChild(about);
    header.appendChild(createListBtn());

    return header;
}

function createListBtn() {
    const newListBtn = document.createElement("button");
    newListBtn.className = "header-button";
    newListBtn.id = "newListButton";
    newListBtn.textContent = "+ Create new list";

    newListBtn.addEventListener("click", () => {        
        createList();
    });

    return newListBtn;
}

function createList() {
    const list = new List("list-" + generateListId());
    addList(list);
    document.getElementById("mainContainer").appendChild(createDOMList(list.id));
}