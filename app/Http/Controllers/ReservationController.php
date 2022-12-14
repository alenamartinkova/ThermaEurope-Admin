<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('ReservationList');
    }
}
