import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import './details.css'
import localBookService from "../../services/book/local-book-service"
import userService from "../../services/user/users-service";


const UserLikes = ({
    user,
    item,
                   }) => {
    const history = useHistory()
    const [book, setBook] = useState(item);

    const {ID} = useParams()

    const [cachedUser,setCachedUser]=useState(user);
    const [liked,setLiked] =useState(false);
    // const [loading,setLoading] = useState(false);
    useEffect(() => {
        if (JSON.stringify(item.likedBy).indexOf(user.username) > -1)
            setLiked(true)
    })

    const update = () =>{
        userService.updateUser(cachedUser)
            .then(r => console.log(r))
        localBookService.updateLocalBook(book)
            .then(r => console.log(r))
    }
    const transfer = (role) => {
        switch (role) {
            case "buyer":
            case "seller":
                return (
                    <div>
                        {!(liked) &&
                        <button
                            className='btn btn-primary'
                            onClick={() => {
                                const newList = cachedUser.liked.push(book)
                                setCachedUser(cachedUser => ({...cachedUser, newList}))
                                const newLike = book.likedBy.push(cachedUser.username)
                                setBook(book => ({...book, newLike}))
                                setLiked(false)
                                update()
                            }}>
                            Like
                        </button>
                        }
                        {liked &&
                        <h6>You have liked this book.</h6>
                        }
                    </div>
                )
            default:
                return(
                    <button
                    className='btn btn-primary'
                    onClick={() => {
                        alert("You haven't registered yet")
                        history.push("/signup")}}>
                    Like
                </button>
                )
        }}

    return(
        <div className="row">
            <div className="col-6">
                <label className="RyCxoe"
                       aria-level="3"
                       role="heading">
                    {/*This book is liked by <Link to={`/${ID}/likes`}> 53 </Link> users*/}
                    This book is liked by {book.likedBy.length} users
                    <ul>
                        {
                            book.likedBy && book.likedBy.map(
                                user => {
                                    return(<>
                                        { (user === cachedUser.username) &&
                                        <li>{user} (You)</li>
                                        }
                                            {(user !== cachedUser.username) &&
                                                <li>
                                            <Link to={`/profile/${user}`}>
                                                {user}</Link>
                                                </li>
                                            }
                                        </>
                                    )
                            })
                        }
                    </ul>

                </label>
            </div>
            <div className="col-6">
                {/*{(user.role == "buyer" || role == "seller") &&*/}
                {/*<button*/}
                {/*    className='btn btn-primary'*/}
                {/*    onClick={() => {alert("Thank you for your sharing")}}>*/}
                {/*    Like*/}
                {/*</button>}*/}

                {/*{role == "guest" &&*/}
                {/*<button*/}
                {/*    className='btn btn-primary'*/}
                {/*    onClick={() => {*/}
                {/*        alert("You haven't registered yet")*/}
                {/*        history.push("/signup")}}>*/}
                {/*    Like*/}
                {/*</button> }*/}
                {transfer(cachedUser.role)}
            </div>
        </div>
    )

}
export default UserLikes