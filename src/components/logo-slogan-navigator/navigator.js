import React, {useEffect, useState} from "react";
import './logo-slogan.css'
import {Link, useParams} from "react-router-dom";
import userService from "../../services/user/users-service"

const Navigator = () => {
    const [role, setRole] = useState()
    const transfer = (role) => {
        if (role == undefined) {
            role = "guest"
        }
        return role
    }
    return(
        <div className="row">
            <div className="col-6">
                <h2 className="slogancolor">Where inspirations are created</h2>
            </div>
            <div className="col-6">
                <ul className="nav tabsize">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href={"/homepage/"}>Home</a>
                        {/*<a className="nav-link active" aria-current="page" href={"/homepage/" + transfer(role)}>Home</a>*/}
                    </li>
                    <li className="nav-item">
                        <Link to={"/aboutus"}>
                            <a className="nav-link active" aria-current="page" href="#" >Our Mission</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/SignUp">Sign up</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/SignIn">Sign in</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigator
