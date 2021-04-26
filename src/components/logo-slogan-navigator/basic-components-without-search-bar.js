import React, {useEffect, useState} from "react";
import './logo-slogan.css';
import Navigator from "./navigator";
import './logo-slogan.css';
import userService from "../../services/user/users-service";
import NavigatorSignIn from "./navigator_signin";

const BasicComponentsWithoutSearchBar = ({user}) => {
    console.log(user)
    // const [user,setUser]=useState({
    //     username: "",
    //     password: "",
    //     email: "",
    //     firstName: "",
    //     lastName: "",
    //     address: "",
    //     city: "",
    //     country: "",
    //     postalCode: "",
    //     aboutMe: "...",
    //     following: [],
    //     followedBy: [],
    //     liked: [],
    //     comments: [],
    //     sold: []
    // });
    // useEffect(() => {
    //     const interval=setInterval(()=>{
    //         userService.profile()
    //             .then(current => {
    //                 userService.findUserByName(current.username)
    //                     .then(currentUser => {setUser(currentUser)})
    //             })},5000)
    //     return()=>clearInterval(interval)
    // },[])

    return(
        <div>
        <div className="row">
            <div className="col-6">
                <h1 className="namecolor">Book Universe.com</h1>
            </div>
            <div className="col-6"></div>
        </div>
            {(user.role === "buyer" || user.role === "seller") ? <NavigatorSignIn/> : <Navigator/>}
        </div>
        )
}

export default BasicComponentsWithoutSearchBar;

