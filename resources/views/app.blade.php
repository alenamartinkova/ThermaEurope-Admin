<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    @routes
    <script>
      Ziggy.url = '{{ env('APP_URL') }}'
    </script>

    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="text-gray-750 font-body text-sm">
@inertia
</body>
</html>
