import './main.css';

export default createMain();

function createMain() {
    const main = document.createElement("main");
    main.appendChild(createListbtn());
    return main;
}

function createListBtn() {
    const newListBtn = document.createElement("button");
    newListBtn.textContent = "Create new list";

    return newListBtn;
}




function populateMain(array){

}