{{#if index}}
, 
{{/if}}
<a href="{{href}}" class="alert-link" target="_blank">
    {{#if ime}}
    {{ime}}
    {{/if}}
    {{#if srednjeIme}}
    {{srednjeIme}}
    {{/if}}
    {{#if priimek}}
    {{priimek}}
    {{/if}}
</a>
{{#if email}}
({{email}})
{{/if}}
