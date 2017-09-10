var register = function(Handlebars) {
    var helpers = {
        // list: function(items, options) {
        //     var out = "<tr>";
        
        //     for(var i=0, l=items.length; i<l; i++) {
        //     out = out + "<td>" + options.fn(items[i]) + "</td>";
        //     }
  
        //     return out + "</tr>";
        // }
        foo: function() {
            return "<tr><td>FOO</td></td>";
        }
    };

    return helpers;
};

module.exports.register = register;
module.exports.helpers = register(null);