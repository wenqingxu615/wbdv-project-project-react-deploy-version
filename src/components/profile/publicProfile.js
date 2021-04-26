import React, {useEffect, useState} from 'react'
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import signin_search_bar from "../logo-slogan-navigator/signin_search_bar";
import SignInSearchBar from "../logo-slogan-navigator/signin_search_bar";
import userService from "../../services/user/users-service";
import {useParams} from "react-router-dom";

const PublicProfile=()=>{
    const [cachedItem, setCachedItem] = useState({})
    const {userId}= useParams();
    const [user, setUser] = useState({})
    const [following, setFollowing] =useState(false)
    const update = () => {

        userService.updateUser(cachedItem)
            .then(response => {
                userService.updateUser(user)
                    .then(r => window.location.reload())
            })
    }
    useEffect(() => {

        userService.findUserByName(userId)
            .then(cuser => {
                setCachedItem(cuser)
            })
        userService.profile()
            .then(current => {
                userService.findUserByName(current.username)
                    .then(currentUser => {

                        setUser(currentUser)
                        if(JSON.stringify(currentUser.following).indexOf(userId) > -1){
                            setFollowing(true)
                        }
                    })
    })
    },[])

    return (
        <>

                    <div className='col-8 padding'>
                        <div className='card'>
                            <div className='card-header bg-white'>
                                <div className='mb-3 row row-padding'>
                                    <div className='col-8'>
                                        <h3>My account</h3>
                                    </div>

                                </div>
                            </div>

                            <div className='card-body shadow'>
                                <h6 className="heading-small text-muted ">User information</h6>
                                <div className='row row-padding'>
                                    <div className='col-6'>
                                        <div className="form-group focused">
                                            <label className="form-control-label">Username</label>
                                            <input type="text"
                                                   className="form-control form-control-alternative"
                                                   placeholder="Username" value={cachedItem.username}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Email address</label>
                                            <input type="email"
                                                   className="form-control form-control-alternative"
                                                   placeholder="123@gmail.com"
                                                   value={cachedItem.email}
                                            />

                                        </div>
                                    </div>
                                </div>



                                <h6 className="heading-small text-muted mb-4">About me</h6>

                                <div className="form-group">
                                    <label>About Me</label>
                                    <textarea rows="4" className="form-control form-control-alternative"
                                              placeholder="A few words about you ..."
                                              value={cachedItem.aboutMe}
                                    />
                                </div>

                                {
                                    !following && user.username &&
                                    <div className="d-flex justify-content-between">
                                        {<a href="#" className="btn btn-sm btn-info float-right"
                                            onClick={() => {
                                                const newList = cachedItem.followedBy.push(user.username)
                                                setCachedItem(cachedItem => ({...cachedItem, newList}))
                                                const newFollow = user.following.push(userId)
                                                setUser(user => ({...user, newFollow}))
                                                update()
                                                setFollowing(true)
                                            }}
                                        >Follow</a>}
                                    </div>
                                }
                                {following && user.username &&
                                        <h5>You have followed this user.</h5>
                                }
                            </div>


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
        </>

    )
}

export default PublicProfile