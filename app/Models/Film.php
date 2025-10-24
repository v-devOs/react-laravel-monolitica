<?php

namespace App\Models;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;


class Film extends Model
{
    /**
     * Table
     * @var string
     */
    protected $table = 'film';
    /**
     * primary key
     * @var string
     */
    protected $primaryKey = 'film_id';
    /**
     * Field
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'release_year',
        'rental_duration',
        'rental_rate',
        'length',
        'replacement_cost',
        'rating',
        'special_features',
        'language_id',
        'original_language_id'
    ];

    protected $casts = [
        'release_year' => 'string',
        'last_update' => 'date:d-m-Y'
    ];

    /**
     * Relations
     */

    public function language(){
        return $this->belongsTo(Language::class, 'language_id', 'language_id');
    }

    public function originalLanguage(){
        return $this->belongsTo(Language::class, 'original_language_id', 'language_id');
    }
}
