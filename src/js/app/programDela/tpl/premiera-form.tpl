<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <!--<div class="col-sm-12 col-lg-6">
                    <div class="input-group">
                        <label>{{t "ep.lastnaSredstva"}}</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6">
                    <div class="input-group">
                        <label>{{t "ep.celotnaVrednost"}}</label>
                        <input type="text" class="form-control">
                    </div>
                </div>-->
                <div class="col-sm-12 col-lg-6">{{t "ep.lastnaSredstva"}}: {{lastnaSredstva}}</div>
                <div class="col-sm-12 col-lg-6">{{t "ep.celotnaVrednost"}}: {{celotnaVrednost}}</div>
                <div class="col-sm-12 col-lg-6">{{t "ep.datumZacStudija"}}: {{datumZacStudija}}</div>
                <div class="col-sm-12 col-lg-6">{{t "ep.datumPremiere"}}: {{datumPremiere}}</div>
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,tantieme"></div>
                <div class="col-sm-12 col-lg-6">
                    <div data-fields="avtorskePravice,nasDelez"></div>
                    <div style="display: table;">
                        <div style="display: table-row;">
                            <div data-fields="zaproseno"></div>
                            <a class="pull-right btn btn-default izracunaj">{{t "std.izracunaj"}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="drugiJavni,obiskDoma,stZaposUmet,stZaposDrug"></div>
                <div class="col-sm-12 col-lg-6" data-fields="stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz"></div>
            </div>
        </div>
    </div>
</form>