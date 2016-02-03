<div class="planer-label-wrap">
    
    <span class="label label-primary planer-label" title="{{u "cas" zacetek}} {{title}} {{#if uprizoritev.label}}/ {{uprizoritev.label}}{{/if}} {{#if prostor.label}}/ {{prostor.label}}{{/if}}">

    {{#if isPlaniran}}
        <i class="fa fa-pencil-square-o"></i>
    {{else if isPregledan}}
        <i class="fa fa-pencil-check"></i>
    {{else if isPotrjen}}
        <i class="fa fa-pencil-calendar-check-o"></i>
    {{else if isZakljucen}}
        <i class="fa fa-pencil-hourglass-end"></i>
    {{else if isOdpovedan}}
        <i class="fa fa-pencil-ban"></i>
    {{else if isObdelanI}}
        <i class="fa fa-pencil-square"></i>
    {{else if isObdelanT}}
        <i class="fa fa-pencil-square"></i>
    {{else if isObdelan}}
        <i class="fa fa-pencil-square"></i>
    {{/if}}
    
    <span> {{u "cas" zacetek}} </span>
    

    <span>{{title}}</span>
    {{#if uprizoritev.label}}
        <span>/ {{uprizoritev.label}}</span>
    {{/if}}
        
    {{!--
    {{#if prostor.label}}
        <span>/ {{prostor.label}}</span>
    {{/if}}
    --}}
    

    </span>

</div>