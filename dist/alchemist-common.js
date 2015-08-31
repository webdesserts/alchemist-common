(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["alchemist_common"] = factory();
	else
		root["alchemist_common"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alchemistRgb = __webpack_require__(1);

var _alchemistRgb2 = _interopRequireDefault(_alchemistRgb);

var _alchemistXyz = __webpack_require__(2);

var _alchemistXyz2 = _interopRequireDefault(_alchemistXyz);

var _alchemistHsl = __webpack_require__(3);

var _alchemistHsl2 = _interopRequireDefault(_alchemistHsl);

var _alchemistLab = __webpack_require__(4);

var _alchemistLab2 = _interopRequireDefault(_alchemistLab);

var _alchemistLchab = __webpack_require__(5);

var _alchemistLchab2 = _interopRequireDefault(_alchemistLchab);

exports['default'] = [(0, _alchemistXyz2['default'])(), (0, _alchemistRgb2['default'])(), (0, _alchemistHsl2['default'])(), (0, _alchemistLab2['default'])(), (0, _alchemistLchab2['default'])()];
module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

/*
 * Alchemist-rgb
 *
 * Author: Michael C. Mullins
 * License: MIT
 *
 * This RGB implementation uses sRGB companding. There are other forms
 * such as L* and Gamma companding. If you would like to see these
 * implemented, post an issue on github and I'll try to work it in.
 *
 * Special thanks to Bruce Lindbloom not only for his color formulas
 * but for his color converter as well, both of which played a major
 * role in this module.
 *
 * You can find his site here:
 * http://www.brucelindbloom.com/
 *
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = rgb;

function rgb() {
  return function initializer(alchemist) {
    var inverseCompand = function inverseCompand(companded) {
      return companded <= 0.04045 ? companded / 12.92 : Math.pow((companded + 0.055) / 1.055, 2.4);
    };

    var compand = function compand(linear) {
      return linear <= 0.0031308 ? linear * 12.92 : 1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055;
    };

    var determinant3x3 = function determinant3x3(m) {
      var left_product, right_product, lr, lc, rr, rc, c;
      var size = 3;
      var left_diags = 0;
      var right_diags = 0;

      for (var col = 0; col < size; col++) {
        left_product = 1;
        right_product = 1;
        for (var row = 0; row < size; row++) {
          lr = row;
          rr = size - row - 1;
          c = col + row;
          if (c >= size) c -= size;
          left_product *= m[lr][c];
          right_product *= m[rr][c];
        }
        left_diags += left_product;
        right_diags -= right_product;
      }

      return left_diags + right_diags;
    };

    var invert3x3 = function invert3x3(m) {
      var im = [[], [], []];
      var scale = 1 / determinant3x3(m);

      im[0][0] = scale * (m[2][2] * m[1][1] - m[2][1] * m[1][2]);
      im[0][1] = -scale * (m[2][2] * m[0][1] - m[2][1] * m[0][2]);
      im[0][2] = scale * (m[1][2] * m[0][1] - m[1][1] * m[0][2]);

      im[1][0] = -scale * (m[2][2] * m[1][0] - m[2][0] * m[1][2]);
      im[1][1] = scale * (m[2][2] * m[0][0] - m[2][0] * m[0][2]);
      im[1][2] = -scale * (m[1][2] * m[0][0] - m[1][0] * m[0][2]);

      im[2][0] = scale * (m[2][1] * m[1][0] - m[2][0] * m[1][1]);
      im[2][1] = -scale * (m[2][1] * m[0][0] - m[2][0] * m[0][1]);
      im[2][2] = scale * (m[1][1] * m[0][0] - m[1][0] * m[0][1]);

      return im;
    };

    var transformationMatrix = function computeMatrix(r, g, b, white) {
      var m = [[r.x / r.y, g.x / g.y, b.x / b.y], [1.0, 1.0, 1.0], [(1 - r.x - r.y) / r.y, (1 - g.x - g.y) / g.y, (1 - b.x - b.y) / b.y]];
      var mi = invert3x3(m);

      var sr = white.X * mi[0][0] + white.Y * mi[0][1] + white.Z * mi[0][2];
      var sg = white.X * mi[1][0] + white.Y * mi[1][1] + white.Z * mi[1][2];
      var sb = white.X * mi[2][0] + white.Y * mi[2][1] + white.Z * mi[2][2];

      m[0][0] *= sr;
      m[0][1] *= sg;
      m[0][2] *= sb;

      m[1][0] *= sr;
      m[1][1] *= sg;
      m[1][2] *= sb;

      m[2][0] *= sr;
      m[2][1] *= sg;
      m[2][2] *= sb;

      return m;
    };

    // chromacity cooridinates
    var rc = { x: 0.64, y: 0.33 };
    var gc = { x: 0.30, y: 0.60 };
    var bc = { x: 0.15, y: 0.06 };

    var m = transformationMatrix(rc, gc, bc, alchemist.white);
    var im = invert3x3(m);

    return {
      name: 'rgb',
      limits: {
        max: [255, 255, 255],
        min: [0, 0, 0]
      },
      to: { 'xyz': function xyz(R, G, B) {
          var r = inverseCompand(R / 255);
          var g = inverseCompand(G / 255);
          var b = inverseCompand(B / 255);
          var X = r * m[0][0] + g * m[0][1] + b * m[0][2];
          var Y = r * m[1][0] + g * m[1][1] + b * m[1][2];
          var Z = r * m[2][0] + g * m[2][1] + b * m[2][2];
          return [X, Y, Z];
        } },
      from: { 'xyz': function xyz(X, Y, Z) {
          var R = compand(X * im[0][0] + Y * im[0][1] + Z * im[0][2]) * 255;
          var G = compand(X * im[1][0] + Y * im[1][1] + Z * im[1][2]) * 255;
          var B = compand(X * im[2][0] + Y * im[2][1] + Z * im[2][2]) * 255;
          return [R, G, B];
        } }
    };
  };
}

module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = xyz;

function xyz() {
  return {
    name: 'xyz',
    to: {}
  };
}

module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

/*
 * Alchemist-hsl
 *
 * Author: Michael C. Mullins
 * License: MIT
 *
 * Even though I am technically the author of this module, these conversions
 * were blatantly copied form harthor's color-convert project. Many thanks
 * to her and all of that project's contributers!
 *
 * You can find color-convert here: https://github.com/harthur/color-convert
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = hsl;

function hsl() {
  return {
    name: 'hsl',
    limits: {
      max: [360, 1, 1],
      min: [0, 0, 0]
    },
    to: {
      'rgb': function hsl2rgb(h, s, l) {
        var t1, t2, t3, rgb, val;

        h /= 360;

        if (s == 0) {
          val = l * 255;
          return [val, val, val];
        }

        if (l < 0.5) t2 = l * (1 + s);else t2 = l + s - l * s;
        t1 = 2 * l - t2;

        rgb = [0, 0, 0];

        for (var i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          t3 < 0 && t3++;
          t3 > 1 && t3--;
          if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;else if (2 * t3 < 1) val = t2;else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;else val = t1;

          rgb[i] = val * 255;
        }
        return rgb;
      }
    },

    from: {
      'rgb': function rgb2hsl(r, g, b) {
        var h, s, l, min, max, delta;

        r /= 255;
        g /= 255;
        b /= 255;

        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        delta = max - min;

        if (max == min) h = 0;else if (r == max) h = (g - b) / delta;else if (g == max) h = 2 + (b - r) / delta;else if (b == max) h = 4 + (r - g) / delta;
        h = Math.min(h * 60, 360);

        if (h < 0) h += 360;
        l = (min + max) / 2;
        if (max == min) s = 0;else if (l <= 0.5) s = delta / (max + min);else s = delta / (2 - max - min);

        return [h, s, l];
      }
    }
  };
}

module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

/*
 * Alchemist-lab
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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = lab;

function lab() {
  return function Initializer(alchemist) {
    var kE = 216 / 24389; // 0.08856
    var kK = 24389 / 27; // 903.3
    var kKE = 8;
    var rW = alchemist.white;

    return {
      name: 'lab',
      to: {
        'xyz': function xyz(L, a, b) {
          var fy = (L + 16.0) / 116.0;
          var fx = 0.002 * a + fy;
          var fz = fy - 0.005 * b;

          var fx3 = fx * fx * fx;
          var fz3 = fz * fz * fz;

          var xr = fx3 > kE ? fx3 : (116.0 * fx - 16.0) / kK;
          var yr = L > kKE ? Math.pow((L + 16.0) / 116.0, 3.0) : L / kK;
          var zr = fz3 > kE ? fz3 : (116.0 * fz - 16.0) / kK;

          var X = xr * rW.X;
          var Y = yr * rW.Y;
          var Z = zr * rW.Z;

          return [X, Y, Z];
        }
      },
      from: {
        'xyz': function xyz(X, Y, Z) {
          var f = function f(x) {
            return x > kE ? Math.pow(x, 1 / 3) : (kK * x + 16) / 116;
          };

          // Values adjusted to reference white and ran through adjustment curve
          var fx = f(X / rW.X);
          var fy = f(Y / rW.Y);
          var fz = f(Z / rW.Z);

          var L = 116 * fy - 16;
          var a = 500 * (fx - fy);
          var b = 200 * (fy - fz);

          return [L, a, b];
        }
      }
    };
  };
}

module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = lchab;

function lchab() {
  return {
    name: 'lchab',
    to: { 'lab': function lab(L, C, H) {
        var a = C * Math.cos(H * Math.PI / 180);
        var b = C * Math.sin(H * Math.PI / 180);

        return [L, a, b];
      } },
    from: { 'lab': function lab(L, a, b) {
        var C = Math.sqrt(a * a + b * b);
        var H = 180 * Math.atan2(b, a) / Math.PI;
        if (H < 0) H += 360;
        return [L, C, H];
      } }
  };
}

module.exports = exports['default'];

/***/ }
/******/ ])
});
;