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
        Schema::create('tipe', function (Blueprint $table) {
            $table->id();
            $table->string('nama');

            $table->unsignedBigInteger('merk_id');
            $table->foreign('merk_id')->references('id')->on('merk');

            $table->timestamps();

            // Tambahkan unique constraint untuk kombinasi nama & merk_id
            $table->unique(['nama', 'merk_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipe');
    }
};
