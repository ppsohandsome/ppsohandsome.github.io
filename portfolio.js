/* Website presentation uses the same stable entry IDs as CV Studio. */
(() => {
  const pair = (en, zh) => ({ en, zh });
  const metadata = {
    'parcel-sorting': {
      group: 'engineering', tags: ['Nova5', 'YOLO', 'Open3D', 'TCP/IP'],
      image: 'images/projects/parcel_sorting/cover.jpg', page: 'project.html?project=parcel-sorting',
      summary: pair('A collaborative vision-guided parcel sorting system, connecting 3D grasp planning with robot motion, vacuum control and recovery.', '团队协作开发视觉引导的包裹分拣系统，将三维抓取规划、机械臂运动、真空控制与失败恢复连接起来。'),
      result: pair('Trialled at a postal parcel distribution site in Jinan for one month.', '已在济南市邮政快递集散点试运行一个月。'),
      pipeline: pair(['RGB + depth', 'Detection + normals', 'Hand-eye + TCP', 'Grasp + place', 'Monitor + recover'], ['RGB 与深度', '检测与表面法线', '手眼变换与 TCP', '抓取与放置', '监控与恢复']),
      video: 'images/projects/parcel_sorting/video.mp4'
    },
    'autonomous-drone': {
      group: 'engineering', tags: ['Tello', 'YOLOv11', 'AprilTag', 'MASt3R-SLAM'],
      image: 'images/projects/general/project_drove_first.jpg', page: 'autonomous-drone.html',
      summary: pair('An independently developed Tello pipeline for vehicle tracking, monocular obstacle avoidance and 3D mapping.', '独立开发基于 Tello 单目视频的目标车辆跟踪、动态避障与三维建图流程。')
    },
    'drone-inspection': {
      group: 'engineering', tags: ['Qwen2.5-VL', 'VLM', 'Knowledge Graph', 'UAV'],
      page: 'project.html?project=drone-inspection',
      summary: pair('UAV railway inspection combining small-object detection, visual-language reasoning and equipment fault knowledge graphs.', '面向新朔铁路设备巡检，结合无人机小目标检测、视觉语言推理与设备故障知识图谱。'),
      pipeline: pair(['UAV imagery', '50+ categories', 'Visual reasoning', 'Fault knowledge graph'], ['无人机图像', '50+ 类目标', '视觉推理', '故障知识图谱'])
    },
    'railway-monitoring': {
      group: 'engineering', tags: ['Jetson', 'DeepStream', 'Kafka', 'MQTT'],
      image: 'images/projects/general/project_railvision_first.png', page: 'railway-monitoring.html',
      summary: pair('Real-time monitoring for railway maintenance depots with 30+ 1080p RTSP streams per site and edge inference.', '面向铁路检修地库，接入单站点 30+ 路 1080p RTSP 视频，完成边缘推理与实时设备状态监测。'),
      result: pair('Deployed in Chongqing and the Chuzhou-Nanjing section; pre-delivery completed for the Mexico deployment.', '重庆及滁宁段已部署运行，墨西哥段已完成预交付。')
    },
    bearfit: {
      group: 'personal', tags: ['SwiftUI', 'IMU Rings', 'MQTT', 'FastAPI'],
      image: 'images/projects/bear_fitness/cover.png', page: 'bearfit.html',
      summary: pair('A workout-sensing prototype using iPhone, Apple Watch and AirPods, later extended with left/right IMU rings.', '融合 iPhone、Apple Watch 与 AirPods 的健身感知原型，后续扩展左右手 IMU 戒指。')
    },
    'soarm-vision': {
      group: 'personal', tags: ['LeRobot', 'SO-ARM101', 'Optical Flow', 'LLM API'],
      page: 'project.html?project=soarm-vision',
      summary: pair('Vision-to-action interaction with optical-flow tracking and simplified scene graphs to reduce visual API input.', '结合大模型 API、光流跟踪与简化场景图，构建视觉到机械臂动作的交互流程。'),
      pipeline: pair(['Camera', 'Optical flow', 'Scene graph', 'Model API', 'Robot action'], ['相机', '光流跟踪', '场景图', '模型 API', '机械臂动作'])
    },
    'llm-gateway': {
      group: 'personal', tags: ['Claude', 'OpenAI', 'DeepSeek', 'Kimi'],
      page: 'project.html?project=llm-gateway', url: 'https://aaccx.pw/',
      summary: pair('A maintained API gateway providing a unified access point for multiple large-model providers.', '持续运营的大模型 API 中转站，为多种模型提供统一访问入口。'),
      pipeline: pair(['Applications', 'Unified API', 'Model providers'], ['应用接入', '统一 API', '模型服务'])
    },
    braindance: {
      group: 'personal', tags: ['Quest 3', 'Unity', '3D Gaussian Splatting', 'VR'],
      image: 'images/projects/braindance/project_braindance_first.png', page: 'drone-inspection.html',
      summary: pair('A Cyberpunk 2077-inspired recorded-memory experience combining reconstructed scenes, time scrubbing and layered clues.', '受《赛博朋克 2077》启发的录制记忆体验，结合实景重建、时间拖拽与分层线索探索。')
    },
    'music-universe': {
      group: 'personal', tags: ['XGBoost', 'PCA', 'UMAP', 'Million Song Dataset'],
      image: 'images/projects/music_universe/project_music_first.png', page: 'music-universe.html',
      summary: pair('An interactive 3D music universe organizing one million songs through classification and dimensionality reduction.', '通过流派分类与降维，将一百万首歌曲组织为可交互探索的三维音乐宇宙。')
    }
  };
  const publicationUrls = {
    'insulator-uav': 'https://bhxb.buaa.edu.cn/bhzk/cn/article/doi/10.13700/j.bh.1001-5965.2025.0495',
    'mapf-wt-rbf': 'http://nyzr.njupt.edu.cn/ch/reader/view_abstract.aspx?file_no=202604013&flag=1'
  };
  const awards = [
    pair('IEEE VAST Challenge Outstanding Award: Award for Innovative Support for Analytical Pivoting', 'IEEE VAST 挑战赛 Outstanding 特殊奖：Award for Innovative Support for Analytical Pivoting'),
    pair('CyberLago Hackathon, Challenge Track Award', '德国 CyberLago 黑客松命题赛道奖'),
    pair('AdventureX Hackathon, Track Third Prize', '杭州 AdventureX 黑客松赛道三等奖'),
    pair('Huawei Kunpeng Competition, openEuler Track, Provincial First Prize', '华为鲲鹏大赛 openEuler 赛道省级一等奖'),
    pair('14th Lanqiao Cup, National Excellence Award', '第十四届蓝桥杯大赛国家级优秀奖'),
    pair('Shandong College Student Intelligent Technology Application Design Competition, Third Prize (2022)', '2022 年山东省大学生智能技术应用设计大赛三等奖'),
    pair('Shandong College Student Computer Design Competition, Provincial Second Prize (2023)', '2023 年山东省大学生计算机设计大赛省级二等奖'),
    pair('Shandong College Student AI Competition, Provincial Third Prize (2023)', '2023 年山东省大学生人工智能大赛省级三等奖'),
    pair('Undergraduate Comprehensive First-Class Scholarship (4 times); Annual Outstanding Student (3 times)', '本科综合一等奖学金（4 次）；本科年度优秀学生（3 次）')
  ];
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const external = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>`;
  const localized = (language) => {
    const data = window.RESUME_DATA;
    if (language !== 'zh') return data;
    const zh = window.RESUME_ZH;
    return {
      ...data, profile: { ...data.profile, ...zh.profile }, skills: zh.skills, languages: zh.languages,
      education: zh.education, experience: zh.experience, publications: zh.publications,
      projects: data.projects.map((project) => ({ ...project, ...zh.projects[project.id] }))
    };
  };
  const timeline = (entry) => `<article class="timeline__item" data-entry-id="${esc(entry.id)}">
    ${entry.period ? `<p class="timeline__meta">${esc(entry.period)}</p>` : ''}
    <h4>${esc(entry.title)}</h4>${entry.organization ? `<p>${esc(entry.organization)}</p>` : ''}
    <ul class="timeline__list">${entry.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>
  </article>`;
  let mediaNodes;
  let resourceNodes;

  window.renderPortfolio = (language) => {
    const lang = language === 'zh' ? 'zh' : 'en';
    const tr = (en, zh) => lang === 'zh' ? zh : en;
    const data = localized(lang);
    const page = document.body.dataset.page;
    const root = page === 'home' ? './' : '../';
    const projectCard = (project, compact = false) => {
      const meta = metadata[project.id];
      const visual = meta.image
        ? `<img src="${root}${meta.image}" class="work__image" alt="${esc(project.title)}" loading="lazy">`
        : `<div class="project-flow" aria-label="${tr('Technical pipeline', '技术链路')}">${meta.pipeline[lang].map((step, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><strong>${esc(step)}</strong></div>`).join('')}</div>`;
      return `<article class="${compact ? 'personal-project' : 'work__box'}" data-project-id="${project.id}">
        <div class="work__text"><p class="project-period">${esc(project.period)}</p><h3>${esc(project.title)}</h3>
        <p>${esc(meta.summary[lang])}</p><ul class="work__list">${meta.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
        <div class="work__links"><a href="${root}projects/${meta.page}" class="link__text">${tr('Project details', '项目详情')} <span aria-hidden="true">&rarr;</span></a>
        ${meta.url ? external(meta.url, tr('Visit website', '访问网站')) : ''}</div></div>
        ${compact ? '' : `<div class="work__image-box">${visual}</div>`}</article>`;
    };
    if (page === 'home') {
      const projects = data.projects;
      const engineeringIds = ['parcel-sorting', 'autonomous-drone', 'drone-inspection', 'railway-monitoring'];
      const personalIds = ['bearfit', 'soarm-vision', 'llm-gateway', 'braindance', 'music-universe'];
      document.querySelector('#work .row').innerHTML = `<h2>${tr('Selected Projects', '精选项目')}</h2>
        <h3 class="project-group-heading">${tr('Engineering & Applied AI', '工程项目与 AI 应用')}</h3>
        <div class="work__boxes">${engineeringIds.map((id) => projectCard(projects.find((item) => item.id === id))).join('')}</div>
        <h3 class="project-group-heading">${tr('Personal Explorations', '个人探索')}</h3>
        <div class="personal-project-grid">${personalIds.map((id) => projectCard(projects.find((item) => item.id === id), true)).join('')}</div>`;
      document.querySelector('#experience .row').innerHTML = `<h2>${tr('Experience & Education', '工作与教育经历')}</h2>
        <div class="timeline-layout"><div class="timeline-column"><h3>${tr('Education', '教育经历')}</h3><div class="timeline">${data.education.map(timeline).join('')}</div></div>
        <div class="timeline-column"><h3>${tr('Work & Internships', '工作与实习经历')}</h3><div class="timeline">${['algorithm-intern', 'web-intern', 'railway-engineer'].map((id) => timeline(data.experience.find((entry) => entry.id === id))).join('')}</div></div></div>`;
      let research = document.querySelector('#research');
      if (!research) {
        research = document.createElement('section');
        research.id = 'research';
        research.className = 'experience';
        document.querySelector('#experience').after(research);
      }
      research.innerHTML = `<div class="row"><h2>${tr('Research & Recognition', '研究与荣誉')}</h2><div class="timeline-layout">
        <div class="timeline-column"><h3>${tr('Publications & Submissions', '论文与投稿')}</h3><div class="timeline">${data.publications.map((entry) => {
          const title = publicationUrls[entry.id] ? external(publicationUrls[entry.id], entry.title) : esc(entry.title);
          return `<article class="timeline__item" data-entry-id="${entry.id}"><p class="timeline__meta">${entry.id === 'svd-imoe' ? tr('Submission in progress', '投稿中') : tr('Published', '已发表')}</p><h4>${title}</h4>${list(entry.bullets)}</article>`;
        }).join('')}</div>
        <h3>${tr('Project Funding & Activities', '项目立项与活动')}</h3>${list([
          tr('National College Student Innovation and Entrepreneurship Training Program project approval (2024)', '2024 年度大学生创新创业训练计划国家级立项'),
          tr('Provincial Second Prize, College Student Innovation and Entrepreneurship Training Program (2022)', '2022 年度大学生创新创业训练计划省级二等奖'),
          tr('Shandong Jiaotong University debate team member', '新国辩山东交通学院校队成员')
        ])}</div>
        <div class="timeline-column"><h3>${tr('Competitions & Awards', '竞赛与奖项')}</h3><ul class="recognition-list">${awards.map((award, index) => `<li>${index === 2 ? external('https://gallery.adventure-x.cn/projects/cmryvrum9000602l7g4o7boke', award[lang]) : esc(award[lang])}</li>`).join('')}</ul></div>
        </div></div>`;
      document.querySelector('.header__text > p').textContent = tr('Computer vision, robotics and large-model applications. Building perception-to-action systems that work in practice.', '计算机视觉、机器人与大模型应用。从视觉感知到实际动作，构建可落地的系统。');
      document.querySelector('.about__text > p').textContent = tr('I am a Computer and Information Science master’s student at the University of Konstanz. My work spans robot perception and control, edge vision deployment, LLM fine-tuning, RAG and knowledge graphs, with hands-on engineering and team collaboration experience.', '康斯坦茨大学计算机与信息科学硕士研究生，实践方向涵盖机器人感知与控制、边缘视觉部署、LLM 微调、RAG 与知识图谱，具备工程落地与团队协作经验。');
      document.querySelector('.about__skills').innerHTML = [tr('Computer Vision', '计算机视觉'), tr('Robotics', '机器人'), 'LLM / VLM / VLA', 'RAG', tr('Knowledge Graphs', '知识图谱'), tr('Edge AI', '边缘 AI')].map((skill) => `<li>${esc(skill)}</li>`).join('');
      let languageNote = document.querySelector('.about__languages');
      if (!languageNote) {
        languageNote = document.createElement('p');
        languageNote.className = 'about__languages';
        document.querySelector('.about__skills').after(languageNote);
      }
      languageNote.textContent = data.languages.join(' · ');
      document.querySelectorAll('.header__actions .btn:not(.btn--pink), .about__text .btn').forEach((link) => {
        link.href = './cv-studio.html';
        link.textContent = tr('Customize & export CV', '选择内容并导出简历');
        link.removeAttribute('target');
      });
      let backupEmail = document.querySelector('.contact__backup-email');
      if (!backupEmail) {
        backupEmail = document.createElement('p');
        backupEmail.className = 'contact__backup-email';
        document.querySelector('.contact__info').append(backupEmail);
      }
      backupEmail.innerHTML = `<a href="mailto:${esc(data.profile.emails[1])}">${esc(data.profile.emails[1])}</a>`;
      document.title = tr('Chunpo Wu | Computer Vision, Robotics & LLM Applications', '吴春坡 | 计算机视觉、机器人与大模型应用');
      document.querySelector('meta[name="description"]').content = document.querySelector('.header__text > p').textContent;
      return;
    }
    const pageIds = { railway: 'railway-monitoring', drone: 'autonomous-drone', music: 'music-universe', bearfit: 'bearfit', braindance: 'braindance' };
    const id = page === 'project' ? new URLSearchParams(location.search).get('project') : pageIds[page];
    const project = data.projects.find((item) => item.id === id);
    const meta = metadata[id];
    if (!project || !meta) {
      if (page === 'project') document.querySelector('main').innerHTML = `<section class="page-hero"><div class="row"><h1>${tr('Project not found', '未找到项目')}</h1><a href="../index.html#work">${tr('Back to projects', '返回项目列表')}</a></div></section>`;
      return;
    }
    // Keep existing media nodes and their slide controls alive across language switches.
    if (!mediaNodes) mediaNodes = [...document.querySelectorAll('main .video-embed, main .slide-viewer')];
    if (!resourceNodes) resourceNodes = [...document.querySelectorAll('main a.slide-viewer__download')].filter((node) => !node.closest('.slide-viewer'));
    document.querySelector('main').innerHTML = `<section class="page-hero"><div class="row"><h1 class="heading-primary">${esc(project.title)}</h1><p>${esc(meta.summary[lang])}</p></div></section>
      <section class="project-detail"><div class="row project-detail__grid"><div class="project-detail__content">
      <h2>${tr('Overview & Implementation', '概览与实现')}</h2>${list(project.bullets)}
      ${meta.pipeline ? `<h2>${tr('System Pipeline', '系统链路')}</h2><div class="project-flow">${meta.pipeline[lang].map((step, index) => `<div><span>${index + 1}</span><strong>${esc(step)}</strong></div>`).join('')}</div>` : ''}
      ${meta.result ? `<h2>${tr('Field Trial', '现场试运行')}</h2><p>${esc(meta.result[lang])}</p>` : ''}
      <div id="projectMedia"></div><div id="projectResources"></div>
      ${meta.url ? `<p>${external(meta.url, tr('Visit API gateway', '访问 API 中转站'))}</p>` : ''}
      </div><aside class="project-detail__aside"><h3>${tr('Project Info', '项目信息')}</h3><dl>
      <dt>${tr('Period', '时间')}</dt><dd>${esc(project.period)}</dd><dt>${tr('Context', '项目背景')}</dt><dd>${esc(project.organization)}</dd>
      <dt>${tr('Technology', '技术栈')}</dt><dd>${esc(meta.tags.join(' · '))}</dd></dl></aside></div></section>`;
    const media = document.querySelector('#projectMedia');
    if (meta.video) media.innerHTML = `<h2>${tr('Field Video', '现场视频')}</h2><div class="video-embed"><video controls playsinline preload="none" poster="${root}${meta.image}"><source src="${root}${meta.video.replace('.mp4', '.webm')}" type="video/webm"><source src="${root}${meta.video}" type="video/mp4"></video></div><p class="project-period">${tr('Parcel-label region blurred; site audio removed.', '面单区域已模糊处理，现场音轨已移除。')}</p><a href="${root}${meta.video}" download class="link__text">${tr('Download video (MP4)', '下载视频（MP4）')}</a>`;
    mediaNodes.forEach((node) => {
      const heading = document.createElement('h2');
      heading.textContent = node.classList.contains('slide-viewer') ? tr('Project Slides', '项目幻灯片') : tr('Video', '视频');
      media.append(heading, node);
    });
    resourceNodes.forEach((node) => document.querySelector('#projectResources').append(node));
    document.querySelectorAll('.nav__link').forEach((node, index) => { node.textContent = [tr('Projects', '项目'), tr('Experience', '经历'), tr('Blog', '博客'), tr('About', '关于'), tr('Contact', '联系')][index]; });
    document.title = `${project.title} | ${tr('Chunpo Wu', '吴春坡')}`;
    document.querySelector('meta[name="description"]').content = meta.summary[lang];
  };
})();
