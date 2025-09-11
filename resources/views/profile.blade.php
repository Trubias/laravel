<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profiles</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>Profiles List</h1>
    @if($profiles->isEmpty())
        <p>No profiles found. Please add some data.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($profiles as $profile)
                    <tr>
                        <td>{{ $profile->id }}</td>
                        <td>{{ $profile->name }}</td>
                        <td>{{ $profile->address ?? 'N/A' }}</td>
                        <td>{{ $profile->phonenumber ?? 'N/A' }}</td>
                        <td>{{ $profile->fname }}</td>
                        <td>{{ $profile->lname }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</body>
</html>