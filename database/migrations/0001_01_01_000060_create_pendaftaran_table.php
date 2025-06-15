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
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->string('no_register');
            $table->string('no_polis')->nullable();
            $table->date('tanggal_pendaftaran');
            $table->string('keterangan');
            $table->timestamps();

            $table->unsignedBigInteger('pelanggan_id');
            $table->foreign('pelanggan_id')->references('id')->on('pelanggan');

            $table->unsignedBigInteger('kendaraan_id');
            $table->foreign('kendaraan_id')->references('id')->on('kendaraan');

            $table->unsignedBigInteger('penanggung_id')->nullable();
            $table->foreign('penanggung_id')->references('id')->on('penanggung');

            // $table->integer('estimasi')->nullable();
            $table->integer('km_masuk')->nullable();
            $table->enum('status', ['pendaftaran', 'estimasi', 'pengerjaan', 'selesai', 'batal'])->default('pendaftaran');
            $table->string('keterangan_pembatalan')->nullable();
            $table->boolean('lunas')->default(false);

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            // $table->unsignedBigInteger('nilai_or')->nullable();
            // $table->boolean('selesai')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
