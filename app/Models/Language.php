<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    /**
     * Table
     * @var string
     */
    protected $table = 'language';
    /**
     * Primary key
     * @var string
     */
    protected $primaryKey = 'language_id';
    /**
     * Fields
     * @var array<string>
     */
    protected $fillable = [
        'name'
    ];

    protected $casts = [
        'last_update' => 'date: d-m-Y'
    ];
}
