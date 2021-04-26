import React, {useEffect, useState} from "react";
import './logo-slogan.css'
import {Link, useHistory, useParams} from "react-router-dom";
import userService from "../../services/user/users-service"

const NavigatorSignIn = () => {
    const history = useHistory()
    const logout = () => {
        userService.logout()
            .then( r => {
                console.log(r)
                history.push("/homepage")})
    }
    const [role, setRole] = useState()
    // useEffect(() => {
    //     const interval=()=>{
    //         userService.profile()
    //             .then(current => {
    //                 userService.findUserByName(current.username)
    //                     .then(currentUser => {
    //                         setRole(currentUser.role)})
    //             })
    //     }
    //     return()=>clearInterval(interval)
    // },[])

    // const transfer = (role) => {
    //     if (role == undefined) {
    //         role = "guest"
    //     }
    //     return role
    // }
    return(
        <div className="row">
            <div className="col-6">
                <h2 className="slogancolor">Where inspirations are created</h2>
            </div>
            <div className="col-6">
                <ul className="nav tabsize">
                    <li className="nav-item">
                        {/*<a className="nav-link active" aria-current="page" href={"/homepage/" + transfer(role)}>Home</a>*/}
                        <a className="nav-link active" aria-current="page" href={"/homepage"}>Home</a>
                    </li>
                    <li className="nav-item">
                        <Link to={"/aboutus"}>
                        <a className="nav-link active" aria-current="page" href="#" >Our Mission</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                           onClick={() => {logout()} }>logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavigatorSignIn
