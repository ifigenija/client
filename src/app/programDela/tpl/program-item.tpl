<div class="col-sm-4 col-lg-3">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title">
                <h3 class="panel-title">
                    <div class="clearfix">
                        <div class="panel-name">{{naziv}}</div>
                        <div class="panel-status pull-right">
                            <span class="panel-status-label">
                                {{#if potrjenProgram}}
                                {{t "programDela.potrjen"}} <i class="fa fa-check-circle"></i>
                                {{else}}
                                {{t "programDela.nePotrjen"}} <i class="fa fa-times-circle"></i>
                                {{/if}} </span>
                        </div>
                    </div>
                </h3>
            </div>
        </div>
        <div style="padding-top: 8px; padding-bottom: 8px" class="panel-body  mouse-hand">
            <p style="margin-bottom: 0;">
                <i class="fa fa-calendar"></i> {{t "programDela.sezona"}} : {{sezona}}
                <br />
                <i class="fa fa-clock-o"></i> {{t "entiteta.zacetek"}} : {{u "date" zacetek}}
                <br />
                <i class="fa fa-clock-o"></i> {{t "entiteta.konec"}} : {{u "date" konec}}
                <br />
                <i class="fa fa-money"></i> {{t "programDela.vrednostPs1"}} : {{vrPS1}}
                <br />
            </p>
        </div>
    </div>
</div>