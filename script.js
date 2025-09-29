const ID = "purokData";
let editRow = null;

console.log(localStorage.getItem(ID));

function addData() {
  let personLastName = document.getElementById("personLastName").value;
  let personFirstName = document.getElementById("personFirstName").value;
  let personMiddleName = document.getElementById("personMiddleName").value;
  let personAge = document.getElementById("personAge").value;
  let personPurok = document.getElementById("personPurok").value;
  let personGender = document.getElementById("personGender").value;

  let personData = {
    lastname: personLastName,
    firstname: personFirstName,
    middlename: personMiddleName,
    age: personAge,
    purok: personPurok,
    gender: personGender,
  };

  let existData = localStorage.getItem(ID);
  let data = existData ? JSON.parse(existData) : [];

  if (!Array.isArray(data)) {
    data = [];
  }

  let duplicate = data.some((values) => {
    return (
      values.lastname == personLastName &&
      values.firstname == personFirstName &&
      values.middlename == personMiddleName
    );
  });

  if (duplicate) {
    console.log("Duplicate");
    document.getElementById("duplicateModal").style.display = "flex";
    return; //stop saved exist data
  }
  data.push(personData);
  console.log("Saved");
  document.getElementById("successModal").style.display = "flex";
  clearField();

  localStorage.setItem(ID, JSON.stringify(data));
  console.log(localStorage.getItem(ID));

  showData();
}

function showData() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let data = localStorage.getItem(ID);
  if (data) {
    let getData = JSON.parse(data);

    if (getData.length === 0) {
      console.log("no data found");
      return;
    } else
      getData.forEach((values, index) => {
        let newRow = tableBody.insertRow();

        newRow.insertCell().textContent = values.lastname;
        newRow.insertCell().textContent = values.firstname;
        newRow.insertCell().textContent = values.middlename;
        newRow.insertCell().textContent = values.age;
        newRow.insertCell().textContent = values.gender;
        newRow.insertCell().textContent = values.purok;

        newRow.insertCell().innerHTML = `
  <button class="btn edit-btn" onclick="openForm(${index})">✏️ Edit</button>
  <button class="btn delete-btn" onclick="openDeleteModal(${index})">🗑 Delete</button>
`;
      });
  }
  console.log("no data");
}

function openForm(editIndex = null) {
  document.getElementById("formModal").style.display = "flex";

  document.getElementById("formTitle").textContent =
    editIndex === null ? "Add Resident" : "Edit Resident";

  if (editIndex !== null) {
    let data = JSON.parse(localStorage.getItem(ID)) || [];
    let personData = data[editIndex];

    document.getElementById("personLastName").value = personData.lastname;
    document.getElementById("personFirstName").value = personData.firstname;
    document.getElementById("personMiddleName").value = personData.middlename;
    document.getElementById("personAge").value = personData.age;
    document.getElementById("personPurok").value = personData.purok;
    document.getElementById("personGender").value = personData.gender;
    editRow = editIndex;
  } else {
    clearField();
    editRow = null;
  }
}

function UpdateData() {
  let personLastName = document.getElementById("personLastName").value;
  let personFirstName = document.getElementById("personFirstName").value;
  let personMiddleName = document.getElementById("personMiddleName").value;
  let personAge = document.getElementById("personAge").value;
  let personPurok = document.getElementById("personPurok").value;
  let personGender = document.getElementById("personGender").value;

  let personData = {
    lastname: personLastName,
    firstname: personFirstName,
    middlename: personMiddleName,
    age: personAge,
    purok: personPurok,
    gender: personGender,
  };

  let existData = localStorage.getItem(ID);
  let data = existData ? JSON.parse(existData) : [];

  // check duplicate only when adding new
  if (editRow === null) {
    let duplicate = data.some((values) => {
      return (
        values.lastname == personLastName &&
        values.firstname == personFirstName &&
        values.middlename == personMiddleName
      );
    });

    if (duplicate) {
      console.log("Duplicate");
      document.getElementById("duplicateModal").style.display = "flex";
      return;
    }

    data.push(personData);
  } else {
    // update existing
    data[editRow] = personData;
    editRow = null;
  }

  localStorage.setItem(ID, JSON.stringify(data));
     document.getElementById("successModal").style.display = "flex";
  console.log("Saved/Updated");
  console.log(localStorage.getItem(ID));

  closeForm(); // ✅ close popup
  showData();
  clearField();
}

let deleteIndex = null;

function openDeleteModal(index) {
  deleteIndex = index;
  document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
  deleteIndex = null;
}

function confirmDelete() {
  if (deleteIndex === null) return;

  let data = JSON.parse(localStorage.getItem(ID)) || [];
  data.splice(deleteIndex, 1);
  localStorage.setItem(ID, JSON.stringify(data));

  console.log("Deleted:", deleteIndex);

  closeDeleteModal();
  showData();
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}
function closeDuplicateModal() {
  document.getElementById("duplicateModal").style.display = "none";
}
function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

function clearField() {
  document.getElementById("personLastName").value = "";
  document.getElementById("personFirstName").value = "";
  document.getElementById("personMiddleName").value = "";
  document.getElementById("personAge").value = "";
  document.getElementById("personPurok").value = "";
  document.getElementById("personGender").selectedIndex = 0;
}

document.addEventListener("DOMContentLoaded", showData);
