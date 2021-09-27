import React, { Component } from "react";
import headerImg from "../../header.png";

/*
 * This class represents the "Thank you" page
 */

class ThankYou extends Component {
    constructor() {
        super();
    }

    render() {
        return (

            <div>
                <div>
                    <img className="headerImg" src={headerImg}></img>
                </div>


                <div className="main" style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginBottom: "300px" }}>
                    <label className="label1" style={{ textAlign: "center" }}>
                        Thank you!
                        </label>

                    <label className="label2" style={{ marginTop: "18px", textAlign: "center" }}>
                        Thank you for applying to volunteer at OutStem Tech Fest 2022! We will contact you once your application has been approved.
                        Please note that we require all volunteers and attendees to be fully vaccinated against COVID-19 prior to attending the conference.
                        </label>

                    <label className="label2" style={{ marginTop: "90px", textAlign: "center", color: "#7b6c6c" }}>
                        You may close the window now.
                        </label>
                </div>
                </div>
        );
    }
}

export default ThankYou;

