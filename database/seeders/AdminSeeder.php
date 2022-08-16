<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'Ali Raza',
            'email'=>'hathsutt86@gmail.com',
            'password'=> bcrypt('Admin123'),
            'role'=>'administrator'
        ]);
            
    }
}
