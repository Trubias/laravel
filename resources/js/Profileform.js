import React, { useState, useEffect } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import "../sass/ProfileForm.scss";

const API_URL = "http://localhost/api/profiles";

const ProfileCrud = () => {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({ fname: "", lname: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profiles
  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProfiles(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setMessage("✅ Profile updated!");
      } else {
        await axios.post(API_URL, form);
        setMessage("✅ Profile added!");
      }
      setForm({ fname: "", lname: "" });
      setEditingId(null);
      fetchProfiles();
    } catch (err) {
      setMessage("❌ Error saving profile");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // Edit profile
  const handleEdit = (profile) => {
    setForm({ fname: profile.fname, lname: profile.lname });
    setEditingId(profile.id);
  };

  // Delete profile
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this profile?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("✅ Profile deleted!");
      fetchProfiles();
    } catch (err) {
      setMessage("❌ Error deleting profile");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="profile-crud-container">
      <h2>Profiles Form</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="fname"
          value={form.fname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lname"
          value={form.lname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <button type="submit" disabled={loading}>
          {editingId ? "Update" : "Submit"}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm({ fname: "", lname: "" }); setEditingId(null); }}>
            Cancel
          </button>
        )}
      </form>
      <div className="profiles-list">
        {loading ? (
          <p>Loading...</p>
        ) : profiles.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.fname}</td>
                  <td>{profile.lname}</td>
                  <td>
                    <button onClick={() => handleEdit(profile)}>Edit</button>
                    <button onClick={() => handleDelete(profile.id)} className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Mount React app if in Blade view
const container = document.getElementById("profile-crud-root");
if (container) {
    const root = createRoot(container);
    root.render(<ProfileForm />);
}

export default ProfileForm;
