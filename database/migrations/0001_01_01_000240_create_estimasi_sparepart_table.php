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
        Schema::create('estimasi_sparepart', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('estimasi_id');
            $table->foreign('estimasi_id')->references('id')->on('estimasi');
            $table->unsignedBigInteger('sparepart_id');
            $table->foreign('sparepart_id')->references('id')->on('sparepart');
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
        Schema::dropIfExists('estimasi_sparepart');
    }
};
