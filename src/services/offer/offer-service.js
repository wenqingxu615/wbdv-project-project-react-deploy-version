const OFFER_API = process.env.REACT_APP_NODE_SERVER_URL;

const createOffer = (offer) => {
    return fetch(`${OFFER_API}/api/offers/create`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(offer),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const findOfferByID = (bookId) => {
    return fetch(`${OFFER_API}/api/offers/book/${bookId}`)
        .then(response => response.json())
}


const findOfferByUsername = (soldBy) => {
    return fetch(`${OFFER_API}/api/offers/user/${soldBy}`)
        .then(response => response.json())
}

const deleteOffer = (offer) => {
    return fetch(`${OFFER_API}/api/offers/delete/${offer._id}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(offer),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}


export default {
    createOffer,
    findOfferByID,
    findOfferByUsername,
    deleteOffer
}