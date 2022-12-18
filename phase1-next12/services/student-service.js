import { fetchHandler } from '../util/fetchHandler'

export const studentService = {
    getAll,
    getById,
    create,
    update,
    removeStudent,
    create
};

let port = "3000"
let baseUrl = `http://localhost:${port}/api/students`

function getAll() {
    return fetchHandler.get(baseUrl);
}

function getById(id) {
    return fetchHandler.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchHandler.post(baseUrl, params);
}

function update(id, params) {
    return fetchHandler.put(`${baseUrl}/${id}`, params);
}

function removeStudent(id) {
    return fetchHandler.remove(`${baseUrl}/${id}`);
}
