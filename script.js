// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.createElement("form");
//   form.id = "dynamicForm";
//   document.body.appendChild(form);

//   generateForm(formSections);
// });

const formSections = [
  {
    title: "Applicant",
    fields: {
      firstName: { type: "text", required: true },
      middleName: { type: "text", required: false },
      lastName: { type: "text", required: true },
      dateOfBirth: { type: "date", required: true },
      maritalStatus: {
        type: "select",
        options: [
          { value: "", text: "Select" },
          { value: "Single", text: "Single" },
          { value: "Married", text: "Married" },
          { value: "Divorced", text: "Divorced" },
          { value: "Separated", text: "Separated" },
          { value: "Widowed", text: "Widowed" },
        ],
        required: false,
      },
      residency: { type: "text", required: false },
    },
  },
  {
    title: "Contact",
    fields: {
      mobileNumber: {
        type: "text",
        required: true,
      },
      email: { type: "email", required: true },
    },
  },
  {
    title: "Finances",
    fields: {
      employment: { type: "text", required: true },
      income: { type: "number", required: true },
      numberOfDependants: { type: "number", required: true },
    },
  },
  {
    title: "Address",
    fields: {
      residentialAddress: {
        type: "fieldset",
        fields: {
          unitNumber: { type: "text", required: true },
          streetNumber: { type: "text", required: true },
          street: { type: "text", required: true },
          suburb: { type: "text", required: true },
          postCode: { type: "text", required: true },
          state: { type: "text", required: true },
          yearsAtAddress: { type: "number", required: true },
        },
      },
      previousAddress: {
        type: "fieldset",
        fields: {
          unitNumber: { type: "text", required: false },
          streetNumber: { type: "text", required: false },
          street: { type: "text", required: false },
          suburb: { type: "text", required: false },
          postCode: { type: "text", required: false },
          state: { type: "text", required: false },
          yearsAtAddress: { type: "number", required: false },
        },
      },
    },
  },
  {
    title: "Expenses",
    fields: {
      foodAndGroceries: {
        type: "fieldset",
        fields: {
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      },
      utilities: {
        type: "fieldset",
        fields: {
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      },
      phoneAndInternet: {
        type: "fieldset",
        fields: {
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      },
      transport: {
        type: "fieldset",
        fields: {
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      },
      others: {
        type: "fieldset",
        fields: {
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      },
    },
  },
  {
    title: "Housing",
    fields: {
      ownershipStatus: { type: "text", required: false },
      propertyValue: { type: "number", required: false },
      monthlyMortgage: { type: "number", required: false },
      mortgageBalance: { type: "number", required: false },
    },
  },
  {
    title: "Income",
    fields: {
      netIncome: { type: "number", required: true },
      netIncomeFrequency: { type: "text", required: false },
      spouseNetIncome: { type: "number", required: false },
      spouseNetIncomeFrequency: { type: "text", required: false },
      hasOtherIncome: { type: "checkbox", required: false },
      other: [
        {
          type: { type: "text", required: false },
          amount: { type: "number", required: false },
          frequency: { type: "text", required: false },
        },
      ],
    },
  },
  {
    title: "Employment",
    fields: {
      employment: [
        {
          employer: { type: "text", required: false },
          type: { type: "text", required: false },
          industry: { type: "text", required: false },
          occupation: { type: "text", required: false },
          years: { type: "number", required: false },
          months: { type: "number", required: false },
        },
      ],
    },
  },
  {
    title: "Bank",
    fields: {
      accountNumber: { type: "text", required: true },
      bsb: {
        inputString: { type: "text", required: true },
      },
    },
  },
  {
    title: "Debts",
    fields: {
      type: { type: "text", required: true },
      balance: { type: "number", required: true },
      limit: { type: "number", required: true },
      interestRate: { type: "number", required: true },
      isConsolidated: { type: "checkbox", required: false },
      isClosed: { type: "checkbox", required: false },
      provider: { type: "text", required: false },
      claimedMonthlyRepayment: { type: "number", required: false },
    },
  },
  {
    title: "Loan",
    fields: {
      amount: { type: "number", required: true },
      purpose: { type: "text", required: false },
      term: { type: "number", required: false },
    },
  },
  {
    title: "Terms and Conditions",
    fields: {
      privacyAgreement: { type: "checkbox", required: true },
      creditReportingAgreement: { type: "checkbox", required: true },
      creditGuideConfirmation: { type: "checkbox", required: true },
      additionalDetails: { type: "checkbox", required: true },
      anticipatedChangeType: { type: "text", required: false },
      additionalComments: { type: "text", required: false },
    },
  },
  {
    title: "Broker",
    fields: {
      brokerEmail: { type: "email", required: false },
      brokerageAmount: { type: "number", required: false },
    },
  },
  // {
  //   title: "Borrower Meta Info",
  //   fields: {
  //     sourceFromApi: { type: "checkbox", required: false },
  //   },
  // },
];

let currentSectionIndex = 0;
const employmentFieldsetIdentifiers = new Set(); // To keep track of unique identifiers

// Function to generate a unique identifier
function generateUniqueId(prefix = "") {
  return `${prefix}-${Date.now()}`;
}
function createFormField(name, field, prefix = "") {
  if (field.type === "select") {
    let html = `<div class="form-field">`;
    html += `<label for="${prefix}${name}">${name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())}</label>`;
    html += `<select id="${prefix}${name}" name="${prefix}${name}" ${
      field.required ? "required" : ""
    }>`;
    field.options.forEach((option) => {
      html += `<option value="${option.value}">${option.text}</option>`;
    });
    html += `</select>`;
    html += `<div class="error-msg" id="${prefix}${name}-error"></div>`;
    html += `</div>`;
    return html;
  } else if (Array.isArray(field)) {
    let html = "";
    field.forEach((item) => {
      const uniqueId = generateUniqueId(name);
      employmentFieldsetIdentifiers.add(uniqueId);
      html += `
        <fieldset id="${uniqueId}">
          <legend>${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}</legend>
          ${createFormFields(item, `${uniqueId}-`)}
      `;
      html += `<div class="error-msg" id="${uniqueId}-error"></div>`;
      html += `</fieldset>`;
    });
    return html;
  } else {
    const required = field.required ? "required" : "";

    const displayName = name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    return `
    <div class="form-field">
      <label for="${prefix}${name}">${displayName}</label>
      <input type="${field.type}" id="${prefix}${name}" name="${prefix}${name}" ${required}>
      <div class="error-msg" id="${prefix}${name}-error"></div>
    </div>
  `;
  }
}

function createFieldset(name, fields) {
  let html = `<fieldset id="${name}"><legend>${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</legend>`;
  html += createFormFields(fields);
  html += "</fieldset>";
  return html;
}

function createDynamicFieldsForIncome(name, fields) {
  let html = "";
  fields.forEach((field, index) => {
    html += `<fieldset class="${name}-fieldset other-fieldset"><legend>${name} ${
      index + 1
    }</legend>`;
    html += createFormFields(field);
    html += "</fieldset>";
  });
  return html;
}
function createDynamicFieldsForEmp(name, fields) {
  let html = `<div class="${name}-fieldset-container">`;
  fields.forEach(() => {
    const uniqueId = generateUniqueId(name);
    employmentFieldsetIdentifiers.add(uniqueId);
    html += `<fieldset class="${name}-fieldset" id="${uniqueId}">
      <legend>${name
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())}</legend>
      ${createFormFields(
        formSections.find(
          (section) => section.title.toLowerCase().replace(/\s+/g, "") === name
        ).fields.employment[0]
      )}
      <button type="button" onclick="removeFieldset('${uniqueId}')">Remove</button>
    </fieldset>`;
  });
  html += `<button type="button" onclick="addFieldset('${name}')">Add ${name}</button>`;
  html += `</div>`;
  return html;
}

function addFieldset(name) {
  const fieldsetContainer = document.querySelector(
    `.${name}-fieldset-container`
  );

  if (!fieldsetContainer) {
    console.error(`Fieldset container for ${name} not found.`);
    return;
  }

  const uniqueId = generateUniqueId(name);
  employmentFieldsetIdentifiers.add(uniqueId);

  const fieldsetHtml = `
    <fieldset class="${name}-fieldset" id="${uniqueId}">
      <legend>${name
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())}</legend>
      ${createFormFields(
        formSections.find(
          (section) => section.title.toLowerCase().replace(/\s+/g, "") === name
        ).fields.employment[0]
      )}
      <button type="button" onclick="removeFieldset('${uniqueId}')">Remove</button>
    </fieldset>
  `;

  fieldsetContainer.insertAdjacentHTML("beforeend", fieldsetHtml);
}

function removeFieldset(uniqueId) {
  const fieldset = document.querySelector(`#${uniqueId}`);
  if (fieldset) {
    fieldset.remove();
    employmentFieldsetIdentifiers.delete(uniqueId);
  } else {
    console.error("Fieldset not found.");
  }
}

function createFormFields(fields, prefix = "") {
  let html = "";
  for (const [key, field] of Object.entries(fields)) {
    if (field.type === "fieldset") {
      html += createFieldset(key, field.fields);
    } else if (Array.isArray(field)) {
      if (key === "employment") {
        html += createDynamicFieldsForEmp(key, field);
      } else {
        html += createDynamicFieldsForIncome(key, field);
      }
    } else {
      html += createFormField(`${prefix}${key}`, field);
    }
  }
  return html;
}

function createFormSection(section) {
  let html = `<div class="form-section"><h2>${section.title}</h2>`;
  html += createFormFields(section.fields);
  html += "</div>";
  return html;
}

function generateForm(formSections) {
  const form = document.getElementById("dynamicForm");

  if (!form) {
    console.error("Form element with id 'dynamicForm' not found.");
    return;
  }

  form.innerHTML = "";
  formSections.forEach((section) => {
    form.innerHTML += createFormSection(section);
  });

  const prevBtn = document.createElement("button");
  prevBtn.id = "prevBtn";
  prevBtn.textContent = "Previous";
  prevBtn.type = "button";
  prevBtn.onclick = () => navigate(-1);
  prevBtn.disabled = true;

  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.textContent = "Next";
  nextBtn.type = "button";
  nextBtn.onclick = () => navigate(1);

  const submitBtn = document.createElement("button");
  submitBtn.id = "submitBtn";
  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";
  submitBtn.style.display = "none";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "buttonsContainer";
  buttonsContainer.appendChild(prevBtn);
  buttonsContainer.appendChild(nextBtn);
  buttonsContainer.appendChild(submitBtn);

  form.appendChild(buttonsContainer);
  showSection(currentSectionIndex);
}

function showSection(index) {
  const sections = document.querySelectorAll(".form-section");
  if (index < 0 || index >= sections.length) return;

  sections.forEach((section, i) => {
    section.classList.toggle("active", i === index);
    if (i === index) {
      section.classList.add("fade");
    } else {
      section.classList.remove("fade");
    }
  });

  document.getElementById("prevBtn").disabled = index === 0;
  document.getElementById("nextBtn").style.display =
    index === sections.length - 1 ? "none" : "inline-block";
  document.getElementById("submitBtn").style.display =
    index === sections.length - 1 ? "inline-block" : "none";

  validateSection(index);
}

document.addEventListener("DOMContentLoaded", () => {
  generateForm(formSections);
});

let touchedFields = {};

function validateSection(index) {
  const sections = document.querySelectorAll(".form-section");

  if (index < 0 || index >= sections.length) return;

  const section = sections[index];

  if (!section) {
    console.error(`Section at index ${index} not found.`);
    return;
  }

  const fields = section.querySelectorAll("input");
  let isValid = true;

  fields.forEach((field) => {
    const value = field.value.trim();
    const fieldType = field.type;
    let isFieldValid = true;
    let errorMessage = "";

    touchedFields[field.id] = true;

    if (value === "") {
      const errorElement = document.getElementById(`${field.id}-error`);
      errorElement.textContent = "";
      errorElement.style.display = "none";
      field.style.borderColor = "";
    } else {
      if (fieldType === "checkbox") {
        if (field.required && !field.checked) {
          isFieldValid = false;
          errorMessage = "This field is required.";
        } else {
          isFieldValid = true;
          errorMessage = "";
        }
      } else if (fieldType === "text") {
        if (field.name === "mobileNumber") {
          const pattern =
            /^(\+61\s?4\d{2}\s?\d{3}\s?\d{3}|\+614\d{8}|04\d{8})$/;
          const valueWithoutSpaces = value.replace(/\s+/g, "");

          const minLength = 10;
          const maxLength = 14;

          const isFormatValid = pattern.test(value);
          const isLengthValid =
            valueWithoutSpaces.length >= minLength &&
            valueWithoutSpaces.length <= maxLength;
          isFieldValid = isFormatValid && isLengthValid;

          errorMessage = isFieldValid
            ? ""
            : !isFormatValid
            ? "Invalid mobile number. Please use the format +61 4XX XXX XXX, +614XXXXXXXX, or 04XXXXXXXX"
            : valueWithoutSpaces.length < minLength
            ? `Mobile number must be at least ${minLength} digits long`
            : valueWithoutSpaces.length > maxLength
            ? `Mobile number must not exceed ${maxLength} digits`
            : "";
        } else if (field.name === "accountNumber") {
          const accountPattern = /^\d{6,9}$/;
          isFieldValid = accountPattern.test(value);
          errorMessage = isFieldValid
            ? ""
            : "Invalid account number. It must be between 6 and 9 digits long.";
        } else if (field.name === "bsb") {
          const bsbPattern = /^\d{3}-\d{3}$/;
          isFieldValid = bsbPattern.test(value);
          errorMessage = isFieldValid
            ? ""
            : "Invalid BSB format. Please use the format XXX-XXX (e.g., 123-456).";
        } else if (
          field.name === "firstName" ||
          field.name === "middleName" ||
          field.name === "lastName"
        ) {
          isFieldValid = /^[a-zA-Z\s'-]+$/.test(value);
          errorMessage = isFieldValid
            ? ""
            : "Invalid name. Only alphabets are allowed.";
        } else if (field.name === "residency") {
          // Assuming a residency field can contain alphanumeric characters, spaces, and some special characters
          isFieldValid = /^[a-zA-Z0-9\s,.-]+$/.test(value);
          errorMessage = isFieldValid
            ? ""
            : "Invalid residency input. Only alphanumeric characters, commas, periods, and hyphens are allowed.";
        } else if (
          field.name === "income" ||
          field.name === "numberOfDependants" ||
          field.name === "propertyValue" ||
          field.name === "monthlyMortgage" ||
          field.name === "mortgageBalance" ||
          field.name === "netIncome" ||
          field.name === "spouseNetIncome" ||
          field.name === "amount" ||
          field.name === "claimedMonthlyRepayment" ||
          field.name === "term"
        ) {
          isFieldValid = /^\d+(\.\d+)?$/.test(value); // Allow numbers with optional decimal points
          errorMessage = isFieldValid
            ? ""
            : "Invalid number. Please enter a valid number.";
        }
      } else if (fieldType === "email") {
        isFieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMessage = isFieldValid ? "" : "Invalid email format";
      } else if (fieldType === "date") {
        if (field.name === "dateOfBirth") {
          const inputDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          isFieldValid = inputDate < today;
          errorMessage = "Date of Birth cannot be in the future";
        } else {
          isFieldValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
          errorMessage = "Invalid date format";
        }
      } else if (fieldType === "number") {
        isFieldValid = /^\d+(\.\d+)?$/.test(value);
        errorMessage = "Invalid number";
      }

      const errorElement = document.getElementById(`${field.id}-error`);
      if (!isFieldValid) {
        isValid = false;
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
        field.style.borderColor = "red";
      } else {
        errorElement.textContent = "";
        errorElement.style.display = "none";
        field.style.borderColor = "";
      }
    }
  });

  document.getElementById("nextBtn").disabled = !isValid;
}

function handleFieldBlur(event) {
  const field = event.target;
  touchedFields[field.id] = true;
  validateSection(currentSectionIndex);
}

// Attach blur event listeners to fields
document.querySelectorAll(".form-section input").forEach((input) => {
  input.addEventListener("blur", handleFieldBlur);
});

document.addEventListener("input", (event) => {
  if (event.target.matches("input")) {
    validateSection(currentSectionIndex);
  }
});

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

document.addEventListener("input", (event) => {
  if (event.target.matches("input[required]")) {
    validateSection(currentSectionIndex);
  }
});

function navigate(direction) {
  if (direction === 1 && !isCurrentSectionValid()) return;
  currentSectionIndex += direction;
  showSection(currentSectionIndex);
}

function isCurrentSectionValid() {
  const section =
    document.querySelectorAll(".form-section")[currentSectionIndex];
  const fields = section.querySelectorAll("input[required]");
  let isValid = true;

  fields.forEach((field) => {
    const value = field.value.trim();
    let isFieldValid = true;

    if (field.type === "email") {
      isFieldValid = isValidEmail(value);
      if (!isFieldValid) {
        field.style.borderColor = "red";
      }
    } else if (value === "") {
      isFieldValid = false;
      field.style.borderColor = "red";
    } else {
      field.style.borderColor = "";
    }

    if (!isFieldValid) {
      isValid = false;
    }
  });
  return isValid;
}

function toggleOtherFields() {
  const hasOtherIncome = document.getElementById("hasOtherIncome").checked;
  const otherFields = document.querySelectorAll(".other-fieldset");
  otherFields.forEach((fieldset) => {
    fieldset.style.display = hasOtherIncome ? "block" : "none";
  });
}

function getArrayData(name) {
  const arrayData = [];
  document.querySelectorAll(`.${name}-fieldset`).forEach((fieldset, index) => {
    const data = {};
    fieldset.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox") {
        data[input.name] = input.checked;
      } else {
        data[input.name] = input.value;
      }
    });
    arrayData.push(data);
  });
  return arrayData;
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = {};
  formSections.forEach((section) => {
    const sectionData = {};
    Object.entries(section.fields).forEach(([key, field]) => {
      if (key === "employment") {
        sectionData[key] = getArrayData(key);
      } else if (field.type === "fieldset") {
        sectionData[key] = getFieldsetData(key);
      } else if (Array.isArray(field)) {
        sectionData[key] = getArrayData(key);
      } else {
        const input = document.getElementById(key);
        if (input) {
          if (input.type === "checkbox") {
            sectionData[key] = input.checked;
          } else {
            sectionData[key] = input.value;
          }
        }
      }
    });
    formData[section.title.toLowerCase().replace(/\s+/g, "")] = sectionData;
  });

  const {
    applicant,
    contact,
    finances,
    address,
    expenses,
    housing,
    income,
    employment,
    bank,
    debts,
    loan,
    termsandconditions,
    broker,
  } = formData || {};

  const data = {
    applicant: {
      ...applicant,
      dateOfBirth: { isoString: applicant?.dateOfBirth },
    },
    contact,
    finances,
    address,
    expenses,
    housing,
    income,
    employment: employment.employment,
    bank: {
      accountNumber: bank?.accountNumber,
      bsb: { inputString: bank?.bsb },
    },
    debts,
    loan,
    termsAndConditions: {
      ...termsandconditions,
      additionalDetails: termsandconditions?.additionalDetails,
      creditGuideConfirmation: termsandconditions?.creditGuideConfirmation,
      creditReportingAgreement: termsandconditions?.creditReportingAgreement,
      privacyAgreement: termsandconditions?.privacyAgreement,
    },
    broker,
    // borrowerMetaInfo: { ...borrowermetainfo },
  };

  console.log("Formatted Data:", data);
}

function getFieldsetData(name) {
  const fieldset = document.querySelector(`#${name}`);
  if (!fieldset) {
    console.error(`Fieldset with id "${name}" not found.`);
    return {};
  }
  const data = {};
  fieldset.querySelectorAll("input").forEach((input) => {
    const key = input.name.replace(`${name}-`, "");
    if (input.type === "checkbox") {
      data[key] = input.checked;
    } else if (key === "other") {
      data[key] = getArrayData(key);
    } else {
      data[key] = input.value;
    }
  });
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dynamicForm");
  if (!form) return;

  generateForm(formSections);
  toggleOtherFields();
  const incomeCheckbox = document.getElementById("hasOtherIncome");
  if (incomeCheckbox) {
    incomeCheckbox.addEventListener("change", toggleOtherFields);
  }
  form.addEventListener("submit", handleSubmit);
});
