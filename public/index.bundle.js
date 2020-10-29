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
/******/ 		"index": 0
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
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "assets/favicon/favicon.ico");

/***/ }),

/***/ "./src/assets/svg/passHide.svg":
/*!*************************************!*\
  !*** ./src/assets/svg/passHide.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/svg/passHide.svg";

/***/ }),

/***/ "./src/assets/svg/passShow.svg":
/*!*************************************!*\
  !*** ./src/assets/svg/passShow.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/svg/passShow.svg";

/***/ }),

/***/ "./src/js/assets.js":
/*!**************************!*\
  !*** ./src/js/assets.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_favicon_favicon_ico__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/favicon/favicon.ico */ "./src/assets/favicon/favicon.ico");
/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/svg/passHide.svg */ "./src/assets/svg/passHide.svg");
/* harmony import */ var _assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passHide_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/svg/passShow.svg */ "./src/assets/svg/passShow.svg");
/* harmony import */ var _assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_svg_passShow_svg__WEBPACK_IMPORTED_MODULE_3__);
// SASS
 // ASSETS





/***/ }),

/***/ "./src/js/form.js":
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__);


var formTitle = document.querySelector('.form__title');
var formGroup = document.querySelector('.form__group');
var formGroupPass = document.querySelector('.form__group--pass');
var formGroupPassconf = document.querySelector('.form__group--passconf');
var formGroupInput = document.querySelectorAll('.form__group-input');
var formGroupInputPass = document.querySelectorAll('.form__group-input--pass');
var emailLabel = document.getElementById('emailLabel');
var emailInput = document.getElementById('emailInput');
var passLabel = document.getElementById('passLabel');
var passInput = document.getElementById('passInput');
var passConfLabel = document.getElementById('passConfLabel');
var passConfInput = document.getElementById('passConfInput');
var passShowHideForPass = document.querySelector('.passshowhide-forpass');
var passShowHideForPassconf = document.querySelector('.passshowhide-forpassconf');
var submitBtn = document.getElementById('submit');
var formFooterText = document.querySelector('.form__footer--text');
var formFooterLink = document.querySelector('.form__footer--link');
formGroupInput.forEach(function (input) {
  input.addEventListener('focusin', function (e) {
    e.target.parentNode.classList.add('form__group--focused');
  });
  input.addEventListener('focusout', function (e) {
    e.target.parentNode.classList.remove('form__group--focused');
  });
});
formGroupPass.addEventListener('mouseenter', function () {
  passShowHideForPass.classList.add('showpassword');
});
formGroupPass.addEventListener('mouseleave', function () {
  passShowHideForPass.classList.remove('showpassword');
});

if (formGroupPassconf) {
  formGroupPassconf.addEventListener('mouseenter', function () {
    passShowHideForPassconf.classList.add('showpassword');
  });
  formGroupPassconf.addEventListener('mouseleave', function () {
    passShowHideForPassconf.classList.remove('showpassword');
  });
}

passShowHideForPass.addEventListener('click', function () {
  if (passInput.getAttribute('type') === 'password') {
    passInput.setAttribute('type', 'text');
    passInput.classList.add('form__group-input--showpassword');
    passShowHideForPass.setAttribute('src', 'assets/svg/passHide.svg');
    passShowHideForPass.style.display = 'inline-block';
  } else {
    passInput.setAttribute('type', 'password');
    passInput.classList.remove('form__group-input--showpassword');
    passShowHideForPass.setAttribute('src', 'assets/svg/passShow.svg');
    passShowHideForPass.removeAttribute('style');
  }
});

if (passShowHideForPassconf) {
  passShowHideForPassconf.addEventListener('click', function () {
    if (passConfInput.getAttribute('type') === 'password') {
      passConfInput.setAttribute('type', 'text');
      passConfInput.classList.add('form__group-input--showpassword');
      passShowHideForPassconf.setAttribute('src', 'assets/svg/passHide.svg');
      passShowHideForPassconf.style.display = 'inline-block';
    } else {
      passConfInput.setAttribute('type', 'password');
      passConfInput.classList.remove('form__group-input--showpassword');
      passShowHideForPassconf.setAttribute('src', 'assets/svg/passShow.svg');
      passShowHideForPassconf.removeAttribute('style');
    }
  });
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets.js */ "./src/js/assets.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.js */ "./src/js/form.js");
// ASSETS
 // MAIN



/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map