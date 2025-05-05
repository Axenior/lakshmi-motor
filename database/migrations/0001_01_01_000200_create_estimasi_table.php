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
        Schema::create('estimasi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('diskon_jasa')->nullable();
            $table->unsignedBigInteger('diskon_sparepart')->nullable();
            $table->unsignedBigInteger('nilai_or')->nullable();

            $table->unsignedBigInteger('pendaftaran_id')->unique();
            $table->foreign('pendaftaran_id')->references('id')->on('pendaftaran');

            // $table->unsignedBigInteger('jasa_id');
            // $table->foreign('jasa_id')->references('id')->on('jasa');

            // $table->unsignedBigInteger('sparepart_id');
            // $table->foreign('sparepart_id')->references('id')->on('sparepart');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jasa');
    }
};
