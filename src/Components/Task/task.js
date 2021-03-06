import * as date from '../Date/date.js';

export default class Task {
    title;
    description;
    dueDate;
    priority;
    pastDue;

    constructor(title, priority, dueDate, description) {
        this.title = title;
        this.description = description;
        this.dueDate = date.newDate(dueDate);
        this.priority = priority;
        this.isPastDue();
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

    set title(title) {
        this.title = title;
    }

    set description(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = date.newDate(dueDate);
        this.isPastDue();
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