<form>
    <div class="row">
        <div class="col-sm-12 col-md-6" >
            <fieldset data-fields="ime,priimek,srednjeIme,psevdonim,email">
                <legend>
                    <span>{{t "oseba.podatki"}}</span>
                </legend>
            </fieldset>
        </div>
        <div class="col-sm-12 col-md-6" >
            <fieldset class="fieldset-brez-legend" data-fields="naziv,spol,sifra">
                <div class="vnosno-polje">
                    <div class="naslov">
                        <label class="">{{t "oseba.polnoIme"}}</label>
                        <div class="help-block hidden">{{t "oseba.d.polnoIme"}}</div>
                        <div class="error-block"></div>
                    </div>
                    <div style="width: 100%; display: table;">
                        <div style="display: table-row">
                            <div class="izbor"  data-editors="polnoIme"></div>

                        </div>
                        <div style="display: table-row">
                            <a class="btn btn-default prenesi-gumb-ime oseba-polnoime" title="{{t "std.title.prenesiIme"}}">
                                {{t "std.polnoIme"}}
                            </a> 
                            <a class="btn btn-default prenesi-gumb-ime oseba-psevdonim" title="{{t "std.title.prenesiPsevdonim"}}">
                                {{t "std.psevdonim"}}
                            </a> 
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</form>