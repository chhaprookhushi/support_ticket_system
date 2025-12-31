
const API = "http://localhost:5000/api";

function goRegister() { window.location.href = "register.html"; }
function goLogin() { window.location.href = "index.html"; }
function goDashboard() { window.location.href = "dashboard.html"; }
function goCreate() { window.location.href = "create.html"; }

function logout() {
  localStorage.clear();
  goLogin();
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message);

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  goDashboard();
}

// REGISTER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  goLogin();
}

// LOAD TICKETS
async function loadTickets() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return;

  document.getElementById("roleTitle").innerText =
    role === "admin" ? "Admin Dashboard" : "My Tickets";

  let url = `${API}/tickets`;
  if (role === "admin") url = `${API}/tickets/all`;

  const res = await fetch(url, {
    headers: { Authorization: "Bearer " + token }
  });

  const tickets = await res.json();
  const container = document.getElementById("tickets");
  container.innerHTML = "";

  tickets.forEach(t => {
    const div = document.createElement("div");
    div.className = "ticket";

    if (role === "admin") {
      div.innerHTML = `
        <h3>${t.title}</h3>
        <p>${t.description}</p>

        <select onchange="updateStatus('${t._id}', this.value)">
          <option ${t.status === "open" ? "selected" : ""}>open</option>
          <option ${t.status === "in-progress" ? "selected" : ""}>in-progress</option>
          <option ${t.status === "closed" ? "selected" : ""}>closed</option>
        </select>

        <button onclick="deleteTicket('${t._id}')">Delete</button>
      `;
    } else {
      div.innerHTML = `
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <p><b>Status:</b> ${t.status}</p>
      `;
    }

    container.appendChild(div);
  });
}

// UPDATE STATUS (ADMIN ONLY)
async function updateStatus(id, status) {
  await fetch(`${API}/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ status })
  });

  loadTickets();
}

// DELETE (ADMIN ONLY)
async function deleteTicket(id) {
  if (!confirm("Delete this ticket?")) return;

  await fetch(`${API}/tickets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  loadTickets();
}

// CREATE TICKET
async function createTicket() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const role = localStorage.getItem("role");

  const body = { title, description };

  if (role === "admin") {
    body.status = document.getElementById("status").value;
  }

  await fetch(`${API}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(body)
  });

  goDashboard();
}

// HIDE STATUS FOR USER ON CREATE PAGE
document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const status = document.getElementById("status");
  if (status && role === "user") {
    status.style.display = "none";
  }

  if (document.getElementById("tickets")) loadTickets();
});

document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const createBtn = document.getElementById("createBtn");

  if (role === "admin" && createBtn) {
    createBtn.style.display = "none";
  }
});

function togglePassword() {
  const input = document.getElementById("password");
  if (!input) return;

  input.type = input.type === "password" ? "text" : "password";
}

