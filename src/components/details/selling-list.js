import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './details.css'
import localBookService from "../../services/book/local-book-service"
import offerService from "../../services/offer/offer-service"
import userService from "../../services/user/users-service";

const SoldBooksList = ({user,offers}) => {
    //const [offers, setOffers] = useState([])
    const {ID} = useParams()
    const [loading,setLoading] = useState(true)
    const [cachedOffers,setCachedOffers] = useState(offers)
    //const [cachedUser, setCachedUser] = useState(user)
    console.log(offers)
    const deleteOffer = (offerToDelete) => {
        offerService.deleteOffer(offerToDelete).then(r => console.log(r))
        //userService.updateUser(cachedUser).then(r=>console.log(r))
    }

    return(
        <>
            <div className="RyCxoe"
                 aria-level="3"
                 role="heading">
                The offer you are making for this book
            </div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <h4 className="col-title">Offers:</h4>
                    </div>
                    <div className="col-6 float-lg-right">
                        {/*<label>*/}
                        {/*    $20 -------*/}
                        {/*</label>*/}
                        {/*<Link to={"/public/profile"}>*/}
                        {/*    <label>*/}
                        {/*        Zoey*/}
                        {/*    </label>*/}
                        {/*</Link>*/}

                        <div className="list-group">
                            {
                                cachedOffers.filter(x =>{
                                if(x.bookId === ID) return true
                                else return false
                            }).map(offer => {
                                    return (
                                        <div className="list-group-item">
                                            <div>
                                                <h4 className="">{offer.soldBy}</h4>

                                                <h4 className="">{offer.price}</h4>
                                            </div>
                                            <div className="float-right">
                                            <button className="btn btn-danger"

                                                    onClick={() => {
                                                        setCachedOffers(cachedOffers.filter(o => {
                                                            if (o._id != offer._id) return true
                                                            else return false
                                                        }))

                                                        deleteOffer(offer)
                                                        alert("Successfully deleted!")
                                                    }}
                                            >
                                                delete
                                            </button>
                                            </div>
                                        </div>
                                    )
                                })
                                // offers
                            }
                        </div>






                    </div>
                </div>
            </div>
        </>
    )
}
export default SoldBooksList