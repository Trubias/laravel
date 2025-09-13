<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // GET /api/profiles
    public function index()
    {
        return response()->json(Profile::all());
    }

    // POST /api/profiles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);
        $profile = Profile::create($validated);
        return response()->json($profile, 201);
    }

    // GET /api/profiles/{id}
    public function show($id)
    {
        $profile = Profile::findOrFail($id);
        return response()->json($profile);
    }

    // PUT /api/profiles/{id}
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);
        $profile = Profile::findOrFail($id);
        $profile->update($validated);
        return response()->json($profile);
    }

    // DELETE /api/profiles/{id}
    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);
        $profile->delete();
        return response()->json(['message' => 'Profile deleted']);
    }
}