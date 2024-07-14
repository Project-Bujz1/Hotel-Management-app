import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Load DrawSVGPlugin from CDN
const drawSVGPluginUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/DrawSVGPlugin.min.js";

const loadDrawSVGPlugin = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = drawSVGPluginUrl;
    script.onload = () => {
      gsap.registerPlugin(window.DrawSVGPlugin);
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load DrawSVGPlugin"));
    document.head.appendChild(script);
  });
};

const Timeline = () => {
  useEffect(() => {
    loadDrawSVGPlugin().then(() => {
      gsap.defaults({ ease: "none" });

      const pulses = gsap
        .timeline({
          defaults: {
            duration: 0.05,
            autoAlpha: 1,
            scale: 2,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
          },
        })
        .to(".ball02, .text01", {}, 0.2)
        .to(".ball03, .text02", {}, 0.33)
        .to(".ball04, .text03", {}, 0.46);

      const main = gsap
        .timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: "#svg",
            scrub: true,
            start: "top center",
            end: "bottom center",
          },
        })
        .to(".ball01", { duration: 0.01, autoAlpha: 1 })
        .from(".theLine", { drawSVG: 0 }, 0)
        .to(
          ".ball01",
          {
            motionPath: {
              path: ".theLine",
              align: ".theLine",
              alignOrigin: [0.5, 0.5],
            },
          },
          0
        )
        .add(pulses, 0);
    });
  }, []);

  return (
    <div>
      <h1 className="header-section">Scroll to see a timeline animation</h1>
      <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1200">
        <path className="line01 line" d="M 10 200  600 200" />
        <path className="line02 line" d="M 10 400  600 400" />
        <path className="line03 line" d="M 10 600  600 600" />
        <path className="line04 line" d="M 10 800  600 800" />
        <path className="line05 line" d="M 10 1000  600 1000" />
        <text className="text01" x="30" y="190">
          2018
        </text>
        <text className="text02" x="30" y="390">
          2019
        </text>
        <text className="text03" x="30" y="590">
          2020
        </text>
        <path
          className="theLine"
          d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1200"
          fill="none"
          stroke="white"
          strokeWidth="10px"
        />
        <circle className="ball ball01" r="20" cx="50" cy="100" />
        <circle className="ball ball02" r="20" cx="278" cy="201" />
        <circle className="ball ball03" r="20" cx="327" cy="401" />
        <circle className="ball ball04" r="20" cx="203" cy="601" />
      </svg>
    </div>
  );
};

export default Timeline;
