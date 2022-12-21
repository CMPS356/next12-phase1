const fs = require('fs');
let _students = require('../data/parent-student.json');
import { randomUUID } from 'crypto';

export function getStudents(){
    return _students;
}

export function getStudentById(id){
    return _students?.find(s => s.id == id) || "STUDENT DOES NOT EXIST"
}

export function createStudents(parent_student){
    const id = randomUUID()
    _students.push({id,...parent_student})
    saveData()
}

export function updateStudent(studentId, student){
    const index = _students.findIndex(s => s.students.find(s => s.studentId == studentId))
    const studentIndex = _students[index].students.findIndex(s => s.studentId == studentId)

    _students[index].students[studentIndex] = student
    saveData()
}

export function deleteStudents(studentId){
    const index = _students.findIndex(s => s.students.find(s => s.studentId == studentId))
    const studentIndex = _students[index].students.findIndex(s => s.studentId == studentId)

    _students[index].students.splice(studentIndex,1)
    
    if(_students[index].students.length==0)
    _students.splice(index,1)
    saveData()
}

function saveData() {
    fs.writeFileSync('data/parent-student.json', JSON.stringify(_students, null, 4));
}






// export function addStudents(parent_student){
//     const id = randomUUID()
//     students.push({id,...parent_student})
//     saveData()
// }


