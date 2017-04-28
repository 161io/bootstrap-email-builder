<?php
/**
 * Copyright (c) 161 SARL, https://161.io
 */

if (empty($_POST['body-with-data'])) {
    header('Location: ./');
}


function convertBodyToDiv($str)
{
    $str = preg_replace('/^\s*<body\s+/i', '<div id="bs-eb-render" ', $str);
    $str = preg_replace('/<\/body>\s*$/i', '</div>', $str);
    return $str;
}

echo preg_replace(
    '/<!--\s*body\s*-->(.+?)<!--\s*\/body\s*-->/is',
    '<!-- body -->' . convertBodyToDiv($_POST['body-with-data']) . '<!-- /body -->',
    file_get_contents(__DIR__ . '/index.html')
);
