import React, { useEffect, useState } from "react";
import './Home.css';
import light from '../images/light.png';

const Home = () => {

    const [userName, setUserName] = useState();

    const [show,setShow] = useState(false);

    const userHomePage = async () => {

        try {
        
            const res  = await fetch('/getdata', {
                method :"GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            });

            const data  = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch (error) {

            console.log(error);
        
        }

    }

    useEffect(() => {
        userHomePage();
    },[]);


    return (
        <>
            <div className="home-page">
                <div className="home-div">

                    <div className="home-image">

                        <img src={light} alt="light"/>

                    </div>

                    <div className="home-text">
                   
                    <p className="pt-5" id="welcome">Welcome</p>

                    <h1 className='users'>{userName}</h1>

                    <h2 className='web'> {show ? 'Happy , to see you back' : 'We Are The Mern Developer'} </h2>

                    </div>
                
                </div>
            </div>
        </>
    );
};

export default Home;
