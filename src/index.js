import './index.css';
import { createHeader } from './Components/Header/header';
import createFooter from './Components/Footer/footer.js';
import { createMain } from './Components/Main/mainDOM.js';

document.body.appendChild(createHeader());
document.body.appendChild(createMain());
document.body.appendChild(createFooter());