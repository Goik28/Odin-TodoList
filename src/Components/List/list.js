export default class List {
    id;
    name;
    taskContainer = [];

    constructor(id) {
        this.id = id;
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

    removeTask(Task) {
        this.taskContainer.splice(Task - 1, 1);
    }

    totalTasks() {
        return this.taskContainer.length;
    }

    totalDueTasks() {
        //logic for returning only the late tasks
        const pastDue = this.taskContainer.filter((value) => {
            return value.pastDue;
        });
        return pastDue.length;
    }
}