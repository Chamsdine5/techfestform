import React, { Component } from "react";
import { DiscoveryWays, TeamPreferences, AvailabilityDates } from "../utils/data"
import { validateFormInput } from "../utils/validator";
import headerImg from "../../header.png";
import errorImg from "../../error.png";



/*
 * This class is the component representing the form layout. The form validation is not executed here, this class simply allows the applicant to provide their information.
 */

class VolunteerForm extends Component {


    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            discoveryWay: "",
            teamPreferences: ["", "", ""],
            availability: [],
            vaccinated: false,
            healthCondition: "",
            diateryRestriction: "",
            agreed: false,
            errors : { name: [], email: [], discoveryWay: [], teamPreferences: [], availability: [], agreed: [] },   //this variable is used to display an error near to each wrong field
            errorsText: [],   //this variable is used to display errors
            viewUpdater: ""
        };


        //Creation of "custom" elements
        this.discoveryWays = new Dropdown(DiscoveryWays, "", this.onChange);

        this.teamPreferences1 = new Dropdown(TeamPreferences, "0", this.onChange);
        this.teamPreferences2 = new Dropdown(TeamPreferences, "1", this.onChange);
        this.teamPreferences3 = new Dropdown(TeamPreferences, "2", this.onChange);

        this.cbWednesday = new Checkbox(AvailabilityDates.WEDNESDAY, "", this.onChange);
        this.cbThursday = new Checkbox(AvailabilityDates.THURSDAY, "", this.onChange);
        this.cbFriday = new Checkbox(AvailabilityDates.FRIDAY, "", this.onChange);
        this.cbSaturday = new Checkbox(AvailabilityDates.SATURDAY, "", this.onChange);
    }



    onSubmit = event => {
        event.preventDefault();

        //Validation throught the validator function imported
        const errorsFound = validateFormInput(this.state);

        //Displaying errors if there is any, otherwhise loading the "Thank you" page
        this.state.errorsText = [];
        for (var error in this.state.errors) {
            this.state.errors[error] = [];
            if (errorsFound.hasOwnProperty(error)) {
                this.state.errors[error] = <img class= "error-img" src={errorImg}></img>
                this.state.errorsText.push(<div class="errorsText label2">{errorsFound[error]}</div>);
            }
        }

        if (this.state.errorsText.length != 0) {
            this.setState({ errors: this.state.errors });
        }
        else {
            window.location.href = "/ThankYou";
        }
    }



    onChange = event => {

        //This function is called after any change in the view except those concerning the mini checkboxes (because of the difference between the event checks)

        if (Object.keys(event).length == 2 && event.type == "Checkbox") {
            const date = event.obj.label;
            if (event.obj.checked) {
                if (!(this.state.availability.includes(date))) {
                    this.state.availability.push(date);
                }
            }
            else {
                if (this.state.availability.includes(date)) {
                    this.state.availability.splice(this.state.availability.indexOf(date), 1);
                }
            }
        }
        else if (Object.keys(event).length == 2 && event.type == "Dropdown") {
            if (event.obj.values == DiscoveryWays) {
                this.state.discoveryWay = event.obj.value;
            }
            else {
                const preferenceIndex = parseInt(event.obj.id);
                this.state.teamPreferences[preferenceIndex] = event.obj.value;
            }
        }

        else {
            this.setState({ [event.target.id]: event.target.value });
        }

        this.setState({ viewUpdater: "" }); //Refreshing the view

    }

    onChangeChecked = event => {

        //This function is for event checks related to mini checkboxes.

        this.setState({ [event.target.id]: event.target.checked })
    }

    render() {
        return (
            <div>
                <div>
                    <img className="headerImg" src={headerImg}></img>
                </div>




                <div className="main-bg">
                    <div className="main">
                <label className="label1">2022 OutStem Tech Fest Volunteer Sign Up</label>
                <label className="label2 description">All fields are mandatory unless otherwise specified</label>


                        <form noValidate onSubmit={this.onSubmit}>                           
                <div className="form-zone">
                    <div className="form-section first-el">
                        <label className="label2"><strong>About you</strong></label>
                                    <div className="section-content">

                                        <div className="form-field first-el">
                                            <label className="field-name">Name</label>
                                            <div className="field-content"><input className="form-control" type="text" id="name" value={this.state.name}
                                                onChange={this.onChange}></input></div>
                                            <div className="field-error">{this.state.errors.name}</div>
                                        </div>   


                        <div className="form-field">
                            <label className="field-name">Email</label>
                                    <div className="field-content"><input className="form-control" type="email" id="email" value={this.state.email}
                                        onChange={this.onChange}></input></div>
                                    <div className="field-error">{this.state.errors.email}</div>
                                        </div>


                        <div className="form-field">
                            <label className="field-name">Phone Number (optional)</label>
                                    <div className="field-content"><input className="form-control" type="tel" id="phoneNumber" value={this.state.phonenUmber}
                                                onChange={this.onChange}></input></div>
                                            <div className="field-error"></div>
                                        </div>


                        <div className="form-field">
                            <label className="field-name">Where did you hear about this opportunity?</label>
                                    <div className="field-content">{this.discoveryWays.dropdown}</div>
                                    <div className="field-error">{this.state.errors.discoveryWay}</div>
                            </div>
                        </div>
                    </div>



                    <div className="form-section">
                        <label id="label2"><strong>Team Preference</strong></label>
                        <div className="section-content">
                            <div className="form-field first-el">
                                <label className="field-name">First Choice</label>
                                    <div className="field-content">{this.teamPreferences1.dropdown}</div>
                                    <div className="field-error">{this.state.errors.teamPreferences}</div>
                                        </div>


                            <div className="form-field">
                                <label className="field-name">Second Choice</label>
                                    <div className="field-content">{this.teamPreferences2.dropdown}</div>
                                    <div className="field-error"></div>
                                        </div>


                            <div className="form-field">
                            <label className="field-name">Third Choice (optional)</label>
                                    <div className="field-content">{this.teamPreferences3.dropdown}</div>
                                    <div className="field-error"></div>
                            </div>
                        </div>
                    </div>



                    <div className="form-section">
                            <label id="label2"><strong>Availability</strong></label>
                            <div className= "form-field">
                        <div className="multi-select-section-content">
                        <div className="multi-select-cb first-el">
                            {this.cbWednesday.checkbox}                            
                                            </div>


                        <div className="multi-select-cb">
                                {this.cbThursday.checkbox}
                        </div>
                            <div className="multi-select-cb">
                                {this.cbFriday.checkbox}
                                            </div>


                            <div className="multi-select-cb">
                                {this.cbSaturday.checkbox}
                            </div>
                            </div>
                                <div className="field-error">{this.state.errors.availability}</div>
                            </div>
                    </div>



                    <div className="form-section">
                        <label id="label2"><strong>Health and Safety</strong></label>
                        <div className="form-field">
                                <label className="checkmark">
                                    <input className="form-check-input" type="checkbox" id="vaccinated" value={this.state.vaccinated} onChange={this.onChangeChecked} > 
                            </input>
                            </label>
                                <label className="cb-label label3">I am fully vaccinated against COVID-19 by an approved vaccine. Required to attend.</label>
                                    </div>


                        <div className="form-field">
                            <label className="field-name">Any health condition we should know about (optional)</label>
                                <div className="field-content">
                                    <textarea className="form-control long-input-text" type="text" maxlength="1000"
                                        id="healthCondition" value={this.state.healthCondition} onChange={this.onChange}>
                                    </textarea>
                                </div>
                                <div className="field-error"></div>
                                    </div>


                        <div className="form-field">
                            <label className="field-name">Any dietary restrictions we should know about (optional)</label>
                                <div className="field-content">
                                    <textarea className="form-control long-input-text" type="text"
                                        id="diateryRestriction" value={this.state.diateryRestriction} onChange={this.onChange} maxlength="1000">
                                    </textarea>
                                </div>
                                <div className="field-error"></div>
                        </div>
                    </div>


                    <div className="form-section">
                        <div className="form-field">
                                <label className="checkmark">
                                    <input className="form-check-input" type="checkbox" id="agreed" value={this.state.agreed} onChange={this.onChangeChecked}>
                                </input>
                            </label>
                                        <label className="cb-label label3">I agree to the{" "}<a href="_blank">Terms of Service</a>{" "}and
                                        {" "}<a href="_blank">Privacy Policy</a></label>
                                <div className="field-error">{this.state.errors.agreed}</div>
                        </div>
                    </div>



                                <hr />

                                <div style={{ marginTop: "45px" }}>{this.state.errorsText}</div>

                                <div style={{ marginTop: "35px" }}><button type="submit" className="submit-button"><strong>SUBMIT APPLICATION</strong></button></div>

                            </div>
                        </form>
                    </div>
                </div>
                </div>
        );
    }
}


/*  
 * The Dropdown and Checkbox classes are used to create custom elements. The styling of these elements is then managed inside these classes (especially for Checkbox).
 * When events occurs at any instance of these classes, after having managed the style if necessary, the component that uses them is notified via a called back taken
 * in the constructor parameters.
 */

class Dropdown {

    constructor(values, id, onChangeCallBack) {
        //The "values" variable is an object that enumerates the values that will be contained by the dropdown. A list of strings could be used but the current pattern 
        //facilitates comparisons by using variable names rather than string values.

        this.values = values;
        this.id = id;
        this.onChangeCallBack = onChangeCallBack;

        this.value = null;
        if (values.length != 0) {
            this.value = values[0][Object.keys(values[0])[0]];
        }
        var options = [];
        for (var i = 0; i < values.length; i++) {
            const value = values[i];
            options.push(<option>{value[Object.keys(value)[0]]}</option>);
        }

        this.dropdown = <select className="form-select" onChange={this.onChange} > { options }</select>
    }

    onChange = (event) => {
        this.value = event.target.value;
        this.onChangeCallBack({ type: "Dropdown", obj: this });
    }
}

class Checkbox {
    constructor(label, id, onChangeCallBack) {
        this.label = label;
        this.id = id;
        this.onChangeCallBack = onChangeCallBack;

        this.checked = false;
        this.labelStyle = "cb-label-not-selected";
        this.containerStyle = "cb-container-not-selected";
        this.checkmarkBoxStyle = "cb-checkmark-box-not-selected";
        this.checkmarkStyle = "";
        this.update();

    }

    update = () => {
        this.checkbox = <div className={["cb-container", this.containerStyle].join(' ')}> <div class="cb-content">
            <label className={["label-multi-select-cb", this.labelStyle].join(' ')}><strong>{this.label}</strong></label>
            <label className={["checkmark", this.checkmarkBoxStyle].join(' ')}>
                <input className={["form-check-input", this.checkmarkStyle].join(' ')} type="checkbox" value={this.checked} onChange={this.onChange}></input>
            </label>          
        </div></div>
    }

    onChange = (event) => {
        this.checked = event.target.checked;
        if (this.checked == true) {
            this.labelStyle = "cb-label-selected";
            this.containerStyle = "cb-container-selected";
            this.checkmarkBoxStyle = "cb-checkmark-box-selected";
            this.checkmarkStyle =  "checkmark-multi-select-checked";
        }
        else {
            this.labelStyle = "cb-label-not-selected";
            this.containerStyle = "cb-container-not-selected";
            this.checkmarkBoxStyle = "cb-checkmark-box-not-selected";
            this.checkmarkStyle = "";
        }

        this.update();
        this.onChangeCallBack({ type: "Checkbox", obj: this });
    }

}

export default VolunteerForm;