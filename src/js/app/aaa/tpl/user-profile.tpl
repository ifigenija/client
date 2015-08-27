<div class="row">
    <div class="col-lg-3 col-md-4 col-sm-4">
        <div class="card hovercard">
            <div class="cardheader">
            </div>
            <div class="avatar">
                <img alt="" src="/img/guest.png">
            </div>
            <div class="info">
                <div class="title">
                    {{ name }}
                </div>
                <div class="desc">{{ username }}</div>

                <div class="desc">
                    <h3>{{t "Vloge" }} </h3>
                    {{#each roles }}
                    <span class="label label-default"> {{ this }} </span>
                    {{/each }}

                </div>

                <div class="desc">
                    {{#if permissions }} 
                    <p>
                    <h3>{{t "Dovoljenja"}} </h3>
                    {{#each permissions }}

                    <span class="label label-default"> {{ this }} </span>
                    {{/each }}
                    </p>
                    {{/if }} 
                </div>
            </div>
            <div class="bottom">
                <a href="http://ifigenija.si"><img src="/img/logo-200.png" ></a>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-8">
        <div class="panel panel-profile">
            <div class="panel-body">
                <h1> {{t "login.changePass" }}</h1>
                <p> {{t "login.changePara" }}</p>
            <form class="">
                <div class="form-group">  
                    <label for="oldPassword">{{t "login.oldPass"}}</label>                  
                    <input type="password" class="form-control" id="oldPassword" placeholder="{{t "login.oldPass_holder" }}">
                </div>
                <div class="form-group">
                    <label for="newPass1">{{t "login.password"}}</label>
                    <input type="password" class="form-control" id="newPass1" placeholder="{{t "login.password_holder"}}">
                </div>
                <div class="form-group">
                    <label for="newPass2">{{t "login.newpass" }}</label>
                    <input type="password" class="form-control" id="newPass2" placeholder="{{t "login.newpass_holder"}}">
            </div>
            <button type="submit" disabled="disabled" class="btn btn-default">{{t "login.changePassButt"}}</button>
            </form>
        </div>
    </div>

</div>
</div>