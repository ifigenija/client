<form>
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div data-fields="uprizoritev,title,tipvaje"></div>
            <div class="vnosno-polje">
                <div class="naslov">
                    <label class="">{{t "std.prostor"}}</label>
                    <div class="help-block hidden">{{t "std.d.prostor"}}</div>
                    <div class="error-block"></div>
                </div>
                <div class="polje-z-gumbom">
                    <div class="izbor"  data-editors="prostor"></div>
                    <a class="btn btn-default dodaj prikazi-koledar" title="{{t "std.title.prikaziKoledar"}}">
                        <i class="fa fa-calendar"> </i>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-6" data-fields="zacetek,konec,status,zaporedna"></div>        
    </div>
</form>
