export const fetchHandler = {
    get,
    post,
    put,
    remove
};

function get(url) {
    const reqOptions = {
        method: 'GET'
    };
    return fetch(url, reqOptions).then(handleResponse);
}

function post(url, body) {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, reqOptions).then(handleResponse);
}

function put(url, body) {
    const reqOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, reqOptions).then(handleResponse);
}

function remove(url) {
    const reqOptions = {
        method: 'DELETE'
    };
    return fetch(url, reqOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
