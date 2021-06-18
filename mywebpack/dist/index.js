
    (function(list){
      function require(file){
        var exports = {}
        eval(list[file]['content'])
        return exports
      }
      require('index.js')
    })({"index.js":{"content":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 5));"},"./add.js":{"content":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _const = require(\"./const.js\");\n\nconsole.log('a,', _const.a);\nconsole.log('b,', _const.b);\n\nvar _default = function _default(arg1, arg2) {\n  return arg1 + arg2;\n};\n\nexports[\"default\"] = _default;"},"./const.js":{"content":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = exports.a = void 0;\nvar a = 1;\nexports.a = a;\nvar b = 2;\nexports.b = b;"}})

