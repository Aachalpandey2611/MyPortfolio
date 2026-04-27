import { portfolioData } from "./model/portfolioData.js";
import * as view from "./view/render.js";
import { createAppPresenter } from "./presenter/app.js";
import { initHeroSpotlight, initScrollReveal, initSubtleParallax, initTilt } from "./ui/motion.js";

document.documentElement.classList.add("js");

const presenter = createAppPresenter({ model: portfolioData, view });

presenter.mount();
initScrollReveal();
initSubtleParallax();
initTilt();
initHeroSpotlight();
