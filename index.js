/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const blogTracks = document.querySelectorAll(".blog__track");
const blogCards = document.querySelectorAll(".blog__card");
const blogModal = document.querySelector(".blog-modal");
const blogModalClose = document.querySelector(".blog-modal__close");

blogTracks.forEach((track) => {
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;
  let moved = false;

  track.addEventListener("mousedown", (event) => {
    isDragging = true;
    moved = false;
    startX = event.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.classList.add("is-dragging");
  });

  track.addEventListener("mouseleave", () => {
    isDragging = false;
    track.classList.remove("is-dragging");
  });

  track.addEventListener("mouseup", () => {
    isDragging = false;
    track.classList.remove("is-dragging");
  });

  track.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.15;
    if (Math.abs(walk) > 8) moved = true;
    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener("click", (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
});

const setBlogModalOpen = (isOpen) => {
  if (!blogModal) return;
  blogModal.classList.toggle("is-open", isOpen);
  blogModal.setAttribute("aria-hidden", String(!isOpen));
};

blogCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!blogModal) return;

    blogModal.querySelector(".blog-modal__group").textContent = card.dataset.group || "";
    blogModal.querySelector(".blog-modal__title").textContent = card.querySelector("h3")?.textContent || "";
    blogModal.querySelector(".blog-modal__summary").textContent = card.querySelector("p:last-child")?.textContent || "";
    blogModal.querySelector(".blog-modal__full").textContent = card.dataset.full || "";
    setBlogModalOpen(true);
  });
});

blogModalClose?.addEventListener("click", () => setBlogModalOpen(false));
blogModal?.addEventListener("click", (event) => {
  if (event.target === blogModal) setBlogModalOpen(false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setBlogModalOpen(false);
});

const slideViewers = document.querySelectorAll(".slide-viewer");

slideViewers.forEach((slideViewer) => {
  const image = slideViewer.querySelector(".slide-viewer__image");
  const prevButton = slideViewer.querySelector(".slide-viewer__button--prev");
  const nextButton = slideViewer.querySelector(".slide-viewer__button--next");
  const count = slideViewer.querySelector(".slide-viewer__count");
  const dots = Array.from(slideViewer.querySelectorAll(".slide-viewer__dot"));
  const totalSlides = Number(slideViewer.dataset.totalSlides || dots.length || 1);
  const slidePrefix = slideViewer.dataset.slidePrefix || "../images/projects/drone/slides/project_drone_slide";
  const slidePad = Number(slideViewer.dataset.slidePad || 0);

  let currentSlide = Number(image?.dataset.slideIndex || 1);

  const updateSlideViewer = (nextSlide) => {
    if (!image || nextSlide < 1 || nextSlide > totalSlides || nextSlide === currentSlide) return;

    image.classList.add("is-transitioning");

    window.setTimeout(() => {
      currentSlide = nextSlide;
      const slideNumber = slidePad > 0 ? String(currentSlide).padStart(slidePad, "0") : String(currentSlide);
      image.src = `${slidePrefix}-${slideNumber}.png`;
      image.alt = `Project presentation slide ${currentSlide}`;
      image.dataset.slideIndex = String(currentSlide);
      count.textContent = `${currentSlide} / ${totalSlides}`;
      prevButton.disabled = currentSlide === 1;
      nextButton.disabled = currentSlide === totalSlides;
      dots.forEach((dot) => {
        dot.classList.toggle("is-active", Number(dot.dataset.slideTarget) === currentSlide);
      });
      image.classList.remove("is-transitioning");
    }, 180);
  };

  prevButton?.addEventListener("click", () => updateSlideViewer(currentSlide - 1));
  nextButton?.addEventListener("click", () => updateSlideViewer(currentSlide + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => updateSlideViewer(Number(dot.dataset.slideTarget)));
  });

  prevButton.disabled = currentSlide === 1;
  nextButton.disabled = currentSlide === totalSlides;
});

const LANGUAGE_KEY = "portfolio-language";
const langToggle = document.querySelector(".lang-toggle");
const pageId = document.body.dataset.page;

const TRANSLATIONS = {
  home: {
    title: {
      en: "Chunpo Wu | AI / Computer Vision Engineer",
      zh: "吴春坡 | AI / 计算机视觉工程师",
    },
    description: {
      en: "Chunpo Wu is an AI and Computer Vision engineer focused on deep learning, robotics, SLAM, and edge AI systems.",
      zh: "吴春坡是一名专注于深度学习、机器人、SLAM 与边缘 AI 系统的 AI / 计算机视觉工程师。",
    },
    text: [
      [".nav__item:nth-child(1) .nav__link", "Projects", "项目"],
      [".nav__item:nth-child(2) .nav__link", "Experience", "经历"],
      [".nav__item:nth-child(3) .nav__link", "Blog", "博客"],
      [".nav__item:nth-child(4) .nav__link", "About", "关于"],
      [".nav__item:nth-child(5) .nav__link", "Contact", "联系"],
      [".header__text p", "AI / Computer Vision Engineer focused on robotics, edge AI, and real-time visual systems.", "专注于机器人、边缘 AI 与实时视觉系统的 AI / 计算机视觉工程师。"],
      [".header__actions .btn--pink", "View projects", "查看项目"],
      [".header__actions .btn:not(.btn--pink)", "Download CV", "下载简历"],
      [".work h2", "Selected Projects", "精选项目"],
      [".work__box:nth-of-type(1) h3", "Brain Dance VR", "Brain Dance VR"],
      [".work__box:nth-of-type(1) p", "A VR investigative experience inspired by Cyberpunk 2077 Braindance, built around switching between time and sensory layers to uncover hidden clues in an immersive memory scene.", "一个受《赛博朋克 2077》Braindance 启发的 VR 调查体验，围绕时间与感官层切换展开，在沉浸式记忆场景中寻找隐藏线索。"],
      [".work__box:nth-of-type(1) .work__list li:nth-child(1)", "VR", "VR"],
      [".work__box:nth-of-type(1) .work__list li:nth-child(2)", "Unity", "Unity"],
      [".work__box:nth-of-type(1) .work__list li:nth-child(3)", "Interaction Design", "交互设计"],
      [".work__box:nth-of-type(1) .work__list li:nth-child(4)", "Immersive Narrative", "沉浸式叙事"],
      [".work__box:nth-of-type(1) .link__text", "Project details", "项目详情"],
      [".work__box:nth-of-type(2) h3", "Railway Safety Monitoring System", "铁路安全监测系统"],
      [".work__box:nth-of-type(2) p", "Built a real-time railway monitoring system using 30+ RTSP streams per site. Deployed AI models on Jetson edge devices and connected detection results through a Kafka pipeline.", "构建了一个铁路实时监测系统，每个站点接入 30+ 路 RTSP 视频流；将 AI 模型部署到 Jetson 边缘设备，并通过 Kafka 管道连接检测结果。"],
      [".work__box:nth-of-type(2) .link__text", "Project details", "项目详情"],
      [".work__box:nth-of-type(3) h3", "Autonomous Drone Navigation & Target Tracking", "自主无人机导航与目标跟踪"],
      [".work__box:nth-of-type(3) p", "Bachelor thesis project implementing real-time target tracking, obstacle avoidance, and end-to-end video-to-control navigation based on visual feedback.", "本科毕业设计项目，实现了基于视觉反馈的实时目标跟踪、避障以及端到端视频到控制导航。"],
      [".work__box:nth-of-type(3) .link__text", "Project details", "项目详情"],
      [".work__box:nth-of-type(4) h3", "Music Universe", "音乐宇宙"],
      [".work__box:nth-of-type(4) p", "An interactive music visualization project that maps one million songs into a navigable universe, built on the Million Song Dataset with genre classification, dimensionality reduction, and long-term trend analysis.", "一个基于 Million Song Dataset 的交互式音乐可视化项目，将一百万首歌曲映射进一个可探索的宇宙，结合了流派分类、降维和长期趋势分析。"],
      [".work__box:nth-of-type(4) .link__text", "Project details", "项目详情"],
      [".experience h2", "Experience & Education", "经历与教育"],
      [".timeline-column:nth-child(1) h3", "Education", "教育"],
      [".timeline-column:nth-child(1) .timeline__item:nth-child(1) h4", "M.Sc. Computer and Information Science", "计算机与信息科学硕士"],
      [".timeline-column:nth-child(1) .timeline__item:nth-child(1) p:nth-child(3)", "University of Konstanz. Focused on computer vision, deep learning, robotics, SLAM, machine learning, and real-time systems.", "康斯坦茨大学。研究方向包括计算机视觉、深度学习、机器人、SLAM、机器学习与实时系统。"],
      [".timeline-column:nth-child(1) .timeline__item:nth-child(1) p:nth-child(4)", "E-DAVID program with emphasis on AI-driven data analysis.", "参与 E-DAVID 项目，重点关注 AI 驱动的数据分析。"],
      [".timeline-column:nth-child(1) .timeline__item:nth-child(2) h4", "B.Sc. Data Science and Big Data Technology", "数据科学与大数据技术学士"],
      [".timeline-column:nth-child(1) .timeline__item:nth-child(2) p:nth-child(3)", "Shandong Jiaotong University. GPA 88.97/100, ranked Top 2/118.", "山东交通学院。GPA 88.97/100，专业排名 2/118。"],
      [".timeline-column:nth-child(2) h3", "Experience & Awards", "经历与奖项"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(1) h4", "Web Engineer Intern", "Web 工程师实习生"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(1) p:nth-child(3)", "Baigong Information Technology. Developed backend and frontend features for a monitoring platform and designed APIs.", "百工信息技术。为监控平台开发前后端功能，并设计相关 API。"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(2) h4", "Algorithm Engineer Intern", "算法工程师实习生"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(2) p:nth-child(3)", "Youxiangtu Intelligent Technology. Researched remote sensing object detection algorithms and graph neural network methods.", "有向图智能科技。研究遥感目标检测算法和图神经网络方法。"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(3) .timeline__meta", "Awards", "奖项"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(3) h4", "Scholarships & Honors", "奖学金与荣誉"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(3) p:nth-child(3)", "National Inspirational Scholarship; Shandong Outstanding Student.", "国家励志奖学金；山东省优秀学生。"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(4) .timeline__meta", "May 2026", "2026 年 5 月"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(4) h4", "Tuition Fee Exemption for Gifted International Students", "国际优秀学生学费减免"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(4) p:nth-child(3)", "Issued by University of Konstanz.", "由康斯坦茨大学颁发。"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(5) .timeline__meta", "Competitions", "竞赛"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(5) h4", "Technical Competitions", "技术竞赛"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(5) p:nth-child(3)", "Huawei Kunpeng Innovation Competition, Provincial 2nd Prize; Lanqiao Cup, National Excellence; AI Competition, Provincial Prize.", "华为鲲鹏创新大赛省级二等奖；蓝桥杯全国优秀奖；AI 竞赛省级奖项。"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(6) .timeline__meta", "Publication", "论文"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(6) h4", "Lightweight Insulator Defect Detection Algorithm Based on UAV Perspective", "基于无人机视角的轻量化绝缘子缺陷检测算法"],
      [".timeline-column:nth-child(2) .timeline__item:nth-child(6) p:nth-child(3)", "Published in Journal of Beijing University of Aeronautics and Astronautics, 2025.", "发表于《北京航空航天大学学报》，2025。"],
      [".blog h2", "Blog", "博客"],
      [".blog .section-intro", "Notes on computer vision, robotics, deep learning systems, and project write-ups.", "记录计算机视觉、机器人、深度学习系统与项目实践的笔记。"],
      [".blog__row--technology .blog__row-heading span:first-child", "Technology", "技术"],
      [".blog__row--research .blog__row-heading span:first-child", "Research", "研究"],
      [".blog__row--daily .blog__row-heading span:first-child", "Daily", "日常"],
      [".blog__hint:nth-of-type(1)", "Horizontal scroll", "横向滚动"],
      [".blog__hint:nth-of-type(2)", "Horizontal scroll", "横向滚动"],
      [".blog__hint:nth-of-type(3)", "Horizontal scroll", "横向滚动"],
      [".blog__card:nth-of-type(1) .blog__group", "Technology", "技术"],
      [".blog__card:nth-of-type(1) .blog__meta", "Edge AI", "边缘 AI"],
      [".blog__card:nth-of-type(1) h3", "Deploying vision models on Jetson edge devices", "在 Jetson 边缘设备上部署视觉模型"],
      [".blog__card:nth-of-type(1) p:last-child", "Real-time monitoring pipelines, model deployment, and stream processing constraints.", "实时监测管线、模型部署以及流式处理约束。"],
      [".blog__card:nth-of-type(2) .blog__group", "Technology", "技术"],
      [".blog__card:nth-of-type(2) .blog__meta", "Robotics", "机器人"],
      [".blog__card:nth-of-type(2) h3", "Visual feedback for autonomous drone navigation", "用于自主无人机导航的视觉反馈"],
      [".blog__card:nth-of-type(2) p:last-child", "Combining target tracking, depth estimation, and obstacle avoidance into a control pipeline.", "将目标跟踪、深度估计与避障整合进同一控制管线。"],
      [".blog__card:nth-of-type(3) .blog__group", "Research", "研究"],
      [".blog__card:nth-of-type(3) .blog__meta", "Computer Vision", "计算机视觉"],
      [".blog__card:nth-of-type(3) h3", "Vision-language models for UAV inspection", "用于无人机巡检的视觉语言模型"],
      [".blog__card:nth-of-type(3) p:last-child", "How visual reasoning can support defect localization and equipment fault analysis.", "视觉推理如何支持缺陷定位与设备故障分析。"],
      [".blog__card:nth-of-type(4) .blog__group", "Daily", "日常"],
      [".blog__card:nth-of-type(4) .blog__meta", "Research", "研究"],
      [".blog__card:nth-of-type(4) h3", "Small-object defect detection from UAV perspective", "无人机视角下的小目标缺陷检测"],
      [".blog__card:nth-of-type(4) p:last-child", "Challenges around complex backgrounds, lightweight models, and edge-device real-time performance.", "围绕复杂背景、轻量化模型与边缘设备实时性能的挑战。"],
      [".blog-modal__close", "Close", "关闭"],
      [".about h2", "About Me", "关于我"],
      [".about__text p", "I am a Computer and Information Science master's student at the University of Konstanz with hands-on experience in computer vision, deep learning, robotics, and real-time systems. My work focuses on deploying AI models on edge devices, building reliable visual pipelines, and applying machine learning to inspection, monitoring, and autonomous navigation problems.", "我目前是康斯坦茨大学计算机与信息科学硕士，拥有计算机视觉、深度学习、机器人和实时系统的实践经验。我的工作重点是将 AI 模型部署到边缘设备，构建可靠的视觉处理流程，并将机器学习应用到巡检、监测与自主导航问题中。"],
      [".about__skills li:nth-child(1)", "Computer Vision", "计算机视觉"],
      [".about__skills li:nth-child(2)", "Python & JAX", "Python 与 JAX"],
      [".about__skills li:nth-child(3)", "SLAM", "SLAM"],
      [".about__skills li:nth-child(4)", "Autonomous Robots", "自主机器人"],
      [".about__skills li:nth-child(5)", "Virtual Reality", "虚拟现实"],
      [".about__text .btn", "Download CV", "下载简历"],
      [".contact h2", "Get in Touch", "联系我"],
      [".contact__info p", "I am open to opportunities and collaborations around computer vision, robotics, edge AI, remote sensing, and real-time monitoring systems. The quickest way to reach me is by email.", "我希望参与与计算机视觉、机器人、边缘 AI、遥感和实时监测系统相关的机会与合作。最快的联系我方式是邮件。"],
    ],
    attrs: [
      ["title", "text", "Chunpo Wu | AI / Computer Vision Engineer", "吴春坡 | AI / 计算机视觉工程师"],
      ["meta[name='description']", "content", "Chunpo Wu is an AI and Computer Vision engineer focused on deep learning, robotics, SLAM, and edge AI systems.", "吴春坡是一名专注于深度学习、机器人、SLAM 与边缘 AI 系统的 AI / 计算机视觉工程师。"],
      [".back-to-top", "title", "Back to Top", "返回顶部"],
      [".back-to-top__image", "alt", "Back to Top", "返回顶部"],
      [".blog-modal__close", "aria-label", "Close blog detail", "关闭博客详情"],
      [".about__skills", "aria-label", "Core skills", "核心技能"],
      [".about__photo", "alt", "Portrait of Chunpo Wu", "吴春坡头像"],
      [".footer__social-link-item a", "title", "Email Chunpo Wu", "给吴春坡发邮件"],
    ],
    data: [
      [".blog__card:nth-of-type(1)", "full", "Notes on camera ingestion, Jetson-side inference, Kafka messaging, and keeping latency predictable in practical monitoring systems.", "关于相机采集、Jetson 端推理、Kafka 消息传递以及如何在真实监测系统中控制时延的笔记。"],
      [".blog__card:nth-of-type(2)", "full", "Notes from the end-to-end pipeline: video stream, target detector, depth cue, control signal, and navigation behavior.", "关于端到端流程的笔记：视频流、目标检测器、深度线索、控制信号与导航行为。"],
      [".blog__card:nth-of-type(3)", "full", "A write-up on using multimodal models to connect visual evidence, defect descriptions, and structured equipment diagnostics.", "一篇关于如何使用多模态模型连接视觉证据、缺陷描述和结构化设备诊断信息的记录。"],
      [".blog__card:nth-of-type(4)", "full", "A practical summary of research challenges in insulator defect detection and lightweight deployment for UAV imagery.", "一份关于绝缘子缺陷检测与无人机图像轻量化部署研究挑战的实践总结。"],
    ],
  },
  braindance: {
    title: { en: "Brain Dance VR | Chunpo Wu", zh: "Brain Dance VR | 吴春坡" },
    description: { en: "Brain Dance VR project by Chunpo Wu.", zh: "吴春坡的 Brain Dance VR 项目。" },
    text: [
      [".nav__item:nth-child(1) .nav__link", "Projects", "项目"],
      [".nav__item:nth-child(2) .nav__link", "Experience", "经历"],
      [".nav__item:nth-child(3) .nav__link", "Blog", "博客"],
      [".nav__item:nth-child(4) .nav__link", "About", "关于"],
      [".nav__item:nth-child(5) .nav__link", "Contact", "联系"],
      [".page-hero .heading-primary", "Brain Dance VR", "Brain Dance VR"],
      [".page-hero p", "An immersive VR investigation experience inspired by Cyberpunk 2077 Braindance, focused on sensory layering, time-based exploration, and clue discovery in memory space.", "一个受《赛博朋克 2077》Braindance 启发的沉浸式 VR 调查体验，聚焦于感官分层、时间探索与记忆空间中的线索发现。"],
      [".project-detail__content h2:nth-of-type(1)", "Overview", "概述"],
      [".project-detail__content > p", "The project reinterprets the Braindance idea as a VR interaction system. Players move through a recorded memory, switch between sensory layers, and scrub different time states to reconstruct what happened from partial clues distributed across the environment.", "该项目将 Braindance 的概念重新设计为一个 VR 交互系统。玩家在一段被记录的记忆中穿行，通过切换感官层和不同时间状态，从散落在环境中的局部线索中重建事件真相。"],
      [".project-detail__content h2:nth-of-type(2)", "Video", "视频"],
      [".project-detail__content h2:nth-of-type(3)", "Key Work", "关键工作"],
      [".project-detail__content li:nth-child(1)", "Designed a three-sense interaction model with visual, auditory, and infrared/x-ray style layers.", "设计了一个包含视觉、听觉和红外/X 光风格层的三感官交互模型。"],
      [".project-detail__content li:nth-child(2)", "Built time scrubbing mechanics so users can inspect the same memory from multiple moments.", "构建了时间拖拽机制，使用户能够在多个时间片段中检查同一段记忆。"],
      [".project-detail__content li:nth-child(3)", "Implemented VR interactions such as object highlighting, clue prompts, and controller-triggered events.", "实现了物体高亮、线索提示与控制器触发事件等 VR 交互。"],
      [".project-detail__content li:nth-child(4)", "Explored swimming-based locomotion to make navigation feel like pulling through memory space.", "探索了基于游动的移动方式，让导航更像是在记忆空间中拉动自己前进。"],
      [".project-detail__content li:nth-child(5)", "Integrated story logic, sensory switching, area limitation, and VR controller mappings into one experience.", "将叙事逻辑、感官切换、区域限制和 VR 控制器映射整合到统一体验中。"],
      [".slide-viewer__download", "Download Project PDF", "下载项目 PDF"],
      [".project-detail__aside h3", "Project Info", "项目信息"],
      [".project-detail__aside dt:nth-of-type(1)", "Project Type", "项目类型"],
      [".project-detail__aside dd:nth-of-type(1)", "VR interactive experience", "VR 交互体验"],
      [".project-detail__aside dt:nth-of-type(2)", "Team", "团队"],
      [".project-detail__aside dt:nth-of-type(3)", "Engine", "引擎"],
      [".project-detail__aside dt:nth-of-type(4)", "Focus", "重点"],
      [".project-detail__aside dd:nth-of-type(4)", "Immersive storytelling, multi-sensory interaction, timeline exploration, VR locomotion", "沉浸式叙事、多感官交互、时间线探索与 VR 移动方式"],
      [".project-detail__aside dt:nth-of-type(5)", "Inspiration", "灵感来源"],
      [".project-detail__aside dd:nth-of-type(5)", "Braindance sequences from Cyberpunk 2077", "《赛博朋克 2077》中的 Braindance 片段"],
    ],
    attrs: [
      ["title", "text", "Brain Dance VR | Chunpo Wu", "Brain Dance VR | 吴春坡"],
      ["meta[name='description']", "content", "Brain Dance VR project by Chunpo Wu.", "吴春坡的 Brain Dance VR 项目。"],
      [".video-embed iframe", "title", "Brain Dance VR project video", "Brain Dance VR 项目视频"],
      [".project-back-link", "aria-label", "Back to projects", "返回项目列表"],
    ],
  },
  railway: {
    title: { en: "Railway Safety Monitoring System | Chunpo Wu", zh: "铁路安全监测系统 | 吴春坡" },
    description: { en: "Railway safety monitoring system by Chunpo Wu.", zh: "吴春坡的铁路安全监测系统项目。" },
    text: [
      [".nav__item:nth-child(1) .nav__link", "Projects", "项目"],
      [".nav__item:nth-child(2) .nav__link", "Experience", "经历"],
      [".nav__item:nth-child(3) .nav__link", "Blog", "博客"],
      [".nav__item:nth-child(4) .nav__link", "About", "关于"],
      [".nav__item:nth-child(5) .nav__link", "Contact", "联系"],
      [".page-hero .heading-primary", "Railway Safety Monitoring System", "铁路安全监测系统"],
      [".page-hero p", "A real-time video monitoring platform for railway safety, built around multi-stream RTSP ingestion, edge AI inference, and message-based data pipelines.", "一个面向铁路安全的实时视频监测平台，围绕多路 RTSP 接入、边缘 AI 推理和消息化数据管线构建。"],
      [".project-detail__content h2:nth-of-type(1)", "Overview", "概述"],
      [".project-detail__content > p", "The system processed 30+ RTSP streams per site and ran AI models on Jetson edge devices for equipment state detection. Detection outputs were passed through a Kafka pipeline for monitoring and integration.", "该系统每个站点处理 30+ 路 RTSP 视频流，并在 Jetson 边缘设备上运行 AI 模型进行设备状态检测。检测结果通过 Kafka 管线进入监测与集成流程。"],
      [".project-detail__content h2:nth-of-type(2)", "Slides", "文档"],
      [".slide-viewer__label", "Project deck", "项目文档"],
      [".slide-viewer__button--prev", "Prev", "上一页"],
      [".slide-viewer__button--next", "Next", "下一页"],
      [".slide-viewer__download", "Download PDF", "下载 PDF"],
      [".project-detail__content h2:nth-of-type(3)", "Key Work", "关键工作"],
      [".project-detail__content li:nth-child(1)", "Built real-time monitoring using 30+ RTSP streams per deployment site.", "为每个部署站点构建了基于 30+ 路 RTSP 视频流的实时监测系统。"],
      [".project-detail__content li:nth-child(2)", "Deployed AI models on Jetson edge devices.", "将 AI 模型部署在 Jetson 边缘设备上。"],
      [".project-detail__content li:nth-child(3)", "Implemented YOLOv7, SVM, and OCR for equipment state detection.", "实现了 YOLOv7、SVM 和 OCR，用于设备状态检测。"],
      [".project-detail__content li:nth-child(4)", "Integrated inference output with a Kafka-based pipeline.", "将推理输出接入基于 Kafka 的数据管线。"],
      [".project-detail__aside h3", "Project Info", "项目信息"],
      [".project-detail__aside dt:nth-of-type(1)", "Organization", "合作单位"],
      [".project-detail__aside dt:nth-of-type(2)", "Period", "时间"],
      [".project-detail__aside dt:nth-of-type(3)", "Focus", "重点"],
      [".project-detail__aside dd:nth-of-type(3)", "YOLOv7, Jetson, Kafka, OCR, real-time systems", "YOLOv7、Jetson、Kafka、OCR、实时系统"],
    ],
    attrs: [
      ["title", "text", "Railway Safety Monitoring System | Chunpo Wu", "铁路安全监测系统 | 吴春坡"],
      ["meta[name='description']", "content", "Railway safety monitoring system by Chunpo Wu.", "吴春坡的铁路安全监测系统项目。"],
      [".slide-viewer__button--prev", "aria-label", "Previous slide", "上一页"],
      [".slide-viewer__button--next", "aria-label", "Next slide", "下一页"],
      [".project-back-link", "aria-label", "Back to projects", "返回项目列表"],
    ],
  },
  drone: {
    title: { en: "Autonomous Drone Navigation & Target Tracking | Chunpo Wu", zh: "自主无人机导航与目标跟踪 | 吴春坡" },
    description: { en: "Autonomous drone navigation and target tracking project by Chunpo Wu.", zh: "吴春坡的自主无人机导航与目标跟踪项目。" },
    text: [
      [".nav__item:nth-child(1) .nav__link", "Projects", "项目"],
      [".nav__item:nth-child(2) .nav__link", "Experience", "经历"],
      [".nav__item:nth-child(3) .nav__link", "Blog", "博客"],
      [".nav__item:nth-child(4) .nav__link", "About", "关于"],
      [".nav__item:nth-child(5) .nav__link", "Contact", "联系"],
      [".page-hero .heading-primary", "Autonomous Drone Navigation & Target Tracking", "自主无人机导航与目标跟踪"],
      [".page-hero p", "A bachelor thesis project that connected visual target tracking, depth estimation, obstacle avoidance, and autonomous control.", "一个将视觉目标跟踪、深度估计、避障与自主控制连接起来的本科毕业设计项目。"],
      [".project-detail__content h2:nth-of-type(1)", "Overview", "概述"],
      [".project-detail__content > p", "The project built an end-to-end pipeline from video streaming to control. The drone used real-time object tracking and depth-based obstacle awareness to navigate based on visual feedback.", "该项目构建了从视频流到控制的端到端流程。无人机结合实时物体跟踪与基于深度的避障能力，依靠视觉反馈完成导航。"],
      [".project-detail__content h2:nth-of-type(2)", "Slides", "文档"],
      [".slide-viewer__label", "Project deck", "项目文档"],
      [".slide-viewer__button--prev", "Prev", "上一页"],
      [".slide-viewer__button--next", "Next", "下一页"],
      [".slide-viewer__download", "Download PPTX", "下载 PPTX"],
      [".project-detail__content h2:nth-of-type(3)", "Key Work", "关键工作"],
      [".project-detail__content li:nth-child(1)", "Implemented real-time object tracking using YOLOv11.", "使用 YOLOv11 实现实时物体跟踪。"],
      [".project-detail__content li:nth-child(2)", "Integrated DepthAnything v2 for obstacle avoidance.", "集成 DepthAnything v2 实现避障。"],
      [".project-detail__content li:nth-child(3)", "Built an end-to-end video streaming to control pipeline.", "构建了端到端的视频流到控制管线。"],
      [".project-detail__content li:nth-child(4)", "Achieved autonomous navigation based on visual feedback.", "实现了基于视觉反馈的自主导航。"],
      [".project-detail__aside h3", "Project Info", "项目信息"],
      [".project-detail__aside dt:nth-of-type(1)", "Type", "类型"],
      [".project-detail__aside dd:nth-of-type(1)", "Bachelor thesis", "本科毕业设计"],
      [".project-detail__aside dt:nth-of-type(2)", "Period", "时间"],
      [".project-detail__aside dt:nth-of-type(3)", "Focus", "重点"],
      [".project-detail__aside dd:nth-of-type(3)", "YOLOv11, DepthAnything v2, robotics, visual navigation", "YOLOv11、DepthAnything v2、机器人、视觉导航"],
    ],
    attrs: [
      ["title", "text", "Autonomous Drone Navigation & Target Tracking | Chunpo Wu", "自主无人机导航与目标跟踪 | 吴春坡"],
      ["meta[name='description']", "content", "Autonomous drone navigation and target tracking project by Chunpo Wu.", "吴春坡的自主无人机导航与目标跟踪项目。"],
      [".slide-viewer__button--prev", "aria-label", "Previous slide", "上一页"],
      [".slide-viewer__button--next", "aria-label", "Next slide", "下一页"],
      [".project-back-link", "aria-label", "Back to projects", "返回项目列表"],
    ],
  },
  music: {
    title: { en: "Music Universe | Chunpo Wu", zh: "音乐宇宙 | 吴春坡" },
    description: { en: "Music Universe project by Chunpo Wu.", zh: "吴春坡的音乐宇宙项目。" },
    text: [
      [".nav__item:nth-child(1) .nav__link", "Projects", "项目"],
      [".nav__item:nth-child(2) .nav__link", "Experience", "经历"],
      [".nav__item:nth-child(3) .nav__link", "Blog", "博客"],
      [".nav__item:nth-child(4) .nav__link", "About", "关于"],
      [".nav__item:nth-child(5) .nav__link", "Contact", "联系"],
      [".page-hero .heading-primary", "Music Universe", "音乐宇宙"],
      [".page-hero p", "An interactive music exploration system that organizes large-scale song data into a visual universe, helping users inspect genre structure and how musical styles evolve over time across the Million Song Dataset.", "一个将大规模歌曲数据组织成可视化宇宙的交互式音乐探索系统，帮助用户在 Million Song Dataset 上观察流派结构以及音乐风格如何随时间演化。"],
      [".project-detail__content h2:nth-of-type(1)", "Overview", "概述"],
      [".project-detail__content > p", "The project starts from a genre-labeled dataset and transfers that knowledge to a much larger song collection. After supervised genre classification, dimensionality reduction is used to map songs into an explorable spatial structure where each point represents one track.", "该项目从带有流派标签的数据集出发，将这些知识迁移到一个更大的歌曲集合中。完成监督式流派分类后，再通过降维把歌曲映射到一个可探索的空间结构中，其中每个点代表一首歌曲。"],
      [".project-detail__content > p:nth-of-type(2)", "The core target corpus is the Million Song Dataset, which provides large-scale audio feature data for roughly one million tracks. A labeled CD2C subset is used to train the genre model, then the predictions and reduced features are projected into a universe-style interactive view.", "核心目标语料是 Million Song Dataset，它为大约一百万首歌曲提供了大规模音频特征数据。项目先使用带标签的 CD2C 子集训练流派模型，再将预测结果和降维后的特征投影到宇宙风格的交互视图中。"],
      [".project-detail__content h2:nth-of-type(2)", "Video", "视频"],
      [".project-detail__content h2:nth-of-type(3)", "Key Work", "关键工作"],
      [".project-detail__content li:nth-child(1)", "Trained a supervised genre classification pipeline using labeled songs from the CD2C dataset.", "使用 CD2C 数据集中带标签的歌曲训练了监督式流派分类流程。"],
      [".project-detail__content li:nth-child(2)", "Used XGBoost to model hierarchical relationships between genres and predict labels for around one million songs.", "使用 XGBoost 建模不同流派之间的层级关系，并为约一百万首歌曲预测标签。"],
      [".project-detail__content li:nth-child(3)", "Applied PCA and UMAP to reduce high-dimensional audio features into a visual 3D structure.", "使用 PCA 和 UMAP 将高维音频特征降维到可视化的三维结构中。"],
      [".project-detail__content li:nth-child(4)", "Built a universe-style interface where songs cluster into genre constellations and can be searched or explored spatially.", "构建了宇宙风格的交互界面，让歌曲形成按流派聚类的星群，并支持搜索与空间探索。"],
      [".project-detail__content li:nth-child(5)", "Computed yearly genre centroids to trace how musical styles shift from 1955 to 2010.", "计算了逐年的流派中心点，用于追踪 1955 到 2010 年间音乐风格的变化轨迹。"],
      [".slide-viewer__download:nth-of-type(1)", "Download Research PDF", "下载研究 PDF"],
      [".slide-viewer__download:nth-of-type(2)", "Download Trend PDF", "下载趋势 PDF"],
      [".project-detail__aside h3", "Project Info", "项目信息"],
      [".project-detail__aside dt:nth-of-type(1)", "Domain", "领域"],
      [".project-detail__aside dd:nth-of-type(1)", "Music data visualization", "音乐数据可视化"],
      [".project-detail__aside dt:nth-of-type(2)", "Dataset", "数据集"],
      [".project-detail__aside dd:nth-of-type(2)", "Million Song Dataset with CD2C labeled songs used for supervised genre transfer", "Million Song Dataset，以及用于监督式流派迁移的 CD2C 带标签歌曲数据"],
      [".project-detail__aside dt:nth-of-type(3)", "Core Methods", "核心方法"],
      [".project-detail__aside dd:nth-of-type(3)", "XGBoost, PCA, UMAP, centroid trajectory analysis", "XGBoost、PCA、UMAP、中心轨迹分析"],
      [".project-detail__aside dt:nth-of-type(4)", "Focus", "重点"],
      [".project-detail__aside dd:nth-of-type(4)", "Genre transfer, spatial exploration, temporal trend analysis, interactive storytelling with data", "流派迁移、空间探索、时间趋势分析以及基于数据的交互式叙事"],
    ],
    attrs: [
      ["title", "text", "Music Universe | Chunpo Wu", "音乐宇宙 | 吴春坡"],
      ["meta[name='description']", "content", "Music Universe project by Chunpo Wu.", "吴春坡的音乐宇宙项目。"],
      [".video-embed iframe", "title", "Music Universe project video", "音乐宇宙项目视频"],
      [".project-back-link", "aria-label", "Back to projects", "返回项目列表"],
    ],
  },
};

const setSelectorText = (selector, value) => {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = value;
};

const setSelectorAttr = (selector, attr, value) => {
  const element = document.querySelector(selector);
  if (!element) return;
  if (attr === "text") {
    document.title = value;
    return;
  }
  element.setAttribute(attr, value);
};

const applyLanguage = (language) => {
  const page = TRANSLATIONS[pageId];
  if (!page) return;

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  page.text.forEach(([selector, en, zh]) => {
    setSelectorText(selector, language === "zh" ? zh : en);
  });

  page.attrs.forEach(([selector, attr, en, zh]) => {
    setSelectorAttr(selector, attr, language === "zh" ? zh : en);
  });

  if (page.data) {
    page.data.forEach(([selector, attr, en, zh]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      element.dataset[attr] = language === "zh" ? zh : en;
    });
  }

  if (langToggle) {
    langToggle.classList.toggle("is-zh", language === "zh");
    langToggle.setAttribute("aria-label", language === "zh" ? "切换语言" : "Switch language");
  }

  localStorage.setItem(LANGUAGE_KEY, language);
};

if (langToggle) {
  const initialLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";
  applyLanguage(initialLanguage);
  langToggle.addEventListener("click", () => {
    const nextLanguage = (localStorage.getItem(LANGUAGE_KEY) || "en") === "en" ? "zh" : "en";
    applyLanguage(nextLanguage);
  });
}
