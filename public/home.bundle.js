/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"home": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/home.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/favicon/favicon.ico":
/*!****************************************!*\
  !*** ./src/assets/favicon/favicon.ico ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"assets/favicon/favicon.ico\");\n\n//# sourceURL=webpack:///./src/assets/favicon/favicon.ico?");

/***/ }),

/***/ "./src/assets/images/default.png":
/*!***************************************!*\
  !*** ./src/assets/images/default.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/images/default.png\";\n\n//# sourceURL=webpack:///./src/assets/images/default.png?");

/***/ }),

/***/ "./src/assets/svg/passHide.svg":
/*!*************************************!*\
  !*** ./src/assets/svg/passHide.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/svg/passHide.svg\";\n\n//# sourceURL=webpack:///./src/assets/svg/passHide.svg?");

/***/ }),

/***/ "./src/assets/svg/passShow.svg":
/*!*************************************!*\
  !*** ./src/assets/svg/passShow.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/svg/passShow.svg\";\n\n//# sourceURL=webpack:///./src/assets/svg/passShow.svg?");

/***/ }),

/***/ "./src/js/assets.js":
/*!**************************!*\
  !*** ./src/js/assets.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_favicon_favicon_ico__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/favicon/favicon.ico */ \"./src/assets/favicon/favicon.ico\");\n/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/svg/passHide.svg */ \"./src/assets/svg/passHide.svg\");\n/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/svg/passShow.svg */ \"./src/assets/svg/passShow.svg\");\n/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_images_default_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/default.png */ \"./src/assets/images/default.png\");\n/* harmony import */ var _assets_images_default_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_images_default_png__WEBPACK_IMPORTED_MODULE_4__);\n// SASS\n // ASSETS\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/assets.js?");

/***/ }),

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets.js */ \"./src/js/assets.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _models_logoutModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/logoutModel.js */ \"./src/js/models/logoutModel.js\");\n/* harmony import */ var _views_alerts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/alerts.js */ \"./src/js/views/alerts.js\");\n/* harmony import */ var _views_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/dom.js */ \"./src/js/views/dom.js\");\n/* harmony import */ var _views_dom_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_views_dom_js__WEBPACK_IMPORTED_MODULE_4__);\n// ASSETS\n // MAIN\n\n\n\n\n\n_views_dom_js__WEBPACK_IMPORTED_MODULE_4___default.a.edit.addEventListener('click', function () {\n  location.assign('/edit');\n});\n_views_dom_js__WEBPACK_IMPORTED_MODULE_4___default.a.logout.addEventListener('click', _models_logoutModel_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n//# sourceURL=webpack:///./src/js/home.js?");

/***/ }),

/***/ "./src/js/models/logoutModel.js":
/*!**************************************!*\
  !*** ./src/js/models/logoutModel.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _views_alerts_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../views/alerts.js */ \"./src/js/views/alerts.js\");\n\n\n\n\n\n\n\n\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n  var loc,\n      res,\n      _args = arguments;\n  return regeneratorRuntime.wrap(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          loc = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';\n          if (_typeof(loc) === 'object') loc = '';\n          _context.prev = 2;\n          _context.next = 5;\n          return axios__WEBPACK_IMPORTED_MODULE_9___default()({\n            method: 'GET',\n            url: '/api/v1/users/logout'\n          });\n\n        case 5:\n          res = _context.sent;\n\n          if (res.data.status === 'success') {\n            location.assign(\"/\".concat(loc));\n          }\n\n          _context.next = 12;\n          break;\n\n        case 9:\n          _context.prev = 9;\n          _context.t0 = _context[\"catch\"](2);\n          Object(_views_alerts_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"])('error', _context.t0);\n\n        case 12:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _callee, null, [[2, 9]]);\n})));\n\n//# sourceURL=webpack:///./src/js/models/logoutModel.js?");

/***/ }),

/***/ "./src/js/views/alerts.js":
/*!********************************!*\
  !*** ./src/js/views/alerts.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (type, message) {\n  var el;\n\n  if (type === 'success') {\n    el = \"<div class=\\\"alert alert--success\\\">\".concat(message, \"</div>\");\n  } else if (type === 'error') {\n    el = \"<div class=\\\"alert alert--error\\\">\".concat(message, \"</div>\");\n  }\n\n  document.body.insertAdjacentHTML('afterbegin', el);\n  document.querySelector('.alert').classList.add('slideInDown');\n  setTimeout(function () {\n    var alert = document.querySelector('.alert');\n    alert.classList.add('slideOutUp');\n    alert.classList.remove('slideInDown');\n    setTimeout(function () {\n      alert.remove();\n    }, 500);\n  }, 1500);\n});\n\n//# sourceURL=webpack:///./src/js/views/alerts.js?");

/***/ }),

/***/ "./src/js/views/dom.js":
/*!*****************************!*\
  !*** ./src/js/views/dom.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  // home.js\n  edit: document.getElementById('edit'),\n  logout: document.getElementById('logout'),\n  // edit.js\n  home: document.getElementById('home'),\n  // login.js\n  formLogin: document.querySelector('.form--login'),\n  formGroupEmail: document.querySelector('.form__group--email'),\n  formGroupPass: document.querySelector('.form__group--pass'),\n  formGroupInputs: document.querySelectorAll('.form__group-input'),\n  emailInput: document.getElementById('emailInput'),\n  emailLabel: document.getElementById('emailLabel'),\n  passInput: document.getElementById('passInput'),\n  passLabel: document.getElementById('passLabel'),\n  eyeSvg: document.querySelector('.eye-svg'),\n  btnLoginText: document.querySelector('.btn__login--text')\n};\n\n//# sourceURL=webpack:///./src/js/views/dom.js?");

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/main.scss?");

/***/ })

/******/ });