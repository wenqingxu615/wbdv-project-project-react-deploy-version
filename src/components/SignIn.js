import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import BasicComponentsWithoutSearchBar from "./logo-slogan-navigator/basic-components-without-search-bar";
import userService from "../services/user/users-service"


const SignIn = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const history = useHistory()
    const login = () => {
        userService.login(credentials)
            .then((user) => {
                console.log(user)
                if(user === 0) {
                    alert("login failed, try again")
                } else {
                    history.push("/profile")
                }
            })
    }

    return(
        <div className="bg-pic">
            <BasicComponentsWithoutSearchBar user={{role:"guest"}}/>
        <hr className="horizontal-line"/>
        <br/>
        <br/>
            <div className="container">
                <h1>Welcome to the Book Universe </h1>
                <br/>
                <br/>
                <div className="mb-3 row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-8">
                        <input className="form-control"
                               id="username"
                               onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                               placeholder="please enter your username"/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-8">
                        <input type="password" className="form-control"
                               id="password" placeholder="please enter your password"
                               onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10 button">
                            <button
                                    className="btn btn-primary btn-block "
                                    type="button"
                                    id="signinBtn"
                                    onClick={() => {login()}}>
                                Sign in
                            </button>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10 button">
                        <Link to ={"/signup"}>
                            <button
                                className="btn btn-primary btn-block"
                                type="button"
                                id="signupBtn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default SignIn
