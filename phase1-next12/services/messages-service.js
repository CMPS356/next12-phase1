import { fetchHandler } from '../util/fetchHandler'

export const messageService = {
    getAll,
    getById,
    create,
    update,
    removeMessage
};

let port = "3000"
let baseUrl = `http://localhost:${port}/api/messages`

function getAll() {
    return fetchHandler.get(baseUrl);
}

function getById(id) {
    return fetchHandler.get(`${baseUrl}/${id}`);
}

function create(params) {
    console.log(params)
    return fetchHandler.post(baseUrl, params);
}

function update(id, params) {
    return fetchHandler.put(`${baseUrl}/${id}`, params);
}

function removeMessage(id) {
    console.log(id)
    return fetchHandler.remove(`${baseUrl}/${id}`);
}
