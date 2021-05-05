import React, { useState } from 'react'
import './Signup.css';
import signpic from '../images/cartoon.jpg';
import { NavLink , useHistory } from 'react-router-dom';

const Signup = () => {

    const history = useHistory(); 

    const [user,setUser] = useState({

        name : "" , email : "" , phone : "", work : "" , password: "" , cpassword : ""

    });

    let name,value;

    const handleInputs = (e) => {

        console.log(e);

        name = e.target.name;

        value = e.target.value;

        setUser({ ...user , [name]: value })

    }

    const PostData = async (e) => {

        e.preventDefault();

        const {name , email , phone , work , password , cpassword } = user;

        const res = await fetch('/register', {
            method : "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({

                name , email , phone , work , password , cpassword

            })
        });

        const data  = await res.json();

        if(data.status === 422 || !data ){

            window.alert('Invalid Registration');

            console.log("Invalid Registration");
        }else {

            window.alert("Registration Successful");

            console.log("Successful Registration");

            history.push("/login");
        }


    } 


    return (
        <>

            <section className="signup">

                <div className="container mt-5">

                    <div className="signup-content">

                        <div className="signup-form">

                            <h2 className="form-title">Signup</h2>

                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">

                                    <label htmlFor="name">

                                        <i className="zmdi zmdi-account material-icons-name"></i>

                                    </label>

                                    <input type="text" name="name" id="name" autoComplete="off" 
                                     value={user.name}
                                     onChange={handleInputs}
                                     placeholder="Your Name" />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="email">

                                        <i className="zmdi zmdi-email material-icons-name"></i>

                                    </label>

                                    <input type="text" name="email" id="email" autoComplete="" 
                                     value={user.email}
                                     onChange={handleInputs}
                                     placeholder="Your Email" />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="phone">

                                        <i className="zmdi zmdi-phone material-icons-name"></i>

                                    </label>

                                    <input type="number" name="phone" id="phone" autoComplete="" 
                                     value={user.phone}
                                     onChange={handleInputs}
                                     placeholder="Your Phone" />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="work">

                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>

                                    </label>

                                    <input type="text" name="work" id="work" autoComplete="" 
                                     value={user.work}
                                     onChange={handleInputs}           
                                     placeholder="Your Profession" />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="password">

                                        <i className="zmdi zmdi-lock material-icons-name"></i>

                                    </label>

                                    <input type="password" name="password" id="password" autoComplete="" 
                                     value={user.password}
                                     onChange={handleInputs}
                                     placeholder="Your Password" />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="cpassword">

                                        <i className="zmdi zmdi-lock material-icons-name"></i>

                                    </label>

                                    <input type="password" name="cpassword" id="cpassword" autoComplete="" 
                                     value={user.cpassword}
                                     onChange={handleInputs}
                                     placeholder="Confirm Your Password" />

                                </div>

                                <div className="form-group form-button">

                                    <input type="submit" name="signup" id="signup" className="form-submit"

                                        value="register" onClick={PostData}

                                    />

                                </div>

                            </form>

                        </div>

                        <div className="signup-image">

                            <figure>

                                <img src={signpic} alt="pics" />

                            </figure>

                            <NavLink to='/login' className='signup-image-link'>I am already register</NavLink>

                        </div>




                    </div>

                </div>

            </section>


        </>
    )
}

export default Signup
