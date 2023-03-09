<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        self::truncateTables();

        $this->call(AdminSeeder::class);
        $this->call(MembersSeeder::class);
        $this->call(TasksSeeder::class);
    }

    /**
     * DBをまるごとtruncateする
     *
     * @return void
     */
    private static function truncateTables(): void
    {
        $db_name = DB::connection()->getDatabaseName();
        $tables = DB::select('SHOW TABLES');
        $skip_tables = ['migrations'];

        foreach ($tables as $table) {
            $property = "Tables_in_{$db_name}";
            $table_name = $table->$property;

            if (in_array($table_name, $skip_tables, true)) {
                continue;
            }

            DB::table($table_name)->truncate();
        }
    }
}
