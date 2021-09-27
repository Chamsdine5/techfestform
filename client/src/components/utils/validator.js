const InputValidator = require("validator");


//This function is used to validate the form and return potential errors.

export function validateFormInput(data) {
    var errors = {};

    if (data.name.trim() == "") {
        errors.name = "Name field cannot be empty";
    }

    if (data.email.trim() == "") {
        errors.email = "Email field cannot be empty";
    } else if (!InputValidator.isEmail(data.email)) {
        errors.email = "This doesn't look like an email, please try again.";
    }

    console.log(data);

    if (InputValidator.isEmpty(data.discoveryWay)) {
        errors.discoveryWay = "Discovery Way field cannot be empty";
    }

    var teamPrefsCheck = [];
    var duplicateSelection = false;
    for (var i = 0; i < data.teamPreferences.length; i++) {
        if (data.teamPreferences[i] != "") {
            if (teamPrefsCheck.includes(data.teamPreferences[i])) {
                duplicateSelection = true;
                errors.teamPreferences = "Team preference: " + data.teamPreferences[i] + " is selected more than once";
                break;
            }

            teamPrefsCheck.push(data.teamPreferences[i])
        }
    }

    if (!duplicateSelection && teamPrefsCheck.length < 2) {
        errors.teamPreferences = "Team preference: you must select at least two teams";
    }

    if (data.availability.length == 0) {
        errors.availability = "Date availability: you must select at least one date";
    }

    if (!data.agreed) {
        errors.agreed = "You must agree to our Terms of Service and Privacy Policy before submitting";
    }
    return errors;
};