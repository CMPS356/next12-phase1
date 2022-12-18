const fs = require('fs');
let _announcements = require('../data/announcements.json');
import { randomUUID } from 'crypto';

export function getAnnouncements(){
    return _announcements;
}

export function getAnnouncementById(id){
    return _announcements?.find(a => a.id == id) || "ANNOUNCEMENT DOES NOT EXIST"
}

export function createAnnouncement(announcement){
    const id = randomUUID()
    _announcements.push({id,...announcement})
    saveData()
}

export function updateAnnouncement(announcementId, announcement){
    const index = _announcements.findIndex(a => a.id == announcementId)

    _announcements[index] = announcement
    saveData()
}

export function deleteAnnouncement(id){
    const index = _announcements.findIndex(an => an.id == id)

    _announcements.splice(index,1)
    saveData()
}

function saveData() {
    fs.writeFileSync('data/announcements.json', JSON.stringify(_announcements, null, 4));
}






// export function addStudents(parent_student){
//     const id = randomUUID()
//     students.push({id,...parent_student})
//     saveData()
// }


