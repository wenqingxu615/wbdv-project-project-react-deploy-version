import {React, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import "./details.css"
import '../components.css'
import "../homepage/homepage.css"
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import localBookService from "../../services/book/local-book-service"
import bookService from "../../services/book/book-service";
import userService from "../../services/user/users-service";
import offerService from "../../services/offer/offer-service"

const SellBooks = () => {
    const {ID} = useParams();
    const history = useHistory();
    const [user,setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState("");
    // const [offer, setOffer] = useState({bookId:ID,soldBy:"",price:""});

    const update = () =>{
        userService.updateUser(user)
            .then(r => console.log(r))

        offerService.createOffer({bookId:ID,soldBy:user.username,price:price})
            .then(r => console.log(r))
    }


    useEffect(() => {
        setLoading(true);
        userService.profile()
            .then(u => {
                userService.findUserByName(u.username)
                    .then(currentUser => {
                        setUser(currentUser)
                        // setOffer(offer =>({...offer,soldBy:user.username}))
                        setLoading(false)
                            })
                    })

            }

    ,[])



    if (loading) {return <div>loading...</div>}
    return(
        <div className="bg-pic">
            <BasicComponentsWithSearchBar/>
            <hr className="horizontal-line"/>
            <div className="row">
                <label className="col-3 hello-text">
                    Price
                </label>
                <div className="col-7 search-bar input-group input-group-lg">
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Input a selling price"
                        onChange={(e) => setPrice(e.target.value)}
                   />
                </div>
                <div className="col-2 search-button">
                    <button type="button"
                            className="btn btn-outline-primary btn-lg"
                            onClick={() => {
                                const soldList = user.sold.push(price)
                                setUser(user => ({...user, soldList}))
                                const p = price
                                console.log(p)
                                // setOffer(offer => ({...offer,price:p}))
                                update()

                                history.push(`/details/${ID}`)
                            }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SellBooks