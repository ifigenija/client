<div class="panel panel-default">
    <div class="panel-heading">Panel heading without title</div>
    <div class="panel-body">
        <form>
            <div class="row">
                <div class="col-sm-offset-1 col-sm-3">
                        <input class="celotnaVrednost" type="checkbox"> {{t "ep.celotnaVrednost"}}
                </div>
                <div class="col-sm-3">test</div>
                <div class="col-sm-1"> <-</div>
                <div class="nova-celotnaVrednost col-sm-3">{{novaCelVred}}</div>
            </div>
            <div class="row">
                <div class="col-sm-offset-1 col-sm-3">
                        <input class="avtorskiHonorarji" type="checkbox"> {{t "ep.avtorskiHonorarji"}}
                </div>
                <div class="stara-avtorskiHonorarji col-sm-3">{{dokument}}</div>
                <div class="col-sm-1"> <-</div>
                <div class="nova-avtorskiHonorarji col-sm-3">{{novaCelVred}}</div>
            </div>
            <div class="row">
                <div class="col-sm-offset-1 col-sm-3">
                        <input class="tantieme" type="checkbox"> {{t "ep.tantieme"}}
                </div>
                <div class="stara-tantieme col-sm-3">{{dokument}}</div>
                <div class="col-sm-1"> <-</div>
                <div class="nova-tantieme col-sm-3">{{novaCelVred}}</div>
            </div>
        </form>
    </div>
</div>