<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="row">
                        <div class="col-sm-8" data-fields="oseba"></div>
                        <div class="col-sm-2 vnosno-polje-gumb"> <a class="btn btn-default oseba-dodaj">{{t "std.novaOseba"}}</a></div>
                        <div class="col-sm-12" data-fields="status,tip"></div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="zacetek,konec,malica"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="delovnaObveza,izmenskoDelo,individualnaPogodba"></div>
                <div class="col-sm-12 col-lg-6" data-fields="jeZaposlenVdrugemJz,jeNastopajoci"></div>
            </div>
        </div>
    </div>
</form>