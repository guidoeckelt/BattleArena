/**
 * Created by Guido on 02.08.2016.
 */
function inherit(cls, superCls) {
    // We use an intermediary empty constructor to create an
    // inheritance chain, because using the super class' constructor
    // might have side effects.
    var construct = function () {};
    construct.prototype = superCls.prototype;
    cls.prototype = new construct;
    cls.prototype.constructor = cls;
    cls.super = superCls;
}
//Example
// var MyClass = (function () {
//     // private static
//     var nextId = 1;
//
//     // constructor
//     var cls = function () {
//         // private
//         var id = nextId++;
//         var name = 'Unknown';
//
//         // public (this instance only)
//         this.get_id = function () { return id; };
//
//         this.get_name = function () { return name; };
//         this.set_name = function (value) {
//             if (typeof value != 'string')
//                 throw 'Name must be a string';
//             if (value.length < 2 || value.length > 20)
//                 throw 'Name must be 2-20 characters long.';
//             name = value;
//         };
//     };
//
//     // public static
//     cls.get_nextId = function () {
//         return nextId;
//     };
//
//     // public (shared across instances)
//     cls.prototype = {
//         announce: function () {
//             alert('Hi there! My id is ' + this.get_id() + ' and my name is "' + this.get_name() + '"!\r\n' +
//                 'The next fellow\'s id will be ' + MyClass.get_nextId() + '!');
//         }
//     };
//
//     return cls;
// })();
// var MyChildClass = (function () {
//     // constructor
//     var cls = function (surName) {
//         // Call super constructor on this instance (any arguments
//         // to the constructor would go after "this" in call(…)).
//         this.constructor.super.call(this);
//
//         // Shadowing instance properties is a little bit less
//         // intuitive, but can be done:
//         var getName = this.get_name;
//
//         // public (this instance only)
//         this.get_name = function () {
//             return getName.call(this) + ' ' + surName;
//         };
//     };
//     inherit(cls, MyClass); // <-- important!
//
//     return cls;
// })();