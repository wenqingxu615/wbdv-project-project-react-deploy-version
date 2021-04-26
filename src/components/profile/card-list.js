import React, {useState} from "react";
import {Link} from "react-router-dom";
import SignInSearchBar from "../logo-slogan-navigator/signin_search_bar";
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import Card from "./card";


const CardList=({input})=>{
    const [signIn,setSignIn]=useState({})

    return (
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
                        input.map(username=>
                        <Card username={username} />)
                    }
                </div>
                </div>
        </>
    )
}

export default CardList