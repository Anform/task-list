
import React from 'react';
import Firebase from "./Firebase"
import { useState, useEffect } from "react"


const Hero = ({user, logout, names, isCompany}) => {


    const [userInfo, setUserInfo] = useState(({company: false, emailname: "", name: ""}))

    useEffect(() => {
        const array = names.filter((val) => {
            if(val.emailname.toLowerCase().includes(user.email.toLowerCase()))
            {
                return val
            }
        })
        setUserInfo(array[0])
        console.log(userInfo)
    });

    
    return (
        <section className = "hero">
            <nav>
                {userInfo && userInfo.name ? (
                    <div>
                        <h2>Welcome: {userInfo.name} </h2>
                        <button onClick = {logout}>Logout</button>
                    </div>
                ) : ( 
                    <>
                    </>
                )}
            </nav>
            <Firebase user = {user} userInfo = {userInfo} isCompany = {isCompany}></Firebase>
        </section>
    )
}

export default Hero;