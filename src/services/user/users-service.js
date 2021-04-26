const USER_API = process.env.REACT_APP_NODE_SERVER_URL;

const profile = () => {
    return fetch(`${USER_API}/api/users/profile`, {
        method: "POST",
        credentials: "include"
    }).then(response => response.json())
}


const login = (credentials) => {
    return fetch(`${USER_API}/api/users/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const register = (credentials) => {
    return fetch(`${USER_API}/api/users/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const findUserByName = (name) => {
    return fetch(`${USER_API}/api/users/${name}`)
        .then(response => response.json())
}

const updateUser = (updated) => {
    return fetch(`${USER_API}/api/users/profile`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(updated),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}
// const clickFollow = (userA,userB) =>{
//     return fetch(`${USER_API}/${userA}/${userB}`, {
//         method: "POST",
//         credentials: "include"
//     })
//         .then(response => response.json())
// }

const logout = () => { return fetch(`${USER_API}/api/users/logout`, {
    method: "POST",
    credentials: "include"
}).then(response => response)}

const count = () => {
    return fetch(`${USER_API}`)
        .then(response => response.json())
}
export default {
    register, login, logout, profile,findUserByName,updateUser,count
}