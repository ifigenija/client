<form>
    <div class="row">
        <div class="col-sm-12 col-md-6" data-fields="title,zacetek,konec,allDay"></div>
        <div class="col-sm-12 col-md-6">
            <div class="vnosno-polje">
                <div class="naslov">
                    <label class="">{{t "dogodek.prostor"}}</label>
                    <div class="help-block hidden">{{t "dogodek.d.prostor"}}</div>
                    <div class="error-block"></div>
                </div>
                <div class="polje-z-gumbom">
                    <div class="izbor"  data-editors="prostor"></div>
                    <a class="btn btn-default dodaj prikazi-koledar" title="{{t "std.title.prikaziKoledarProstor"}}">
                        <i class="fa fa-calendar"> </i>
                    </a>
                </div>
            </div>
            <div data-fields="barva,status"></div>
        </div>
    </div>
</form>