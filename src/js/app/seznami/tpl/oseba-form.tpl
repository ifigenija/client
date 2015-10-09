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
                            <div class="check gumb checkbox">
                                <label>
                                    <input class="oseba-check-psevdonim" type="checkbox"> {{t "std.psevdonim"}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</form>