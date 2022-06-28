import './header.css'
import { createDOMList } from '../List/listDOM.js';

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
    document.getElementById("mainContainer").appendChild(createDOMList());
}