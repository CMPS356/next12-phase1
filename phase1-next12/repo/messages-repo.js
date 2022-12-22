const fs = require('fs');
let _messages = require('../data/messages.json');
import { randomUUID } from 'crypto';

export function getMessages(){
    return _messages;
}

export function getMessageById(id){
    return _messages?.find(m => m.id == id) || "MESSAGE DOES NOT EXIST"
}

export function createMessage(message){
    const id = randomUUID()
    _messages.push({id,...message})
    saveData()
}

export function updateMessage(messageId, message){
    const index = _messages.findIndex(m => m.id == messageId)

    _messages[index] = message
    saveData()
}

export function deleteMessage(id){
    const index = _messages.findIndex(m => m.id == id)

    _messages.splice(index,1)
    saveData()
}

function saveData() {
    fs.writeFileSync('data/messages.json', JSON.stringify(_messages, null, 4));
}






// export function addStudents(parent_student){
//     const id = randomUUID()
//     students.push({id,...parent_student})
//     saveData()
// }


