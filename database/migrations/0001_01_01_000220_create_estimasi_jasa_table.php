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
        Schema::create('estimasi_jasa', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('estimasi_id');
            $table->foreign('estimasi_id')->references('id')->on('estimasi');
            $table->unsignedBigInteger('jasa_id');
            $table->foreign('jasa_id')->references('id')->on('jasa');
            $table->unsignedBigInteger('jumlah');
            $table->unsignedBigInteger('diskon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimasi_jasa');
    }
};
