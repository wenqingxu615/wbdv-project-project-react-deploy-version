import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import './logo-slogan.css'

const UpperSearchBar = () => {
    const [searchTitle, setSearchTitle] = useState("")
    const history = useHistory()
    const {role} = useParams()
    const transfer = (role) => {
        if (role == undefined) {
            role = "guest"
        }
        return role
    }
    return(
        <>
            <div className="col-8 textsearchbar input-group input-group-lg">
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

            <div className="col-4 textsearchbutton">
                <button type="button"
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => {history.push(`/search/${searchTitle}`)}}>
                    {/*onClick={() => {history.push(`/${transfer(role)}/search/${searchTitle}`)}}>*/}
                    Search
                </button>
            </div>
        </>
    )
}

export default UpperSearchBar