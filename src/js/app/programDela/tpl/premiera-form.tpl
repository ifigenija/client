<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="form-group">
                        <label>{{t "ep.lastnaSredstva"}}</label>
                        <input type="text" class="form-control" value="{{u "formatNumber" lastnaSredstva}}" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label>{{t "ep.celotnaVrednost"}}</label>
                        <input type="text" class="form-control" value="{{u "formatNumber" celotnaVrednost}}" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label>{{t "ep.datumZacStudija"}}</label>
                        <input type="text" class="form-control" value="{{u "date" datumZacStudija}}" disabled="disabled">
                    </div>
                    <div class="col-sm-12 col-lg-6">{{t "ep.datumPremiere"}}: {{u "date" datumPremiere}}</div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,tantieme"></div>
                <div class="col-sm-12 col-lg-6" data-fields="avtorskePravice,materialni,nasDelez,zaproseno">            </div>
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