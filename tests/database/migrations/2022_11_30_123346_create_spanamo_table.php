<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('abilities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 191);
            $table->string('title', 191)->nullable();
            $table->unsignedInteger('entity_id')->nullable();
            $table->string('entity_type', 191)->nullable();
            $table->boolean('only_owned')->default(false);
            $table->string('options', 191)->nullable();
            $table->integer('scope')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('advantages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('advantagesable_id');
            $table->string('advantagesable_type');
            $table->string('name');
            $table->string('language_key_name', 150);
            $table->tinyInteger('is_active');
            $table->tinyInteger('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->index(['advantagesable_id', DB::raw("advantagesable_type(191)")]);
        });

        Schema::create('allotment_detail', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('room_id')->index();
            $table->integer('hotel_id')->index();
            $table->date('date')->index();
            $table->integer('open')->default(3)->comment('status of allotment 1 for open 2 for sold out 3 for close');
            $table->integer('refund')->comment('non-refundable 1 for yes 0 for no');
            $table->integer('room')->comment('number of rooms');
            $table->integer('min_day')->default(7)->comment('Minimum No of days required');
            $table->integer('released')->comment('release');
            $table->integer('paper')->comment('Require paper 1 means yes 0 means no');
            $table->integer('user_id');
            $table->tinyInteger('status')->default(1);
            $table->integer('is_delete');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->index(['open', 'room', 'status']);
            $table->index(['id']);
        });

        Schema::create('amenity_settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('wizard_relation_id')->index();
            $table->tinyInteger('on_request')->default(0);
            $table->tinyInteger('free')->default(0);
            $table->tinyInteger('days_time')->default(0);
            $table->string('days', 100)->nullable();
            $table->string('time_from', 100)->nullable();
            $table->string('time_to', 100)->nullable();
            $table->tinyInteger('charge')->default(0);
            $table->double('amount', 11, 2)->nullable();
            $table->integer('currency_id')->nullable()->index();
            $table->string('for_whom')->nullable();
            $table->string('for_how_long')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('assigned_roles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('role_id')->index();
            $table->unsignedInteger('entity_id');
            $table->string('entity_type', 191);
            $table->unsignedInteger('restricted_to_id')->nullable();
            $table->string('restricted_to_type', 191)->nullable();
            $table->integer('scope')->nullable()->index();

            $table->index(['entity_id', 'entity_type', 'scope']);
        });

        Schema::create('basic_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50)->default('0');
            $table->mediumText('address');
            $table->string('phone', 20);
            $table->string('website', 150);
            $table->string('default_email', 100);
            $table->string('signature');
            $table->string('contract_key');
            $table->string('siteurl');
            $table->string('starting_url')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('billing_address', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->integer('type')->default(0)->comment('0:Default, 1: Operator Language');
            $table->string('company', 150);
            $table->string('hotel_name', 150);
            $table->string('contact_person', 150)->nullable();
            $table->string('address', 150);
            $table->string('zip_code', 150)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('fax', 50)->nullable();
            $table->string('web', 150)->nullable();
            $table->string('identification_id', 150)->nullable();
            $table->string('vat_id', 150)->nullable();
            $table->string('contract_no', 50);
            $table->string('billing_lang', 50);
            $table->string('iban', 75);
            $table->string('ivan', 20);
            $table->string('debit_iban', 50);
            $table->string('holder_name', 80);
            $table->string('filename');
            $table->string('bank_connetion')->nullable()->comment('bank details');
            $table->dateTime('created_dt');
            $table->timestamp('updated_dt')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->integer('update_user_id')->nullable();
        });

        Schema::create('booking_event', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('booking_id');
            $table->integer('event');
            $table->unsignedInteger('user_id')->nullable()->index();
            $table->timestamp('created_at')->useCurrent();
            $table->string('ip', 200);
        });

        Schema::create('booking_main', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('temp_booking_id')->unique();
            $table->integer('pin');
            $table->integer('is_paypal');
            $table->integer('paypal_prestate')->default(0);
            $table->string('name', 100);
            $table->string('surname', 100);
            $table->string('email', 200);
            $table->string('phone_number', 200);
            $table->string('_token', 200);
            $table->integer('policy_privacy')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('data_booking', 200);
            $table->integer('cancelled')->default(0)->comment('0: ok, 1: richiesta, 2: cancellato');
            $table->integer('therma_status')->default(0)->comment('0:in attesa, 1:conf, 2: canc');
            $table->integer('hotel_status')->default(0)->comment('0:in attesa, 1:conf, 2: canc');
            $table->tinyInteger('deleted')->default(0);
            $table->integer('hotel_id')->index();
            $table->string('currency', 191);
            $table->string('country', 100);
            $table->dateTime('check_in');
            $table->dateTime('check_out');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->tinyInteger('has_card');
            $table->string('phone_dial', 10);
        });

        Schema::create('booking_room', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('booking_id', 200)->index();
            $table->integer('room_id')->index();
            $table->integer('adults');
            $table->integer('children');
            $table->string('price', 200);
            $table->string('price_per_person_disc_hotel', 200);
            $table->integer('meals')->index();
            $table->string('temp_room_id', 200);
            $table->string('price_per_person_disc_admin', 200);
            $table->string('price_per_person_secondary_hotel', 200);
            $table->string('price_per_person_secondary_admin', 200);
            $table->string('price_per_person_commission', 200);
            $table->string('price_per_person_secondary_commission', 200);
            $table->string('price_per_person', 200);
            $table->string('check_in', 100);
            $table->string('check_out', 100);
            $table->tinyInteger('is_secondary');
            $table->string('price_total', 191);
            $table->string('special_request', 1000);
            $table->unsignedBigInteger('condition_id')->nullable()->index();
            $table->unsignedBigInteger('price_offer_id')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('booking_room_discounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('booking_id')->index();
            $table->integer('room_id')->index();
            $table->unsignedInteger('discount_id')->index();
            $table->unsignedInteger('percentage');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('booking_room_placement', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('booking_id')->index();
            $table->integer('room_id')->index();
            $table->tinyInteger('is_standard');
            $table->integer('hotel_age_discount_id')->index();
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('age')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('booking_treatment', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('booking_id', 200)->index();
            $table->string('type', 200);
            $table->string('room_id', 300);
            $table->integer('dt_id');
            $table->integer('quantity');

            $table->index([DB::raw("room_id(255)")]);
        });

        Schema::create('booking_vat_tax', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('booking_id')->index();
            $table->tinyInteger('city_tax');
            $table->string('city_tax_amount', 100)->nullable();
            $table->string('city_tax_for_whom', 100)->nullable();
            $table->string('city_tax_for_how_long', 100)->nullable();
            $table->tinyInteger('vat_included');
            $table->string('vat_amount', 191)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('cards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('booking_id')->index();
            $table->string('card');
            $table->smallInteger('count_of_card_views')->default(5);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('v_name', 30);
            $table->integer('i_state_id');
            $table->enum('e_status', ['enable', 'disable'])->default('enable');

            $table->index(['v_name', 'i_state_id', 'e_status']);
        });

        Schema::create('countries', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('v_sortname', 3)->unique();
            $table->string('v_name', 150);
            $table->integer('i_phonecode');
            $table->string('v_iso_2', 10);
            $table->string('v_iso_3', 10);
            $table->string('v_numeric_code', 10);
            $table->string('icon');
            $table->enum('e_status', ['enable', 'disable'])->default('enable');
            $table->string('name');
            $table->string('name_key_other')->comment('language keyword for other sections - currently in location this used');
            $table->string('description');
            $table->string('slug');
            $table->string('image');
            $table->string('address')->nullable();
            $table->string('zip_code', 50);
            $table->string('lat', 50)->nullable();
            $table->string('long', 50)->nullable();
            $table->string('embed_video')->nullable()->default('https://www.youtube.com/watch?v=cqFzLj1TPFs');
            $table->string('cure');
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->nullable();
            $table->integer('user_id');
            $table->integer('is_active')->default(1);
            $table->integer('is_deleted');
            $table->decimal('review_score', 2, 1)->nullable()->default(0);
            $table->integer('review_count')->nullable()->default(0);
            $table->unsignedBigInteger('meta_id')->nullable();
            $table->unsignedBigInteger('priority')->nullable();
            $table->unsignedBigInteger('map_zoom_coordinates_id')->nullable()->index();
            $table->string('name_mutations')->default('');
            $table->string('name_mutations_2');
            $table->tinyInteger('show_landing')->default(1);
            $table->bigInteger('meta_masonry_id')->nullable();

            $table->index(['v_name', 'v_numeric_code', 'e_status']);
        });

        Schema::create('countryfeatures', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('country_id');
            $table->string('name');
            $table->string('description');
            $table->integer('is_active');
            $table->integer('is_deleted');
            $table->dateTime('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->unsignedBigInteger('priority')->nullable();
            $table->unsignedBigInteger('meta_id')->nullable();
        });

        Schema::create('cure_treatment', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('hotel_id')->nullable();
            $table->double('price')->default(0);
            $table->integer('commission')->nullable()->comment('in percentage');
            $table->double('commission_price')->nullable()->default(0);
            $table->integer('discount')->nullable()->comment('in percentage');
            $table->double('discounted_price')->nullable()->default(0);
            $table->double('net_price')->nullable();
            $table->double('sale_price')->nullable()->default(0)->comment('not shown anywhere');
            $table->string('image')->nullable();
            $table->tinyInteger('is_active')->nullable()->default(0)->comment('1:inactive, 0:active');
            $table->dateTime('created_at')->nullable();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
            $table->integer('title')->nullable()->index();
            $table->unsignedBigInteger('cure_description')->nullable()->index();
            $table->integer('duration')->nullable();
            $table->integer('min_age')->nullable();
            $table->integer('priority')->nullable();
            $table->tinyInteger('promo')->default(0);
        });

        Schema::create('currency', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150);
            $table->string('symbol', 150);
            $table->string('code', 15);
            $table->float('price')->default(0);
            $table->string('suffix', 150);
            $table->string('prefix', 150);
            $table->string('exchange_rate', 150)->nullable();
            $table->tinyInteger('admin_default')->default(0)->comment('1:admin_default_language, 0:No');
            $table->integer('is_active')->default(1)->comment('0:default currency,1:no');
            $table->tinyInteger('is_deleted');
        });

        Schema::create('dashboard_widgets', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id');
            $table->integer('user_type');
            $table->enum('type', ['0', '1'])->comment('1: view col-md-8, 0: view col-md-4');
            $table->integer('module_id');
            $table->dateTime('date');
        });

        Schema::create('discount_offer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hotel_id')->nullable();
            $table->integer('user_id');
            $table->integer('updated_user_id');
            $table->integer('discount_name')->nullable()->index();
            $table->integer('duration_from')->nullable()->default(0);
            $table->integer('duration_to')->nullable()->default(0);
            $table->boolean('discount');
            $table->boolean('commission');
            $table->integer('days_before_arrival')->nullable();
            $table->string('apply_the_discount')->nullable();
            $table->string('rooms')->nullable();
            $table->dateTime('created_at');
            $table->tinyInteger('is_active')->default(0);
            $table->date('valid_from');
            $table->date('valid_to');
            $table->string('market', 150);
            $table->string('days');
            $table->string('meals')->default('');
            $table->tinyInteger('duration_check')->nullable();
            $table->tinyInteger('primary_price')->nullable();
            $table->tinyInteger('user_type');
            $table->tinyInteger('duration_days')->nullable();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
        });

        Schema::create('discount_offer_nights_combinations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('discount_id')->index();
            $table->integer('min_nights');
            $table->integer('max_nights')->nullable();
            $table->integer('discount');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('dynamic_menu', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('parent_id')->nullable();
            $table->string('name', 50);
            $table->string('link')->nullable();
            $table->string('image')->nullable();
            $table->string('language_key');
            $table->integer('level')->nullable();
            $table->integer('priority')->nullable();
            $table->integer('sub_priority')->nullable();
            $table->integer('is_active')->nullable()->default(0);
            $table->dateTime('created_at');
            $table->dateTime('updated_at')->nullable();
            $table->integer('is_deleted')->default(0);
        });

        Schema::create('emaillogs', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('member_id');
            $table->mediumText('email');
            $table->mediumText('subject');
            $table->mediumText('message');
            $table->dateTime('logdate');
            $table->string('fromemail');
        });

        Schema::create('email_token', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('user_id')->nullable()->index();
            $table->string('token', 100)->nullable();
            $table->unsignedBigInteger('action_id')->index();
            $table->integer('reservation_id')->nullable()->index();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('flaticons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('file_name', 300)->comment('Should contain the upload_timestamp first.');
            $table->string('upload_timestamp', 100);
            $table->string('title_key')->nullable();
            $table->string('slug')->comment('For hardcoded entries.');
            $table->tinyInteger('is_general')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('flaticon_entity_relations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('entity_id');
            $table->string('entity_type', 191);
            $table->unsignedBigInteger('flaticon_id')->nullable()->index();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_agediscount', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id')->index();
            $table->integer('age_from');
            $table->integer('age_to');
            $table->integer('discount');
            $table->string('display_name');
            $table->tinyInteger('is_adult')->nullable()->default(0);
            $table->tinyInteger('fixed_price');
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('is_delete');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
        });

        Schema::create('hotel_category', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('title', 50);
            $table->integer('hotel_star');
            $table->dateTime('created_dt');
            $table->dateTime('updated_dt');
            $table->tinyInteger('is_deleted')->default(0);
        });

        Schema::create('hotel_conditions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('hotel_id')->index();
            $table->unsignedInteger('condition_type_id')->index();
            $table->timestamp('from')->useCurrent();
            $table->timestamp('to')->useCurrent();
            $table->string('markets');
            $table->string('meals');
            $table->unsignedTinyInteger('price_type')->comment('1 - primary, 2 - secondary');
            $table->unsignedTinyInteger('card_required')->comment('0 - no, 1 - yes');
            $table->unsignedTinyInteger('final_payment')->comment('0 - in hotel, 1 - before');
            $table->unsignedTinyInteger('cancelation_free')->default(0)->comment('0 - not set, 1 - free');
            $table->unsignedSmallInteger('free_up_to_days')->nullable();
            $table->unsignedDecimal('cancelation_policy_percentage', 5)->nullable();
            $table->unsignedDecimal('no_show', 5)->nullable();
            $table->unsignedTinyInteger('cvc_required')->comment('0 - no, 1 - yes');
            $table->unsignedTinyInteger('reservation_fees')->comment('0 - free');
            $table->unsignedTinyInteger('confirmation')->comment('0 - instantly');
            $table->unsignedTinyInteger('applicable_on_price')->nullable()->comment('1 - full, 2 - only room');
            $table->unsignedTinyInteger('active')->default(1)->comment('0 - non-active, 1 active');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
        });

        Schema::create('hotel_conditions_init_pay', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('hotel_condition_id')->index();
            $table->unsignedSmallInteger('days_before_arrival');
            $table->unsignedTinyInteger('amount_percentage')->comment('0 - amount is not percentage, 1 - amount is percentage');
            $table->unsignedDecimal('amount');
            $table->smallInteger('back_days')->nullable()->comment('values lesser than 0 mean at any time');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_conditions_penalties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('hotel_condition_id')->index();
            $table->unsignedSmallInteger('from_days')->nullable();
            $table->unsignedSmallInteger('to_days')->nullable();
            $table->decimal('percentage', 5)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_detail', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->integer('user_id');
            $table->integer('is_paypal_active')->default(0);
            $table->integer('currency_id');
            $table->string('preference', 150);
            $table->double('portal_commision');
            $table->double('price_increase')->nullable()->default(0);
            $table->integer('vat_invoicing')->comment('0,1');
            $table->integer('billing_language')->nullable();
            $table->string('contract_number', 150)->nullable();
            $table->integer('sale_reservation')->comment('0:yes, 1: no');
            $table->integer('resale_non_refund_boking')->comment('0:yes, 1: no');
            $table->integer('is_vat')->nullable()->default(0);
            $table->integer('is_spa')->nullable()->default(0);
            $table->double('spa_fee')->nullable()->default(0);
            $table->integer('work_with_credit_card')->nullable()->default(0);
            $table->double('credit_card_amount')->nullable()->default(0);
            $table->integer('type_of_PERC')->default(1);
            $table->string('credit_card_type', 150)->nullable()->default('0')->comment('visa, expres....');
            $table->integer('days_before_arrival')->nullable();
            $table->dateTime('created_date');
            $table->dateTime('updated_date')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->string('set_options', 150);
            $table->string('procedure_non_group', 150);
            $table->string('procedure_other', 150);
            $table->string('procedure_hydrotherapy', 150);
            $table->string('procedure_bathroom_treatment', 150);
            $table->string('procedure_gas_threatment', 150);
            $table->string('procedure_physiotherapy', 150);
            $table->string('procedure_electrotherapy', 150);
            $table->string('procedure_welness', 150);
            $table->string('indication_non_group', 150);
            $table->string('credit_card_options', 150);
            $table->string('requested_card_cvc', 150);
        });

        Schema::create('hotel_feature', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id')->default(0);
            $table->integer('category_id')->nullable()->default(0);
            $table->string('set_option', 10000)->default('216,217,218,219,220');
            $table->mediumText('language_key');
            $table->string('name', 150)->nullable();
            $table->integer('is_checked')->default(0);
            $table->timestamp('date_time')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_main', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150)->index();
            $table->string('slug', 400);
            $table->mediumText('description');
            $table->integer('promo_setted');
            $table->string('logo');
            $table->integer('category_id')->default(0)->index();
            $table->string('room_id', 150)->nullable()->index();
            $table->integer('status')->default(0)->comment('0:Off,unavailable # 1:Hidden, not sold #2:Viewed, sold');
            $table->tinyInteger('time_zone');
            $table->integer('percentage_paypal')->default(5);
            $table->integer('saved_level')->comment('hote detail store level like upto first step, second step details store');
            $table->string('address', 150);
            $table->string('zip_code', 50);
            $table->string('contact_person', 150);
            $table->string('phone', 50);
            $table->string('contact_no', 20);
            $table->string('location_ids', 150);
            $table->string('fax', 50);
            $table->string('web_url', 150);
            $table->string('lat', 150);
            $table->string('lng', 150);
            $table->integer('is_best_seller')->default(0)->comment('0: No, 1: Yes');
            $table->string('general_email', 150)->index();
            $table->string('email');
            $table->integer('country')->index();
            $table->integer('state')->index();
            $table->integer('city')->index();
            $table->string('city_tax', 100);
            $table->unsignedTinyInteger('vat_included')->comment('1 - yes, 0 - no');
            $table->unsignedTinyInteger('vat_percentage')->default(0);
            $table->integer('currency');
            $table->double('treatment_commission');
            $table->string('commission', 10)->index();
            $table->integer('priority');
            $table->integer('home_priority')->default(0);
            $table->integer('wifi');
            $table->string('opinion');
            $table->boolean('standard_reserve')->default(false);
            $table->dateTime('created_dt');
            $table->dateTime('updated_dt');
            $table->integer('is_deleted')->default(0)->index();
            $table->integer('is_active')->default(1)->index()->comment('0:Active, 1: Deactive');
            $table->integer('updated_user_id')->default(0);
            $table->integer('created_user_id')->default(0);
            $table->tinyInteger('refundable')->default(0);
            $table->string('check_in', 20)->nullable();
            $table->string('check_out', 20)->nullable();
            $table->string('vat_number', 50)->nullable();
            $table->string('meals_combination', 150)->nullable()->comment('mealsCombination id selected for this hotel');
            $table->integer('is_europe_area')->comment('0:yes,1: No');
            $table->decimal('review_score', 2, 1)->nullable()->default(0);
            $table->integer('review_count')->nullable()->default(0);
            $table->unsignedBigInteger('meta_id')->nullable();
            $table->unsignedBigInteger('reviews_meta_id')->nullable()->index();
            $table->string('address_street')->default('');
            $table->timestamps();
        });

        Schema::create('hotel_policies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('hotel_id')->index();
            $table->string('check_in', 20);
            $table->string('check_out', 20);
            $table->smallInteger('city_tax');
            $table->string('city_tax_amount', 100)->nullable();
            $table->string('city_tax_for_whom', 100)->nullable();
            $table->string('city_tax_for_how_long', 100)->nullable();
            $table->smallInteger('pets')->nullable();
            $table->string('pets_weight', 20)->nullable();
            $table->string('pets_price', 20)->nullable();
            $table->string('pets_how_long', 20)->nullable();
            $table->smallInteger('smoking');
            $table->smallInteger('wifi_free');
            $table->string('wifi_price', 100)->nullable();
            $table->string('wifi_for_whom', 100)->nullable();
            $table->string('wifi_for_how_long', 100)->nullable();
            $table->smallInteger('accessbillity');
            $table->unsignedTinyInteger('is_child_active')->nullable()->comment('1 is active 0 is not active');
            $table->unsignedTinyInteger('child_age')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_policies_meals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('hotel_id')->index();
            $table->smallInteger('meal_type')->comment('1 is breakfast, 2 is lunch, 3 is dinner');
            $table->string('days', 100);
            $table->string('from', 20);
            $table->string('to', 20);
            $table->smallInteger('type')->comment('1 is menu, 2 is buffet');
            $table->smallInteger('is_active');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_policies_parking', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('hotel_id')->index();
            $table->smallInteger('is_active')->default(0)->comment('1 is active, 0 is not active');
            $table->smallInteger('type')->comment('0 is for outdoor pariking and 1 for covered parking ');
            $table->smallInteger('parking_free');
            $table->string('parking_price', 20)->nullable();
            $table->string('parking_for_whom', 20)->nullable();
            $table->string('parking_for_how_long', 20)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_policies_pools', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('hotel_id')->index();
            $table->smallInteger('pool_type')->comment('1 is outdoor pool, 2 is indoor pool');
            $table->string('surface_w', 20)->nullable();
            $table->string('surface_h', 20)->nullable();
            $table->string('temperature', 20);
            $table->smallInteger('type')->comment('1 thermal watet, 2 is sea water');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_policies_pools_options', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('pool_id')->index();
            $table->string('days', 100);
            $table->string('from', 100)->nullable();
            $table->string('to', 100)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('hotel_season', function (Blueprint $table) {
            $table->integer('id', true);
            $table->bigInteger('hotel_id')->index();
            $table->string('name', 150)->nullable();
            $table->string('category', 150)->nullable();
            $table->string('markets')->comment('ALL: All the country, conutry code put here');
            $table->timestamp('season_publish_at')->nullable();
            $table->string('days', 150);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
            $table->integer('min_nights')->default(1)->index();
            $table->integer('max_nights')->nullable()->index();
            $table->string('meals')->default('');
            $table->boolean('is_active')->index();
        });

        Schema::create('hotel_season_validity', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hotel_season_id')->index();
            $table->date('valid_from')->index();
            $table->date('valid_to')->index();
        });

        Schema::create('info_paragraphs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('entity_id');
            $table->string('entity_type');
            $table->string('title')->nullable();
            $table->integer('title_id')->nullable();
            $table->string('language_key_name')->nullable();
            $table->integer('media_file_id')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('invoice_address', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->integer('type')->default(0)->comment('0:Default, 1: Operator Language');
            $table->string('company', 150);
            $table->string('address', 150)->nullable();
            $table->string('zip_code', 50)->nullable();
            $table->string('IBAN', 150);
            $table->dateTime('created_dt');
            $table->dateTime('updated_dt')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->integer('updated_user_id')->default(0);
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue', 191)->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150);
            $table->string('code', 50);
            $table->string('original_name', 150);
            $table->string('icon');
            $table->integer('is_deleted')->default(0)->comment('1: deleted, 0: not deleted');
            $table->integer('is_default')->default(0)->comment('1: Default,0:not default');
            $table->integer('is_active')->default(0)->comment('0:active 1: deactive');
            $table->string('code_with_hyphen', 10)->default('en-US');
        });

        Schema::create('language_lines', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('group', 191)->index();
            $table->string('key', 191);
            $table->text('text');
            $table->timestamps();
        });

        Schema::create('language_transalation', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('language_key')->index();
            $table->text('language_label');
            $table->text('language_value')->nullable();
            $table->string('code', 150)->index()->comment('code of language');
            $table->tinyInteger('is_cmspage')->default(0)->index()->comment('0:non cms, 1: cms, 2: Menu footer content');
            $table->dateTime('date')->index();
        });

        Schema::create('locationfeatures', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('loc_id');
            $table->string('name');
            $table->longText('description');
            $table->integer('is_active');
            $table->integer('is_deleted');
            $table->dateTime('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->unsignedBigInteger('priority')->nullable();
            $table->unsignedBigInteger('meta_id')->nullable();
        });

        Schema::create('location_details', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->mediumText('description')->nullable();
            $table->integer('priority');
            $table->tinyInteger('home_priority')->comment('1 => show on homepage, 0 => do not show');
            $table->string('slug');
            $table->string('image')->nullable();
            $table->string('address');
            $table->string('zip_code', 50)->nullable();
            $table->string('lat', 50);
            $table->string('long', 50);
            $table->string('embed_video', 191)->nullable()->default('https://www.youtube.com/watch?v=cqFzLj1TPFs');
            $table->string('cure');
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->nullable();
            $table->integer('user_id');
            $table->integer('country_id');
            $table->integer('is_active')->default(1);
            $table->integer('is_deleted')->default(0);
            $table->decimal('review_score', 2, 1)->nullable()->default(0);
            $table->integer('review_count')->nullable()->default(0);
            $table->unsignedBigInteger('meta_id')->nullable();
            $table->bigInteger('meta_masonry_id')->nullable();
            $table->unsignedBigInteger('map_zoom_coordinates_id')->nullable()->index();
            $table->tinyInteger('is_bestseller')->default(0);
            $table->string('name_mutations')->default('');
            $table->string('name_mutations_2');
            $table->tinyInteger('show_landing')->default(1);
        });

        Schema::create('map_zoom_coordinates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('south', 8, 2)->nullable();
            $table->double('west', 8, 2)->nullable();
            $table->double('north', 8, 2)->nullable();
            $table->double('east', 8, 2)->nullable();

            $table->index(['id']);
        });

        Schema::create('medias_meta', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('entity_id');
            $table->string('entity_type');
            $table->string('image');
            $table->string('lang_code', 8);
            $table->tinyInteger('is_subpage')->default(0)->comment('Default NULL, for Country/Location it means Masonry, for Hotel it means Reviews Page');
            $table->timestamps();
        });

        Schema::create('media_files', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150)->index();
            $table->string('code', 150)->index();
            $table->integer('title_wizard')->nullable()->index();
            $table->integer('master_id')->index()->comment('Hotel ID');
            $table->string('type', 150)->nullable()->index()->comment('User Type');
            $table->integer('master_type')->default(0)->comment('0 : Hotel,1: Room');
            $table->unsignedTinyInteger('featured')->default(0);
            $table->string('language_key');
            $table->string('url')->nullable()->index();
            $table->bigInteger('date_time')->nullable();
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->nullable();
            $table->integer('user_id')->default(0)->index()->comment('For API used');
            $table->integer('priority')->default(0);

            $table->index(['id']);
        });

        Schema::create('member_activity_log', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id');
            $table->mediumText('logs');
            $table->string('ip_address', 150);
            $table->dateTime('log_date');
            $table->integer('is_delete')->default(0);
        });

        Schema::create('message_alert', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->tinyInteger('type')->nullable();
            $table->string('user_type_id');
            $table->string('user_id');
            $table->integer('sender_id');
            $table->integer('is_email')->comment('0: No, 1: Yes');
            $table->integer('is_notification')->comment('0: No, 1 : Yes');
            $table->mediumText('description');
            $table->dateTime('created_at')->default('0000-00-00 00:00:00');
            $table->timestamp('updated_at')->default('0000-00-00 00:00:00');
            $table->tinyInteger('is_deleted')->default(0);
            $table->tinyInteger('is_active')->default(0);
            $table->tinyInteger('is_sent')->default(0)->comment('1: Sent , 0:Not sent');
        });

        Schema::create('message_alert_send', function (Blueprint $table) {
            $table->integer('id', true);
            $table->tinyInteger('user_id');
            $table->tinyInteger('alert_id')->nullable();
            $table->string('name');
            $table->integer('type')->nullable();
            $table->mediumText('description');
            $table->mediumText('comment');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->tinyInteger('is_deleted')->default(0);
            $table->tinyInteger('is_active')->default(0);
            $table->integer('is_read')->comment('0: no Ready, 1: read');
            $table->dateTime('read_date');
            $table->string('target_url')->nullable();
        });

        Schema::create('message_support', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id')->nullable();
            $table->string('unique_ticket', 50);
            $table->string('subject')->nullable();
            $table->string('url')->nullable();
            $table->tinyInteger('module_id')->nullable()->default(1);
            $table->dateTime('created_at')->default('0000-00-00 00:00:00');
            $table->timestamp('updated_at')->default('0000-00-00 00:00:00');
            $table->tinyInteger('is_deleted')->default(0);
            $table->tinyInteger('is_active')->default(0);
        });

        Schema::create('message_support_reply', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('support_id', 15);
            $table->integer('user_id')->nullable();
            $table->integer('replied_by_admin')->nullable()->default(0);
            $table->string('image', 100)->nullable();
            $table->mediumText('description');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });

        Schema::create('meta_tags_entity', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->string('lang_code', 150);
            $table->text('description')->nullable();
            $table->text('keywords')->nullable();
            $table->string('title')->nullable();
            $table->string('heading_1')->nullable();
            $table->tinyInteger('image')->nullable();
            $table->tinyInteger('index')->nullable();
            $table->tinyInteger('follow')->nullable();
            $table->string('url_canonical')->nullable();
            $table->string('og_image_fb')->nullable();
            $table->string('og_desc_fb')->nullable();
            $table->string('og_desc_value_fb')->nullable();
            $table->string('og_title_fb')->nullable();
            $table->tinyInteger('meta_title_name')->nullable()->comment('1 - Default, 2 - Main Name, 3 - Name Mutation 1, 4 - Name Mutation 2');
            $table->tinyInteger('meta_heading_1_name')->nullable()->comment('1 - Default, 2 - Main Name, 3 - Name Mutation 1, 4 - Name Mutation 2');
            $table->string('alt_image')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->primary(['id', 'lang_code']);
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id');
            $table->string('language_key');
            $table->mediumText('descriptions');
            $table->integer('target_id');
            $table->integer('is_read');
            $table->integer('is_cancel');
            $table->integer('is_deleted');
            $table->dateTime('created_at');
            $table->integer('type')->comment('0: New Booking');
            $table->integer('sender_id');
            $table->integer('hotel_id');
            $table->integer('room_id');
            $table->integer('booking_id');
            $table->dateTime('checkin_date')->nullable();
            $table->dateTime('checkout_date')->nullable();
            $table->string('transfer_start', 150);
            $table->string('transfer_end', 150);
            $table->integer('transfer_id');
            $table->dateTime('transfer_date')->nullable();
            $table->dateTime('transfer_pickup_time')->nullable();
            $table->integer('review_id');
            $table->integer('previouse_month');
            $table->string('hotel_ids', 150)->comment('comma sepreted hotel ids');
            $table->date('previous_month');
            $table->integer('invoice_id');
            $table->integer('season_id');
            $table->integer('discount_id');
            $table->integer('location_id');
        });

        Schema::create('notifications_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('title', 150);
            $table->string('language_key', 150);
            $table->string('default_content');
            $table->integer('type_id');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->integer('is_active');
            $table->integer('is_deleted');
        });

        Schema::create('package', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('hotel_id');
            $table->string('image')->nullable();
            $table->decimal('price', 15);
            $table->integer('discount');
            $table->integer('commission')->nullable();
            $table->tinyInteger('min_individual')->nullable();
            $table->tinyInteger('max_individual')->nullable();
            $table->tinyInteger('min_age')->nullable();
            $table->tinyInteger('max_age')->nullable();
            $table->tinyInteger('valid_days')->nullable();
            $table->tinyInteger('on_hotel')->nullable()->default(0)->comment('1: full hotel');
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
            $table->tinyInteger('is_active')->default(0);
            $table->integer('title')->nullable()->index();
            $table->unsignedBigInteger('package_description')->nullable()->index();
            $table->integer('priority')->nullable();
            $table->tinyInteger('promo')->default(0);
        });

        Schema::create('package_options', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hotel_id');
            $table->integer('package_id');
            $table->integer('cure_id');
            $table->decimal('prezzo_totale', 15);
            $table->integer('qta');
            $table->tinyInteger('free')->default(0);
        });

        Schema::create('pages_entity_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('page_id')->index()->comment('ID of page from taxonomies_translatable_urls');
            $table->string('entity_type', 191);
            $table->integer('entity_id');
            $table->integer('image_id')->index();
            $table->tinyInteger('is_checked')->comment('1 => checked, 0 => not checked');
            $table->timestamps();
        });

        Schema::create('page_urls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('lang_code', 150);
            $table->unsignedBigInteger('urlable_id');
            $table->string('urlable_type');
            $table->text('page_url')->nullable();
            $table->string('entity_slug', 1000)->comment('The translated slug, that is used in url.');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->index(['urlable_id', DB::raw("urlable_type(191)")]);
        });

        Schema::create('page_urls_redirects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('page_url_id')->index()->comment('Reference to new URL, to which this one should redirect');
            $table->text('old_page_url')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('page_urls_sub_pages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('page_url_id')->index();
            $table->unsignedBigInteger('sub_page_id')->index();
        });

        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email', 191)->index();
            $table->string('token', 191);
            $table->dateTime('created_at')->nullable();
        });

        Schema::create('payment_generate_invoice', function (Blueprint $table) {
            $table->increments('id');
            $table->string('invoiceid', 50);
            $table->string('booking_id')->nullable();
            $table->integer('hotel_id')->nullable();
            $table->integer('user_id');
            $table->string('duration', 10);
            $table->integer('status')->nullable()->default(0);
            $table->mediumText('note')->nullable();
            $table->double('commission');
            $table->date('issued_dt');
            $table->date('due_dt');
            $table->date('vat_dt');
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->integer('month');
            $table->integer('year');
        });

        Schema::create('payment_group_invoice', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('booking_id')->comment('temp_booking_id from booking_order table');
            $table->integer('hotel_id');
            $table->integer('requester_id');
            $table->integer('invoiceid');
            $table->integer('booking_price');
            $table->string('duration', 11);
            $table->integer('commission')->comment('In percentage (%)');
            $table->integer('commission_price');
            $table->integer('commission_paid')->nullable();
            $table->enum('full_payment', ['1', '0'])->nullable()->comment('1: Yes, 0: No');
            $table->enum('confirm', ['1', '0'])->default('0')->comment('1: Yes, 0: No');
            $table->enum('is_requested', ['2', '1', '0'])->nullable()->comment('1: Yes, 0: No, 2: confirmed');
            $table->string('reason_incomplete_payment')->nullable();
            $table->integer('remaining_price')->nullable();
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('payment_history', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('requester_id');
            $table->string('invoiceid', 50);
            $table->string('booking_id')->nullable();
            $table->integer('hotel_id')->nullable();
            $table->integer('user_id');
            $table->string('duration', 10);
            $table->integer('status')->nullable()->default(0);
            $table->mediumText('note')->nullable();
            $table->double('commission');
            $table->date('issued_dt');
            $table->date('due_dt');
            $table->date('vat_dt');
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->integer('month');
            $table->integer('year');
            $table->double('price');
            $table->integer('type')->default(0)->comment('0:Offline, 1:online');
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('ability_id')->index();
            $table->unsignedInteger('entity_id')->nullable();
            $table->string('entity_type', 191)->nullable();
            $table->boolean('forbidden')->default(false);
            $table->integer('scope')->nullable()->index();

            $table->index(['entity_id', 'entity_type', 'scope']);
        });

        Schema::create('pins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('user_id')->index();
            $table->string('pin');
            $table->tinyInteger('login_fails')->default(0);
            $table->tinyInteger('count_of_login_fails')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('price_offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('title')->index();
            $table->integer('hotel_id')->index();
            $table->smallInteger('min_nights');
            $table->smallInteger('max_nights')->nullable();
            $table->timestamp('from')->useCurrent();
            $table->timestamp('to')->useCurrent();
            $table->string('markets', 191);
            $table->string('meals', 191);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
            $table->tinyInteger('is_active')->default(0);
        });

        Schema::create('price_offers_options', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('price_offer_treatment_id')->nullable()->index();
            $table->unsignedBigInteger('wizard_relation_id')->nullable()->index();
            $table->integer('quantity')->nullable();
            $table->string('for_whom', 50)->nullable();
            $table->string('for_how_long', 50)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('price_offers_room', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('price_offers_id')->index();
            $table->integer('room_id')->index();
        });

        Schema::create('price_offer_treatment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('treatment_id')->index();
            $table->unsignedBigInteger('price_offer_id')->index();
        });

        Schema::create('promotions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 50)->nullable();
            $table->string('name', 50);
            $table->string('language_key', 100);
            $table->mediumText('description')->nullable();
            $table->integer('price');
            $table->dateTime('created_at');
            $table->date('updated_at')->nullable();
            $table->tinyInteger('is_delete')->default(0);
            $table->tinyInteger('is_active')->default(1)->comment('0:active, 1:inactive');
        });

        Schema::create('promotions_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('type');
            $table->mediumText('short_description');
            $table->mediumText('description');
            $table->string('image');
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->unsignedInteger('user_id')->nullable()->index();
            $table->string('booking_id', 300)->nullable();
            $table->string('client_name', 150);
            $table->tinyInteger('status')->default(1)->comment('0: Confirmed, 1: Not Confirmed');
            $table->string('title', 191)->nullable();
            $table->text('description')->nullable();
            $table->tinyInteger('is_deleted')->default(0);
            $table->tinyInteger('is_active')->default(0)->comment('0: Active ; 1: Inactive');
            $table->integer('type')->default(0)->comment('0: Booking, 1: Location');
            $table->integer('like_counter');
            $table->string('like_record');
            $table->string('nationalities', 150)->nullable();
            $table->decimal('review_score', 3, 1)->nullable()->default(0);
            $table->dateTime('date_stay');
            $table->unsignedBigInteger('color_id')->default(1)->index();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('reviews_score', function (Blueprint $table) {
            $table->integer('id', true);
            $table->bigInteger('review_id')->nullable();
            $table->integer('option_id');
            $table->integer('review_score');
            $table->tinyInteger('is_deleted')->default(0);
            $table->tinyInteger('is_active')->default(0)->comment('0: Active ; 1: Inactive');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('review_events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('review_id')->index();
            $table->unsignedInteger('user_id')->nullable()->index();
            $table->integer('event');
            $table->string('ip', 200)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('review_response', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('review_id')->index();
            $table->unsignedInteger('user_id')->index();
            $table->text('text')->nullable();
            $table->tinyInteger('is_active')->default(1)->comment('0 => active, 1 => inactive');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 191);
            $table->string('title', 191)->nullable();
            $table->unsignedInteger('level')->nullable();
            $table->unsignedSmallInteger('hierarchical_level');
            $table->integer('scope')->nullable()->index();
            $table->timestamps();

            $table->unique(['name', 'scope']);
        });

        Schema::create('room_amenities', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('category_id')->nullable();
            $table->bigInteger('room_id')->nullable();
            $table->mediumText('language_key');
            $table->string('set_option')->nullable();
            $table->timestamp('date')->useCurrentOnUpdate()->useCurrent();
            $table->integer('is_deleted')->default(0);
        });

        Schema::create('room_details', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotelid')->nullable()->default(1)->index();
            $table->integer('title')->nullable()->index();
            $table->unsignedBigInteger('description_wizard_id')->nullable()->index();
            $table->integer('type_of_rooms')->nullable();
            $table->integer('no_of_room')->nullable();
            $table->integer('extra_bed')->nullable()->index()->comment('1: Full Bed, 0: Half Bed');
            $table->integer('standard_bed')->nullable()->index();
            $table->integer('min_standard_bed')->index();
            $table->string('size_standard', 20)->nullable();
            $table->string('size_extra', 20)->nullable();
            $table->integer('qt_same_name')->nullable()->index();
            $table->string('unit_of_measurement', 150)->nullable();
            $table->double('height')->nullable();
            $table->double('weight')->nullable();
            $table->integer('user_id');
            $table->integer('updated_user_id')->nullable();
            $table->dateTime('created_at');
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->softDeletes();
            $table->integer('is_active')->default(0)->index();
            $table->integer('child_count');
            $table->integer('adult_count');
            $table->integer('options_status')->nullable()->default(1);
            $table->unsignedSmallInteger('surface_from')->default(0);
            $table->unsignedSmallInteger('surface_to')->nullable();
            $table->unsignedTinyInteger('num_of_rooms_from')->nullable();
            $table->unsignedTinyInteger('num_of_rooms_to')->nullable();
            $table->unsignedTinyInteger('num_of_bathrooms_from')->nullable();
            $table->unsignedTinyInteger('num_of_bathrooms_to')->nullable();
            $table->unsignedTinyInteger('num_of_balconies_from')->nullable();
            $table->unsignedTinyInteger('num_of_balconies_to')->nullable();
            $table->unsignedTinyInteger('floor_from')->nullable();
            $table->unsignedTinyInteger('floor_to')->nullable();
        });

        Schema::create('room_entities_relations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('room_id')->index();
            $table->unsignedBigInteger('entity_id');
            $table->string('entity_type');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('room_hotel_agediscount', function (Blueprint $table) {
            $table->integer('room_details_id')->index();
            $table->integer('hotel_agediscount_id')->index();
            $table->tinyInteger('is_extra_place');
        });

        Schema::create('room_sale_prices', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->integer('room_id');
            $table->integer('season_id');
            $table->string('prices');
            $table->double('discount')->default(0);
            $table->integer('is_extra_id')->comment('0: Defaul meal and other extra meal type id(adult..))');
            $table->integer('standard_bed_count')->nullable();
            $table->integer('user_id');
            $table->integer('update_user_id')->default(0);
            $table->integer('is_deleted')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('search_alternative_keywords', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('lang_code', 150);
            $table->unsignedBigInteger('searchable_id')->nullable();
            $table->string('searchable_type')->nullable();
            $table->string('word')->nullable();
            $table->text('keywords')->nullable();
            $table->boolean('is_global');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->index(['searchable_id', DB::raw("searchable_type(191)")]);
        });

        Schema::create('selected_package_options', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('package_id');
            $table->integer('options_id');
            $table->integer('price');
        });

        Schema::create('seo_title', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->string('page_name', 150);
            $table->string('keyword_description', 200);
            $table->string('keyword_words', 200);
            $table->string('keywords_title', 200);

            $table->unique(['id']);
        });

        Schema::create('states', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('v_name', 30);
            $table->integer('i_country_id')->default(1);
            $table->enum('e_status', ['enable', 'disable']);

            $table->index(['id', 'v_name', 'i_country_id', 'e_status']);
        });

        Schema::create('taxinomies_age_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('description');
            $table->integer('age');
            $table->string('color', 50)->nullable();
            $table->string('language_key', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
        });

        Schema::create('taxinomies_allotment_status', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150);
            $table->string('description', 300);
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('is_delete')->default(0);
        });

        Schema::create('taxinomies_allotment_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 150);
            $table->string('description', 300);
            $table->string('surb_name', 150);
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('is_delete')->default(0);
        });

        Schema::create('taxinomies_cancellation_policy', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('description');
            $table->string('color', 50)->nullable();
            $table->string('language_key', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->dateTime('updated_date')->nullable();
            $table->integer('user_id');
        });

        Schema::create('taxinomies_meals', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('description');
            $table->string('code', 5);
            $table->double('price');
            $table->string('language_key', 150);
            $table->string('language_key_description');
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->dateTime('updated_at')->nullable();
            $table->integer('user_id');
            $table->integer('is_deleted')->default(0);
            $table->integer('order_by');
            $table->string('small_description', 191)->nullable();
            $table->string('big_description', 191)->nullable();
            $table->unsignedBigInteger('icon')->nullable()->index();
        });

        Schema::create('taxinomies_meals_combination', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('meal_id', 150)->comment('comma seprated meal id');
            $table->string('language_key', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->dateTime('updated_date')->nullable();
            $table->integer('user_id');
        });

        Schema::create('taxinomies_room_bed', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('description');
            $table->string('code', 5);
            $table->string('language_key', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->dateTime('updated_date')->nullable();
            $table->integer('user_id');
        });

        Schema::create('taxonomies_alert', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->string('color', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
            $table->timestamp('date')->default('0000-00-00 00:00:00');
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('taxonomies_allotments', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->string('color', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
            $table->timestamp('date')->default('0000-00-00 00:00:00');
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('taxonomies_color', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('text_color', 191);
            $table->string('background_color', 191);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('taxonomies_condition_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedTinyInteger('block_init_pay');
            $table->unsignedTinyInteger('block_penalty');
            $table->unsignedTinyInteger('price_type')->comment('1 - primary, 2 - secondary, 3 - both');
            $table->unsignedTinyInteger('final_payment')->comment('0 - in hotel, 1 - before, 2 - both');
            $table->unsignedTinyInteger('card_required')->comment('0 - no, 1 - yes');
            $table->unsignedTinyInteger('refundable')->comment('0 - no, 1 - yes');
            $table->unsignedTinyInteger('free_check')->comment('0 - no, 1 - yes');
            $table->unsignedTinyInteger('applicable_on_price')->comment('1 - yes, 0 - no');
        });

        Schema::create('taxonomies_days', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name_key');
            $table->string('shortcut_key');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('taxonomies_discount', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->string('color', 150);
            $table->string('text_color', 191)->default('');
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->nullable();
            $table->integer('wizard_option_id')->index();
        });

        Schema::create('taxonomies_discount_action', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->string('color', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
            $table->timestamp('date')->default('0000-00-00 00:00:00');
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('taxonomies_invoice_action', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->mediumText('description')->nullable();
            $table->string('color', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
            $table->timestamp('date')->default('0000-00-00 00:00:00');
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('taxonomies_payment', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('language_key', 150);
            $table->mediumText('description')->nullable();
            $table->string('color', 150);
            $table->timestamp('created_date')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_date')->nullable();
            $table->integer('user_id');
            $table->timestamp('date')->default('0000-00-00 00:00:00');
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('taxonomies_translatable_urls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title_key');
            $table->string('function_slug');
            $table->unsignedTinyInteger('is_sub_page')->default(0)->comment('0 - no, 1 - yes');
            $table->bigInteger('meta_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('taxonomy_email_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('action', 191);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('text_information', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('hotel_id');
            $table->string('name', 150);
            $table->string('language_name', 150)->nullable();
            $table->string('supplement_name', 150);
            $table->string('short_description', 150);
            $table->string('full_description', 150);
            $table->string('exceptionality_dec', 150);
            $table->string('expert_evalution_desc', 150);
            $table->string('special_offer', 150);
            $table->string('video_url');
            $table->string('video_assement', 150);
            $table->string('seo_title', 150);
            $table->string('seo_desc', 150);
            $table->string('seo_keywords', 150);
            $table->string('seo_title_ref', 150);
            $table->string('seo_desc_ref', 150);
            $table->string('seo_keyword_ref', 150);
            $table->dateTime('created_dt');
            $table->dateTime('updated_dt')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->integer('updated_user_id')->default(0);
        });

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email', 200);
            $table->string('second_email', 200)->nullable();
            $table->string('username', 50)->nullable();
            $table->integer('hotel_id')->nullable();
            $table->string('password')->nullable();
            $table->string('language_key')->nullable();
            $table->string('communication_lang', 1000);
            $table->string('default_currency', 191)->default('EUR')->comment('default currency code');
            $table->integer('is_active')->default(0);
            $table->rememberToken();
            $table->dateTime('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('phone', 191)->nullable();
            $table->string('image')->default('0');
            $table->string('favhotel');
            $table->integer('country')->nullable();
            $table->dateTime('birth_date')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('phone_code', 20)->nullable();
            $table->timestamp('password_updated_at')->default('0000-00-00 00:00:00');
            $table->integer('nationality')->nullable();
            $table->tinyInteger('confirmed_registration')->default(1);
            $table->softDeletes();
        });

        Schema::create('wizard_categories', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 50);
            $table->string('language_key');
            $table->integer('parent_id')->nullable();
            $table->integer('level')->nullable();
            $table->integer('is_active')->nullable()->default(0);
            $table->dateTime('created_at');
            $table->dateTime('updated_at')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->integer('priority')->nullable();
        });

        Schema::create('wizard_entities_relations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('entity_id');
            $table->string('entity_type', 191);
            $table->integer('wizard_id')->index();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('wizard_field_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('type');
            $table->tinyInteger('status')->default(1)->index();
            $table->tinyInteger('is_deleted')->index();
        });

        Schema::create('wizard_options', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id');
            $table->integer('category_id');
            $table->tinyInteger('parent_id')->nullable();
            $table->string('title');
            $table->integer('is_multi_language')->default(1);
            $table->string('language_key');
            $table->string('language_key_desc', 150);
            $table->integer('is_required')->default(0)->comment('0: Not required, 1: required');
            $table->dateTime('created_date');
            $table->dateTime('updated_date')->nullable();
            $table->integer('is_deleted')->default(0);
            $table->integer('is_active')->default(0);
        });

        Schema::create('wizard_options_descriptions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('wizard_option_id')->index();
            $table->string('description_key');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });

        Schema::create('wizard_options_type', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('option_id');
            $table->string('type');
            $table->dateTime('created_date');
            $table->dateTime('updated_date')->nullable();
            $table->integer('is_active')->default(0)->comment('0: Active, 1 : deactivate');
            $table->integer('is_deleted')->default(0);
        });

        Schema::create('wizard_options_value', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('option_id');
            $table->integer('option_type_id');
            $table->string('title');
            $table->string('value');
            $table->tinyInteger('is_language')->nullable()->default(1);
            $table->string('language_key');
            $table->dateTime('created_date');
            $table->dateTime('updated_date')->nullable();
            $table->integer('is_active')->default(0)->comment('0: Active, 1 : deactivate');
            $table->integer('is_deleted')->default(0);
        });

        Schema::create('worldwide_numbers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('country_id')->index();
            $table->unsignedBigInteger('flaticon_id')->nullable()->index()->comment('If flaticon is deleted, the number can still exist.');
            $table->string('number');
            $table->integer('priority');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('worldwide_numbers');

        Schema::dropIfExists('wizard_options_value');

        Schema::dropIfExists('wizard_options_type');

        Schema::dropIfExists('wizard_options_descriptions');

        Schema::dropIfExists('wizard_options');

        Schema::dropIfExists('wizard_field_type');

        Schema::dropIfExists('wizard_entities_relations');

        Schema::dropIfExists('wizard_categories');

        Schema::dropIfExists('users');

        Schema::dropIfExists('text_information');

        Schema::dropIfExists('taxonomy_email_actions');

        Schema::dropIfExists('taxonomies_translatable_urls');

        Schema::dropIfExists('taxonomies_payment');

        Schema::dropIfExists('taxonomies_invoice_action');

        Schema::dropIfExists('taxonomies_discount_action');

        Schema::dropIfExists('taxonomies_discount');

        Schema::dropIfExists('taxonomies_days');

        Schema::dropIfExists('taxonomies_condition_types');

        Schema::dropIfExists('taxonomies_color');

        Schema::dropIfExists('taxonomies_allotments');

        Schema::dropIfExists('taxonomies_alert');

        Schema::dropIfExists('taxinomies_room_bed');

        Schema::dropIfExists('taxinomies_meals_combination');

        Schema::dropIfExists('taxinomies_meals');

        Schema::dropIfExists('taxinomies_cancellation_policy');

        Schema::dropIfExists('taxinomies_allotment_type');

        Schema::dropIfExists('taxinomies_allotment_status');

        Schema::dropIfExists('taxinomies_age_type');

        Schema::dropIfExists('states');

        Schema::dropIfExists('seo_title');

        Schema::dropIfExists('selected_package_options');

        Schema::dropIfExists('search_alternative_keywords');

        Schema::dropIfExists('room_sale_prices');

        Schema::dropIfExists('room_hotel_agediscount');

        Schema::dropIfExists('room_entities_relations');

        Schema::dropIfExists('room_details');

        Schema::dropIfExists('room_amenities');

        Schema::dropIfExists('roles');

        Schema::dropIfExists('review_response');

        Schema::dropIfExists('review_events');

        Schema::dropIfExists('reviews_score');

        Schema::dropIfExists('reviews');

        Schema::dropIfExists('promotions_type');

        Schema::dropIfExists('promotions');

        Schema::dropIfExists('price_offer_treatment');

        Schema::dropIfExists('price_offers_room');

        Schema::dropIfExists('price_offers_options');

        Schema::dropIfExists('price_offers');

        Schema::dropIfExists('pins');

        Schema::dropIfExists('permissions');

        Schema::dropIfExists('payment_history');

        Schema::dropIfExists('payment_group_invoice');

        Schema::dropIfExists('payment_generate_invoice');

        Schema::dropIfExists('password_resets');

        Schema::dropIfExists('page_urls_sub_pages');

        Schema::dropIfExists('page_urls_redirects');

        Schema::dropIfExists('page_urls');

        Schema::dropIfExists('pages_entity_images');

        Schema::dropIfExists('package_options');

        Schema::dropIfExists('package');

        Schema::dropIfExists('notifications_type');

        Schema::dropIfExists('notifications');

        Schema::dropIfExists('meta_tags_entity');

        Schema::dropIfExists('message_support_reply');

        Schema::dropIfExists('message_support');

        Schema::dropIfExists('message_alert_send');

        Schema::dropIfExists('message_alert');

        Schema::dropIfExists('member_activity_log');

        Schema::dropIfExists('media_files');

        Schema::dropIfExists('medias_meta');

        Schema::dropIfExists('map_zoom_coordinates');

        Schema::dropIfExists('location_details');

        Schema::dropIfExists('locationfeatures');

        Schema::dropIfExists('language_transalation');

        Schema::dropIfExists('language_lines');

        Schema::dropIfExists('languages');

        Schema::dropIfExists('jobs');

        Schema::dropIfExists('invoice_address');

        Schema::dropIfExists('info_paragraphs');

        Schema::dropIfExists('hotel_season_validity');

        Schema::dropIfExists('hotel_season');

        Schema::dropIfExists('hotel_policies_pools_options');

        Schema::dropIfExists('hotel_policies_pools');

        Schema::dropIfExists('hotel_policies_parking');

        Schema::dropIfExists('hotel_policies_meals');

        Schema::dropIfExists('hotel_policies');

        Schema::dropIfExists('hotel_main');

        Schema::dropIfExists('hotel_feature');

        Schema::dropIfExists('hotel_detail');

        Schema::dropIfExists('hotel_conditions_penalties');

        Schema::dropIfExists('hotel_conditions_init_pay');

        Schema::dropIfExists('hotel_conditions');

        Schema::dropIfExists('hotel_category');

        Schema::dropIfExists('hotel_agediscount');

        Schema::dropIfExists('flaticon_entity_relations');

        Schema::dropIfExists('flaticons');

        Schema::dropIfExists('email_token');

        Schema::dropIfExists('emaillogs');

        Schema::dropIfExists('dynamic_menu');

        Schema::dropIfExists('discount_offer_nights_combinations');

        Schema::dropIfExists('discount_offer');

        Schema::dropIfExists('dashboard_widgets');

        Schema::dropIfExists('currency');

        Schema::dropIfExists('cure_treatment');

        Schema::dropIfExists('countryfeatures');

        Schema::dropIfExists('countries');

        Schema::dropIfExists('cities');

        Schema::dropIfExists('cards');

        Schema::dropIfExists('booking_vat_tax');

        Schema::dropIfExists('booking_treatment');

        Schema::dropIfExists('booking_room_placement');

        Schema::dropIfExists('booking_room_discounts');

        Schema::dropIfExists('booking_room');

        Schema::dropIfExists('booking_main');

        Schema::dropIfExists('booking_event');

        Schema::dropIfExists('billing_address');

        Schema::dropIfExists('basic_settings');

        Schema::dropIfExists('assigned_roles');

        Schema::dropIfExists('amenity_settings');

        Schema::dropIfExists('allotment_detail');

        Schema::dropIfExists('advantages');

        Schema::dropIfExists('abilities');
    }
};
