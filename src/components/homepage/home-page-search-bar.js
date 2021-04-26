import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import './homepage.css'

const HomepageSearchBar = ({role}) => {
    const [searchTitle, setSearchTitle] = useState("")
    const history = useHistory()
    return(
        <div className="row">
            <label className="col-3 hello-text">
                Hello,
            </label>
            <div className="col-7 search-bar input-group input-group-lg">
                <input
                    type="text"
                    onChange={(event) => {
                        setSearchTitle(event.target.value)}}
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    placeholder="What are you looking for?"
                    value={searchTitle}/>
            </div>

            <div className="col-2 search-button">
                <button type="button"
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => {history.push(`/search/${searchTitle}`)
                            // onClick={() => {history.push(`/${role}/search/${searchTitle}`)
                        }}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default HomepageSearchBar
