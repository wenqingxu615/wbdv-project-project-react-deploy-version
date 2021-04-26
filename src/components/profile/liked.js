import React, {useEffect, useState} from "react";
import SignInSearchBar from "../logo-slogan-navigator/signin_search_bar";
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import Card from "./card";
import userService from "../../services/user/users-service";


const Liked = () => {
    const [signIn,setSignIn]=useState({})
    const [user,setUser]=useState({});

    useEffect(() => {
        userService.profile()
            .then(current => {
                userService.findUserByName(current.username)
                    .then(currentUser => {
                        setUser(currentUser)})
            })},[])
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
                    {
                        user.liked && user.liked.map(username=>
                            <Card username={username} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Liked