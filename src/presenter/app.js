import { renderExperience, renderHighlights, renderProjects, renderSkills } from "../view/render.js";

export function createAppPresenter({ model, view }) {
  function mount() {
    // Data-driven sections
    const skillsRoot = document.getElementById("skillsGrid");
    const projectsRoot = document.getElementById("projectsGrid");
    const expRoot = document.getElementById("experienceList");
    const highlightsRoot = document.getElementById("highlightsList");

    if (!skillsRoot || !projectsRoot || !expRoot || !highlightsRoot) {
      // Fail quietly to avoid breaking the page if markup changes.
      return;
    }

    view.renderSkills(skillsRoot, model.skills);
    view.renderProjects(projectsRoot, model.projects);
    view.renderExperience(expRoot, model.experience);
    view.renderHighlights(highlightsRoot, model.highlights);

    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  return { mount };
}
