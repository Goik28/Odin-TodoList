export default class List {
    id;
    name;
    taskContainer = [];

    constructor(id, name = "New List") {
        this.id = id;
        this.name = name;
    }

    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get taskContainer() {
        return this.taskContainer;
    }

    set id(id) {
        this.id = id;
    }

    set name(name) {
        this.name = name;
    }

    addTask(Task) {
        this.taskContainer.push(Task);
    }

    getTask(index) {
        return this.taskContainer[index];
    }

    removeTask(task) {
        this.taskContainer.splice(this.taskContainer.indexOf(task), 1);
    }

    orderTasks() {
        this.taskContainer.sort((a, b) => {
            return b.priority - a.priority;
        });
    }

    totalTasks() {
        if (this.taskContainer.length === undefined) {
            return 0;
        } else {
            return this.taskContainer.length;
        }
    }

    totalDueTasks() {
        if (this.taskContainer.length === undefined) {
            return 0;
        } else {
            const pastDue = this.taskContainer.filter((value) => {
                return value.pastDue;
            });
            return pastDue.length;
        }
    }
}