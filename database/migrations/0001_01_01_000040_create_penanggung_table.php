<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penanggung', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->unique();
            $table->string('alamat')->nullable();
            $table->string('no_telepon')->unique()->nullable();
            $table->string('no_fax')->unique()->nullable();
            $table->integer('pph');
            $table->integer('ppn');
            // $table->string('jenis_penanggung');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penanggung');
    }
};
