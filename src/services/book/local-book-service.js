

const BOOK_API = process.env.REACT_APP_NODE_SERVER_URL;

const findLocalBookById = (id) => {
    return fetch(`${BOOK_API}/api/local/${id}`)
        .then(response => response.json())
}

const createLocalBook = (id,title) => {
    const newBook = {_id: id,title:title}
    return fetch(`${BOOK_API}/api/local/${id}/create`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newBook),
        headers: {
            'content-type': 'application/json'
        }

    })

}

const updateLocalBook = (updated) =>{
    return fetch(`${BOOK_API}/api/local/profile`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(updated),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}


export default {
    findLocalBookById, createLocalBook,updateLocalBook
}