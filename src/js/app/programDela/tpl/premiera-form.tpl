<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div style="display: table;">
                        <div data-fields="uprizoritev,tipProgramskeEnote"></div>
                        <div style="display: table-row">
                            <div data-fields="zaprosenProcent"></div>
                            <a class="pull-right btn btn-default izracunaj">{{t "std.izracunaj"}}</a>
                        </div>
                        <div style="display: table-row">
                            <div data-fields="nasDelez"></div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="lastnaSredstva,avtorskiHonorarji,tantieme,avtorskePravice"></div>
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