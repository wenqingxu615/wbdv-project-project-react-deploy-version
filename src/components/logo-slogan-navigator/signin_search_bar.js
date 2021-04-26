import React from "react";
import UpperSearchBar from "./upper-search-bar";
import NavigatorSignIn from "./navigator_signin";
import './logo-slogan.css'


const SignInSearchBar = () =>{
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
            <NavigatorSignIn/>
        </>

    )
}
export default SignInSearchBar