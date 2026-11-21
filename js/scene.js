/* =========================================================
   3D Web Template — js/scene.js
   ---------------------------------------------------------
   Public API, no dependencies:

     T3.tilt(sceneEl, stageEl, { maxX, maxY })  -> { destroy() }
     T3.hero(sceneEl, stageEl, { ... })         -> { destroy() }
     T3.cards(rootEl, { selector })
     T3.reveal(rootEl, { selector, threshold })
     T3.init(rootEl)                            auto-wires the attributes

   Markup:

     <section class="t3-hero">
       <div class="t3-scene" data-t3-tilt>
         <div class="t3-split" data-t3-stage> ... </div>
       </div>
     </section>

   `data-t3-hero` on the scene adds the scroll recede to the same tilt.
   `data-t3-card` tilts a card. `data-t3-turn` reveals it on arrival.

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

  function clamp(n, max) {
    return Math.max(-max, Math.min(max, n));
  }

  /* One transform per animation frame, not one per pointer move. */
  function frame(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
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

    var paint = frame(function () {
      stage.style.transform = "rotateX(" + y + "deg) rotateY(" + x + "deg)";
    });

    function onMove(event) {
      var box = scene.getBoundingClientRect();
      if (!box.width || !box.height) return;
      var px = (event.clientX - box.left) / box.width - 0.5;
      var py = (event.clientY - box.top) / box.height - 0.5;
      x = round(clamp(px * maxX * 2.2, maxX));
      y = round(clamp(-py * maxY * 2.2, maxY));
      paint();
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

  /* The hero: pointer tilt plus a scroll recede.
     As the scene leaves the top of the screen the whole stage is pushed back
     along z, so the page moves INTO the picture instead of past it. The
     recede is capped: uncapped, a long scroll becomes a zoom.

     `wide` must match the CSS breakpoint where the layers stop being a
     column. `t3-` ships with 981px / 980px, in both places. */
  function hero(scene, stage, options) {
    var opts = options || {};
    var maxX = opts.maxX == null ? 4 : opts.maxX;
    var maxY = opts.maxY == null ? 3 : opts.maxY;
    var rate = opts.recede == null ? 0.45 : opts.recede;
    var floor = opts.recedeMax == null ? -240 : -Math.abs(opts.recedeMax);
    var wide = window.matchMedia(opts.wide || "(min-width: 981px)");

    if (!scene || !stage || !allowed()) {
      return { destroy: function () {} };
    }

    var rx = 0;
    var ry = 0;
    var z = 0;
    var lastZ = null;

    var paint = frame(function () {
      stage.style.transform =
        "rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(" + z + "px)";
    });

    function onMove(event) {
      if (!wide.matches) return;
      var box = scene.getBoundingClientRect();
      if (!box.width || !box.height) return;
      var px = (event.clientX - box.left) / box.width - 0.5;
      var py = (event.clientY - box.top) / box.height - 0.5;
      rx = round(clamp(-py * maxY * 2, maxY));
      ry = round(clamp(px * maxX * 2, maxX));
      paint();
    }

    function onLeave() {
      rx = 0;
      ry = 0;
      paint();
    }

    function onScroll() {
      if (!wide.matches) {
        if (z !== 0) {
          z = 0;
          lastZ = 0;
          paint();
        }
        return;
      }
      /* The scene's top goes negative as the hero leaves, so this is zero
         while the hero is fully in view and negative after that. The sign
         matters: positive z would zoom the scene towards the reader. */
      var raw = scene.getBoundingClientRect().top * rate;
      var next = Math.max(floor, Math.min(0, Math.round(raw)));
      if (next === lastZ) return;
      lastZ = next;
      z = next;
      paint();
    }

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Paint once at load, so a reload part-way down opens at the right depth
       instead of snapping when the first scroll arrives. */
    onScroll();

    return {
      destroy: function () {
        scene.removeEventListener("pointermove", onMove);
        scene.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("scroll", onScroll);
        stage.style.transform = "";
      }
    };
  }

  /* A card with a photo inside it. Three degrees on x and four on y is the
     ceiling here: unlike the hero, a card holds paragraphs. */
  function cards(root, options) {
    var opts = options || {};
    var selector = opts.selector || "[data-t3-card]";
    var scope = root || document;
    if (!allowed()) return;

    Array.prototype.forEach.call(scope.querySelectorAll(selector), function (card) {
      if (card.getAttribute("data-t3-ready") === "1") return;
      card.setAttribute("data-t3-ready", "1");

      var rx = 0;
      var ry = 0;
      var paint = frame(function () {
        card.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      });

      card.addEventListener("pointermove", function (event) {
        var box = card.getBoundingClientRect();
        if (!box.width || !box.height) return;
        var px = (event.clientX - box.left) / box.width - 0.5;
        var py = (event.clientY - box.top) / box.height - 0.5;
        rx = round(clamp(-py * 6, 3));
        ry = round(clamp(px * 8, 4));
        paint();
      }, { passive: true });

      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* Cards turn into place. Without this (or without IntersectionObserver)
     they are simply already there. */
  function reveal(root, options) {
    var opts = options || {};
    var selector = opts.selector || "[data-t3-turn]";
    var scope = root || document;
    var targets = scope.querySelectorAll(selector);
    if (!targets.length) return;

    document.documentElement.classList.add("t3-js");

    if (!("IntersectionObserver" in window) || window.matchMedia(CALM).matches) {
      Array.prototype.forEach.call(targets, function (t) {
        t.classList.add("t3-in");
      });
      return;
    }

    var io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("t3-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: opts.threshold || 0.05 });

    Array.prototype.forEach.call(targets, function (t) {
      io.observe(t);
    });
  }

  function init(root) {
    var scope = root || document;
    var scenes = scope.querySelectorAll("[data-t3-tilt]");

    Array.prototype.forEach.call(scenes, function (scene) {
      var stage = scene.querySelector("[data-t3-stage]");
      if (!stage) return;
      if (scene.getAttribute("data-t3-ready") === "1") return;
      scene.setAttribute("data-t3-ready", "1");
      if (scene.hasAttribute("data-t3-hero")) {
        hero(scene, stage);
      } else {
        tilt(scene, stage);
      }
    });

    cards(scope);
    reveal(scope);
  }

  function start() {
    init(document);
  }

  window.T3 = { tilt: tilt, hero: hero, cards: cards, reveal: reveal, init: init, allowed: allowed };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})(window, document);
