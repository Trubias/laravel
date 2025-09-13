<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Form</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f7f7f7; }
        .container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 30px 24px; }
        h2 { text-align: center; margin-bottom: 18px; }
    form { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; justify-content: center; }
    form input { flex: 1 1 140px; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 16px; }
    form button { padding: 10px 22px; border: none; border-radius: 6px; background: #007bff; color: #fff; cursor: pointer; font-weight: bold; font-size: 16px; transition: background 0.2s; }
    form button[disabled] { background: #6c757d; cursor: not-allowed; }
    form button:hover:not([disabled]) { background: #0056b3; }
        .message { text-align: center; margin-bottom: 12px; padding: 8px; border-radius: 4px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .profiles-list table { width: 100%; border-collapse: collapse; background: #fafbfc; border-radius: 8px; overflow: hidden; }
    .profiles-list th, .profiles-list td { padding: 12px 10px; border-bottom: 1px solid #eee; text-align: left; font-size: 16px; }
    .profiles-list th { background: #f1f1f1; font-size: 17px; }
    .profiles-list tr:last-child td { border-bottom: none; }
    </style>
</head>
<body>
    <div class="container">
    <h2>Profile Form</h2>
        <div id="message" class="message" style="display:none;"></div>
        <form id="profile-form">
            <input type="text" id="fname" placeholder="First Name" required />
            <input type="text" id="lname" placeholder="Last Name" required />
            <input type="email" id="email" placeholder="Email" required />
            <button type="submit" id="submit-btn">Submit</button>
        </form>
        <div class="profiles-list">
            <table id="profiles-table">
                <thead>
                    <tr><th>First Name</th><th>Last Name</th><th>Email</th></tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <script src="/js/profiles.js"></script>
</body>
</html>
