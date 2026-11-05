/*----------------------------------------
Example generator

------------------------------------------*/

//Form serialization
import { Smoke } from "../src/Smoke.js";
import { sampleParams } from "../src/Samples.js";

document.addEventListener("DOMContentLoaded", function () {
  //Resize handling
  window.addEventListener("resize", function () {
    const sidebarHeight =
      document.querySelector(".sidebar-wrapper").offsetHeight;
    const windowHeight = window.innerHeight;

    if (sidebarHeight > windowHeight) {
      const introHeight = document.querySelector(
        ".sidebar-wrapper .intro",
      ).offsetHeight;
      const buttonsHeight = document.querySelector(
        ".sidebar-wrapper .buttons-wrap",
      ).offsetHeight;
      const formHeight = windowHeight - introHeight - buttonsHeight - 30;
      document.querySelector(".generator-form-wrap").style.height =
        formHeight + "px";
    }
  });

  //Set initial window height
  window.dispatchEvent(new Event("resize"));

  //Init waterpipe
  const smokyBG = new Smoke(document.getElementById("wavybg-wrapper"));

  //Set download size
  document.getElementById("downloadWidth").value = window.innerWidth;
  document.getElementById("downloadHeight").value = window.innerHeight;

  //Go to samples
  document
    .querySelector(".sidebar-wrapper")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-samples")) {
        const formWrap = document.querySelector(".generator-form-wrap");
        const samplesSection = document.getElementById("samples-section");
        const scrollTop = formWrap.scrollTop + samplesSection.offsetTop - 89;
        formWrap.scrollTo({ top: scrollTop });
        console.log(formWrap.scrollTop);
        return false;
      }
    });

  //Generate
  document
    .querySelector(".sidebar-wrapper")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-generate")) {
        setNewParams();
        smokyBG.generate();
        return false;
      }
    });

  //Download
  document
    .querySelector(".sidebar-wrapper")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-download")) {
        const width = document.getElementById("downloadWidth").value;
        const height = document.getElementById("downloadHeight").value;
        smokyBG.download(width, height);
        return false;
      }
    });

  //Generate sample
  document
    .querySelector(".sidebar-wrapper")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("sample-smoke")) {
        const sampleID = e.target.getAttribute("data-id");
        loadParams(sampleParams[sampleID]);
        document.querySelector(".btn-generate").click();
        return false;
      }
    });

  //Init color pickers - native color inputs don't need initialization
  // The color values will be handled by the native color picker

  //Smoke Opacity slider
  const smokeOpacitySlider = document.querySelector(".smokeOpacity-slider");
  const smokeOpacityValue = document.querySelector(
    ".smokeOpacity-slider + label .value",
  );

  smokeOpacitySlider.addEventListener("input", function () {
    const value = this.value;
    const valueEl = this.closest(".input-group").querySelector(".value");
    if (valueEl) valueEl.textContent = value + "%";
  });

  //Number of Smokes slider
  const numCirclesSlider = document.querySelector(".numCircles-slider");

  numCirclesSlider.addEventListener("input", function () {
    const value = this.value;
    const valueEl = this.closest(".input-group").querySelector(".value");
    if (valueEl) valueEl.textContent = value;
  });

  //Smoke Size slider
  const radiusSizeSlider = document.querySelector(".radiusSize-slider");

  radiusSizeSlider.addEventListener("input", function () {
    const value = this.value;
    const valueEl = this.closest(".input-group").querySelector(".value");
    if (valueEl) valueEl.textContent = value + "%";
  });

  //Line Width slider
  const lineWidthSlider = document.querySelector(".lineWidth-slider");

  lineWidthSlider.addEventListener("input", function () {
    const value = this.value;
    const valueEl = this.closest(".input-group").querySelector(".value");
    if (valueEl) valueEl.textContent = value + "px";
  });

  //Set new params
  function setNewParams() {
    const form = document.querySelector(".generator-params");
    const formData = new FormData(form);
    const params = {};

    for (let pair of formData.entries()) {
      params[pair[0]] = pair[1];
    }

    console.log(params);

    //Set new values
    smokyBG.setOption("gradientStart", params.gradientStart);
    smokyBG.setOption("gradientEnd", params.gradientEnd);
    smokyBG.setOption("smokeOpacity", parseFloat(params.smokeOpacity) / 100);
    smokyBG.setOption("numCircles", parseInt(params.numCircles, 10));

    const radius =
      ((window.innerHeight * 0.8) / 2) * (parseFloat(params.radiusSize) / 100);
    smokyBG.setOption("maxMaxRad", radius);
    smokyBG.setOption("minMaxRad", radius);

    smokyBG.setOption("lineWidth", parseFloat(params.lineWidth));

    smokyBG.setOption("bgColorOuter", params.bgColorOuter);
    smokyBG.setOption("bgColorInner", params.bgColorInner);
  }

  //Load params (samples)
  function loadParams(params) {
    document.getElementById("gradientStart").value = params.gradientStart;
    document.getElementById("gradientEnd").value = params.gradientEnd;
    document.getElementById("smokeOpacity").value = params.smokeOpacity;
    document.querySelector(".smokeOpacity-slider + label .value").textContent =
      params.smokeOpacity + "%";

    document.getElementById("numCircles").value = params.numCircles;
    document.querySelector(".numCircles-slider + label .value").textContent =
      params.numCircles;

    document.getElementById("radiusSize").value = params.radiusSize;
    document.querySelector(".radiusSize-slider + label .value").textContent =
      params.radiusSize + "%";

    document.getElementById("lineWidth").value = params.lineWidth;
    document.querySelector(".lineWidth-slider + label .value").textContent =
      params.lineWidth + "px";

    document.getElementById("bgColorOuter").value = params.bgColorOuter;
    document.getElementById("bgColorInner").value = params.bgColorInner;
  }
});
