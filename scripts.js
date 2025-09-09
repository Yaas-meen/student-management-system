const apiURL = "http://localhost:5501/studentsInfo";
const nameInput = document.querySelector(".name");
const ageInput = document.querySelector("input[type='number']");
const gradeInput = document.querySelector(".grade");
const addBtn = document.querySelector(".addBtn");
const studentList = document.querySelector(".studentList");
const emptyMsg = document.getElementById("emptyMsg");

let students = [];

window.onload = loadStudents;

function loadStudents() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      students = data;
      showStudents();
    })
    .catch(err => console.error("Error fetching students:", err));
}

function showStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  else
  emptyMsg.style.display = "none";

  students.forEach(student => {
    const div = document.createElement("div");
    div.className = "studentCard";
    div.innerHTML = `
      <div class="studentInfo">
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Grade:</strong> ${student.grade}</p>
      </div>
      <div class="studentActions">
        <button class="editBtn">✏️ Edit</button>
        <button class="deleteBtn">🗑️ Delete</button>
      </div>
    `;

    div.querySelector(".editBtn").onclick = () => editStudent(student.id);
    div.querySelector(".deleteBtn").onclick = () => deleteStudent(student.id);

    studentList.appendChild(div);
  });
}

addBtn.onclick = addStudent;

function addStudent() {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const grade = gradeInput.value.trim();

  if (!name || !age || !grade) {
    alert("Please fill all fields");
    return;
  }
  
  const newStudent = { name, age, grade };

  fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent)
  })
    .then(res => res.json())
    .then(() => {
      clearForm();
      loadStudents();
    });
}

function editStudent(id) {
  const student = students.find(s => s.id == id);
  if (!student) return;

  nameInput.value = student.name;
  ageInput.value = student.age;
  gradeInput.value = student.grade;

  addBtn.textContent = "Update Student";
  addBtn.onclick = () => updateStudent(id);
}

function updateStudent(id) {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const grade = gradeInput.value.trim();

  if (!name || !age || !grade) {
    alert("Please fill all fields");
    return;
  }

  const updatedStudent = { name, age, grade };

  fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent)
  })
    .then(res => res.json())
    .then(() => {
      addBtn.textContent = "Add Student";
      addBtn.onclick = addStudent;
      clearForm();
      loadStudents();
    });
}

function deleteStudent(id) {
  fetch(`${apiURL}/${id}`, { method: "DELETE" })
    .then(() => loadStudents());
}

function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  gradeInput.value = "";
}