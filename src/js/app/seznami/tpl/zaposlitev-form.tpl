<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div class="row">
                    <div class="col-sm-12 col-lg-6">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="vnosno-polje">
                                    <div class="naslov">
                                        <label class="">{{t "zaposlitev.oseba"}}</label>
                                        <div class="help-block hidden">{{t "zaposlitev.d.oseba"}}</div>
                                        <div class="error-block"></div>
                                    </div>
                                    <div style="width: 100%; display: table;">
                                        <div style="display: table-row">
                                            <div class="izbor"  data-editors="oseba">  </div>
                                            <div class="dodaj">
                                                <a class="btn btn-default gumb oseba-dodaj" title="{{t "std.title.vnesiOseba"}}">
                                                    <i class="fa fa-user-plus"> </i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12" data-fields="delovnoMesto"></div>
                            <div class="col-sm-12" data-fields="status"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6" data-fields="zacetek,konec"></div>
                </div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "std.dodatniPodatki"}}</span>
                </legend>
                <div class="row">
                    <div class="col-sm-12 col-lg-6" data-fields="delovnaObveza,izmenskoDelo,individualnaPogodba"></div>
                    <div class="col-sm-12 col-lg-6" data-fields="jeZaposlenVdrugemJz,jeNastopajoci,sifra"></div>
                </div>
            </fieldset>
        </div>
    </div>
</form>