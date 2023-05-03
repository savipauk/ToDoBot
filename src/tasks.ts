import { User } from 'discord.js';
import fs from 'fs';

const tasksFile = "tasks.json";

export type Task = {
    id: number;
    description: string;
    assignee: string;
}

// TODO: throw this shit into a database


export function AddTask(description: string, assignee: string): number {
    let id = FindLastId();

    _AddTask({ id, description, assignee });

    return id;
}

export function RemoveTask(id: number): Task {
    let tasks = GetTasks();

    FlushTasks();

    // TODO: THROW SOMETHING IF TASK DOESNT EXIST ITS NOT HANDLED YET

    let removedTask: Task = null;

    for (let task of tasks) {
        if (task.id == id) {
            removedTask = task;
            continue;
        }

        _AddTask(task);
    }

    return removedTask;
}

export function SetAssignee(id: number, assignee: User): Task {
    let tasks = GetTasks();
    FlushTasks();

    let editedTask: Task = null;

    for (let task of tasks) {
        if (task.id == id) {
            if (assignee != undefined) task.assignee = assignee.id;
            editedTask = task;
        }

        _AddTask(task);
    }

    return editedTask;
}

export function SetDescription(id: number, description: string): Task {
    let tasks = GetTasks();
    FlushTasks();

    let editedTask: Task = null;

    for (let task of tasks) {
        if (task.id == id) {
            task.description = description;
            editedTask = task;
        }

        _AddTask(task);
    }

    return editedTask;
}

export function GetTaskById(id: number): Task {
    let tasks = GetTasks();

    for (let task of tasks) {
        if (task.id == id) {
            return task;
        }
    }

    return null;
}

function FindLastId() {
    let tasks = GetTasks();

    let id: number = 0;

    // TODO: throw this shit into a database so you dont have to poll tasks every time
    if (tasks.length != 0) {
        for (let t of tasks) {
            if (t.id >= id) {
                id = t.id + 1;
            }
        }
    }

    return id;
}

function _AddTask(task: Task) {
    let tasks = GetTasks();
    tasks.push(task);

    let json = { tasks: tasks }

    fs.writeFileSync(tasksFile, JSON.stringify(json), { flag: "w+" });
}

export function GetTasks(): Task[] {
    return (JSON.parse(fs.readFileSync(tasksFile).toString())).tasks;
}

export function FlushTasks() {
    let tasks = { tasks: [] };

    fs.writeFileSync(tasksFile, JSON.stringify(tasks), { flag: "w+" })
}

export function TasksToString() {
    let tasks = GetTasks();
    let tasksString = "";

    for (let task of tasks) {
        tasksString += `${task.description}, by <@${task.assignee}> | ${task.id}\n`;
    }

    tasksString += "\n";

    return tasksString;
}