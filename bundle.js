/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 674
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"imagePath":"image-targets/citizen69_luminance.jpg","metadata":null,"name":"citizen69","type":"PLANAR","properties":{"left":250,"top":0,"width":1500,"height":2000,"isRotated":true,"originalWidth":2000,"originalHeight":2000},"resources":{"originalImage":"citizen69_original.jpg","croppedImage":"citizen69_cropped.jpg","thumbnailImage":"citizen69_thumbnail.jpg","luminanceImage":"citizen69_luminance.jpg"},"created":1782396461166,"updated":1782396461166}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// Phase 0 — 8th Wall self-host AR for METAPOLIS CITIZEN #69 marker.
// Loads the locally-compiled image target (image-target-cli, no Niantic cloud).
var onxrloaded = function onxrloaded() {
  XR8.XrController.configure({
    imageTargetData: [__webpack_require__(674)]
  });
};
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
/******/ })()
;