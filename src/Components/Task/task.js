import * as date from '../Date/date.js';

export default class Task {
    id;
    title;
    description;
    dueDate;
    priority;
    pastDue;

    constructor(id, title, priority, dueDate, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = date.newDate(dueDate);
        this.priority = priority;
        this.isPastDue();
    }

    get id() {
        return this.id;
    }

    get title() {
        return this.title;
    }

    get description() {
        return this.description;
    }

    get dueDate() {
        return this.dueDate;
    }

    get priority() {
        return this.priority;
    }

    get pastDue() {
        return this.pastDue;
    }

    set id(id) {
        this.id = id;
    }

    set title(title) {
        this.title = title;
    }

    set description(description) {
        this.description = description;
    }

    set dueDate(dueDate) {
        this.dueDate = date.newDate(dueDate);
        this.isPastDue();
        this.setDaysLeft();
    }

    set priority(priority) {
        this.priority = priority;
    }

    isPastDue() {
        const diff = date.diffDate(this.dueDate);
        if (diff < 0) {
            this.pastDue = true;
        } else {
            this.pastDue = false;
        }
    }
}