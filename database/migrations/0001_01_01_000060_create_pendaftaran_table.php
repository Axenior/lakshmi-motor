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
            $table->string('nama');
            $table->string('alamat');
            $table->string('no_telepon');
            $table->string('no_rangka');
            $table->string('no_polisi');
            $table->string('no_mesin');
            $table->integer('tahun');
            $table->string('jenis');
            $table->string('warna');
            $table->integer('km_masuk')->nullable();
            $table->enum('status', ['pendaftaran', 'estimasi', 'pengerjaan', 'selesai', 'batal'])->default('pendaftaran');
            $table->string('keterangan_pembatalan')->nullable();
            $table->boolean('lunas')->default(false);
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('tipe_id');
            $table->foreign('tipe_id')->references('id')->on('tipe');
            $table->unsignedBigInteger('penanggung_id')->nullable();
            $table->foreign('penanggung_id')->references('id')->on('penanggung');
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
