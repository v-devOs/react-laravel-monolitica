<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    /**
     * Table
     * @var string
     */
    protected $table = 'actor';
    
    /**
     * Primary key
     * @var string
     */
    protected $primaryKey = 'actor_id';
    
    /**
     * Indicates if the model should be timestamped.
     * @var bool
     */
    public $timestamps = false;
    
    /**
     * The name of the "updated at" column.
     * @var string
     */
    const UPDATED_AT = 'last_update';
    
    /**
     * Fields
     * @var array<string>
     */
    protected $fillable = [
        'first_name',
        'last_name'
    ];

    protected $casts = [
        'last_update' => 'datetime'
    ];
}
