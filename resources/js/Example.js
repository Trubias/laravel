import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function Example() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const [profiles, setProfiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/register", {
                name,
                address,
                fname,
                lname,
            });
            alert("Profile created!");
            setName("");
            setAddress("");
            fetchProfiles(); // Refetch to update the table
        } catch (error) {
            alert("Error creating profile.");
        }
    };

    const fetchProfiles = async () => {
        try {
            const response = await axios.get("/api/profiles");
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="home">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile) => (
                            <tr key={profile.id}>
                                <td>{profile.name}</td>
                                <td>{profile.address || 'N/A'}</td>
                                <td>{profile.fname}</td>
                                <td>{profile.lname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}