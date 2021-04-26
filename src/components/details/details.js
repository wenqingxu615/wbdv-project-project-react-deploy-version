import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import bookService from '../../services/book/book-service'
import "./details.css"
import '../components.css'
import BasicComponentsWithSearchBar from "../logo-slogan-navigator/basic-components-with-search-bar";
import BuyNewBooks from "./new-books-link";
import UserCommentInput from "./user-comment-input";
import BuyUsedBooks from "./used-books-link";
import UserLikes from "./user-likes";
import userService from "../../services/user/users-service";
import UserCommentArea from "./user-comment-area";
import localBookService from "../../services/book/local-book-service"
import SoldBooksList from "./selling-list";
import offerService from "../../services/offer/offer-service";

const Details = () => {
    const [book, setBook] = useState({
        id: "",
        volumeInfo: {
            description: "",
            authors: [],
            industryIdentifiers: [
            ],
            title: "",
            subtitle: "",
            publisher: "",
            publishedDate: "",
            pageCount: 0,
            imageLinks: {
                thumbnail: "",
                small: "",
            },
        },
        saleInfo: {
            retailPrice: {
                amount: "",
            },
        },
    })
    const {ID} = useParams()
    const [user,setUser]=useState({});
    const [loading, setLoading] = useState(true);
    const [local, setLocal] =useState({});
    const [offers,setOffers] = useState({});
    const [selling, setSelling] = useState({});
    useEffect(() => {
            setLoading(true);
            bookService.findBookById(ID)
            .then(b => {setBook(b)
                offerService.findOfferByID(ID)
                    .then(response => {
                        console.log(response)
                        setSelling(response)
                    })
                userService.profile()
                    .then((u) => {
                            console.log(u)
                            if (u === 0) {
                                setUser({})
                                localBookService.createLocalBook(ID)
                                    .then(r => {
                                        localBookService.findLocalBookById(ID)
                                            .then(localBook => {


                                                setLocal(localBook)
                                                setLoading(false)
                                            })

                                    })
                            } else {
                                userService.findUserByName(u.username)
                                    .then(currentUser => {
                                        setUser(currentUser)
                                        offerService.findOfferByUsername(currentUser.username)
                                            .then(o => setOffers(o))
                                        localBookService.createLocalBook(ID,b.volumeInfo.title)
                                            .then(r => {
                                                localBookService.findLocalBookById(ID)
                                                    .then(localBook => {
                                                        setLocal(localBook)
                                                        setLoading(false)
                                                    })

                                            })
                                    })

                            }
                        }
                    )
            })


            },[])

    const pic =
        book.volumeInfo.imageLinks === undefined ?
            "" : `${book.volumeInfo.imageLinks.thumbnail}`

    const ISBN13 = book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.map(
        keys => {
            if (keys.type === "ISBN_13") return keys.identifier
        }
    ).filter(i => i!== undefined)

    if (loading) {return <div>loading...</div>}
else {
        return (
            <div className='bg-pic-1'>
                <BasicComponentsWithSearchBar user={user}/>
                <br className="horizontal-line"/>
                <hr/>

                <div className="detail-content">
                    <div className="detail-book-title card-title">
                        {book.volumeInfo.title}
                    </div>
                    <section className='card' style={{width: '90rem', margin: '50px'}}>
                        <div className="row">
                            <div className="col-sm-4 hidden-xs" role="complementary">
                                <div>
                                    <img className="detail-img" title={book.volumeInfo.title} src={pic}/>
                                </div>

                            </div>
                            <div className="book-info col-xs-8 col-sm-8 hidden-xs">
                                <h4><strong>Authors:</strong>{book.volumeInfo.authors}</h4>
                                <h4>
                                    <strong>ISBN-10:</strong>{book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.map(
                                    keys => {
                                        if (keys.type === "ISBN_10") return keys.identifier
                                    }
                                )}</h4>
                                <h4><strong>ISBN-13:</strong>{ISBN13}</h4>
                                <h4><strong>Published Date:</strong>{book.volumeInfo.publishedDate}</h4>
                                <h4><strong>Publisher:</strong>{book.volumeInfo.publisher}</h4>
                                <h4><strong>Total Pages:</strong>{book.volumeInfo.pageCount}</h4>
                            </div>
                        </div>

                        <div className="detail-blocks">
                            {user.role == "buyer" && <BuyUsedBooks offers = {selling}/>}

                            {user.role == "seller" &&
                            <div>
                            <label className="RyCxoe"
                                                             aria-level="3"
                                                             role="heading">
                                I want to sell it!
                                <Link to={`/details/${ID}/sell`}>
                                    <button className='float-right btn btn-primary '>
                                        Sell
                                    </button>
                                </Link>

                            </label>
                                <SoldBooksList user = {user}
                                offers = {offers}/>
                            </div>}
                            <br/>
                            <BuyNewBooks/>
                            <br/>
                            <UserLikes user = {user}
                            item={local}
                            />
                            <UserCommentInput user={user}
                            item={local}/>
                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

export default Details