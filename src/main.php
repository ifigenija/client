<?php
$config = include 'config.php';
$dist = $config['useDist'] ? 'dist/': '';
?><!DOCTYPE html>
<html>
    <head>
        <title>Ifigenija</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?= $dist ?>css/yeti.css">
        <link rel="stylesheet" href="<?= $dist ?>css/layout.css">
        <link rel="stylesheet" href="<?= $dist ?>css/backgrid.css">
        <link rel="stylesheet" href="<?= $dist ?>css/site.css">
        <link rel="stylesheet" href="lib/font-awsome/css/font-awesome.css">
        <script type="text/javascript" src="lib/requirejs/require.js"></script>   
        <script type="text/javascript">
            define('baseUrl', function () {
                return "";
            });
            require(['<?= $config['useDist'] ? 'requiredist' : 'requireconfig' ?>'], function () {
                require(['app/main', 'backbone', 'jquery', 'app/aaa/checkauth'], function (app, Backbone, $, auth) {
                    auth(function (user) {
                        app.start({user: user});
                        Backbone.history.start();
                    });
                });
            });
        </script>
    </head>
    <body>
    </body>
</html>
