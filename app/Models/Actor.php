<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    /**
     * Tabke
     * @var string
     */

    protected $table = 'actor';
    /**
     * Primary key
     * @var string
     */
    protected $primaryKey = 'actor_id';
    /**
    *  Fields
    *  @var array<string>
    */
    protected $fillable = [
        'first_name',
        'last_name'
    ];

    protected $casts = [
        'last_update' => 'date: d-m-Y'
    ];
}
