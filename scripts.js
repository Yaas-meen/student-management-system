const nameInput = document.querySelector(".name");
const ageInput = document.querySelector("input[type=number]");
const gradeInput = document.querySelector(".grade");
const addBtn = document.querySelector(".addBtn");
const studentList = document.querySelector(".studentList");
const emptyMsg = document.getElementById("emptyMsg");
const apiUrl = "http://localhost:5500/studentsInfo";

function updateEmptyMsg() {
  if (students.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}
  updateEmptyMsg();

