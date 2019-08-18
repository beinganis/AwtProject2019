import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as $ from "jquery";
//import * as f from "../../assets/js/fileinput"
var ContactComponent = /** @class */ (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.ngOnInit = function () {
        //$("#fileinput").fileinput('disable');
        //alert(ts2js);
        new ts2js_fileinput($("#fileinput"), { 'required': true, 'showCancel': null });
    };
    ContactComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ContactComponent);
    return ContactComponent;
}());
export { ContactComponent };
//# sourceMappingURL=contact.component.js.map