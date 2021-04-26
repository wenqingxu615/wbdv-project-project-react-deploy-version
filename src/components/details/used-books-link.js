import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './details.css'
import localBookService from "../../services/book/local-book-service"
import offerService from "../../services/offer/offer-service"

const BuyUsedBooks = ({offers}) => {
    const [cachedOffers, setCachedOffers] = useState(offers)
    // const {ID} = useParams()
    console.log(cachedOffers)
    return(
        <>
            <div className="RyCxoe"
                 aria-level="3"
                 role="heading">
                Buy A Used One
            </div>
            <div>
                <div className="row">
                    <div className="col-6">
                        <h4 className="col-title">Sellers:</h4>
                    </div>
                    <div className="col-4 float-lg-right">
                        {/*<label>*/}
                        {/*    $20 -------*/}
                        {/*</label>*/}
                        {/*<Link to={"/public/profile"}>*/}
                        {/*    <label>*/}
                        {/*        Zoey*/}
                        {/*    </label>*/}
                        {/*</Link>*/}

                        <ul>
                            {
                                cachedOffers.map(offer => {
                                    return (
                                        <li>
                                            <h4>
                                                Seller:
                                                {offer.soldBy}
                                            <span>&nbsp;&nbsp;</span>
                                                Price:
                                            {offer.price}
                                            </h4>
                                        </li>
                                    )
                                })
                            }
                        </ul>






                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyUsedBooks