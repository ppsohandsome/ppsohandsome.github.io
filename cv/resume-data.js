window.RESUME_DATA = {
  profile: {
    name: "CHUNPO WU",
    role: "AI / Computer Vision Engineer",
    phones: ["+49 15252633669", "+86 13813166007"],
    email: "chunpo.wu@uni-konstanz.de",
    address: "Gustav-Schwab-Str 9, Konstanz, Germany, 78467",
    photo: "./images/people/personal2.png",
    summary: "M.Sc. Computer Science student at University of Konstanz with strong experience in computer vision, deep learning, and real-time systems. Skilled in deploying AI models on edge devices and building reliable data pipelines."
  },
  skills: ["Computer Vision", "Python & JAX", "Vision-Language-Action (VLA)", "LLMs & Vision-Language Models", "Virtual Reality", "SLAM", "Autonomous Robots", "Leadership"],
  languages: ["Chinese (Native)", "English (C1)", "German (A2)"],
  education: [
    {
      title: "M.Sc. Computer and Information Science",
      organization: "University of Konstanz",
      period: "2025 - Present",
      bullets: [
        "Focus on computer vision, deep learning, and robotics",
        "Relevant topics: SLAM, machine learning, real-time systems",
        "E-DAVID program with emphasis on AI-driven data analysis"
      ]
    },
    {
      title: "B.Sc. Data Science and Big Data Technology",
      organization: "Shandong Jiaotong University",
      period: "2021 - 2025",
      bullets: [
        "GPA: 88.97/100 (Top 2/118)",
        "National Inspirational Scholarship; Jinan Scholarship; Shandong Outstanding Student",
        "Won national and provincial awards in the Huawei Kunpeng Innovation Competition, China International College Students' Innovation Competition, and Challenge Cup"
      ]
    }
  ],
  projects: [
    {
      id: "railway-monitoring", enabled: true, bulletLimit: 3,
      title: "Railway Safety Monitoring System", organization: "China Railway", period: "03.2023 - 12.2023",
      bullets: ["Built a real-time monitoring system using 30+ RTSP streams per site", "Deployed AI models on Jetson edge devices with a Kafka pipeline", "Implemented YOLOv7, SVM, and OCR for equipment state detection"]
    },
    {
      id: "drone-inspection", enabled: true, bulletLimit: 3,
      title: "Drone-Based Railway Inspection System", organization: "CHN Energy", period: "12.2024 - 05.2025",
      bullets: ["Developed defect detection using UAV image and video data", "Applied Qwen2.5-VL for visual reasoning and defect localization", "Built a knowledge graph for equipment fault analysis"]
    },
    {
      id: "autonomous-drone", enabled: true, bulletLimit: 4,
      title: "Autonomous Drone Navigation & Target Tracking", organization: "Bachelor's Thesis", period: "01.2025 - 06.2025",
      bullets: ["Implemented real-time face tracking using YOLOv11", "Integrated DepthAnything v2 for obstacle avoidance", "Built an end-to-end pipeline from video streaming to control", "Achieved autonomous navigation based on visual feedback"]
    },
    {
      id: "bearfit", enabled: false, bulletLimit: 3,
      title: "BearFit Multi-Device IMU Fitness Sensing", organization: "Personal Project", period: "2026 - Present",
      bullets: ["Combined phone, Apple Watch, earbuds, and IMU ring data for body-movement sensing", "Built synchronized multi-device streaming with MQTT and FastAPI", "Designed live workout tracking and motion feedback for normal gym use"]
    },
    {
      id: "music-universe", enabled: false, bulletLimit: 3,
      title: "Music Universe", organization: "Data Visualization Project", period: "2025",
      bullets: ["Mapped one million songs into an interactive visual universe", "Used XGBoost, PCA, and UMAP for genre and structure analysis", "Explored long-term patterns in the Million Song Dataset"]
    },
    {
      id: "braindance", enabled: false, bulletLimit: 2,
      title: "Brain Dance VR", organization: "VR Interaction Project", period: "2025",
      bullets: ["Built a recorded-memory experience inspired by Cyberpunk 2077", "Designed time scrubbing and layered clue-discovery interactions"]
    }
  ],
  experience: [
    { title: "Algorithm Engineer Intern", organization: "Youxiangtu Intelligent Technology", period: "06.2024 - 09.2024", bullets: ["Researched remote sensing object detection algorithms", "Explored Graph Neural Network methods"] },
    { title: "Web Engineer Intern", organization: "Baigong Information Technology", period: "06.2025 - 09.2025", bullets: ["Developed backend and frontend features for a construction activity monitoring platform", "Designed APIs and collaborated with engineering teams"] }
  ],
  publication: {
    title: "Lightweight Insulator Defect Detection Algorithm Based on UAV Perspective",
    bullets: ["Proposed a lightweight deep learning model for insulator defect detection in UAV images", "Published in Journal of Beijing University of Aeronautics and Astronautics (2025)"]
  }
};

window.RESUME_ZH = {
  profile: {
    name: "吴春坡",
    role: "人工智能 / 计算机视觉工程师",
    address: "德国康斯坦茨 Gustav-Schwab-Str 9，78467",
    summary: "康斯坦茨大学计算机科学硕士研究生，具备计算机视觉、深度学习与实时系统实践经验。擅长在边缘设备部署 AI 模型，并构建稳定可靠的数据处理管线。"
  },
  skills: ["计算机视觉", "Python 与 JAX", "视觉-语言-动作模型（VLA）", "大语言模型与视觉语言模型", "虚拟现实", "SLAM", "自主机器人", "团队领导力"],
  languages: ["中文（母语）", "英语（C1）", "德语（A2）"],
  education: [
    {
      title: "计算机与信息科学硕士",
      organization: "康斯坦茨大学",
      period: "2025 - 至今",
      bullets: ["研究方向：计算机视觉、深度学习与机器人", "相关领域：SLAM、机器学习与实时系统", "参与 E-DAVID 项目，聚焦人工智能驱动的数据分析"]
    },
    {
      title: "数据科学与大数据技术学士",
      organization: "山东交通学院",
      period: "2021 - 2025",
      bullets: ["平均成绩：88.97/100，专业排名 2/118", "国家励志奖学金；济南奖学金；山东省优秀学生", "以项目负责人身份多次在‘大创’、‘挑战杯’等 A 类赛事中获得国家级、省级奖项"]
    },
    {
      title: "服役经历",
      organization: "中国人民解放军陆军特种作战某旅",
      period: "2019 - 2021",
      bullets: ["获四有优秀士兵勋章、献身国防铜质勋章"]
    }
  ],
  projects: {
    "railway-monitoring": {
      title: "铁路安全监测系统", organization: "中国铁路", period: "2023.03 - 2023.12",
      bullets: ["构建单站点接入 30+ 路 RTSP 视频流的实时监测系统", "在 Jetson 边缘设备部署 AI 模型，并接入 Kafka 数据管线", "实现 YOLOv7、SVM 与 OCR 设备状态检测模块"]
    },
    "drone-inspection": {
      title: "无人机铁路巡检系统", organization: "国家能源集团", period: "2024.12 - 2025.05",
      bullets: ["基于无人机图像与视频数据开发缺陷检测系统", "应用 Qwen2.5-VL 进行视觉推理与缺陷定位", "构建设备故障分析知识图谱"]
    },
    "autonomous-drone": {
      title: "自主无人机导航与目标跟踪", organization: "本科毕业设计", period: "2025.01 - 2025.06",
      bullets: ["使用 YOLOv11 实现实时人脸跟踪", "集成 DepthAnything v2 完成障碍物规避", "构建从视频传输到飞行控制的端到端管线", "基于视觉反馈实现自主导航"]
    },
    bearfit: {
      title: "BearFit 多设备 IMU 健身感知系统", organization: "个人项目", period: "2026 - 至今",
      bullets: ["融合手机、Apple Watch、耳机与 IMU 戒指数据进行身体动作感知", "基于 MQTT 与 FastAPI 构建多设备同步数据流", "面向日常健身场景设计实时训练追踪与动作反馈"]
    },
    "music-universe": {
      title: "音乐宇宙", organization: "数据可视化项目", period: "2025",
      bullets: ["将一百万首歌曲映射为可交互探索的视觉宇宙", "使用 XGBoost、PCA 与 UMAP 分析音乐流派及结构", "基于 Million Song Dataset 探索长期音乐趋势"]
    },
    braindance: {
      title: "Brain Dance VR", organization: "虚拟现实交互项目", period: "2025",
      bullets: ["构建受《赛博朋克 2077》启发的录制记忆体验", "设计时间拖拽与分层线索发现交互"]
    }
  },
  experience: [
    { title: "算法工程师实习生", organization: "有向图智能科技", period: "2024.06 - 2024.09", bullets: ["研究遥感目标检测算法", "探索图神经网络方法及其应用"] },
    { title: "Web 工程师实习生", organization: "百工信息科技", period: "2025.06 - 2025.09", bullets: ["开发施工动态监测平台的后端与前端功能", "设计 API 并与工程团队协作完成系统集成"] }
  ],
  publication: {
    title: "无人机视角下的轻量化绝缘子缺陷检测算法",
    bullets: ["提出面向无人机图像绝缘子缺陷检测的轻量化深度学习模型", "发表于《北京航空航天大学学报》（2025）"]
  }
};
