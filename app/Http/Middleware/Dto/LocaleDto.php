<?php

namespace App\Http\Middleware\Dto;

class LocaleDto
{
    /**
     * @var string
     */
    private string $name;

    /**
     * @var string
     */
    private string $icon;

    /**
     * @param  string  $name
     * @param  string  $icon
     */
    public function __construct(string $name, string $icon)
    {
        $this->name = $name;
        $this->icon = $icon;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getIcon(): string
    {
        return $this->icon;
    }
}
