import type { Handle, RemixNode } from "remix/component";
import { css, clientEntry } from "remix/component";

import { Document } from "./document.tsx";
import { Canvas } from "~/ui/canvas.client.tsx";

export function ViewPage() {
  return () => (
    <Document head={<Head />}>
      <div class="sidebar-wrapper">
        <div class="intro">
          <h1>waterpipe.js</h1>
          <div class="created-by">
            by
            <a href="http://www.dragdropsite.com" target="_blank">
              dragdropsite.com
            </a>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="generator-form-wrap">
          <form class="generator-params">
            <h2>Smoke style</h2>
            <div class="input-group">
              <label for="gradientStart">Gradient start:</label>
              <input
                type="color"
                id="gradientStart"
                name="gradientStart"
                value="#000000"
                class="color-picker gradient-start"
              />
            </div>
            <div class="input-group">
              <label for="gradientEnd">Gradient end:</label>
              <input
                type="color"
                id="gradientEnd"
                name="gradientEnd"
                class="color-picker gradient-end"
                value="#222222"
              />
            </div>
            <div class="input-group">
              <label for="smokeOpacity">
                Opacity: <span class="value">10%</span>
              </label>
              <input
                type="range"
                id="smokeOpacity"
                name="smokeOpacity"
                class="smokeOpacity-slider"
                min="0"
                max="100"
                step="5"
                value="10"
              />
            </div>
            <div class="input-group">
              <label for="radiusSize">
                Smoke size: <span class="value">100%</span>
              </label>
              <input
                type="range"
                id="radiusSize"
                name="radiusSize"
                class="radiusSize-slider"
                min="10"
                max="300"
                step="1"
                value="100"
              />
            </div>
            <div class="input-group">
              <label for="lineWidth">
                Line width: <span class="value">2px</span>
              </label>
              <input
                type="range"
                id="lineWidth"
                name="lineWidth"
                class="lineWidth-slider"
                min="0.1"
                max="10"
                step="0.1"
                value="2"
              />
            </div>
            <div class="input-group">
              <label for="numCircles">
                Smokes #: <span class="value">1</span>
              </label>
              <input
                type="range"
                id="numCircles"
                name="numCircles"
                class="numCircles-slider"
                min="1"
                max="5"
                step="1"
                value="1"
              />
            </div>
            <h2>Background style</h2>
            <div class="input-group">
              <label for="bgColorOuter">Outer color:</label>
              <input
                type="color"
                id="bgColorOuter"
                name="bgColorOuter"
                class="color-picker color-outer"
                value="#666666"
              />
            </div>
            <div class="input-group">
              <label for="bgColorInner">Inner color:</label>
              <input
                type="color"
                id="bgColorInner"
                name="bgColorInner"
                class="color-picker color-inner"
                value="#ffffff"
              />
            </div>
            <h2>Download size</h2>
            <div class="input-group">
              <label for="downloadWidth">Width (px):</label>
              <input type="text" id="downloadWidth" name="downloadWidth" />
            </div>
            <div class="input-group">
              <label for="downloadHeight">Height (px):</label>
              <input type="text" id="downloadHeight" name="downloadHeight" />
            </div>
            <h2 id="samples-section">Samples (click to generate)</h2>
            <div class="input-group samples">
              <a href="#" class="sample-smoke" data-id="0">
                <img src="img/samples/small/sample-1.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="1">
                <img src="img/samples/small/sample-2.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="2">
                <img src="img/samples/small/sample-3.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="3">
                <img src="img/samples/small/sample-4.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="4">
                <img src="img/samples/small/sample-5.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="5">
                <img src="img/samples/small/sample-6.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="6">
                <img src="img/samples/small/sample-7.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="7">
                <img src="img/samples/small/sample-8.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="8">
                <img src="img/samples/small/sample-9.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="9">
                <img src="img/samples/small/sample-10.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="10">
                <img src="img/samples/small/sample-11.jpg" alt="" />
              </a>
              <a href="#" class="sample-smoke" data-id="11">
                <img src="img/samples/small/sample-12.jpg" alt="" />
              </a>
            </div>
          </form>
        </div>
        <div style="clear: both"></div>
        <div class="buttons-wrap">
          <div class="btn btn-grey btn-samples">Samples</div>
          <div class="btn btn-grey btn-generate">Generate</div>
          <div class="btn btn-grey btn-download">Download</div>
        </div>
      </div>
      <Canvas />
    </Document>
  );
}

function Head() {
  return () => <link rel="stylesheet" href="css/style.css" />;
}
