import React, { useState } from 'react';

const ProfileForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!fname.trim() || !lname.trim() || !address.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (fname.length < 2 || lname.length < 2) {
      setError('First and last names must be at least 2 characters long.');
      return false;
    }
    if (address.length < 5) {
      setError('Address must be at least 5 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('save_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&address=${encodeURIComponent(address)}`
      });

      const result = await response.text();
      if (response.ok) {
        setMessage('Profile saved successfully!');
        setFname('');
        setLname('');
        setAddress('');
      } else {
        throw new Error(result || 'Failed to save profile.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Last Name:
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  );
};

export default ProfileForm;