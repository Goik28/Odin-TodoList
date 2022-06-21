import './main.css';
import createDOMList from '../List/listDOM.js';

export default createMain;

function createMain() {
    const main = document.createElement("main");
    main.appendChild(createDOMList());
    
    createNewList(document.getElementById("newListButton"), main);
    return main;
}

function createNewList(element, parent) {
    element.addEventListener("click", () => {
        parent.appendChild(createDOMList());
    });
}