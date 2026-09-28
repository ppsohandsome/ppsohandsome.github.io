const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const presentation = fs.readFileSync(path.join(root, 'portfolio.js'), 'utf8');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(!/id="blog"|href="#blog"|blog-modal/.test(home), 'Home page must not include the removed blog section');
assert(!/personal-project(?:-grid)?/.test(presentation), 'Personal projects must use the same work cards as selected projects');
for (const match of presentation.matchAll(/(?:image|video): '([^']+)'/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing project media: ${match[1]}`);
}
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'cv/resume-data.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'project-details.js'), 'utf8'), context);
const { RESUME_DATA: en, RESUME_ZH: zh } = context.window;
const ids = (entries) => Array.from(entries, (entry) => entry.id).sort();
assert.deepEqual(ids(en.projects), Object.keys(zh.projects).sort());
assert.deepEqual(ids(en.experience), ids(zh.experience));
assert.deepEqual(ids(en.publications), ids(zh.publications));
for (const entries of [en.projects, en.experience, en.publications, zh.education]) {
  assert.equal(new Set(ids(entries)).size, entries.length, 'IDs must be unique');
}
assert(!ids(en.education).includes('military-service'));
assert(ids(zh.education).includes('military-service'));
assert(en.languages.some((entry) => entry.includes('IELTS 6.5')));
assert(en.projects.find((entry) => entry.id === 'parcel-sorting').organization.includes('Team'));
assert(en.projects.find((entry) => entry.id === 'zilo-ring').bullets.join().includes('binary 0/1'));
assert(zh.projects['zilo-ring'].bullets.join().includes('快速双次动作'));
assert(zh.publications.find((entry) => entry.id === 'svd-imoe').bullets.join().includes('投稿中'));
assert(!/face tracking|人脸跟踪/.test(JSON.stringify(en.projects) + JSON.stringify(zh.projects)));
for (const entry of [en.projects.find((item) => item.id === 'llm-gateway'), zh.projects['llm-gateway']]) {
  assert(!/15B|150亿|3,000|3000|收益|收入|revenue|income/i.test(JSON.stringify(entry)));
}
assert.deepEqual(Object.keys(context.window.PROJECT_DETAILS).sort(), ids(en.projects));
for (const [id, detail] of Object.entries(context.window.PROJECT_DETAILS)) {
  for (const language of ['en', 'zh']) {
    assert(detail[language].length >= 3, `${id} needs at least three ${language} detail sections`);
    const minimumLength = language === 'zh' ? 55 : 100;
    assert(detail[language].every((section) => section.title && section.paragraphs?.join('').length >= minimumLength), `${id} has a thin ${language} detail section`);
  }
}
for (const name of fs.readdirSync(path.join(root, 'projects')).filter((name) => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, 'projects', name), 'utf8');
  assert(html.includes('portfolio.js'), `${name} must use shared project rendering`);
  assert(html.includes('project-details.js'), `${name} must load long-form project details`);
  assert(!html.includes('#blog'), `${name} must not link to the removed blog section`);
  for (const match of html.matchAll(/(?:src|href)="(\.\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    assert(fs.existsSync(path.resolve(root, 'projects', decodeURIComponent(match[1]))), `${name}: missing ${match[1]}`);
  }
}
console.log('Resume parity, privacy, stable IDs and local project assets: OK');
