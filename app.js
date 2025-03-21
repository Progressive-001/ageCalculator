const ageCalculator = document.getElementById("ageCalculator");

// Error elements
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const ageLabels = document.querySelectorAll(".ageLabel");

ageCalculator.addEventListener("submit", function (event) {
  event.preventDefault();

  // Form field elements
  const ageDayInput = document.getElementById("day");
  const ageMonthInput = document.getElementById("month");
  const ageYearInput = document.getElementById("year");

  const ageDay = ageDayInput.value.trim();
  const ageMonth = ageMonthInput.value.trim();
  const ageYear = ageYearInput.value.trim();

  let valid = true;

  // Clear previous error messages
  [dayError, monthError, yearError].forEach(function (item) {
    item.textContent = "";
    item.style.visibility = "hidden";
  });

  // Reset all labels to default color
  ageLabels.forEach(label => {
    label.style.color = "";
  });

  // function to show errors and update label color
  function showError(input, errorElement, message) { 
    valid = false;
    errorElement.textContent = message; 
    errorElement.style.visibility = "visible";
    input.style.borderColor = "red";
  }

  // function to show errors and update label color (for range errors)
  function showError1(input, errorElement, message) {
    valid = false;
    errorElement.textContent = message; 
    errorElement.style.visibility = "visible";
    input.style.borderColor = "red";
  }

  // function: Check if the day is valid for the given month and year
  function isValidDay(day, month, year) {
    const lastDay = new Date(year, month, 0).getDate();
    return day >= 1 && day <= lastDay;
  }

  // Validate day, month, year (empty check)

  if (ageDay === "") {
    showError(ageDayInput, dayError, "This field is required");
    ageLabels[0].style.color = "red";
  } else {
    ageDayInput.style.borderColor = "lightGrey";
  }

  if (ageMonth === "") {
    showError(ageMonthInput, monthError, "This field is required");
    ageLabels[1].style.color = "red";
  } else {
    ageMonthInput.style.borderColor = "lightGrey";
  }


  if (ageYear === "") {
    showError(ageYearInput, yearError, "This field is required");
    ageLabels[2].style.color = "red";
  } else {
    ageYearInput.style.borderColor = "lightGrey";
  }

  // Validate day (range and date validity)
  if (ageDay !== "" && (isNaN(ageDay) || ageDay < 1 || ageDay > 31)) {
    ageLabels[0].style.color = "red";
    showError1(ageDayInput, dayError, "Must be a valid day");
  } else if (ageDay !== "" && !isValidDay(ageDay, ageMonth, ageYear)) {
    ageLabels[0].style.color = "red";
    showError1(ageDayInput, dayError, "Must be a valid date");
  }

  // Validate month (range)
  if (ageMonth !== "" && (isNaN(ageMonth) || ageMonth < 1 || ageMonth > 12)) {
    ageLabels[1].style.color = "red";
    showError1(ageMonthInput, monthError, "Must be a valid month");
  }

  // Validate year (range)
  const currentYear = new Date().getFullYear();
  if (ageYear !== "" && (isNaN(ageYear) || ageYear < 1900 || ageYear > currentYear)) {
    ageLabels[2].style.color = "red";
    showError1(ageYearInput, yearError, "Must be in the past");
  }

  if (valid) {
    // Convert inputs to numbers
    const birthDay = parseInt(ageDay);
    const birthMonth = parseInt(ageMonth);
    const birthYear = parseInt(ageYear);

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const today = new Date();

    // Initial age calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust days and months if needed
    if (days < 0) {
      months--;
      // Get the number of days in the previous month
      const previousMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonthDate.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Select all span elements within .ageOutput
    const ageSpans = document.querySelectorAll('.ageOutput h2 span');

    if (ageSpans.length === 3) {
      ageSpans[0].textContent = `${years} `;
      ageSpans[1].textContent = `${months} `;
      ageSpans[2].textContent = `${days} `;
    }
  }
});