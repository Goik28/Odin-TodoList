class List {
    taskContainer = [];
    name;

    constructor(name) {
        this.name = name;
    }

    get name() {
        return this.name;
    }

    get taskContainer() {
        return this.taskContainer;
    }

    set name(name) {
        this.name = name;
    }

    addTask(Task) {
        this.taskContainer.push(Task);
    }

    removeTask(Task) {
        this.taskContainer.splice(Task - 1, 1);
    }

    totalTasks() {
        return this.taskContainer.length;
    }

    totalTasksDue() {
        //logic for returning only the late tasks
    }
}