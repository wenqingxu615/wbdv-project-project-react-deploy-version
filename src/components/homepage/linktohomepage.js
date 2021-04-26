import React from 'react'
import {Link} from "react-router-dom";

export default () =>
    <>
        <h1>Homepage</h1>
        <div className="list-group">
            <Link to="/homepage" className="list-group-item">
                Book Universe
            </Link>

        </div>
    </>