<?php
$config = include 'config.php';
$dist = $config['useDist'] ? 'dist/' : '';
?><!DOCTYPE html>
<html>
    <head>
        <title>Ifigenija</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="<?= $dist ?>css/public.css">
        <link rel="stylesheet" href="<?= $dist ?>css/layout.css">
        <link rel="stylesheet" href="<?= $dist ?>css/backgrid.css">
        <link rel="stylesheet" href="<?= $dist ?>css/site.css">        
        <link rel="stylesheet" href="lib/font-awsome/css/font-awesome.css">
        <script type="text/javascript" src="<?= empty($dist) ? "lib/requirejs" : "dist/js" ?>/require.js"></script>        
    </head>
    <body>
        <div class="container">
            <nav id="nav" class="navbar navbar-default"></nav>
            <div id="glavni-container">

            </div>
        </div>        
        <script type="text/javascript">
            define('baseUrl', function () {
                return "/";
            });
            require(['<?= $config['useDist'] ? 'requiredist' : 'requireconfig' ?>'], function () {
                require(['app/public', 'backbone'], function (public, Backbone) {
                    public.start();
                    Backbone.history.start();
                });
            });
        </script>
    </body>
</html>
