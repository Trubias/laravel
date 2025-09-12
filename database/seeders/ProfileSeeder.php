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
            'fname' => 'John',
            'lname' => 'Doe'
        ]);
        Profile::create([
            'name' => 'Jane Smith',
            'address' => '456 Oak Ave',
            'fname' => 'Jane',
            'lname' => 'Smith'
        ]);
    }
}