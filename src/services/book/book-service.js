


export const findBookByTitle = (title) =>
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then(response => response.json())

export const findBookById = (id) =>
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(response => response.json())




export default {
    findBookByTitle,
    findBookById
}