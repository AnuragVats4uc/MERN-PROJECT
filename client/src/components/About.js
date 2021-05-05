import React, { useEffect, useState } from 'react'
import './About.css';
import dp from '../images/dp.jpg';
import { useHistory } from 'react-router-dom';

const About = () => {

    const history = useHistory();

    const [userData , setUserData] = useState({});

    const callAboutPage = async () => {

        try {
            
            const res  = await fetch('/about',{

                method : "GET",

                headers : {

                    Accept : "application/json",

                    "Content-Type" : "application/json"
                },

                credentials : "include"

            });

            const data = await res.json();

            console.log(data);

            setUserData(data);
            
            if(!res.status === 200 ) {

                const error = new Error(res.error);

                throw error;

            }


        } catch (error) {
            
            console.log(error);

            history.push('/login');
        }

    }
 

    useEffect(() => {
        callAboutPage();
    });



    return (
        <>

            <div className="container emp-profile">

                <form method="GET" className="profile_form">

                    <div className="row" id='row2'>

                        <div className="col-md-4">

                            <div className="dp-image">

                                <img src={dp} alt="dp"/>
                            
                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="profile-head">

                                <h5>{ userData.name }</h5>

                                <h6>{ userData.work }</h6>

                                <p className="profile-rating mt-3 mb-5">Rankings <span>1/10</span></p>

                                <ul className="nav nav-tabs" role="tablist">

                                    <li className="nav-item">

                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            href="#home"
                                            data-bs-toggle="tab"
                                            role="tab"
                                        >
                                            About
                                    </a>

                                    </li>

                                    <li className="nav-item">

                                        <a className="nav-link active"
                                            id="profile-tab"
                                            href="#profile"
                                            data-bs-toggle="tab"
                                            role="tab">Timeline</a>

                                    </li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-md-2">

                            <input type="text" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />

                        </div>

                    </div>

                    <div className="row" id="row3">

                        {/* left side url */}


                        <div className="col-md-4">

                            <div className="profile-work">

                                <p>Work Link</p>

                                <a href="https://www.youtube.com" target="_anurag">YouTube</a> <br />

                                <a href="https://www.youtube.com" target="_anurag">Instagram</a> <br />

                                <a href="https://www.youtube.com" target="_anurag">Anurag Vats</a> <br />

                                <a href="https://www.youtube.com" target="_anurag">Mern Developer</a> <br />

                                <a href="https://www.youtube.com" target="_anurag">Web Developer</a> <br />

                                <a href="https://www.youtube.com" target="_anurag">Software Developer</a> <br />

                            </div>

                        </div>

                        {/* right side data toggle */}

                        <div className="col-md-8 pl-5 about-info">

                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label id="profile-details">User ID</label>

                                        </div>

                                        <div className="col-md-6">

                                            <label id="profile-details-list">{userData._id}</label>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label id="profile-details">Name</label>

                                        </div>

                                        <div className="col-md-6">

                                            <label id="profile-details-list">{userData.name}</label>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label id="profile-details">Email</label>

                                        </div>

                                        <div className="col-md-6">

                                            <label id="profile-details-list">{userData.email}</label>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label id="profile-details">Phone</label>

                                        </div>

                                        <div className="col-md-6">

                                            <label id="profile-details-list">{userData.phone}</label>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label id="profile-details">Profession</label>

                                        </div>

                                        <div className="col-md-6">

                                            <label id="profile-details-list">{userData.work}</label>

                                        </div>

                                    </div>

                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                
                                    <div className="row">
                                    
                                        <div className="col-md-6">
                                        
                                            <label>Experience</label>

                                        </div>

                                        <div className="col-md-6">
                                        
                                            <p>Expert</p>

                                        </div>

                                    </div>


                                    <div className="row mt-3">
                                    
                                        <div className="col-md-6">
                                        
                                            <label>Hourly Rate</label>

                                        </div>

                                        <div className="col-md-6">
                                        
                                            <p>100$/hr</p>

                                        </div>

                                    </div>

                                    <div className="row mt-3">
                                    
                                        <div className="col-md-6">
                                        
                                            <label>Total Projects</label>

                                        </div>

                                        <div className="col-md-6">
                                        
                                            <p>100</p>

                                        </div>

                                    </div>

                                    <div className="row mt-3">
                                    
                                        <div className="col-md-6">
                                        
                                            <label>Englis Level</label>

                                        </div>

                                        <div className="col-md-6">
                                        
                                            <p>Expert</p>

                                        </div>

                                    </div>

                                    <div className="row mt-3">
                                    
                                        <div className="col-md-6">
                                        
                                            <label>Availability</label>

                                        </div>

                                        <div className="col-md-6">
                                        
                                            <p>6 Months</p>

                                        </div>

                                    </div>

                                </div>


                                </div>
                        </div>
                    </div>
                </form>
            </div>



        </>
    )
}

export default About
