import React from "react";
import {Link} from "react-router-dom";

const Card =({username})=>{
    return (
        <>
            <div className='card' style={{width: '18rem', margin: '15px'}}>
                <div className='card-body'>
                    <h5 className='card-title'>
                        <Link to={`/profile/${username}`}> {username}</Link>
                    </h5>
                </div>

            </div>
        </>

    )
}

export default Card