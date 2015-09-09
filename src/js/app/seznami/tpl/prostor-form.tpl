<form>
    <div class="row">
        <div class="col-sm-6">
            <div data-fields="naziv,popa"></div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="prostor-vnosno-polje">
                        <div class="prostor-naslov">
                            <label class="">{{t "prostor.naslov"}}</label>
                            <div class="help-block hidden">{{t "prostor.d.naslov"}}</div>
                            <div class="error-block"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-10" data-editors="naslov"></div>
                            <div class="col-sm-2">
                                <a class="btn btn-default oseba-nova" title="{{t "std.title.dodajNaslov"}}">
                                    <i class="fa fa-plus"> </i>
                                </a>
                            </div>
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