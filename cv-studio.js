const STORAGE_KEY = 'chunpo-cv-studio-v10';
const originalData = structuredClone(window.RESUME_DATA);
const PERSONAL_PROJECT_IDS = new Set(['bearfit', 'music-universe', 'braindance', 'soarm-vision', 'llm-gateway', 'zilo-ring']);

const buildDefaultIncluded = () => ({
  modules: { skills: true, languages: true, activities: true },
  education: Object.fromEntries(originalData.education.map((entry) => [entry.id, true])),
  experience: {
    ...Object.fromEntries(originalData.experience.map((entry) => [entry.id, entry.id !== 'web-intern'])),
    'military-service': true
  },
  publications: Object.fromEntries(originalData.publications.map((entry) => [entry.id, true])),
  awards: Object.fromEntries((originalData.awards || []).map((entry) => [entry.id, true]))
});

const defaultState = (language = 'en') => ({
  data: structuredClone(originalData),
  density: 'balanced',
  language,
  included: buildDefaultIncluded()
});

const normalizeIncluded = (included = {}) => {
  const defaults = buildDefaultIncluded();
  return Object.fromEntries(Object.entries(defaults).map(([group, values]) => [group, { ...values, ...included[group] }]));
};

const mergeProjectSettings = (savedProjects = []) => {
  const latestById = new Map(originalData.projects.map((project) => [project.id, project]));
  const restored = savedProjects.flatMap((savedProject) => {
    const latest = latestById.get(savedProject.id);
    if (!latest) return [];
    latestById.delete(savedProject.id);
    return [{ ...latest, enabled: savedProject.enabled, bulletLimit: savedProject.bulletLimit }];
  });
  return [...restored, ...latestById.values()];
};

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.data?.projects) {
      const data = structuredClone(originalData);
      data.projects = mergeProjectSettings(saved.data.projects);
      return { ...defaultState(saved.language), ...saved, data, included: normalizeIncluded(saved.included) };
    }
  } catch (error) {
    console.warn('Could not load CV Studio draft.', error);
  }
  return defaultState();
};

let state = loadState();
const previewParams = new URLSearchParams(window.location.search);
const previewDensity = previewParams.get('density');
if (['compact', 'balanced', 'roomy'].includes(previewDensity)) state.density = previewDensity;
const previewLanguage = previewParams.get('language');
if (['en', 'zh'].includes(previewLanguage)) state.language = previewLanguage;
if (previewParams.get('all') === 'true') {
  state.data.projects.forEach((project) => { project.enabled = true; });
  Object.values(state.included).forEach((group) => {
    Object.keys(group).forEach((id) => { group[id] = true; });
  });
}

const cvPages = document.querySelector('#cvPages');
const projectControls = document.querySelector('#projectControls');
const contentControls = document.querySelector('#contentControls');
const selectedCount = document.querySelector('#selectedCount');
const contentSelectedCount = document.querySelector('#contentSelectedCount');
const previewMeta = document.querySelector('#previewMeta');
const fitStatus = document.querySelector('#fitStatus');
const saveState = document.querySelector('#saveState');

const UI_TEXT = {
  en: {
    title: 'CV Studio | Chunpo Wu', saved: 'Saved locally', saving: 'Saving...', reset: 'Reset', export: 'Export PDF',
    eyebrow: 'TWO-PAGE CONTROL', headline: 'Choose content,<br>keep the structure.',
    intro: 'The preview follows the supplied two-page CV: engineering evidence first, personal projects and research second.',
    pageFit: 'Two-page fit', checking: 'Checking...', spacing: 'Spacing', compact: 'Compact', balanced: 'Balanced', roomy: 'Roomy',
    projects: 'Projects', selected: 'selected', projectHelp: 'Engineering projects appear on page 1; personal projects appear on page 2. Use arrows to set priority.',
    content: 'Other content', contentHelp: 'Choose summary modules and individual education, experience, publication, and award entries.', active: 'active',
    contentGroups: { modules: 'SUMMARY LINES', education: 'EDUCATION', experience: 'EXPERIENCE', publications: 'PUBLICATIONS', awards: 'COMPETITIONS & AWARDS' },
    dataSource: 'Data source', dataNote: 'Default content lives in <code>cv/resume-data.js</code>. Control changes are auto-saved to this browser.', download: 'Download current data',
    preview: 'LIVE TWO-PAGE A4 PREVIEW', include: 'Include', up: 'UP', down: 'DOWN', bullets: 'Bullets', fits: 'Both pages fit', overflow: 'Overflow',
    page: 'Page', engineering: 'Engineering', personal: 'Personal', tel: 'TEL', email: 'E-mail', hometown: 'Home', nfc: 'NFC PORTFOLIO',
    sections: { education: 'EDUCATION', experience: 'WORK & INTERNSHIPS', projects: 'PROJECT EXPERIENCE', skills: 'SKILLS & OTHER', personal: 'PERSONAL PROJECTS', publications: 'PUBLICATIONS & COMPETITIONS' },
    labels: { position: 'Position', summary: 'Overview', stack: 'Technology', result: 'Result', skills: 'Skills', languages: 'Languages', activities: 'Activities', papers: 'Publications', awards: 'Competitions & Awards' },
    resetConfirm: 'Reset all content selections and spacing to defaults?',
    overflowAlert: 'One or both A4 pages overflow. Hide content, reduce project bullets, or select Compact spacing before export.'
  },
  zh: {
    title: '简历管理 | 吴春坡', saved: '已保存到本机', saving: '保存中...', reset: '重置', export: '导出 PDF',
    eyebrow: '双页简历控制台', headline: '选择内容，<br>保持固定结构。',
    intro: '预览遵循参考简历的双页结构：第一页突出工程经历，第二页展示个人项目、论文与竞赛。',
    pageFit: '双页适配', checking: '检测中...', spacing: '间距', compact: '紧凑', balanced: '均衡', roomy: '宽松',
    projects: '项目', selected: '项已选择', projectHelp: '工程项目排在第一页，个人项目排在第二页；可用按钮调整同类项目优先级。',
    content: '其他内容', contentHelp: '选择摘要模块，以及单条教育、工作、论文和竞赛经历。', active: '项启用',
    contentGroups: { modules: '摘要模块', education: '教育经历', experience: '工作与实习', publications: '论文与投稿', awards: '竞赛与奖项' },
    dataSource: '数据来源', dataNote: '默认内容保存在 <code>cv/resume-data.js</code>，控制项会自动保存到当前浏览器。', download: '下载当前数据',
    preview: '双页 A4 实时预览', include: '加入', up: '上移', down: '下移', bullets: '要点', fits: '两页均适配', overflow: '内容溢出',
    page: '第', engineering: '工程', personal: '个人', tel: 'TEL', email: 'E-mail', hometown: '户籍地', nfc: 'NFC 查看作品集',
    sections: { education: '教育经历', experience: '工作与实习经历', projects: '项目经历', skills: '技能与其他', personal: '个人兴趣项目', publications: '论文及竞赛' },
    labels: { position: '职位', summary: '项目简介', stack: '技术栈', result: '项目结果', skills: '技能', languages: '语言', activities: '活动', papers: '论文', awards: '竞赛与奖项' },
    resetConfirm: '确定将所有内容选择和间距恢复为默认设置吗？',
    overflowAlert: '当前一页或两页内容溢出。请隐藏部分内容、减少项目要点，或选择紧凑间距后再导出。'
  }
};

const t = (key) => UI_TEXT[state.language][key];
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
})[character]);

const localizedData = () => {
  if (state.language === 'en') return state.data;
  const zh = window.RESUME_ZH;
  const military = zh.education.find((entry) => entry.id === 'military-service');
  return {
    ...state.data,
    profile: { ...state.data.profile, ...zh.profile },
    skills: zh.skills,
    languages: zh.languages,
    activities: zh.activities,
    awards: zh.awards,
    education: zh.education,
    projects: state.data.projects.map((project) => ({ ...project, ...zh.projects[project.id] })),
    experience: [...zh.experience, ...(military ? [{ ...military, title: '特战队员、文书' }] : [])],
    publications: zh.publications
  };
};

const isIncluded = (group, id) => state.included[group]?.[id] !== false;
const includedEntries = (group, entries) => entries.filter((entry) => isIncluded(group, entry.id));
const projectKind = (project) => PERSONAL_PROJECT_IDS.has(project.id) ? 'personal' : 'engineering';

const renderBullets = (bullets, limit = bullets.length) => {
  if (!bullets?.length || limit === 0) return '';
  return `<ul class="cv-bullets">${bullets.slice(0, limit).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`;
};

const renderSection = (title, content, className = '') => content ? `
  <section class="resume-section ${className}">
    <h2 class="resume-section-title"><span></span>${escapeHtml(title)}</h2>
    ${content}
  </section>` : '';

const renderEducation = (entries) => entries.length ? `<div class="education-grid">${entries.map((entry) => `
  <article class="education-entry">
    <div class="education-head"><strong>${escapeHtml(entry.organization)}</strong><span>${escapeHtml(entry.period)}</span></div>
    <p>${escapeHtml(entry.title)}</p>
    ${renderBullets(entry.bullets)}
  </article>`).join('')}</div>` : '';

const renderExperience = (entries) => entries.length ? `<div class="entry-list">${entries.map((entry) => `
  <article class="band-entry">
    <div class="entry-band"><strong>${escapeHtml(entry.organization)}</strong><span>${escapeHtml(entry.period)}</span></div>
    <p class="entry-position"><b>${t('labels').position}:</b> ${escapeHtml(entry.title)}</p>
    ${renderBullets(entry.bullets)}
  </article>`).join('')}</div>` : '';

const renderProject = (project, detailed) => `
  <article class="band-entry project-entry">
    <div class="entry-band"><strong>${escapeHtml(project.title)}</strong><span>${escapeHtml(project.period)}</span></div>
    ${detailed && project.summary ? `<p><b>${t('labels').summary}:</b> ${escapeHtml(project.summary)}</p>` : ''}
    ${detailed && project.stack ? `<p><b>${t('labels').stack}:</b> ${escapeHtml(project.stack)}</p>` : ''}
    ${renderBullets(project.bullets, project.bulletLimit)}
    ${detailed && project.result ? `<p class="project-result"><b>${t('labels').result}:</b> ${escapeHtml(project.result)}</p>` : ''}
  </article>`;

const renderSummaryLines = (data) => {
  const lines = [];
  if (isIncluded('modules', 'skills')) lines.push(`<p><b>${t('labels').skills}:</b> ${escapeHtml(data.skills.join(state.language === 'zh' ? '；' : '; '))}</p>`);
  if (isIncluded('modules', 'languages')) lines.push(`<p><b>${t('labels').languages}:</b> ${escapeHtml(data.languages.join(state.language === 'zh' ? '、' : '; '))}</p>`);
  if (isIncluded('modules', 'activities')) lines.push(`<p><b>${t('labels').activities}:</b> ${escapeHtml((data.activities || []).join(state.language === 'zh' ? '；' : '; '))}</p>`);
  return lines.length ? `<div class="summary-lines">${lines.join('')}</div>` : '';
};

const renderPublicationsAndAwards = (publications, awards) => {
  const paperBlock = publications.length ? `<h3>${t('labels').papers}</h3><ul class="research-list">${publications.map((entry) => `
    <li><strong>${escapeHtml(entry.title)}</strong>${entry.bullets?.length ? `<span> — ${escapeHtml(entry.bullets.join('; '))}</span>` : ''}</li>`).join('')}</ul>` : '';
  const awardBlock = awards.length ? `<h3>${t('labels').awards}</h3><ul class="research-list awards-list">${awards.map((entry) => `<li>${escapeHtml(entry.title)}</li>`).join('')}</ul>` : '';
  return `${paperBlock}${awardBlock}`;
};

const renderHeader = (profile) => {
  const phones = state.language === 'zh' ? [...profile.phones].reverse() : profile.phones;
  return `<header class="resume-header">
    <div class="resume-identity">
      <h1>${escapeHtml(profile.name)}</h1>
      <p><b>${t('tel')}:</b> ${phones.map(escapeHtml).join(' / ')}</p>
      <p class="contact-line"><b>${t('email')}:</b><span>${(profile.emails || [profile.email]).map(escapeHtml).join('<br>')}</span></p>
      <p><b>${t('hometown')}:</b> ${escapeHtml(profile.hometown || profile.address)}</p>
    </div>
    <div class="header-visuals">
      <img src="${escapeHtml(profile.photo)}" alt="${escapeHtml(profile.name)}">
      <a class="header-nfc" href="https://ppsohandsome.github.io" aria-label="${t('nfc')}"><span>NFC</span><small>${t('nfc')}</small></a>
    </div>
  </header>`;
};

const renderCV = () => {
  const data = localizedData();
  const education = includedEntries('education', data.education.filter((entry) => entry.id !== 'military-service'));
  const experience = includedEntries('experience', data.experience);
  const publications = includedEntries('publications', data.publications);
  const awards = includedEntries('awards', data.awards || []);
  const engineeringProjects = data.projects.filter((project) => project.enabled && projectKind(project) === 'engineering');
  const personalProjects = data.projects.filter((project) => project.enabled && projectKind(project) === 'personal');

  cvPages.innerHTML = `
    <article class="cv-page cv-page--one" data-density="${state.density}" data-language="${state.language}">
      ${renderHeader(data.profile)}
      ${renderSection(t('sections').education, renderEducation(education), 'education-section')}
      ${renderSection(t('sections').experience, renderExperience(experience), 'experience-section')}
      ${renderSection(t('sections').projects, engineeringProjects.map((project) => renderProject(project, true)).join(''), 'projects-section')}
      ${renderSection(t('sections').skills, renderSummaryLines(data), 'skills-section')}
    </article>
    <article class="cv-page cv-page--two" data-density="${state.density}" data-language="${state.language}">
      ${renderSection(t('sections').personal, personalProjects.map((project) => renderProject(project, false)).join(''), 'personal-section')}
      ${renderSection(t('sections').publications, renderPublicationsAndAwards(publications, awards), 'research-section')}
    </article>`;

  const enabledCount = state.data.projects.filter((project) => project.enabled).length;
  selectedCount.textContent = `${enabledCount} ${t('selected')}`;
  previewMeta.textContent = `${state.language === 'zh' ? '2 页' : '2 pages'} / ${state.density}`;
  document.querySelectorAll('#density [data-density]').forEach((button) => button.classList.toggle('is-active', button.dataset.density === state.density));
  document.querySelectorAll('#languageSwitcher [data-language]').forEach((button) => button.classList.toggle('is-active', button.dataset.language === state.language));
  applyInterfaceLanguage();
  requestAnimationFrame(updateFitStatus);
};

const contentGroups = (data) => [
  { key: 'modules', items: [{ id: 'skills', title: t('labels').skills }, { id: 'languages', title: t('labels').languages }, { id: 'activities', title: t('labels').activities }] },
  { key: 'education', items: data.education.filter((entry) => entry.id !== 'military-service') },
  { key: 'experience', items: data.experience },
  { key: 'publications', items: data.publications },
  { key: 'awards', items: data.awards || [] }
];

const renderContentControls = (data) => {
  const groups = contentGroups(data);
  const items = groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.key })));
  const activeCount = items.filter((item) => isIncluded(item.group, item.id)).length;
  contentSelectedCount.textContent = `${activeCount}/${items.length} ${t('active')}`;
  contentControls.innerHTML = groups.map((group) => `
    <div class="content-group">
      <h3>${t('contentGroups')[group.key]}</h3>
      <div class="content-group-items">${group.items.map((item) => `
        <label class="content-toggle">
          <input type="checkbox" data-content-group="${group.key}" data-content-id="${escapeHtml(item.id)}" ${isIncluded(group.key, item.id) ? 'checked' : ''}>
          <span title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
          ${item.period ? `<small>${escapeHtml(item.period)}</small>` : ''}
        </label>`).join('')}</div>
    </div>`).join('');
};

const renderControls = () => {
  const data = localizedData();
  projectControls.innerHTML = ['engineering', 'personal'].map((kind) => {
    const projects = data.projects.filter((project) => projectKind(project) === kind);
    return `<div class="project-group"><h3>${kind === 'engineering' ? t('engineering') : t('personal')}</h3>${projects.map((project, index) => `
      <article class="project-control ${project.enabled ? '' : 'is-disabled'}" data-project-id="${project.id}">
        <div class="project-main">
          <input type="checkbox" data-role="project-enabled" ${project.enabled ? 'checked' : ''} aria-label="${t('include')} ${escapeHtml(project.title)}">
          <span class="project-title" title="${escapeHtml(project.title)}">${escapeHtml(project.title)}</span>
          <span class="project-rank">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <div class="project-tools">
          <button class="mini-button" type="button" data-move="up" aria-label="${t('up')}" ${index === 0 ? 'disabled' : ''}>${t('up')}</button>
          <button class="mini-button" type="button" data-move="down" aria-label="${t('down')}" ${index === projects.length - 1 ? 'disabled' : ''}>${t('down')}</button>
          <div class="bullet-options" role="radiogroup" aria-label="${t('bullets')}">
            <span class="bullet-label">${t('bullets')}</span>
            ${project.bullets.map((_, bulletIndex) => `<label class="bullet-choice"><input type="radio" name="bullet-${project.id}" value="${bulletIndex + 1}" ${project.bulletLimit === bulletIndex + 1 ? 'checked' : ''}><span>${bulletIndex + 1}</span></label>`).join('')}
          </div>
        </div>
      </article>`).join('')}</div>`;
  }).join('');
  renderContentControls(data);
};

function applyInterfaceLanguage() {
  const ui = UI_TEXT[state.language];
  document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
  document.title = ui.title;
  document.querySelector('#resetButton').textContent = ui.reset;
  document.querySelector('#printButton').textContent = ui.export;
  saveState.textContent = ui.saved;
  const intro = document.querySelector('.control-intro');
  intro.querySelector('.eyebrow').textContent = ui.eyebrow;
  intro.querySelector('h1').innerHTML = ui.headline;
  intro.querySelector('p:last-child').textContent = ui.intro;
  const fitControls = document.querySelector('#fitControls');
  fitControls.querySelector('h2').textContent = ui.pageFit;
  fitControls.querySelector('.field-label').textContent = ui.spacing;
  [ui.compact, ui.balanced, ui.roomy].forEach((label, index) => { fitControls.querySelectorAll('#density button')[index].textContent = label; });
  document.querySelector('#projectSection h2').textContent = ui.projects;
  document.querySelector('#projectSection .section-help').textContent = ui.projectHelp;
  document.querySelector('#contentSection h2').textContent = ui.content;
  document.querySelector('#contentSection .section-help').textContent = ui.contentHelp;
  document.querySelector('#dataSection h2').textContent = ui.dataSource;
  document.querySelector('#dataSection p').innerHTML = ui.dataNote;
  document.querySelector('#downloadDataButton').textContent = ui.download;
  document.querySelector('.preview-caption span:first-child').textContent = ui.preview;
}

const isPageOverflowing = () => [...document.querySelectorAll('.cv-page')].some((page) => page.scrollHeight > page.clientHeight + 2);
const updateFitStatus = () => {
  const overflowing = [...document.querySelectorAll('.cv-page')]
    .map((page, index) => page.scrollHeight > page.clientHeight + 2 ? index + 1 : null)
    .filter(Boolean);
  fitStatus.textContent = overflowing.length ? `${t('overflow')}: ${overflowing.map((page) => `${t('page')} ${page}`).join(', ')}` : t('fits');
  fitStatus.classList.toggle('is-good', overflowing.length === 0);
  fitStatus.classList.toggle('is-over', overflowing.length > 0);
};

let saveTimer;
const update = () => {
  saveState.textContent = t('saving');
  renderControls();
  renderCV();
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveState.textContent = t('saved');
  }, 180);
};

projectControls.addEventListener('change', (event) => {
  const card = event.target.closest('[data-project-id]');
  if (!card) return;
  const project = state.data.projects.find((item) => item.id === card.dataset.projectId);
  if (event.target.matches('[data-role="project-enabled"]')) project.enabled = event.target.checked;
  if (event.target.matches("input[type='radio']")) project.bulletLimit = Number(event.target.value);
  update();
});

projectControls.addEventListener('click', (event) => {
  const move = event.target.dataset.move;
  if (!move) return;
  const id = event.target.closest('[data-project-id]').dataset.projectId;
  const currentIndex = state.data.projects.findIndex((item) => item.id === id);
  const kind = projectKind(state.data.projects[currentIndex]);
  const candidates = state.data.projects.map((project, index) => ({ project, index })).filter((item) => projectKind(item.project) === kind);
  const position = candidates.findIndex((item) => item.project.id === id);
  const target = candidates[position + (move === 'up' ? -1 : 1)];
  if (!target) return;
  [state.data.projects[currentIndex], state.data.projects[target.index]] = [state.data.projects[target.index], state.data.projects[currentIndex]];
  update();
});

contentControls.addEventListener('change', (event) => {
  const input = event.target.closest('input[data-content-group][data-content-id]');
  if (!input) return;
  state.included[input.dataset.contentGroup][input.dataset.contentId] = input.checked;
  update();
});

document.querySelector('#density').addEventListener('click', (event) => {
  if (!event.target.dataset.density) return;
  state.density = event.target.dataset.density;
  update();
});

document.querySelector('#languageSwitcher').addEventListener('click', (event) => {
  const button = event.target.closest('[data-language]');
  if (!button || button.dataset.language === state.language) return;
  state.language = button.dataset.language;
  update();
});

document.querySelector('#printButton').addEventListener('click', () => {
  if (isPageOverflowing()) {
    window.alert(t('overflowAlert'));
    return;
  }
  window.print();
});

document.querySelector('#resetButton').addEventListener('click', () => {
  if (!window.confirm(t('resetConfirm'))) return;
  state = defaultState(state.language);
  update();
});

document.querySelector('#downloadDataButton').addEventListener('click', () => {
  const exportState = { ...state, data: localizedData() };
  const blob = new Blob([JSON.stringify(exportState, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `resume-data-${state.language}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

window.addEventListener('resize', updateFitStatus);
renderControls();
renderCV();
document.fonts?.ready.then(updateFitStatus);
window.setTimeout(updateFitStatus, 500);
