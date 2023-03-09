<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => 'テスト会員' . $i,
                'email' => "test{$i}@example.com",
                'password' => Hash::make('password'),
                'type' => 'member',
            ]);
        }
    }
}
