import './main.css';

export default createMain;

function createMain() {
    const main = document.createElement("main");
    main.id = "mainContainer";
    return main;
}