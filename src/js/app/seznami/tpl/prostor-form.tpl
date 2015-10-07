<form>
    <div class="row">
        <div class="col-sm-6">
            <div data-fields="naziv,popa"></div>
            <div class="vnosno-polje">
                <div class="naslov">
                    <label class="">{{t "prostor.naslov"}}</label>
                    <div class="help-block hidden">{{t "prostor.d.naslov"}}</div>
                    <div class="error-block"></div>
                </div>
                <div style="width: 100%; display: table;">
                    <div style="display: table-row">
                        <div class="izbor"  data-editors="naslov">  </div>
                        <div class="dodaj">
                            <a class="btn btn-default gumb prostor-dodaj-naslov" title="{{t "std.title.dodajNaslov"}}">
                                <i class="fa fa-plus"> </i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6" data-fields="kapaciteta,jeMaticniOder,jePrizorisce,sePlanira,sifra"></div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opis"></div>
    </div>
</form>