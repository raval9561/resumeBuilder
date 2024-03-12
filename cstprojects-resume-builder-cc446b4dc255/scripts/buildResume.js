// get contact form inputs
const nameInput = document.editorContact.name;
const emailInput = document.editorContact.email;
const phoneInput = document.editorContact.phone;

// get employment form inputs
const titleInput = document.editorEmployer.title;
const descriptionInput = document.editorEmployer.description;
const startInput = document.editorEmployer.start;
const endInput = document.editorEmployer.end;
const currentCheck = document.editorEmployer.current;
const industrySelect = document.editorEmployer.industry;

// resume elements we want to update
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");

// get buttons
const nextButton = document.editorContact.contactNextBtn;
const employAddBtn = document.editorEmployer.employAddBtn;

nameInput.addEventListener("input", function () {
    userName.innerText = this.value;
});

emailInput.addEventListener("input", function () {
    // don't forget email emoji
    userEmail.innerHTML = "&#9993; " + this.value;
});

phoneInput.addEventListener("input", function () {
    // don't forget phone emoji
    userPhone.innerHTML = "&#9742; " + this.value;
});

function nextMenu(event) {
    // prevent the form from submitting
    event.preventDefault();

    // hide contact form
    document.getElementById("contact").style.display = "none";

    // display employment history form
    document.getElementById("employmentHistory").style.display = "flex";
}
nextButton.addEventListener("click", nextMenu);

// If current emlpoyer is selected, end date should be disabled
function checkCurrent(){
	if(currentCheck.checked){
		endInput.disabled = true;
        endInput.value = "";
	}else{
		endInput.disabled = false;
	}
}
currentCheck.addEventListener("change", checkCurrent);

// when Add is clicked - add content from form, into Resume
function addEmployment(event) {

    event.preventDefault();

    // Create new HTML elements that will be inserted later
    const newEmplyDiv = document.createElement("div");
    const newTitle = document.createElement("p");
    const newDescription = document.createElement("p");
    const newStart = document.createElement("p");
    const newEnd = document.createElement("p");

    // Add class names to new HTML elements for styling
    newEmplyDiv.className = "emplyDiv";
    newTitle.className = "title";
    newDescription.className = "description";
    newStart.className = "start";
    newEnd.className = "end";

    // Add HTML elements to container div
    newEmplyDiv.appendChild(newTitle);
    newEmplyDiv.appendChild(newDescription);
    newEmplyDiv.appendChild(newStart);
    newEmplyDiv.appendChild(newEnd);

    // format start date
    let startDateText = Date.parse(startInput.value);
    let startDateDate = new Date(startDateText);
    const formattedStartDate = startDateDate.toLocaleDateString("en-us", { year: "numeric", month: "short" });

    // format end date
    let endDateText = Date.parse(endInput.value);
    let endDateDate = new Date(endDateText);
    const formattedEndDate = endDateDate.toLocaleDateString("en-us", { year: "numeric", month: "short" });

    // Add values from the form into the appropriate HTML
    const industryText = industrySelect.options[industrySelect.selectedIndex].text; // get text from selected option
    newTitle.innerText = titleInput.value + " (" + industryText + ")";
    newDescription.innerText = descriptionInput.value;
    newStart.innerText = formattedStartDate + " ";
    newEnd.className = "end";

    // Check if current job, and if so, replace date with Present
    if (currentCheck.checked) {
        newEnd.innerText = "Current";
    } else {
        newEnd.innerText = formattedEndDate;
    }

    // Get the resume area to add the employment history to
    const resumeContent = document.getElementById("resume");

    // Add the new HTML to the Resume
    resumeContent.appendChild(newEmplyDiv);
}
employAddBtn.addEventListener("click", addEmployment);

nameInput.focus();