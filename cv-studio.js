const STORAGE_KEY = 'chunpo-cv-studio-v3';
const originalData = structuredClone(window.RESUME_DATA);

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.data?.projects) {
      return { template: 'classic', density: 'balanced', projectLimit: 3, language: 'en', ...saved };
    }
  } catch (error) {
    console.warn('Could not load CV Studio draft.', error);
  }
  return { data: structuredClone(originalData), template: 'classic', density: 'balanced', projectLimit: 3, language: 'en' };
};

let state = loadState();
const previewParams = new URLSearchParams(window.location.search);
const previewTemplate = previewParams.get('template');
if (['classic', 'signal', 'minimal'].includes(previewTemplate)) state.template = previewTemplate;
const previewDensity = previewParams.get('density');
if (['compact', 'balanced', 'roomy'].includes(previewDensity)) state.density = previewDensity;
if (previewParams.get('all') === 'true') state.data.projects.forEach((project) => { project.enabled = true; });
const previewLimit = Number(previewParams.get('projects'));
if (previewLimit >= 1 && previewLimit <= state.data.projects.length) state.projectLimit = previewLimit;
const previewLanguage = previewParams.get('language');
if (['en', 'zh'].includes(previewLanguage)) state.language = previewLanguage;
const cvPage = document.querySelector('#cvPage');
const projectControls = document.querySelector('#projectControls');
const projectLimit = document.querySelector('#projectLimit');
const projectLimitValue = document.querySelector('#projectLimitValue');
const selectedCount = document.querySelector('#selectedCount');
const previewMeta = document.querySelector('#previewMeta');
const fitStatus = document.querySelector('#fitStatus');
const saveState = document.querySelector('#saveState');

const UI_TEXT = {
  en: {
    title: 'CV Studio | Chunpo Wu', saved: 'Saved locally', saving: 'Saving...', reset: 'Reset', export: 'Export PDF',
    eyebrow: 'ONE-PAGE CONTROL', headline: 'Shape the CV,<br>not the data.',
    intro: 'Choose what earns space. The preview follows the visual structure of the current Canva CV and saves changes in this browser.',
    design: 'Design', layouts: '3 layouts', currentCv: 'Current CV', modernTech: 'Modern tech', highDensity: 'High density',
    pageFit: 'Page fit', checking: 'Checking...', spacing: 'Spacing', compact: 'Compact', balanced: 'Balanced', roomy: 'Roomy', maxProjects: 'Maximum projects',
    projects: 'Projects', selected: 'selected', projectHelp: 'Enable projects, set bullet count, and use arrows to control priority.',
    dataSource: 'Data source', dataNote: 'Default content lives in <code>cv/resume-data.js</code>. Control changes are auto-saved to this browser.', download: 'Download current data',
    preview: 'LIVE A4 PREVIEW', include: 'Include', up: 'UP', down: 'DOWN', bullets: 'Bullets', fits: 'Fits one page', overflow: 'Page overflow', tel: 'TEL', location: 'LOC', nfc: 'TAP NFC · PORTFOLIO',
    sections: { contact: 'CONTACT', about: 'ABOUT ME', skills: 'SKILLS', languages: 'LANGUAGES', education: 'EDUCATION', project: 'PROJECT', experience: 'EXPERIENCE', publication: 'PUBLICATION' },
    resetConfirm: 'Reset the CV layout and project selection to defaults?',
    overflowAlert: 'This layout exceeds one A4 page. Reduce projects or bullets, choose Compact spacing, or switch to Signal / Minimal before export.'
  },
  zh: {
    title: '简历管理 | 吴春坡', saved: '已保存到本机', saving: '保存中...', reset: '重置', export: '导出 PDF',
    eyebrow: '单页简历控制台', headline: '控制内容，<br>保持专业排版。',
    intro: '决定哪些经历值得占据版面。预览参照当前 Canva 简历结构，所有调整会保存在当前浏览器。',
    design: '版式', layouts: '3 套方案', currentCv: '接近当前简历', modernTech: '现代技术风', highDensity: '高密度排版',
    pageFit: '页面适配', checking: '检测中...', spacing: '间距', compact: '紧凑', balanced: '均衡', roomy: '宽松', maxProjects: '最多项目数',
    projects: '项目', selected: '项已选择', projectHelp: '选择进入简历的项目，设置要展示的要点数量，并用按钮调整优先级。',
    dataSource: '数据来源', dataNote: '默认内容保存在 <code>cv/resume-data.js</code>，控制项会自动保存到当前浏览器。', download: '下载当前数据',
    preview: 'A4 实时预览', include: '加入', up: '上移', down: '下移', bullets: '要点', fits: '适合单页', overflow: '内容超出一页', tel: '电话', location: '地址', nfc: '轻触 NFC 查看作品集',
    sections: { contact: '联系方式', about: '个人简介', skills: '专业技能', languages: '语言能力', education: '教育经历', project: '项目经历', experience: '实习经历', publication: '论文发表' },
    resetConfirm: '确定将简历版式和项目选择恢复为默认设置吗？',
    overflowAlert: '当前内容超过一页 A4。请减少项目或要点、选择紧凑间距，或者切换到 Signal / Minimal 后再导出。'
  }
};

const t = (key) => UI_TEXT[state.language][key];

const localizedData = () => {
  if (state.language === 'en') return state.data;
  const zh = window.RESUME_ZH;
  return {
    ...state.data,
    profile: { ...state.data.profile, ...zh.profile },
    skills: zh.skills,
    languages: zh.languages,
    education: state.data.education.map((entry, index) => ({ ...entry, ...zh.education[index] })),
    projects: state.data.projects.map((project) => ({ ...project, ...zh.projects[project.id] })),
    experience: state.data.experience.map((entry, index) => ({ ...entry, ...zh.experience[index] })),
    publication: { ...state.data.publication, ...zh.publication }
  };
};

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
})[character]);

const renderBullets = (bullets, limit = bullets.length) => `
  <ul class="cv-bullets">${bullets.slice(0, limit).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`;

const renderEntries = (entries) => entries.map((entry) => `
  <article class="cv-entry">
    <div class="cv-entry-head">
      <h3>${escapeHtml(entry.title)}</h3>
      <span class="period">${escapeHtml(entry.period)}</span>
    </div>
    <p class="organization">${escapeHtml(entry.organization)}</p>
    ${renderBullets(entry.bullets, entry.bulletLimit)}
  </article>`).join('');

const activeProjects = (data) => data.projects.filter((project) => project.enabled).slice(0, state.projectLimit);

const renderCV = () => {
  const data = localizedData();
  const { profile, skills, languages, education, experience, publication } = data;
  const projects = activeProjects(data);
  cvPage.dataset.template = state.template;
  cvPage.dataset.density = state.density;
  cvPage.dataset.language = state.language;
  cvPage.innerHTML = `
    <aside class="cv-sidebar">
      <section class="identity-card">
        <div class="identity-media">
          <img src="${escapeHtml(profile.photo)}" alt="Portrait of ${escapeHtml(profile.name)}">
          <a class="nfc-block" href="https://ppsohandsome.github.io" aria-label="${t('nfc')}">
            <span class="nfc-target"><span>NFC</span></span>
            <small>${t('nfc')}</small>
          </a>
        </div>
        <h1>${escapeHtml(profile.name)}</h1>
        <p class="role">${escapeHtml(profile.role)}</p>
      </section>
      <section class="sidebar-card">
        <h2 class="cv-section-title">${t('sections').contact}</h2>
        <div class="contact-list">
          ${profile.phones.map((phone, index) => `<div class="contact-item"><span class="contact-icon">${index === 0 ? t('tel') : ''}</span><span>${escapeHtml(phone)}</span></div>`).join('')}
          <div class="contact-item"><span class="contact-icon">@</span><span>${escapeHtml(profile.email)}</span></div>
          <div class="contact-item"><span class="contact-icon">${t('location')}</span><span>${escapeHtml(profile.address)}</span></div>
        </div>
        <h2 class="cv-section-title">${t('sections').about}</h2>
        <p class="cv-summary">${escapeHtml(profile.summary)}</p>
        <h2 class="cv-section-title">${t('sections').skills}</h2>
        <ul class="simple-list">${skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}</ul>
        <h2 class="cv-section-title">${t('sections').languages}</h2>
        <ul class="simple-list">${languages.map((language) => `<li>${escapeHtml(language)}</li>`).join('')}</ul>
      </section>
    </aside>
    <main class="cv-main">
      <section class="cv-section">
        <h2 class="cv-section-title">${t('sections').education}</h2>
        <div class="timeline">${renderEntries(education)}</div>
      </section>
      <section class="cv-section">
        <h2 class="cv-section-title">${t('sections').project}</h2>
        <div class="timeline">${renderEntries(projects)}</div>
      </section>
      <section class="cv-section">
        <h2 class="cv-section-title">${t('sections').experience}</h2>
        <div class="timeline">${renderEntries(experience)}</div>
      </section>
      <section class="cv-section">
        <h2 class="cv-section-title">${t('sections').publication}</h2>
        <div class="timeline"><article class="cv-entry">
          <h3 class="publication-title">${escapeHtml(publication.title)}</h3>
          ${renderBullets(publication.bullets)}
        </article></div>
      </section>
    </main>`;

  projectLimit.value = state.projectLimit;
  projectLimitValue.textContent = state.projectLimit;
  const enabledCount = state.data.projects.filter((project) => project.enabled).length;
  selectedCount.textContent = state.language === 'zh' ? `${enabledCount} ${t('selected')}` : `${enabledCount} ${t('selected')}`;
  const densityLabel = state.language === 'zh' ? { compact: t('compact'), balanced: t('balanced'), roomy: t('roomy') }[state.density] : state.density;
  previewMeta.textContent = `${state.template} / ${projects.length} ${state.language === 'zh' ? '个项目' : 'projects'} / ${densityLabel}`;
  document.querySelectorAll('#density [data-density]').forEach((button) => button.classList.toggle('is-active', button.dataset.density === state.density));
  document.querySelectorAll('#templateSwitcher [data-template]').forEach((button) => button.classList.toggle('is-active', button.dataset.template === state.template));
  document.querySelectorAll('#languageSwitcher [data-language]').forEach((button) => button.classList.toggle('is-active', button.dataset.language === state.language));
  applyInterfaceLanguage();
  requestAnimationFrame(updateFitStatus);
};

const renderControls = () => {
  const data = localizedData();
  projectControls.innerHTML = data.projects.map((project, index) => `
    <article class="project-control ${project.enabled ? '' : 'is-disabled'}" data-project-id="${project.id}">
      <div class="project-main">
        <input type="checkbox" data-role="project-enabled" ${project.enabled ? 'checked' : ''} aria-label="${t('include')} ${escapeHtml(project.title)}">
        <span class="project-title" title="${escapeHtml(project.title)}">${escapeHtml(project.title)}</span>
        <span class="project-rank">${String(index + 1).padStart(2, '0')}</span>
      </div>
      <div class="project-tools">
        <button class="mini-button" type="button" data-move="up" aria-label="${t('up')}" ${index === 0 ? 'disabled' : ''}>${t('up')}</button>
        <button class="mini-button" type="button" data-move="down" aria-label="${t('down')}" ${index === state.data.projects.length - 1 ? 'disabled' : ''}>${t('down')}</button>
        <div class="bullet-options" role="radiogroup" aria-label="${t('bullets')}">
          <span class="bullet-label">${t('bullets')}</span>
          ${project.bullets.map((_, bulletIndex) => `<label class="bullet-choice">
            <input type="radio" name="bullet-${project.id}" value="${bulletIndex + 1}" ${project.bulletLimit === bulletIndex + 1 ? 'checked' : ''}>
            <span>${bulletIndex + 1}</span>
          </label>`).join('')}
        </div>
      </div>
    </article>`).join('');
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

  const sections = document.querySelectorAll('.control-section');
  sections[0].querySelector('h2').textContent = ui.design;
  sections[0].querySelector('.control-heading span').textContent = ui.layouts;
  const templateNotes = [ui.currentCv, ui.modernTech, ui.highDensity];
  sections[0].querySelectorAll('.template-switcher button span').forEach((element, index) => { element.textContent = templateNotes[index]; });

  sections[1].querySelector('h2').textContent = ui.pageFit;
  sections[1].querySelector('.field-label').textContent = ui.spacing;
  [ui.compact, ui.balanced, ui.roomy].forEach((label, index) => { sections[1].querySelectorAll('#density button')[index].textContent = label; });
  sections[1].querySelector('.range-row span').textContent = ui.maxProjects;

  sections[2].querySelector('h2').textContent = ui.projects;
  sections[2].querySelector('.section-help').textContent = ui.projectHelp;
  sections[3].querySelector('h2').textContent = ui.dataSource;
  sections[3].querySelector('p').innerHTML = ui.dataNote;
  document.querySelector('#downloadDataButton').textContent = ui.download;
  document.querySelector('.preview-caption > span:first-child').textContent = ui.preview;
}

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveState.textContent = t('saved');
};

const update = () => {
  saveState.textContent = t('saving');
  renderControls();
  renderCV();
  persist();
};

const isPageOverflowing = () => {
  const main = cvPage.querySelector('.cv-main');
  const sidebar = cvPage.querySelector('.cv-sidebar');
  const pageBottom = cvPage.getBoundingClientRect().bottom;
  const mainBottom = main.lastElementChild?.getBoundingClientRect().bottom ?? 0;
  const sidebarBottom = sidebar.lastElementChild?.getBoundingClientRect().bottom ?? 0;
  return mainBottom > pageBottom - 8 || sidebarBottom > pageBottom - 8;
};

function updateFitStatus() {
  const overflowing = isPageOverflowing();
  fitStatus.textContent = overflowing ? t('overflow') : t('fits');
  fitStatus.className = `fit-status ${overflowing ? 'is-over' : 'is-good'}`;
}

projectControls.addEventListener('change', (event) => {
  const card = event.target.closest('[data-project-id]');
  if (!card) return;
  const project = state.data.projects.find((item) => item.id === card.dataset.projectId);
  if (event.target.matches("input[data-role='project-enabled']")) project.enabled = event.target.checked;
  if (event.target.matches("input[type='radio']")) project.bulletLimit = Number(event.target.value);
  update();
});

projectControls.addEventListener('click', (event) => {
  const move = event.target.dataset.move;
  if (!move) return;
  const card = event.target.closest('[data-project-id]');
  const index = state.data.projects.findIndex((item) => item.id === card.dataset.projectId);
  const targetIndex = move === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= state.data.projects.length) return;
  [state.data.projects[index], state.data.projects[targetIndex]] = [state.data.projects[targetIndex], state.data.projects[index]];
  update();
});

document.querySelector('#density').addEventListener('click', (event) => {
  if (!event.target.dataset.density) return;
  state.density = event.target.dataset.density;
  update();
});

document.querySelector('#templateSwitcher').addEventListener('click', (event) => {
  const button = event.target.closest('[data-template]');
  if (!button) return;
  state.template = button.dataset.template;
  update();
});

document.querySelector('#languageSwitcher').addEventListener('click', (event) => {
  const button = event.target.closest('[data-language]');
  if (!button || button.dataset.language === state.language) return;
  state.language = button.dataset.language;
  update();
});

projectLimit.addEventListener('input', () => {
  state.projectLimit = Number(projectLimit.value);
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
  state = { data: structuredClone(originalData), template: 'classic', density: 'balanced', projectLimit: 3, language: state.language };
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
