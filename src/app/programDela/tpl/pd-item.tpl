<div class="col-sm-4 col-lg-3">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title">
                <h3 class="panel-title">
                    <div class="clearfix">
                        <div class="panel-name">{{naziv}}</div>
                        <div class="panel-status pull-right">
                            <span class="panel-status-label"><i class="fa fa-check-circle"></i> {{potrjenProgram}} </span>
                            <span class="panel-status-hide" style="display: none;"><i class="fa fa-remove"></i> Arhiviraj</span>
                        </div>
                    </div>
                </h3>
            </div>
        </div>
        <div style="padding-top: 8px; padding-bottom: 8px" class="panel-body  mouse-hand">
            <p style="margin-bottom: 0;">
                <i class="fa fa-calendar"></i> {{sezona}}
                <br />
                <i class="fa fa-clock-o"></i> Začetek {{u "date" zacetek}}
                <br />
                <i class="fa fa-clock-o"></i> Konec {{u "date" konec}}
                <br />
            </p>
        </div>
    </div>
</div>