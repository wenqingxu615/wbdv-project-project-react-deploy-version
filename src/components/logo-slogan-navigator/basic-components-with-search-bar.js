import React, {useEffect, useState} from "react";
import UpperSearchBar from "./upper-search-bar";
import Navigator from "./navigator";
import './logo-slogan.css'
import userService from "../../services/user/users-service";
import NavigatorSignIn from "./navigator_signin";


const BasicComponentsWithSearchBar = () =>{
    const [user,setUser]=useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: "...",
        following: [],
        followedBy: [],
        liked: [],
        comments: [],
        sold: []
    });
    useEffect(() => {
            userService.profile()
                .then(current => {
                    userService.findUserByName(current.username)
                        .then(currentUser => {
                            setUser(currentUser)})})} ,[])
    return(
        <>
            <div className="row">
                <div className="col-6">
                    <h1 className="namecolor">Book Universe.com</h1>
                </div>
                <div className="col-6">
                    <div className="row">
                        <UpperSearchBar/>
                    </div>
                </div>
            </div>
            {(user.role === "buyer" || user.role === "seller") ? <NavigatorSignIn/> : <Navigator/>}
        </>

    )
}

export default BasicComponentsWithSearchBar