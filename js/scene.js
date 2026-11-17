/* =========================================================
   3D Web Template — js/scene.js
   ---------------------------------------------------------
   Two public things, no dependencies:

     T3.tilt(sceneEl, stageEl, { maxX, maxY })  -> { destroy() }
     T3.init(rootEl)                            auto-wires [data-t3-tilt]

   Markup:

     <div class="t3-scene" data-t3-tilt>
       <div class="t3-stage" data-t3-stage>
         <img class="t3-halo" ...>
         <p class="t3-sticker t3-pop">Sold</p>
       </div>
     </div>

   Nothing here runs on a touch screen, and nothing runs when the reader
   has asked for reduced motion. That is not politeness: a page that tilts
   under a thumb is a page that moves while you are trying to read it.
   ========================================================= */
(function (window, document) {
  "use strict";

  var POINTER = "(hover: hover) and (pointer: fine)";
  var CALM = "(prefers-reduced-motion: reduce)";

  function allowed() {
    return window.matchMedia(POINTER).matches && !window.matchMedia(CALM).matches;
  }

  function round(n) {
    return Math.round(n * 10) / 10;
  }

  function tilt(scene, stage, options) {
    var opts = options || {};
    var maxX = opts.maxX == null ? 5 : opts.maxX;
    var maxY = opts.maxY == null ? 4 : opts.maxY;

    if (!scene || !stage || !allowed()) {
      return { destroy: function () {} };
    }

    var x = 0;
    var y = 0;
    var queued = false;

    function paint() {
      queued = false;
      stage.style.transform = "rotateX(" + y + "deg) rotateY(" + x + "deg)";
    }

    function onMove(event) {
      var box = scene.getBoundingClientRect();
      if (!box.width || !box.height) return;
      var px = (event.clientX - box.left) / box.width - 0.5;
      var py = (event.clientY - box.top) / box.height - 0.5;
      x = round(Math.max(-maxX, Math.min(maxX, px * maxX * 2.2)));
      y = round(Math.max(-maxY, Math.min(maxY, -py * maxY * 2.2)));
      // One frame per pointer move, not one transform per move.
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(paint);
      }
    }

    function onLeave() {
      stage.style.transform = "";
    }

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);

    return {
      destroy: function () {
        scene.removeEventListener("pointermove", onMove);
        scene.removeEventListener("pointerleave", onLeave);
        stage.style.transform = "";
      }
    };
  }

  function init(root) {
    var scope = root || document;
    var scenes = scope.querySelectorAll("[data-t3-tilt]");
    Array.prototype.forEach.call(scenes, function (scene) {
      if (scene.getAttribute("data-t3-ready") === "1") return;
      var stage = scene.querySelector("[data-t3-stage]");
      if (!stage) return;
      scene.setAttribute("data-t3-ready", "1");
      tilt(scene, stage);
    });
  }

  function start() {
    init(document);
  }

  window.T3 = { tilt: tilt, init: init, allowed: allowed };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})(window, document);
