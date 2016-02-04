<div class="planer-label-wrap">
    
    <span class="label label-{{razredIme}} planer-label" {{#if barva}}style="background-color: {{barva}} !important;color: {{barvaBesedila}}"{{/if}} title="{{u "cas" zacetek}} {{title}} {{#if uprizoritev.label}}/ {{uprizoritev.label}}{{/if}} {{#if prostor.label}}/ {{prostor.label}}{{/if}}">

    {{#if isPlaniran}}
        <i class="fa fa-pencil-square-o"></i>
    {{else if isPregledan}}
        <i class="fa fa-check"></i>
    {{else if isPotrjen}}
        <i class="fa fa-calendar-check-o"></i>
    {{else if isZakljucen}}
        <i class="fa fa-hourglass-end"></i>
    {{else if isOdpovedan}}
        <i class="fa fa-ban"></i>
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
        
    </span>

</div>{{!-- {{log this}} --}}  
