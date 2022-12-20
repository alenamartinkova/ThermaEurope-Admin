<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Language;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * @return Response
     */
    public function preferences(): Response
    {
        // move to repo ?
        $data['currencies'] = Currency::Active()->Deleted()->get();
        $data['languages'] = Language::Active()->Deleted()->get();

        return Inertia::render('Preferences', $data);
    }

    /**
     * @return Response
     */
    public function personalInformation(): Response
    {
        return Inertia::render('PersonalInformation');
    }

    /**
     * @return Response
     */
    public function security(): Response
    {
        return Inertia::render('Security');
    }
}
