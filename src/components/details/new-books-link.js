import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import bookService from "../../services/book/book-service";
import './details.css'

const BuyNewBooks = () => {
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
    const [searchTitle, setSearchTitle] = useState("")
    const history = useHistory()
    useEffect(() => {
        bookService.findBookById(ID)
            .then(result => setBook(result))
    },[ID])
    const ISBN13 = book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.map(
        keys => {
            if (keys.type === "ISBN_13") return keys.identifier
        }
    ).filter(i => i!== undefined)
    return(
        <>
        <div className="RyCxoe" aria-level="3" role="heading">
            Buy A New One
        </div>
        <div>
            <div className="row">
                <div className="col-6">
                    <h4 className="col-title">Google Play Books</h4>
                </div>
                <div className="col-4 float-lg-right">
                    {(book.saleInfo.retailPrice === undefined)? "Currently Not Available" : `${book.saleInfo.retailPrice.amount}$`}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <h4 className="col-title">Buy it on Amazon</h4>
            </div>
            <div className="col-4 float-lg-right">
                <a className="btn btn-primary"
                   href={`https://www.amazon.com/s?k=${ISBN13}&i=stripbooks&linkCode=qs`}
                   role="button">Go to Amazon</a>
            </div>
        </div>
        </>
    )
}
export default BuyNewBooks