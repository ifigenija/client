define(['backbone-forms'], function (Form) {
    var Hidden = Form.editors.Base.extend();

    Hidden.prototype.initialize = function (options) {
        Form.editors.Base.prototype.initialize.call(this, options);
        this.value = this.model.get(options.key);
    };
    
    Hidden.prototype.getValue = function () {
        return this.value;
    };
    
    Hidden.prototype.setValue = function (value) {
        this.value = value;
    };

    return Hidden;
});