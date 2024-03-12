console.log('validate is loading');

nextButton.removeEventListener("click", nextMenu);

function nextMenuVerify(event) {
    event.preventDefault();

    verifyContactInfo();

    // check if the form info is valid
    // if valid, progress
    // if not valid, do not progress
    if (document.editorContact.checkValidity()) {
        // hide contact form
        document.getElementById("contact").style.display = "none";

        // display employment history form
        document.getElementById("employmentHistory").style.display = "flex";
    } else {
        // validity normally only REPORTS when you SUBMIT
        // since this form does not submit, we will FORCE a report
        document.editorContact.reportValidity();
    }
}
nextButton.addEventListener("click", nextMenuVerify)
//verify contact information
function verifyContactInfo() {
    const contactInputs = document.querySelectorAll("#contact > input");

    for(const input of contactInputs) {
        
        if (input.value === "") {
            input.classList.add("invalid");
        } else {
            input.classList.remove("invalid");
        }
    }

    if(emailInput.checkValidity()) {
        emailInput.classList.remove("invalid");
    } else {
        emailInput.classList.add("invalid");
    }

    const phoneFormat = /^\(\d{3}\)\d{3}\-\d{4}$/;
	const phoneFormatValid = phoneFormat.test(phoneInput.value);

    if(phoneFormatValid) {
        phoneInput.classList.remove("invalid");
        phoneInput.setCustomValidity("");
    } else {
        phoneInput.classList.add("invalid");
        phoneInput.setCustomValidity("Please use this format: (###)###-####"); 
    }
}

employAddBtn.removeEventListener("click", addEmployment);
employAddBtn.addEventListener("click", verifyEmploymentInfo);

function verifyEmploymentInfo(event) {

	event.preventDefault();

    // validate title
    if(titleInput.checkValidity()) {
        titleInput.classList.remove("invalid");
    } else {
        titleInput.classList.add("invalid");
    }

    // validate the select
    if (industrySelect.value === "-1") {
        industrySelect.classList.add("invalid");
        document.editorEmployer.industry.setCustomValidity("Please select an option");
    } else {
        industrySelect.classList.remove("invalid");
        document.editorEmployer.industry.setCustomValidity("");
    }

    // validate description
    if(descriptionInput.checkValidity()) {
        descriptionInput.classList.remove("invalid");
    } else {
        descriptionInput.classList.add("invalid");
    }

    // validate start date
    if(startInput.validity.valueMissing) {
        startInput.classList.add("invalid");
    } else if (Date.parse(startInput.value) > Date.now()) {
        startInput.classList.add("invalid");
        startInput.setCustomValidity("Cannot choose a date in the future");
    } else {
        startInput.classList.remove("invalid");
        startInput.setCustomValidity("");
    }

    // validate end date
    // TODO: double check this logic
    if(currentCheck.checked) {
        endInput.classList.remove("invalid");
    } else {
        if(endInput.value === "" || endInput.validity.valueMissing) {
            endInput.classList.add("invalid");
            endInput.setCustomValidity("Please select an end date");
        } else if (Date.parse(endInput.value) < Date.parse(startInput.value)) {
            endInput.classList.add("invalid");
            endInput.setCustomValidity("Cannot choose a date before to start date");
        } else {
            endInput.classList.remove("invalid");
            endInput.setCustomValidity("");
        }
    }

    // if everythign is valid, then addEmployee
    // TODO: this is getting false positives
    if(document.editorEmployer.checkValidity()) {
        addEmployment(event);
    } else {
        // validity normally only REPORTS when you SUBMIT
        // since this form does not submit, we will FORCE a report
        document.editorEmployer.reportValidity();
    }
}
