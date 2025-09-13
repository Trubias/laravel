const API_URL = "http://127.0.0.1:8000/api/profiles";
let editingId = null;

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const emailInput = document.getElementById("email");
const form = document.getElementById("profile-form");
const tableBody = document.querySelector("#profiles-table tbody");
const messageDiv = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");


function showMessage(msg, success = false) {
    messageDiv.textContent = msg;
    messageDiv.style.display = "block";
    messageDiv.style.background = success ? "#d4edda" : "#f8d7da";
    messageDiv.style.color = success ? "#155724" : "#721c24";
    setTimeout(() => { messageDiv.style.display = "none"; }, 2000);
}

function clearForm() {
    fnameInput.value = "";
    lnameInput.value = "";
    emailInput.value = "";
    editingId = null;
    submitBtn.textContent = "Submit";
}

function renderProfiles(profiles) {
    tableBody.innerHTML = "";
    if (!profiles.length) {
        tableBody.innerHTML = '<tr><td colspan="3">No profiles found.</td></tr>';
        return;
    }
    profiles.forEach(profile => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${profile.fname}</td>
            <td>${profile.lname}</td>
            <td>${profile.email}</td>
        `;
        tableBody.appendChild(tr);
    });
}

async function fetchProfiles() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        renderProfiles(data);
    } catch {
        showMessage("❌ Failed to fetch profiles");
    }
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    if (!fname || !lname || !email) return;
    submitBtn.disabled = true;
    try {
        let res, data;
        if (editingId) {
            res = await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ fname, lname, email })
            });
        } else {
            res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ fname, lname, email })
            });
        }
        data = await res.json();
        if (!res.ok) {
            let msg = data.message || "Error saving profile";
            if (data.errors) {
                msg += ': ' + Object.values(data.errors).flat().join(' ');
            }
            showMessage('❌ ' + msg);
            return;
        }
        showMessage("✅ Profile " + (editingId ? "updated!" : "added!"), true);
        clearForm();
        fetchProfiles();
    } catch (err) {
        showMessage("❌ Error saving profile: " + err.message);
    } finally {
        submitBtn.disabled = false;
    }
};

window.editProfile = (id, fname, lname, email) => {
    fnameInput.value = fname;
    lnameInput.value = lname;
    emailInput.value = email;
    editingId = id;
    submitBtn.textContent = "Update";
};

window.deleteProfile = async (id) => {
    if (!confirm("Delete this profile?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { "Accept": "application/json" } });
        if (!res.ok) throw new Error();
        showMessage("✅ Profile deleted!", true);
        fetchProfiles();
    } catch {
        showMessage("❌ Error deleting profile");
    }
};



document.addEventListener("DOMContentLoaded", fetchProfiles);
