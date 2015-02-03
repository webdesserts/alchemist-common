(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["alchemist_common"] = factory();
	else
		root["alchemist_common"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var rgb = __webpack_require__(2)
var xyz = __webpack_require__(1)
var hsl = __webpack_require__(4)
var lab = __webpack_require__(3)
var lchab = __webpack_require__(5)

module.exports = [xyz(), rgb(), hsl(), lab(), lchab()]


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function xyz () {
  return {
    name: 'xyz',
    to: {}
  }
}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function rgb () {
  var inverseCompand = function inverseCompand (companded) {
    return (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4)
  }
  var compand = function compand (linear) {
    return (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055)
  }

  return {
    name: 'rgb',
    to: { 'xyz': function (R, G, B) {
      var r = inverseCompand(R / 255)
      var g = inverseCompand(G / 255)
      var b = inverseCompand(B / 255)
      var X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
      var Y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
      var Z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041
      return [X, Y, Z]
    } },
    from: { 'xyz': function (X, Y, Z) {
      var R = compand(X *  3.2404542 + Y * -1.5371385 + Z * -0.4985314) * 255
      var G = compand(X * -0.9692660 + Y *  1.8760108 + Z * 0.0415560) * 255
      var B = compand(X *  0.0556434 + Y * -0.2040259 + Z * 1.0572252) * 255
      return [R, G, B]
    } }
  }
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function lab () {
  var kE = 216 / 24389 // 0.08856
  var kK = 24389 / 27 // 903.3
  var kKE = 8

  return {
    name: 'lab',
    to: {
      'xyz': function (L, a, b, color) {
        var rW = color.white

        var fy = (L + 16.0) / 116.0;
        var fx = 0.002 * a + fy;
        var fz = fy - 0.005 * b;

        var fx3 = fx * fx * fx;
        var fz3 = fz * fz * fz;

        var xr = (fx3 > kE) ? fx3 : ((116.0 * fx - 16.0) / kK);
        var yr = (L > kKE) ? Math.pow((L + 16.0) / 116.0, 3.0) : (L / kK);
        var zr = (fz3 > kE) ? fz3 : ((116.0 * fz - 16.0) / kK);

        var X = xr * rW.X;
        var Y = yr * rW.Y;
        var Z = zr * rW.Z;

        return [X, Y, Z]
      }
    },
    from: {
      'xyz': function (X, Y, Z, color) {
        var rW = color.white
        var f = function f (x) {
          return (x > kE) ? Math.pow(x, 1 / 3) : ((kK * x + 16) / 116)
        }

        // Values adjusted to reference white and ran through adjustment curve
        var fx = f(X / rW.X)
        var fy = f(Y / rW.Y)
        var fz = f(Z / rW.Z)

        var L = 116 * fy - 16
        var a = 500 * (fx - fy)
        var b = 200 * (fy - fz)

        return [L, a, b]
      }
    }
  }
}



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function hsl () {
  var hue2rgb = function hue2rgb (m1, m2, h) {
    if (h < 0) h += 1;
    else if (h > 1) h -= 1;
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m2 + (m2 - m1) * (2 / 3 - h) * 6;
    return m1
  }

  return {
    name: 'hsl',
    to: { 'rgb': function hsl2rgb (h, s, l) {
      h /= 360
      var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s
      var m1 = l * 2 - m2
      r = hue2rgb(m1, m2, h + 1 / 3) * 255
      g = hue2rgb(m1, m2, h) * 255
      b = hue2rgb(m1, m2, h - 1 / 3) * 255
      return [r, g, b]
    } },
    from: { 'rgb': function rgb2hsl (r, g, b) {
      var min, max, d, h, s, l;
      min = Math.min(r /= 255, g /= 255, b /= 255)
      max = Math.max(r, g, b)
      d = max - min
      l = (max + min) / 2

      if (d) {
        s = l < .5 ? d / (max + min) : d / (2 - max - min);
        if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
        else if (g == max) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
      } else {
        // d3 what does this doooooooooo?
        h = NaN;
        s = l > 0 && l < 1 ? 0 : h;
      }
      return [h, s, l]
    } }
  }
}



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

/*
 * Alchemist-lchab
 *
 * Author: Michael C. Mullins
 * License: MIT
 *
 * Special thanks to Bruce Lindbloom not only for his color formulas
 * but for his color converter as well, both of which played a major
 * role in this module.
 *
 * You can find his site here:
 * http://www.brucelindbloom.com/
 *
 */

module.exports = function lchab () {
  return {
    name: 'lchab',
    to: { 'lab': function (L, C, H) {
      a = C * Math.cos(H * Math.PI / 180);
      b = C * Math.sin(H * Math.PI / 180);

      return [L, a, b]
    } },
    from: { 'lab': function (L, a, b) {
      C = Math.sqrt(a * a + b * b);
      H = 180 * Math.atan2(b, a) / Math.PI;
      if (H < 0) H += 360;
      return [L, C, H]
    } }
  }
}


/***/ }
/******/ ])
});
