<form>
    <fieldset>
        <legend>
            <span>{{t "alternacija.seznam"}}</span>
        </legend>
        <div class="vnosno-polje">
            <div class="naslov">
                <label>{{t "funkcija.alternacije"}}</label>
                <div class="help-block hidden">{{t "funkcija.d.alternacije"}}</div>
                <div class="error-block"></div>
            </div>
            <div class="polje-z-gumbom">
                <div class="izbor"  data-editors="oseba"></div>
                <a class="btn btn-default dodaj dodaj-osebo dodaj" title="{{t "std.title.dodajOsebo"}}">
                    <i class="fa fa-user-plus"> </i>
                </a>
            </div>
        </div>
    </fieldset>
    <div class="row">
        <div class="col-sm-12 alter-seznam"></div>
    </div>
</form>
