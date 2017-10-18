<?php
/**
 * Copyright (c) 161 SARL, https://161.io
 */

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Bootstrap Email Builder</title>

    <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <!-- <link href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css" type="text/css" rel="stylesheet"/> -->
    <link href="node_modules/highlightjs/styles/github.css" type="text/css" rel="stylesheet"/>
</head>
<body>
    <div class="container-fluid">
        <div class="page-header">
            <h1><a href="./">Bootstrap Email Builder</a> <small>POST</small></h1>
        </div>

        <?php
            if (!empty($_POST['body-with-data'])) {
                echo '<h2>Retain data</h2>';
                echo '<form action="post-edit.php" method="post">';
                echo '<input type="hidden" name="body-with-data" value="' . htmlspecialchars($_POST['body-with-data']) . '"/>';
                echo '<p><button type="submit" class="btn btn-success">Edit</button></p>';
                echo '</form>';
                echo '<pre><code class="html">' . htmlspecialchars($_POST['body-with-data']) . '</code></pre>';
            }

            if (!empty($_POST['body-without-data'])) {
                echo '<h2>mail()</h2>';
                echo '<pre><code class="html">' . htmlspecialchars($_POST['body-without-data']) . '</code></pre>';

                $to = !empty($_POST['to']) ? $_POST['to'] : null;
                if ($to) {
                    // Send your mail
                    $subject  = 'Bootstrap Email Builder - ' . date('Y-m-d H:i:s');
                    $headers  = 'MIME-Version: 1.0' . "\r\n";
                    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

                    $message  = '<html>';
                    $message .= '<head><title>' . htmlspecialchars($subject) . '</title></head>';
                    $message .= $_POST['body-without-data'];
                    $message .= '</html>';

                    // Use PHPMailer class
                    //require 'adv-post/mail2.php';
                    if ((function_exists('mail2') && mail2($to, $subject, $message, $headers)) || mail($to, $subject, $message, $headers)) {
                        echo '<div class="alert alert-success"><strong>mail()</strong> OK</div>';
                    } else {
                        echo '<div class="alert alert-danger"><strong>mail()</strong> KO</div>';
                    }
                }
            }
        ?>

    </div>

    <script src="node_modules/highlightjs/highlight.pack.min.js"></script>
    <script>
    if (window.hljs) {
        hljs.initHighlightingOnLoad();
    }
    </script>
</body>
</html>
