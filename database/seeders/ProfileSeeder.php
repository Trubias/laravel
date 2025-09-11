<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    public function run()
    {
        Profile::create([
            'name' => 'John Doe',
            'address' => '123 Main St',
            'phonenumber' => '555-1234',
            'fname' => 'John',
            'lname' => 'Doe'
        ]);
        Profile::create([
            'name' => 'Jane Smith',
            'address' => '456 Oak Ave',
            'phonenumber' => '555-5678',
            'fname' => 'Jane',
            'lname' => 'Smith'
        ]);
    }
}