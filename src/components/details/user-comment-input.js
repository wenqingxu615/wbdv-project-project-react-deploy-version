import React, {useEffect, useState} from "react";
import './details.css'
import userService from "../../services/user/users-service";
import localBookService from "../../services/book/local-book-service";
import {Link} from "react-router-dom"


const UserCommentInput = ({user,
                          item,
                          }) => {
    const update = () =>{
        userService.updateUser(cachedUser)
            .then(r => console.log(r))
        localBookService.updateLocalBook(book)
            .then(r => console.log(r))
    }
const [cachedUser,setCachedUser] = useState(user)
const [comment,setComment] = useState("")
    const [book, setBook] = useState(item)
    useEffect(() => {
    },[])
    return(
        <div>
        <div>
        <label className="RyCxoe"
               aria-level="3"
               role="heading">
            Comment area
        </label>
            <div>
                <div className="temp">

                    {/*<Link to={"/public/profile"}>*/}
                    {/*    <label>*/}
                    {/*        Zoey*/}
                    {/*    </label>*/}
                    {/*</Link>*/}
                    {/*<label>*/}
                    {/*    :Wow! I like it!*/}
                    {/*</label>*/}

                    <div className="list-group">
                        {
                            book.commentedBy && book.commentedBy.map(c => {
                                return (
                                    <div className="list-group-item">
                                    <div className="row">
                                     <div className="col-1">
                                        <Link to ={`/profile/${c.username}`}>
                                            {c.username}
                                        </Link>

                                     </div>
                                        <div className="col-8">
                                            <h3>{c.comment}</h3>
                                        </div>
                                {/*        {c.username === user.username &&*/}
                                {/*            <div className="col-2">*/}
                                {/*    <button className="btn btn-danger"*/}
                                {/*            onClick={() => {*/}
                                {/*                //const idToDelete1 = user.comments.find((k) => (k.comment === c.comment))._id*/}
                                {/*                const userComment = user.comments.filter((k) => (k.comment !== c.comment))*/}
                                {/*                setCachedUser(cachedUser => ({...cachedUser,comments: userComment}))*/}
                                {/*                //const idToDelete2 = book.commentedBy.find((k) => (k.comment === c.comment))._id*/}
                                {/*                const commentList = book.commentedBy.filter((k) => (k.comment !== c.comment))*/}
                                {/*                console.log(commentList)*/}
                                {/*                setBook(book => ({...book,commentedBy: commentList}))*/}

                                {/*            }}*/}
                                {/*    >*/}
                                {/*        delete comment*/}
                                {/*    </button>*/}
                                {/*</div>}*/}
                                    </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>

                {(user.role == "buyer" || user.role == "seller") &&
                <>
                    <label className="RyCxoe"
                         aria-level="3"
                         role="heading">
                    Leave your ideas about this book...
                </label>
                    <br/>
                    <textarea className='write-comment'
                    onChange={(e) => setComment(e.target.value)
                    }>

                            </textarea>
                    <br/>
                    <button
                        className='btn btn-primary float-right '
                        onClick={() => {
                            const userComment = user.comments.push({book: item, comment: comment})
                            setCachedUser(cachedUser => ({...cachedUser,userComment}))
                            const commentList = book.commentedBy.push({username:user.username, comment: comment})
                            setBook(book => ({...book,commentList}))
                            update()
                            }}>
                        Submit
                    </button>
                </>
                }
            </div>
    )

}
export default UserCommentInput