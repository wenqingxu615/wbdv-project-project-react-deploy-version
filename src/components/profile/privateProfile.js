import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import SignInSearchBar from "../logo-slogan-navigator/signin_search_bar";
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import './profile.css'
import '../components.css'
import userService from '../../services/user/users-service'
import PrivateProfileEdit from "./privateProfile_edit";
import PublicProfile from './publicProfile'


const PrivateProfile = () => {
    const [signIn,setSignIn]=useState(false);
    const {userId}= useParams();
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
    return(
        <div className="bg-pic">
            {signIn &&  <SignInSearchBar/>}
            {!signIn && <BasicComponentsWithSearchBar/>}
            {/*{currentUser.role*/}
            {/*<SignInSearchBar/>*/}

            <hr className="horizontal-line"/>
            <br/>
            <br/>

            <h1 className=" text-gray welcome-sentence">Profile Page</h1>
            <div className="container-fluid padding">
                <div className=" mb-3 row ">
                    <div className="col-4">
                        <div className="card card-profile shadow">

                            <div className="card-header">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">
                                        <h2>Profile</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                <div className="text-center">
                                    <h3>
                                        {!userId &&
                                            user.username
                                        }
                                        {userId &&
                                            otherUser.username}<span className="font-weight-light"></span>
                                    </h3>

                                    <div className="col">
                                        <div className="row md-3">
                                            <div className='col-4'>
                                                <h6>
                                                    {!userId &&
                                                    <Link to={"/followedby"}>
                                                        {user.followedBy.length}
                                                    </Link>
                                                    }
                                                    {userId &&
                                                    <Link to={`/${userId}/followedby`}>
                                                        {otherUser.followedBy.length}
                                                    </Link>
                                                    }
                                                    <span>&nbsp;&nbsp;</span>
                                                    followers
                                                </h6>

                                            </div>
                                            <div className='col-4'>
                                                <h6>
                                                    {!userId &&
                                                    <Link to={"/following"}>
                                                        {user.following.length}
                                                    </Link>
                                                    }
                                                    {userId &&
                                                    <Link to={`/${userId}/following`}>
                                                        {otherUser.following.length}
                                                    </Link>}
                                                    <span>&nbsp;&nbsp;</span>
                                                        following
                                                </h6>

                                            </div>
                                            <div className='col-4'>
                                                <h6>
                                                    {!userId &&
                                                    <Link to={"/comments"}>
                                                        {user.comments.length}
                                                    </Link>
                                                    }
                                                    {userId &&
                                                    <Link to={`/${userId}/comments`}>
                                                        {otherUser.comments.length}
                                                    </Link>}
                                                    <span>&nbsp;&nbsp;</span>
                                                    review
                                                </h6>
                                            </div>
                                            {/*<div className='col-3'>*/}

                                            {/*    <h6>*/}
                                            {/*        {!userId &&*/}
                                            {/*        <Link to={"liked"}>*/}
                                            {/*            {user.liked.length}*/}
                                            {/*        </Link>*/}
                                            {/*        }*/}
                                            {/*        {userId &&*/}
                                            {/*        <Link to={"liked"}>*/}
                                            {/*            {otherUser.liked.length}*/}
                                            {/*        </Link>}*/}
                                            {/*        <span>&nbsp;&nbsp;</span>*/}
                                            {/*        likes*/}
                                            {/*    </h6>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p>description</p>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !userId &&
                        <PrivateProfileEdit/>
                    }
                    {
                        userId &&
                        <PublicProfile/>
                    }



                </div>
            </div>

            {/*<div className="row">*/}
            {/*    {*/}
            {/*        role==='guest' &&*/}
            {/*            <guest_profile role={role}/>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        role==='buyer' &&*/}
            {/*        <nonGuest role={role}/>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        role==='seller' &&*/}
            {/*        <nonGuest role={role}/>*/}
            {/*    }*/}

            {/*</div>*/}
        </div>
    )

}

export default PrivateProfile





