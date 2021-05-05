import React, { useEffect, useState } from "react";
import './Contact.css'

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {

    try {

      const res = await fetch('/getdata', {

        method: "GET",

        headers: {

          "Content-Type": "application/json"

        },

      });

      const data = await res.json();

      console.log(data);

      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {

        const error = new Error(res.error);

        throw error;

      }


    } catch (error) {

      console.log(error);

    }

  }


  useEffect(() => {
    userContact();
  }, []);


  // we are storing data in states

  const handleInputs = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value })

  }

  //send the data to backend
    const contactForm = async (e) =>{

      e.preventDefault();

      const {name,email,phone,message} = userData;

      const res = await fetch('/contact',{
          method:"POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name,email,phone,message
          })
      });

      const data = await res.json();

      if(!data) {
        console.log("mesage not send");
      }else{
        alert("Message send");
        setUserData({...userData, message:""});
      }

    }



  return (
    <>
      <div className="contact-info" id="contact-info">
        <div className="container-fluid" id="container-contact">
          <div className="row" id="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between" id="contact-details">
              {/* phone number */}

              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />

                <div className="content_info_content">
                  <div className="contact_info_title">Phone</div>

                  <div className="contact_info_text">{userData.phone}</div>
                </div>
              </div>

              {/* email number */}

              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />

                <div className="content_info_content">
                  <div className="contact_info_title">Email</div>

                  <div className="contact_info_text">
                    {userData.email}
                  </div>
                </div>
              </div>

              {/* address number */}

              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />

                <div className="content_info_content">
                  <div className="contact_info_title">Address</div>

                  <div className="contact_info_text">Ghaziabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}

      <div className="contact_form" id="contact_form">
        <div className="container" id="container_contact">
          <div className="row" id="row1">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-3">
                <div className="contact_form_title">Get In Touch</div>

                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      required="true"
                    />

                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required="true"
                    />

                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone Number"
                      required="true"
                    />
                  </div>

                  <div className="contact_form_text mt-4">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button"
                      onClick={contactForm}
                      >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
