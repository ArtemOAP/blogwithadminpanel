<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class ReplaceExtension extends AbstractExtension
{

    public function getFunctions(): array
    {
        return [
            new TwigFunction('replace_string', [$this, 'doSomething']),
        ];
    }

    public function doSomething($str ,$s = 'watch?v=') : string
    {
        $str = substr($str,strpos($str,$s) + strlen($s));
       return $str;
    }
}
