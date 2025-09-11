<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        $profiles = Profile::all(); // Fetch all profiles
        return view('profiles', compact('profiles')); // Pass data to view
    }
}