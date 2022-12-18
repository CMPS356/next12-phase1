const fs = require('fs');
let _tasks = require('../data/tasks.json');
import { randomUUID } from 'crypto';

export function getTasks(){
    return _tasks;
}

export function getTaskById(id){ 
    return _tasks?.find(t => t.taskId == id) || "TASK DOES NOT EXIST" // For updating
}

export function createTask(task){ 
    const taskId = randomUUID()
    console.log("repo " + {taskId,...task}.studentId)
    _tasks.push({taskId,...task})
    saveData()
}

export function updateTask(taskId, task){
    const index = _tasks.findIndex(t => t.taskId == taskId)
    _tasks[index] = task

    console.log(task)
    saveData()
}

export function deleteTask(taskId){
    const index = _tasks.findIndex(t => t.taskId == taskId)
    _tasks.splice(index,1)

    saveData()
}

function saveData() {
    fs.writeFileSync('data/tasks.json', JSON.stringify(_tasks, null, 4));
}

