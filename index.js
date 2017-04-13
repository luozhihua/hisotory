'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _respondentEmitter = require('respondent-emitter');

var _respondentEmitter2 = _interopRequireDefault(_respondentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OriginHistory = function (_Event) {
   _inherits(OriginHistory, _Event);

   function OriginHistory() {
      _classCallCheck(this, OriginHistory);

      return _possibleConstructorReturn(this, (OriginHistory.__proto__ || Object.getPrototypeOf(OriginHistory)).apply(this, arguments));
   }

   _createClass(OriginHistory, [{
      key: 'custructor',
      value: function custructor() {
         var _this2 = this;

         var history = window.history;

         Object.keys(history.__proto__).forEach(function (methods) {
            if (typeof history[methods] === 'function') {
               _this2[methods] = history[methods].bind(history);
            }
         });
      }
   }]);

   return OriginHistory;
}(_respondentEmitter2.default);

var store = [];
var current = 0;

var History = function (_OriginHistory) {
   _inherits(History, _OriginHistory);

   function History(options) {
      _classCallCheck(this, History);

      var _this3 = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this));

      _this3.options = _extends({
         base: '/',
         hashbang: false
      }, options);
      return _this3;
   }

   _createClass(History, [{
      key: 'back',
      value: function back() {
         var from = store[current];
         var to = store[current - 1] || null;

         if (this.emit('beforeNavigate', from, to) !== false) {
            _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'back', this).call(this);
            current -= 1;
         }
         this.emit('afterNavigate');
      }
   }, {
      key: 'forward',
      value: function forward() {
         var from = store[current];
         var to = store[current + 1] || null;

         if (this.emit('beforeNavigate', from, to) !== false) {
            _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'forward', this).call(this);
            current += 1;
         }
         this.emit('afterNavigate');
      }
   }, {
      key: 'go',
      value: function go() {
         var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

         number = parseInt(number);

         if (number === 0) {
            return;
         } else {
            var toIndex = current + number;
            var from = store[current];
            var to = store[toIndex];

            if (this.emit('beforeNavigate', from, to) !== false) {
               _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'go', this).call(this, number);
               current = toIndex;
               this.emit('afterNavigate');
            }
         }
      }
   }, {
      key: 'pushState',
      value: function pushState(state, title, url) {
         url = this.formatPath(url);

         if (this.emit('beforeNavigate') !== false) {
            store.length = current;

            store.push({
               state: state,
               title: title,
               url: url
            });
            _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'pushState', this).call(this, state, title, url);
            current = store.length;
            this.emit('afterNavigate');
         }
      }
   }, {
      key: 'replaceState',
      value: function replaceState(state, title, url) {
         url = this.formatPath(url);

         if (this.emit('beforeNavigate') !== false) {
            store.length = current;

            store[current] = {
               state: state,
               title: title,
               url: url
            };
            _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'replaceState', this).call(this, state, title, url);
            this.emit('afterNavigate');
         }
      }
   }, {
      key: 'getHistoryIndexByUrl',
      value: function getHistoryIndexByUrl(url) {
         var index = void 0;
         store.forEach(function (state, i) {
            if (state.url === url) {
               index = i;
               return false;
            }
         });
      }
   }, {
      key: 'formatPath',
      value: function formatPath(path) {
         path = path.replace(this.options.base, '') || '/';

         return (this.options.hashbang ? '#!' : '') + path;
      }
   }]);

   return History;
}(OriginHistory);

exports.default = History;
