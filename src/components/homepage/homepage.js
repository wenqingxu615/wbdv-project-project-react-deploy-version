import React, {useEffect, useState} from 'react'
import './seller-homepage.css'
import './buyer-homepage.css'
import './homepage.css'
import './guest-homepage.css'
import '../components.css'
import HomepageSearchBar from "./home-page-search-bar";
import BasicComponentsWithoutSearchBar from "../logo-slogan-navigator/basic-components-without-search-bar";
import {useParams} from "react-router-dom";
import userService from "../../services/user/users-service";



const Homepage = () => {
    // const {role} = useParams()

    const transfer = (role) => {
        switch (role) {
            case "buyer":
                return (
                    <label className="buyer-sentence">
                        {`Welcome back! You have commented on ${user.comments.length} books and liked ${user.liked.length} books. Find more for yourself!`}
                    </label>
                )
            case "seller":
                return (
                    <label className="seller-sentence">
                        Welcome back! You have made {user.sold.length} offers in history. Find more for yourself!
                    </label>
                )
            default:
                return (<label className="guest-sentence">
                    Welcome to BookUniverse! There are {totalUser} registered members here. Come on and join us!
                </label>)

        }
    }

    const [user, setUser] = useState({});
    const [totalUser, setTotalUser] = useState("")
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const load = async () => {
    //         setLoading(true)
    //         const res = await userService.profile()
    //         const u = await userService.findUserByName(res.username)
    //         await setUser(u)
    //         const t = await userService.count()
    //         await setTotalUser(t)
    //         if (t) setLoading(false)
    //     }
    //     load()
    //
    // }, [])
    useEffect(() => {
        userService.profile()
            .then(current => {
                console.log(current)
                if (current === 0){
                    setUser({role:"guest"})
                    setLoading(false)
                }else{
                userService.findUserByName(current.username)
                    .then(currentUser => {
                        setUser(currentUser)
                        setLoading(false)
                    }
                )}
            })
        userService.count()
            .then(x => setTotalUser(x.length))

    }, [])
    // useEffect(() => {
    //     const interval=setInterval(()=>{
    //         userService.profile()
    //             .then(current => {
    //                 userService.findUserByName(current.username)
    //                     .then(currentUser => {
    //                         setUser(currentUser)})
    //             })},100)
    //     return()=>clearInterval(interval)
    // },[])

    if (loading) {
        return <div>loading...</div>
    } else {

        return (
            <div className="bg-pic">
                <BasicComponentsWithoutSearchBar user={user}/>
                <hr className="horizontal-line"/>
                <div className="row">
                    {transfer(user.role)}

                </div>
                <HomepageSearchBar role={transfer(user.role)}/>

            </div>

        )
    }
}


export default Homepage
















// import React from 'react'
// import BasicComponentsWithoutSearchBar from "../../logo-slogan-navigator/basic-components-without-search-bar";
// import HomepageSearchBar from "../home-page-search-bar";
// import './guest-homepage.css'
//
// const GuestHomepage = () => {
//     return(
//         <div className="bg-pic">
//             <BasicComponentsWithoutSearchBar/>
//             <hr className="horizontal-line"/>
//             <div className="row">
//                 <label className="guest-sentence">
//                     Welcome to BookUniverse! There are 25648 registered members here. Come on and join us!
//                 </label>
//             </div>
//             <HomepageSearchBar/>
//
//         </div>
//
//     )
// }
//
// export default GuestHomepage