import './header.css'
export default createHeader;

const text1 = "Your to-do list!";

function createHeader() {
    const header = document.createElement('header');
    const about = document.createElement('div');
    about.textContent = text1;

    header.appendChild(about);
    header.appendChild(createListBtn());

    return header;
}

function createListBtn() {
    const newListBtn = document.createElement("button");
    newListBtn.className = "header-button";
    newListBtn.id = "newListButton";
    newListBtn.textContent = "+ Create new list";

    return newListBtn;
}