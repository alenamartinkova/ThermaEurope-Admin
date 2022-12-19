<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * @return Response
     */
    public function preferences(): Response
    {
        return Inertia::render('Preferences');
    }
}
