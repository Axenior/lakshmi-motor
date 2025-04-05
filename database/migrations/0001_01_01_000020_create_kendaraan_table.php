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
        Schema::create('kendaraan', function (Blueprint $table) {
            $table->id();
            $table->string('no_rangka')->unique();
            $table->string('no_polisi');
            $table->string('no_mesin');
            // $table->string('merk');
            // $table->string('tipe');
            $table->integer('tahun');
            $table->string('jenis');
            $table->string('warna');

            // $table->unsignedBigInteger('merk_id');
            // $table->foreign('merk_id')->references('id')->on('merks');

            $table->unsignedBigInteger('tipe_id');
            $table->foreign('tipe_id')->references('id')->on('tipe');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraan');
    }
};
