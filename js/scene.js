/* =========================================================
   3D Web Template — js/scene.js
   ---------------------------------------------------------
   Public API, no dependencies:

     T3.tilt(sceneEl, stageEl, { maxX, maxY })  -> { destroy() }
     T3.hero(sceneEl, stageEl, { ... })         -> { destroy() }
     T3.cards(rootEl, { selector })
     T3.reveal(rootEl, { selector, threshold })
     T3.room(roomEl, { itemSelector })           -> { destroy() }
     T3.wipe(wipeEl, { range })                  -> { destroy() }
     T3.init(rootEl)                            auto-wires the attributes

   Markup:

     <section class="t3-hero">
       <div class="t3-scene" data-t3-tilt>
         <div class="t3-split" data-t3-stage> ... </div>
       </div>
     </section>

   `data-t3-hero` on the scene adds the scroll recede to the same tilt.
   `data-t3-card` tilts a card. `data-t3-turn` reveals it on arrival.
   `data-t3-room` turns a row of `data-t3-room-item` children into a rail the
   reader can select from. It is the one primitive here with no camera, on
   purpose: see the note above `.t3-room` in css/3d.css.
   `data-t3-wipe` scrubs one screen out in a horizontal blur while the next
   one resolves under it, as the section crosses the middle of the viewport.

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

  /* The room: a row of objects on a rail, focused one at a time. The selected
     one sits at full size and every other is one --t3-room-shrink step smaller
     and dimmer per item away.

     The cap (3) is written twice on purpose: here, and as min(…, 3) in the
     CSS. Setting a distance the stylesheet does not expect moves an object
     without dimming it, which reads as a bug, not depth.

     Without this function the row is an ordinary row of buttons at one depth:
     every object visible, every label readable, no selection. That is the
     fallback, and it works. */
  function room(container, options) {
    var opts = options || {};
    var items = Array.prototype.slice.call(
      container.querySelectorAll(opts.itemSelector || "[data-t3-room-item]")
    );
    if (!items.length) return { destroy: function () {} };

    var cap = 3;
    /* Start in the middle: the room is symmetric, and a selection at one end
       shows a one-sided effect that reads as a broken carousel. */
    var live = Math.floor((items.length - 1) / 2);

    function paint() {
      for (var i = 0; i < items.length; i++) {
        var dist = Math.min(cap, Math.abs(i - live));
        items[i].style.setProperty("--t3-room-dist", String(dist));
        if (i === live) {
          items[i].classList.add("is-t3-on");
          items[i].setAttribute("aria-current", "true");
        } else {
          items[i].classList.remove("is-t3-on");
          items[i].removeAttribute("aria-current");
        }
      }
      container.classList.add("t3-room-live");
    }

    function itemFor(node) {
      while (node && node !== container) {
        if (node.hasAttribute && node.hasAttribute("data-t3-room-item")) return node;
        node = node.parentNode;
      }
      return null;
    }

    function select(index, moveFocus) {
      live = (index + items.length) % items.length;
      paint();
      if (!moveFocus) return;
      var button = items[live].querySelector("button");
      if (button) button.focus();
    }

    function onClick(event) {
      var item = itemFor(event.target);
      if (!item) return;
      var index = items.indexOf(item);
      if (index >= 0) select(index, false);
    }

    function onKey(event) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        select(live + (event.key === "ArrowRight" ? 1 : -1), true);
        event.preventDefault();
      } else if (event.key === "Home" || event.key === "End") {
        select(event.key === "Home" ? 0 : items.length - 1, true);
        event.preventDefault();
      }
    }

    /* Tabbing into an object selects it, so the visual state and the focused
       element never disagree. */
    function onFocus(event) {
      var item = itemFor(event.target);
      if (!item) return;
      var index = items.indexOf(item);
      if (index >= 0 && index !== live) select(index, false);
    }

    container.addEventListener("click", onClick);
    container.addEventListener("keydown", onKey);
    container.addEventListener("focusin", onFocus);
    paint();

    return {
      destroy: function () {
        container.removeEventListener("click", onClick);
        container.removeEventListener("keydown", onKey);
        container.removeEventListener("focusin", onFocus);
        container.classList.remove("t3-room-live");
        for (var i = 0; i < items.length; i++) {
          items[i].style.removeProperty("--t3-room-dist");
          items[i].classList.remove("is-t3-on");
          items[i].removeAttribute("aria-current");
        }
      }
    };
  }

  /* The wipe: one screen smearing out while the next resolves under it.

     Scroll is the trigger, and the position is the entire state: --t3-wipe-p
     runs 0 to 1 as the section's centre crosses the middle band of the
     viewport, and everything the CSS does is a function of it. So the wipe can
     be held anywhere and measured there, and scrolling back runs it in
     reverse. It is a scrub, not a playback.

     `range` is the fraction of the viewport the full travel takes. 0.35 is
     about a third of a screen each side of the section's centre: wider and the
     smear lingers, narrower and it snaps.

     Refused under prefers-reduced-motion, because half-finished is a blurred
     page. The class is only added when the scrub is live, so no script — or a
     reader who asked for less — gets two ordinary panels, stacked. */
  function wipe(container, options) {
    var opts = options || {};
    var range = opts.range == null ? 0.35 : opts.range;

    if (!container || window.matchMedia(CALM).matches) {
      return { destroy: function () {} };
    }

    var span = 0;
    var value = 0;

    var paint = frame(function () {
      container.style.setProperty("--t3-wipe-p", value.toFixed(3));
    });

    function onScroll() {
      var box = container.getBoundingClientRect();
      var h = window.innerHeight || document.documentElement.clientHeight;
      if (!h || !span) return;
      var mid = box.top + box.height / 2;
      var raw = (h / 2 + span - mid) / (2 * span);
      var next = Math.round(Math.max(0, Math.min(1, raw)) * 1000) / 1000;
      if (next === value) return;
      value = next;
      paint();
    }

    function measure() {
      var h = window.innerHeight || document.documentElement.clientHeight;
      span = h * range || 1;
      onScroll();
    }

    container.classList.add("t3-wipe-live");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return {
      destroy: function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", measure);
        container.classList.remove("t3-wipe-live");
        container.style.removeProperty("--t3-wipe-p");
      }
    };
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

    Array.prototype.forEach.call(scope.querySelectorAll("[data-t3-room]"), function (container) {
      if (container.getAttribute("data-t3-ready") === "1") return;
      container.setAttribute("data-t3-ready", "1");
      room(container);
    });

    Array.prototype.forEach.call(scope.querySelectorAll("[data-t3-wipe]"), function (container) {
      if (container.getAttribute("data-t3-ready") === "1") return;
      container.setAttribute("data-t3-ready", "1");
      wipe(container);
    });
  }

  function start() {
    init(document);
  }

  window.T3 = {
    tilt: tilt,
    hero: hero,
    cards: cards,
    reveal: reveal,
    room: room,
    wipe: wipe,
    init: init,
    allowed: allowed
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})(window, document);
