import './footer.css';
export default createFooter;

const text = `Created by<a href="https://github.com/Goik28"> Goik28 </a>for the To-do List project on The Odin Project course`;


function createFooter() {
    const footer = document.createElement('footer');
    const description = document.createElement('div');
    description.innerHTML = text;
    footer.appendChild(description);
    return footer;
}