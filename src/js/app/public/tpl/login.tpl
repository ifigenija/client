<style>
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

</style>
<form class="form-signin">
    <h2 class="form-signin-heading">{{t "login.prompt"}}</h2>
    <div class="alert alert-danger" role="alert" id="login-failed" style="display:none;">{{t "login.failed"}}</div>
    <label for="inputEmail" class="sr-only">{{t "login.email"}}</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="{{t "login.email"}}" required="" autofocus="">
    <label for="inputPassword" class="sr-only">{{t "login.password"}}</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="{{t "login.password"}}" required="">   
    <button class="btn btn-lg btn-primary btn-block" type="submit">{{t "login.signIn"}}</button>
</form>
