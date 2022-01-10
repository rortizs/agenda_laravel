<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string("title", 255);/**evento */
            $table->text("descripcion");/**descripcion del evento */

            $table->dateTime("start");/**fecha inicio */
            $table->dateTime("end");/**fecha final */
            $table->dateTime("start_time");/**hora inicio */
            $table->dateTime("end_time");/**hora final */

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventos');
    }
}
