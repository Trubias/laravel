<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ApiController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
        ]);

        $profile = Profile::create($validated);

        return response()->json(['message' => 'Profile created!', 'profile' => $profile], 201);
    }

    public function profiles()
    {
        $profiles = Profile::all();
        return response()->json($profiles);
    }
}