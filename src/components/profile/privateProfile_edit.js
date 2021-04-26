import React, {useEffect, useState} from "react";
import './profile.css'
import '../components.css'
import userService from "../../services/user/users-service"

const PrivateProfileEdit = () =>{
    const [editing,setEditing]=useState(false)
    const [cachedItem, setCachedItem] = useState({})
    const update = () => {
        userService.updateUser(cachedItem)
            .then(response => console.log(response))

    }
    useEffect(() => {
        userService.profile()
            .then(currentUser => {
            userService.findUserByName(currentUser.username)
                .then(current => setCachedItem(current))
            })

    },[])
    return (
        <>

            {!editing &&
            <>
                <div className='col-8 padding'>
                    <div className='card'>
                        <div className='card-header bg-white'>
                            <div className='mb-3 row row-padding'>
                                <div className='col-8'>
                                    <h3>My account</h3>
                                </div>
                                <div className="col-4 ">
                                    <i onClick={() => setEditing(true)}
                                       className="btn btn-sm btn-primary float-right">Edit Profile</i>
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
                                               value = {cachedItem.username}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label">Email address</label>
                                        <input type="email"
                                               className="form-control form-control-alternative"
                                               value={cachedItem.email}/>

                                    </div>
                                </div>
                            </div>
                            <div className='row row-padding'>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-control-label">First name</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               placeholder="First name" value={cachedItem.firstName}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group ">
                                        <label className="form-control-label">Last name</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               placeholder="Last name" value={cachedItem.lastName}/>
                                    </div>
                                </div>
                            </div>

                            <h6 className="heading-small text-muted mb-4">Contact information</h6>
                            <div className="row row-padding">
                                <div className="col-md-12">
                                    <div className="form-group ">
                                        <label className="form-control-label">Address</label>
                                        <input
                                            className="form-control form-control-alternative"
                                            placeholder="Home Address" value={cachedItem.address} type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-padding">
                                <div className="col-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label">City</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               placeholder="City" value={cachedItem.city}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label">Country</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               placeholder="Country" value={cachedItem.country}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Postal code</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               value={cachedItem.postalCode}/>
                                    </div>
                                </div>
                            </div>
                            <h6 className="heading-small text-muted mb-4">About me</h6>

                            <div className="form-group">
                                <label>About Me</label>
                                <textarea rows="4" className="form-control form-control-alternative"
                                          placeholder="A few words about you ..."
                                          value={cachedItem.aboutMe}
                                ></textarea>
                            </div>

                        </div>
                    </div>
                </div>
            </>}

            {editing &&
            <>
                <div className='col-8 padding'>
                    <div className='card'>
                        <div className='card-header bg-white'>
                            <div className='mb-3 row row-padding'>
                                <div className='col-8'>
                                    <h3>My account</h3>
                                </div>
                                <div className="col-4 ">
                                    <i onClick={() => {
                                        setEditing(false)
                                        update()
                                    }}
                                       className="btn btn-sm btn-primary float-right">Save</i>
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
                                               value={cachedItem.username}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label">Email address</label>
                                        <input type="email"
                                               className="form-control form-control-alternative"
                                               value={cachedItem.email}/>

                                    </div>
                                </div>
                            </div>
                            <div className='row row-padding'>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-control-label">First name</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                                onChange={(e) =>
                                                    setCachedItem({
                                                        ...cachedItem,
                                                        firstName: e.target.value
                                                    })}
                                               value={cachedItem.firstName}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group ">
                                        <label className="form-control-label">Last name</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               onChange={(e) =>
                                                   setCachedItem({
                                                       ...cachedItem,
                                                       lastName: e.target.value
                                                   })}
                                               value={cachedItem.lastName} />
                                    </div>
                                </div>
                            </div>

                            <h6 className="heading-small text-muted mb-4">Contact information</h6>
                            <div className="row row-padding">
                                <div className="col-md-12">
                                    <div className="form-group ">
                                        <label className="form-control-label">Address</label>
                                        <input
                                            className="form-control form-control-alternative"
                                           type="text"
                                            onChange={(e) =>
                                                setCachedItem({
                                                    ...cachedItem,
                                                    address: e.target.value
                                                })}
                                            value={cachedItem.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row row-padding">
                                <div className="col-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label">City</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               onChange={(e) =>
                                                   setCachedItem({
                                                       ...cachedItem,
                                                       city: e.target.value
                                                   })}
                                               value={cachedItem.city}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label">Country</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               onChange={(e) =>
                                                   setCachedItem({
                                                       ...cachedItem,
                                                       country: e.target.value
                                                   })}
                                               value={cachedItem.country}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Postal code</label>
                                        <input type="text"
                                               className="form-control form-control-alternative"
                                               onChange={(e) =>
                                                   setCachedItem({
                                                       ...cachedItem,
                                                       postalCode: e.target.value
                                                   })}
                                               value={cachedItem.postalCode}/>
                                    </div>
                                </div>
                            </div>
                            <h6 className="heading-small text-muted mb-4">About me</h6>

                            <div className="form-group">
                                <label>About Me</label>
                                <textarea rows="4" className="form-control form-control-alternative"
                                          placeholder="I am a book lover"
                                          onChange={(e) =>
                                              setCachedItem({
                                                  ...cachedItem,
                                                  aboutMe: e.target.value
                                              })}
                                          value={cachedItem.aboutMe}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

        </>

    )
}

export default PrivateProfileEdit