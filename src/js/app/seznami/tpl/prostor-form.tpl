<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div data-fields="naziv,popa"></div>
                <div class="vnosno-polje">
                    <div class="naslov">
                        <label class="">{{t "prostor.naslov"}}</label>
                        <div class="help-block hidden">{{t "prostor.d.naslov"}}</div>
                        <div class="error-block"></div>
                    </div>
                    <div class="polje-z-gumbom">
                        <div class="izbor"  data-editors="naslov"></div>
                        <a class="btn btn-default dodaj prostor-dodaj-naslov" title="{{t "std.title.dodajNaslov"}}">
                            <i class="fa fa-plus"></i>
                        </a>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "std.dodatniPodatki"}}</span>
                </legend>
                <div data-fields="kapaciteta,jeMaticniOder,jePrizorisce,sePlanira,sifra"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3" data-fields="opis"></div>
    </div>
</form>