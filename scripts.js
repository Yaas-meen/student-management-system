const emptyMsg = document.getElementById("emptyMsg");

// update empty message visibility
function updateEmptyMsg() {
  if (studentList.children.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";  
  }
}
updateEmptyMsg();
