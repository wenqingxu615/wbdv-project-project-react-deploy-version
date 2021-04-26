import React, {useEffect, useState} from "react";
import SignInSearchBar from "../logo-slogan-navigator/signin_search_bar";
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import Card from "./card";
import userService from "../../services/user/users-service";
import {useParams} from "react-router-dom";


const Following=()=>{
    const [signIn,setSignIn]=useState(false)
    const {userId}=useParams()
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
    const [otherUser,setOtherUser]=useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: "",
        following: [],
        followedBy: [],
        liked: [],
        comments: [],
        sold: []
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        userService.profile()
            .then(current => {
                if (current === 0) {
                    setSignIn(false)
                    userService.findUserByName(userId)
                        .then(response => {
                            setOtherUser(response)
                        })
                    setLoading(false)
                }
                else {
                    setSignIn(true)
                    userService.findUserByName(current.username)
                        .then(currentUser => {
                            setUser(currentUser)
                            if (userId) {
                                // console.log("have userId")
                                userService.findUserByName(userId)
                                    .then(response => {
                                        setOtherUser(response)

                                    })
                            }
                            setLoading(false)
                        })
                }
            })
    },[])
    if (loading) {return <div>loading...</div>}
    else{
    return(
        <>
            <div className="bg-pic">
                {signIn &&
                <SignInSearchBar/>}
                {!signIn &&
                <BasicComponentsWithSearchBar/>}


                <hr className="horizontal-line"/>
                <br/>
                <br/>
                <div className='row'>
                    {!userId&&  user.following && user.following.map(username=>
                        <Card username={username} />)}
                    {userId && otherUser.following && otherUser.following.map(username=>
                        <Card username={username} />)}
                </div>
            </div>
        </>
    )
}}

export default Following