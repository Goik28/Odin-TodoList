import { createList } from '../Header/header';
import { redrawTaskListDOM } from '../Task/taskDOM';
import { getListContainer } from './main';
import './main.css';

export function createMain() {
    const main = document.createElement("main");
    main.id = "mainContainer";

    return main;
}

export function redrawMainDOM(){
    document.getElementById("mainContainer").replaceChildren();
    getListContainer().forEach(element => {
        createList(element);
        redrawTaskListDOM(element);
    });
}