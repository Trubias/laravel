<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingColumnsToProfilesTable extends Migration
{
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('profiles', 'name')) {
                $table->string('name')->after('id');
            }
            if (!Schema::hasColumn('profiles', 'address')) {
                $table->string('address')->nullable()->after('name');
            }
            if (!Schema::hasColumn('profiles', 'phonenumber')) {
                $table->string('phonenumber')->nullable()->after('address');
            }
            if (!Schema::hasColumn('profiles', 'fname')) {
                $table->string('fname')->after('phonenumber');
            }
            if (!Schema::hasColumn('profiles', 'lname')) {
                $table->string('lname')->after('fname');
            }
        });
    }

    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['name', 'address', 'phonenumber', 'fname', 'lname']);
        });
    }
}