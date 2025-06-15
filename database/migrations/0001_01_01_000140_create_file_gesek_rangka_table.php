<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('file_gesek_rangka', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('path');
    //         $table->string('hash');

    //         $table->unsignedBigInteger('pendaftaran_id');
    //         $table->foreign('pendaftaran_id')->references('id')->on('pendaftaran');

    //         $table->timestamps();
    //     });
    // }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_gesek_rangka');
    }
};
