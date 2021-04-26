import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import userService from '../services/user/users-service'
import BasicComponentsWithoutSearchBar from "./logo-slogan-navigator/basic-components-without-search-bar";

const SignUp = () => {
    const [credentials, setCredentials] = useState({username: '', password: '', email: '', role: "buyer"})
    const [verify, setVerify] = useState(null)
    const history = useHistory()
    const register = () => {
        if (credentials.password !== verify){
            alert("Password must be the same")
        }
        userService.register(credentials)
            .then((user) => {
                console.log(user)
                if(user === 0) {
                    alert("username already taken")
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
                <h1>Join the Book Universe Today!</h1>
                <br/>
                <br/>
                <div className="mb-3 row">
                    <label htmlFor="usernameFld" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="usernameFld"
                               onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                        />
                    </div>
                </div>


                <div className="mb-3 row">
                    <label htmlFor="passwordFld" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"
                               id="passwordFld"
                               onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                        />
                    </div>
                </div>


                <div className="mb-3 row">
                    <label htmlFor="verifyPasswordFld" className="col-sm-2 col-form-label">verify password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"
                               id="verifyPasswordFld"
                               onChange={(e) => {setVerify(e.target.value)}}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="emailFld" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input  className="form-control"
                               id="emailFld"
                                onChange={(e) => {setCredentials({...credentials, email: e.target.value})}}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="roleFld" className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="roleFld" onChange={(e) => {setCredentials({...credentials, role: e.target.value})}}>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor='registerBtn' className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <a href="#">
                            <button className="btn btn-primary btn-block"
                                    id="registerBtn"
                                    onClick={register}
                            >Sign Up
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp