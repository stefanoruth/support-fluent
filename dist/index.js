"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Fluent(data) {
    if (data === void 0) { data = {}; }
    return FluentObject.proxy(data);
}
exports.Fluent = Fluent;
var FluentObject = (function () {
    function FluentObject(attributes) {
        if (attributes === void 0) { attributes = {}; }
        this.attributes = {};
        this.attributes = attributes;
    }
    FluentObject.prototype.getAttributes = function () {
        return this.attributes;
    };
    FluentObject.prototype.set = function (key, value) {
        this.attributes[key] = value;
    };
    FluentObject.prototype.has = function (key) {
        return !!this.attributes[key];
    };
    FluentObject.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (this.attributes[key]) {
            return this.attributes[key];
        }
        return defaultValue;
    };
    FluentObject.prototype.toJson = function () {
        return JSON.stringify(this.attributes);
    };
    FluentObject.proxyHandler = function () {
        return {
            get: function (target, name, receiver) {
                if (typeof target[name] === 'function') {
                    return target[name];
                }
                else if (target.has(name)) {
                    return target.get(name);
                }
                else if (target[name]) {
                    return target[name];
                }
                return function (value) {
                    if (value === void 0) { value = true; }
                    target.set(name, value);
                };
            },
            set: function (target, name, value) {
                target.set(name, value);
                return true;
            },
            deleteProperty: function (target, prop) {
                delete target.attributes[prop];
                return true;
            },
            __noSuchMethod__: function (name, args) {
                console.log(name, args);
                return function () {
                    return true;
                };
            },
        };
    };
    FluentObject.proxy = function (data) {
        if (data === void 0) { data = {}; }
        return new Proxy(new FluentObject(data), FluentObject.proxyHandler());
    };
    return FluentObject;
}());
