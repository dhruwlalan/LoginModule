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
/******/ 		"login": 0
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
/******/ 	deferredModules.push(["./src/js/login.js","vendor"]);
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

/***/ "./src/js/alerts.js":
/*!**************************!*\
  !*** ./src/js/alerts.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (type, message) {\n  var el;\n\n  if (type === 'success') {\n    el = \"<div class=\\\"alert alert--success\\\">\".concat(message, \"</div>\");\n  } else if (type === 'error') {\n    el = \"<div class=\\\"alert alert--error\\\">\".concat(message, \"</div>\");\n  }\n\n  document.body.insertAdjacentHTML('afterbegin', el);\n  document.querySelector('.alert').classList.add('slideInDown');\n  setTimeout(function () {\n    var alert = document.querySelector('.alert');\n    alert.classList.add('slideOutUp');\n    alert.classList.remove('slideInDown');\n    setTimeout(function () {\n      alert.remove();\n    }, 500);\n  }, 1500);\n});\n\n//# sourceURL=webpack:///./src/js/alerts.js?");

/***/ }),

/***/ "./src/js/assets.js":
/*!**************************!*\
  !*** ./src/js/assets.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_favicon_favicon_ico__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/favicon/favicon.ico */ \"./src/assets/favicon/favicon.ico\");\n/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/svg/passHide.svg */ \"./src/assets/svg/passHide.svg\");\n/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/svg/passShow.svg */ \"./src/assets/svg/passShow.svg\");\n/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__);\n// SASS\n // ASSETS\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/assets.js?");

/***/ }),

/***/ "./src/js/login.js":
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _assets_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets.js */ \"./src/js/assets.js\");\n/* harmony import */ var _alerts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alerts.js */ \"./src/js/alerts.js\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! validator */ \"./node_modules/validator/index.js\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// ASSETS\n // MAIN\n\n\n\nvar form = document.querySelector('.form');\nvar formGroupEmail = document.querySelector('.form__group--email');\nvar formGroupPass = document.querySelector('.form__group--pass');\nvar formGroupInputs = document.querySelectorAll('.form__group-input');\nvar emailInput = document.getElementById('emailInput');\nvar emailLabel = document.getElementById('emailLabel');\nvar passInput = document.getElementById('passInput');\nvar passLabel = document.getElementById('passLabel');\nvar eyeSvg = document.querySelector('.form__group-input--eyesvg');\nvar formSubmitBtnText = document.querySelector('.form__submit-btn--text');\nvar EnteredEmail = 'notEntered';\nvar EnteredPass = 'notEntered'; // for focus:\n\nformGroupInputs.forEach(function (input) {\n  input.addEventListener('focusin', function (e) {\n    e.target.parentNode.classList.add('focus-input');\n    e.target.parentNode.querySelector(':scope > label').classList.add('focus-label');\n  });\n  input.addEventListener('focusout', function (e) {\n    e.target.parentNode.classList.remove('focus-input');\n    e.target.parentNode.querySelector(':scope > label').classList.remove('focus-label');\n  });\n}); // for hover:\n\nformGroupEmail.addEventListener('mouseenter', function () {\n  var email = emailInput.value;\n\n  if (email.length === 0) {\n    formGroupEmail.classList.add('hover-input');\n    emailLabel.classList.add('hover-label');\n  }\n});\nformGroupEmail.addEventListener('mouseleave', function () {\n  formGroupEmail.classList.remove('hover-input');\n  emailLabel.classList.remove('hover-label');\n});\nformGroupPass.addEventListener('mouseenter', function () {\n  var password = passInput.value;\n\n  if (password.length === 0) {\n    formGroupPass.classList.add('hover-input');\n    passLabel.classList.add('hover-label');\n  }\n\n  eyeSvg.classList.add('showeyesvg');\n});\nformGroupPass.addEventListener('mouseleave', function () {\n  formGroupPass.classList.remove('hover-input');\n  passLabel.classList.remove('hover-label');\n  eyeSvg.classList.remove('showeyesvg');\n}); // checking input:\n\nemailInput.addEventListener('input', function () {\n  var email = emailInput.value;\n\n  if (email.length === 0) {\n    EnteredEmail = 'notEntered';\n    formGroupEmail.removeAttribute('style');\n    emailLabel.removeAttribute('style');\n  } else if (validator__WEBPACK_IMPORTED_MODULE_7___default.a.isEmail(email)) {\n    EnteredEmail = 'EnteredAndValid';\n    formGroupEmail.style.border = '1px solid #002fff';\n    emailLabel.style.color = '#002fff';\n  } else {\n    EnteredEmail = 'EnteredButInvalid';\n    formGroupEmail.style.border = '1px solid tomato';\n    emailLabel.style.color = 'tomato';\n  }\n});\npassInput.addEventListener('input', function () {\n  var password = passInput.value;\n  var passwordLength = password.length;\n\n  if (passwordLength === 0) {\n    EnteredPass = 'notEntered';\n    formGroupPass.removeAttribute('style');\n    passLabel.removeAttribute('style');\n  } else if (passwordLength > 7) {\n    EnteredPass = 'EnteredAndValid';\n    formGroupPass.style.border = '1px solid #002fff';\n    passLabel.style.color = '#002fff';\n  } else {\n    EnteredPass = 'EnteredButInvalid';\n    formGroupPass.style.border = '1px solid tomato';\n    passLabel.style.color = 'tomato';\n  }\n}); // show hide password:\n\neyeSvg.addEventListener('click', function () {\n  if (passInput.getAttribute('type') === 'password') {\n    passInput.setAttribute('type', 'text');\n    passInput.classList.add('form__group-input--showpassword');\n    eyeSvg.setAttribute('src', 'assets/svg/passHide.svg');\n    eyeSvg.style.display = 'inline-block';\n  } else {\n    passInput.setAttribute('type', 'password');\n    passInput.classList.remove('form__group-input--showpassword');\n    eyeSvg.setAttribute('src', 'assets/svg/passShow.svg');\n    eyeSvg.removeAttribute('style');\n  }\n}); // login user:\n\nvar login = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {\n    var res;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            formSubmitBtnText.textContent = '';\n            formSubmitBtnText.classList.add('spinner');\n            _context.prev = 2;\n            _context.next = 5;\n            return axios({\n              method: 'POST',\n              url: '/api/v1/users/login',\n              data: {\n                email: email,\n                password: password\n              }\n            });\n\n          case 5:\n            res = _context.sent;\n\n            if (res.data.status === 'success') {\n              formSubmitBtnText.classList.remove('spinner');\n              formSubmitBtnText.innerHTML = '&#10003;';\n              Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('success', 'Logged in Successfully!');\n              setTimeout(function () {\n                location.assign('/');\n              }, 500);\n            }\n\n            _context.next = 15;\n            break;\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context[\"catch\"](2);\n            formSubmitBtnText.classList.remove('spinner');\n            formSubmitBtnText.innerHTML = '&#10007;';\n            setTimeout(function () {\n              formSubmitBtnText.textContent = 'Login';\n            }, 500);\n            Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('error', _context.t0.response.data.message);\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[2, 9]]);\n  }));\n\n  return function login(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n\n  if (EnteredEmail === 'notEntered') {\n    Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('error', 'Please enter your email address.');\n  } else if (EnteredEmail === 'EnteredButInvalid') {\n    Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('error', 'Please enter a valid email address.');\n  } else if (EnteredPass === 'notEntered') {\n    Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('error', 'Please enter your password.');\n  } else if (EnteredPass === 'EnteredButInvalid') {\n    Object(_alerts_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('error', 'Password should be at least 8 characters long.');\n  } else {\n    var email = emailInput.value;\n    var password = passInput.value;\n    login(email, password);\n  }\n});\n\n//# sourceURL=webpack:///./src/js/login.js?");

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