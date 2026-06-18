$(document).ready(function () {

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  currentUser.tasks = Array.isArray(currentUser.tasks) ? currentUser.tasks : [];

  function renderTasks() {
    $("#taskList").empty();
    currentUser.tasks.forEach((task, index) => {
      let li = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${task.name} - ${task.time}</span>
          <div>
            <button class="btn btn-sm btn-primary me-1 editTask">Edit</button>
            <button class="btn btn-sm btn-danger deleteTask">Delete</button>
          </div>
        </li>
      `);
      li.find(".editTask").click(() => editTask(index));
      li.find(".deleteTask").click(() => deleteTask(index));
      $("#taskList").append(li);
    });
  }

  function saveUser() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
      currentUser.tasks.splice(index, 1);
      saveUser();
      renderTasks();
    }
  }

  function editTask(index) {
    let task = currentUser.tasks[index];
    let newName = prompt("Edit Task Name", task.name);
    let newTime = prompt("Edit Task Time", task.time);
    if (newName && newTime) {
      task.name = newName;
      task.time = newTime;
      saveUser();
      renderTasks();
    }
  }

  $("#addTask").click(function () {
    let name = $("#taskName").val().trim();
    let time = $("#taskTime").val().trim();
    if (!name || !time) {
      alert("Enter task name and time.");
      return;
    }

    currentUser.tasks.push({ name, time });
    saveUser();
    renderTasks();
    $("#taskName").val("");
    $("#taskTime").val("");
  });

  $("#logout").click(function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  renderTasks();
});
