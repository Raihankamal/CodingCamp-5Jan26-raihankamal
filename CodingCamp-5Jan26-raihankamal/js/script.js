const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

function renderTodos(data) {
  todoList.innerHTML = "";

  if (data.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="3" class="empty">No task found</td>
      </tr>
    `;
    return;
  }

  data.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  // VALIDASI INPUT
  if (task === "" || date === "") {
    alert("Please fill in task and date!");
    return;
  }

  todos.push({ task, date });
  todoInput.value = "";
  dateInput.value = "";

  renderTodos(todos);
});

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos(todos);
  }
});

filterBtn.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];
  const filtered = todos.filter(todo => todo.date === today);
  renderTodos(filtered);
});
