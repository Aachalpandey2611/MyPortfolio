function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof text === "string") node.textContent = text;
  return node;
}

function renderTags(tags) {
  const wrap = el("div", "tags");
  for (const t of tags) {
    wrap.appendChild(el("span", "tag", t));
  }
  return wrap;
}

export function renderSkills(root, skills) {
  root.innerHTML = "";

  for (const group of skills) {
    const card = el("article", "card");
    card.setAttribute("data-reveal", "");

    const title = el("h3", "card-title", group.title);
    const list = el("ul", "bullets");

    for (const item of group.items) {
      const li = el("li", "", item);
      list.appendChild(li);
    }

    card.appendChild(title);
    card.appendChild(list);
    root.appendChild(card);
  }
}

export function renderProjects(root, projects) {
  root.innerHTML = "";

  for (const p of projects) {
    const card = el("article", "card");
    card.setAttribute("data-reveal", "");

    const title = el("h3", "card-title", p.name);
    const meta = el("p", "meta", p.meta);

    const kv = el("div", "kv");

    const row1 = el("div", "kv-row");
    row1.appendChild(el("div", "kv-label", "Problem statement"));
    row1.appendChild(el("div", "kv-value", p.problem));

    const row2 = el("div", "kv-row");
    row2.appendChild(el("div", "kv-label", "Key contribution"));
    row2.appendChild(el("div", "kv-value", p.contribution));

    const row3 = el("div", "kv-row");
    row3.appendChild(el("div", "kv-label", "Outcome / result"));
    row3.appendChild(el("div", "kv-value", p.outcome));

    kv.appendChild(row1);
    kv.appendChild(renderTags(p.technologies));
    kv.appendChild(row2);
    kv.appendChild(row3);

    const actions = el("div", "card-actions");
    if (p.repoUrl) {
      const repo = el("a", "btn btn-primary", "View Repo");
      repo.href = p.repoUrl;
      repo.target = "_blank";
      repo.rel = "noreferrer noopener";
      actions.appendChild(repo);
    }

    if (p.demoUrl) {
      const demo = el("a", "btn btn-ghost", "Live Demo");
      demo.href = p.demoUrl;
      demo.target = "_blank";
      demo.rel = "noreferrer noopener";
      actions.appendChild(demo);
    }

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(kv);
    if (actions.childElementCount) card.appendChild(actions);
    root.appendChild(card);
  }
}

export function renderExperience(root, experienceItems) {
  root.innerHTML = "";

  for (const item of experienceItems) {
    const card = el("article", "panel");
    card.setAttribute("data-reveal", "");

    const title = el("h3", "panel-title", `${item.role} • ${item.org}`);
    const list = el("ul", "bullets");

    for (const b of item.bullets) {
      list.appendChild(el("li", "", b));
    }

    card.appendChild(title);
    card.appendChild(list);
    root.appendChild(card);
  }
}

export function renderHighlights(root, highlights) {
  root.innerHTML = "";
  for (const h of highlights) {
    root.appendChild(el("li", "", h));
  }
}
