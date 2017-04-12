"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _respondentEmitter = require("respondent-emitter");

var _respondentEmitter2 = _interopRequireDefault(_respondentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function OriginHistory() {}
OriginHistory.prototype = window.history;

var History = function (_OriginHistory) {
				_inherits(History, _OriginHistory);

				function History() {
								_classCallCheck(this, History);

								var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this));

								debugger;
								_this.store = [];
								_this.current = 0;
								_this.event = new _respondentEmitter2.default();
								_this.back = function () {};
								return _this;
				}

				return History;
}(OriginHistory);

exports.default = History;
