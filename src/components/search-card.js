import React, {useState, useEffect} from 'react'
import localBookService from '../services/book/local-book-service'
import './components.css';

const SearchCard=(book) => {
    const [inLocal, setInLocal] = useState({})
    useEffect(() => {
        localBookService.findLocalBookById(book.book.id)
            .then(local => setInLocal(local))
    })


    const authors =
        book.book.volumeInfo.authors === undefined ?
            "Unknown" : `${book.book.volumeInfo.authors}`;

    const pic =
        book.book.volumeInfo.imageLinks === undefined ?
            "" : `${book.book.volumeInfo.imageLinks.thumbnail}`;



    return (
        <>

            <section className='card' style={{width: '35rem', margin: '5px'}}>
                <div className='row'>
                    <div className='col-5'>
                        <a className='image-link ' href={`/details/{book.id}`}>
                            <img className="img-responsive"
                                 style={{width: 240, height: 360}}
                                 src={pic}/>
                        </a>
                    </div>
                    <div className='col-7'>
                        <div className='card-body'>

                            <h3 className='card-title'><a
                                title={book.book.volumeInfo.title}
                                href={`/details/${book.book.id}`}>
                                {book.book.volumeInfo.title}
                            </a></h3>

                            <h6>
                                <dt><strong>Author:</strong> {authors}</dt>
                                <dt><strong>Published Date:</strong>{book.book.volumeInfo.publishedDate}

                                </dt>
                            </h6>
                        </div>

                        <div className="col-sm card-body">
                            <label>
                                {inLocal.likedBy &&
                                <dt><strong>Likes:</strong>{inLocal.likedBy.length}</dt>}
                                {!inLocal.likedBy && <dt><strong>Likes:</strong>0</dt>}

                            </label>
                            <br/>
                            <label>
                                {inLocal.commentedBy &&
                                <dt><strong>Comments:</strong>{inLocal.commentedBy.length}
                                </dt>}
                                {!inLocal.commentedBy && <dt><strong>Comments:</strong>0</dt>}
                            </label>
                        </div>

                        <div className="col-sm text-align-center card-body">
                            <a
                                className="btn btn-primary btn-info"
                                href={`/details/${book.book.id}`}>Learn More</a>
                            {/*href={`/${role}/details/${book.id}`}>Learn More</a>*/}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SearchCard