import fs from 'fs';

export type Task = {
    id: number;
    description: string;
    asignee: string;
}

// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database


export function AddTask(description: string, asignee: string) {
    let id = FindLastId();

    _AddTask({ id, description, asignee });
}

export function RemoveTask(id) {
    let tasks = GetTasks();

    FlushTasks();

    // TODO: THROW SOMETHING IF TASK DOESNT EXIST ITS NOT HANDLED YET

    for (let task of tasks) {
        if (task.id == id) {
            continue;
        }

        _AddTask(task);
    }
}


function FindLastId() {
    let tasks = GetTasks();

    // TODO: throw this shit into a database
    // TODO: throw this shit into a database
    // TODO: throw this shit into a database
    let id: number = 0;

    // TODO: throw this shit into a database
    // TODO: throw this shit into a database
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

    fs.writeFileSync("tasks.json", JSON.stringify(json), { flag: "w+" });
}

export function GetTasks(): Task[] {
    return (JSON.parse(fs.readFileSync("tasks.json").toString())).tasks;
}

export function FlushTasks() {
    let tasks = { tasks: [] };

    fs.writeFileSync("tasks.json", JSON.stringify(tasks), { flag: "w+" })
}

export function TasksToString() {
    let tasks = GetTasks();
    let tasksString = "";

    for (let task of tasks) {
        tasksString += `${task.description}, by <@${task.asignee}> | ${task.id}\n`;
    }

    tasksString += "\n";

    return tasksString;
}

// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
// TODO: throw this shit into a database
