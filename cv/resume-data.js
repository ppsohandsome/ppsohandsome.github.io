window.RESUME_DATA = {
  profile: {
    name: "CHUNPO WU",
    role: "AI / Computer Vision Engineer",
    phones: ["+49 15252633669", "+86 13813166007"],
    email: "chunpo.wu@uni-konstanz.de",
    emails: ["chunpo.wu@uni-konstanz.de", "pphaoshuaia@gmail.com"],
    address: "Gustav-Schwab-Str 9, Konstanz, Germany, 78467",
    photo: "./images/people/personal2.png",
    summary: "M.Sc. student at University of Konstanz with hands-on experience in robot perception and control, edge vision deployment, LLM fine-tuning, RAG and knowledge graphs."
  },
  skills: ["Computer Vision", "Python & JAX", "Vision-Language-Action (VLA)", "LLMs & Vision-Language Models", "Virtual Reality", "SLAM", "Autonomous Robots", "Leadership"],
  languages: ["Chinese (Native)", "English (IELTS 6.5)", "German (A2)"],
  education: [
    {
      id: "msc-konstanz",
      title: "M.Sc. Computer and Information Science",
      organization: "University of Konstanz",
      period: "2025 - Present",
      bullets: [
        "Focus on computer vision, deep learning, and robotics",
        "International student tuition fee exemption scholarship",
        "E-DAVID painting robot project"
      ]
    },
    {
      id: "bsc-sdjt",
      title: "B.Sc. Data Science and Big Data Technology",
      organization: "Shandong Jiaotong University",
      period: "2021 - 2025",
      bullets: [
        "GPA: 88.97/100 (Top 2/118)",
        "National Inspirational Scholarship; Jinan Scholarship; Outstanding Graduation Thesis; Shandong Outstanding Student (2025)",
        "Won national and provincial awards in the Huawei Kunpeng Innovation Competition, China International College Students' Innovation Competition, and Challenge Cup"
      ]
    }
  ],
  projects: [
    {
      id: "parcel-sorting", enabled: true, bulletLimit: 2,
      title: "Intelligent Parcel Sorting System", organization: "Team Project", period: "03.2026 - Present",
      bullets: ["Collaborated on parcel recognition, grasping and placement with a Dobot Nova5, Orbbec depth camera and Schmalz vacuum gripper", "Combined YOLO and point clouds for grasp points, surface normals, hand-eye transforms and TCP compensation", "Integrated robot motion, vacuum I/O and a pick-and-place state machine", "Added next-target preselection, deduplication, failure recovery and monitoring; trialled at a Jinan postal parcel distribution site for one month"]
    },
    {
      id: "railway-monitoring", enabled: true, bulletLimit: 3,
      title: "Railway Safety Monitoring System", organization: "China Railway Huat Tie", period: "09.2023 - 08.2024",
      bullets: ["Built a real-time monitoring system using 30+ 1080p RTSP streams per site", "Integrated Jetson hardware decoding, DeepStream inference and secondary inference", "Connected equipment recognition results through Kafka and MQTT"]
    },
    {
      id: "drone-inspection", enabled: true, bulletLimit: 3,
      title: "Drone-Based Railway Inspection System", organization: "CHN Energy", period: "12.2024 - 05.2025",
      bullets: ["Developed UAV defect detection for over 50 equipment and defect categories", "Applied Qwen2.5-VL for visual reasoning, defect localization and zero/few-shot inference", "Built an equipment fault knowledge graph and supported a 100+ TB inspection dataset"]
    },
    {
      id: "autonomous-drone", enabled: true, bulletLimit: 4,
      title: "Autonomous Drone Navigation & Target Tracking", organization: "Bachelor's Thesis", period: "01.2025 - 06.2025",
      bullets: ["Independently developed vehicle tracking using YOLOv11, AprilTag and image-grid flight control", "Combined Depth Anything v2 and horizontal Sobel gradients for obstacle avoidance", "Integrated MASt3R-SLAM with dynamic-object masks and confidence filtering", "Built an end-to-end pipeline from Tello video streaming to perception and flight control"]
    },
    {
      id: "bearfit", enabled: false, bulletLimit: 3,
      title: "BearFit Multi-Device IMU Fitness Sensing", organization: "Personal Project", period: "09.2024 - 04.2025; later ring extension",
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
      bullets: ["Built a recorded-memory experience inspired by Cyberpunk 2077 on Quest 3 and Unity", "Integrated 3D Gaussian Splatting scenes with time scrubbing, memory replay and layered clue discovery"]
    },
    {
      id: "soarm-vision", enabled: false, bulletLimit: 2,
      title: "LeRobot SO-ARM101 Visual Interaction", organization: "Personal Project", period: "2026",
      bullets: ["Connected large-model APIs to a vision-to-robot-action interaction pipeline", "Used optical-flow tracking and simplified scene graphs to reduce full-frame uploads and visual token usage"]
    },
    {
      id: "llm-gateway", enabled: false, bulletLimit: 2,
      title: "LLM API Gateway", organization: "Personal Project", period: "02.2025 - Present",
      bullets: ["Built and operate a unified API entry point for Claude, OpenAI, DeepSeek and Kimi", "Provide ongoing model access services at https://aaccx.pw/"]
    }
  ],
  experience: [
    { id: "algorithm-intern", title: "LLM Engineer", organization: "Shandong Youxiangtu Intelligent Technology", period: "09.2025 - 02.2026", bullets: ["Developed LLM fine-tuning, RAG and knowledge graphs for intelligent museum and scenic-site guides", "Supported projects for the China National Tea Museum in Hangzhou and Quzhou Ancient City"] },
    { id: "railway-engineer", title: "Algorithm Engineer", organization: "China Railway Huat Tie Engineering Design Group", period: "09.2023 - 08.2024", bullets: ["Led intelligent maintenance module development for railway depots in Mexico, Chongqing and the Chuzhou-Nanjing section", "Integrated communications, algorithms and DDC cabinets from the ground up"] },
    { id: "web-intern", title: "Web Engineer Intern", organization: "Baigong Information Technology", period: "06.2025 - 09.2025", bullets: ["Developed backend and frontend features for a construction activity monitoring platform", "Designed APIs and collaborated with engineering teams"] }
  ],
  publications: [
    {
      id: "svd-imoe",
      title: "SVD-IMOE: Pretrained Spectral Directions as Implicit Routers for Low-Rank Adaptation",
      bullets: ["ICLR 2027 submission in progress"]
    },
    {
      id: "insulator-uav",
      title: "Lightweight Insulator Defect Detection Algorithm Based on UAV Perspective",
      bullets: ["Proposed a lightweight deep learning model for insulator defect detection in UAV images", "Published in Journal of Beijing University of Aeronautics and Astronautics (2025)"]
    },
    {
      id: "mapf-wt-rbf",
      title: "Multi-agent Path Finding Based on WT-RBF Linear and Feature Enhancement",
      bullets: ["Co-authored a DHC-based MAPF method integrating CBAM, WT-RBF Linear, and conflict resolution", "Published in Journal of Nanjing University of Posts and Telecommunications (Natural Science Edition) (2026); achieved a 96.5% average success rate"]
    }
  ]
};

window.RESUME_ZH = {
  profile: {
    name: "吴春坡",
    role: "人工智能 / 计算机视觉工程师",
    address: "德国康斯坦茨 Gustav-Schwab-Str 9，78467",
    summary: "康斯坦茨大学硕士研究生，具备机器人感知与控制、边缘视觉部署、LLM 微调、RAG 与知识图谱实践经验。"
  },
  skills: ["计算机视觉", "Python 与 JAX", "视觉-语言-动作模型（VLA）", "大语言模型与视觉语言模型", "虚拟现实", "SLAM", "自主机器人", "团队领导力"],
  languages: ["中文（母语）", "英语（雅思 6.5）", "德语（A2）"],
  education: [
    {
      id: "msc-konstanz",
      title: "计算机与信息科学硕士",
      organization: "康斯坦茨大学",
      period: "2025 - 至今",
      bullets: ["研究方向：计算机视觉、深度学习与机器人", "国际学生学费减免奖学金", "参与绘画机器人 E-DAVID 项目"]
    },
    {
      id: "bsc-sdjt",
      title: "数据科学与大数据技术学士",
      organization: "山东交通学院",
      period: "2021 - 2025",
      bullets: ["平均成绩：88.97/100，专业排名 2/118", "国家励志奖学金；济南奖学金；优秀毕业（论文）设计；2025 年度山东省优秀学生", "以项目负责人身份多次在‘大创’、‘挑战杯’等 A 类赛事中获得国家级、省级奖项"]
    },
    {
      id: "military-service",
      title: "服役经历",
      organization: "中国人民解放军陆军特种作战某旅",
      period: "2019 - 2021",
      bullets: ["获四有优秀士兵勋章、献身国防铜质勋章"]
    }
  ],
  projects: {
    "parcel-sorting": {
      title: "快递站智能分拣系统", organization: "团队协作项目", period: "2026.03 - 至今",
      bullets: ["团队协作，结合越疆 Nova5、Orbbec 深度相机与 Schmalz 真空吸盘实现包裹识别、抓取与放置", "结合 YOLO 与深度点云计算抓取点、表面法线，完成手眼变换、末端姿态与 TCP 偏移补偿", "集成机械臂运动与真空 I/O 控制，构建识别、抓取、搬运及放置状态机", "实现目标预选、去重、失败恢复与实时监控；已在济南市邮政快递集散点试运行一个月"]
    },
    "railway-monitoring": {
      title: "铁路安全视频监测系统", organization: "中铁华铁", period: "2023.09 - 2024.08",
      bullets: ["构建单站点接入 30+ 路 1080p RTSP 视频流的实时监测系统", "打通 Jetson 硬件解码、DeepStream 推理与二次推理流程", "通过 Kafka 与 MQTT 传递设备识别结果，完成系统集成"]
    },
    "drone-inspection": {
      title: "无人机铁路巡检系统", organization: "国家能源集团", period: "2024.12 - 2025.05",
      bullets: ["面向超过 50 类设备及缺陷目标开发无人机小目标检测算法", "应用 Qwen2.5-VL 进行视觉推理、缺陷定位与零样本、少样本推理", "构建设备故障知识图谱，支持超 100 TB 巡检数据库建设"]
    },
    "autonomous-drone": {
      title: "自主无人机导航与目标跟踪", organization: "本科毕业设计", period: "2025.01 - 2025.06",
      bullets: ["独立开发，融合 YOLOv11、AprilTag 与图像网格控制实现目标车辆跟踪", "结合 Depth Anything v2 与 Sobel 水平梯度实现动态避障", "集成 MASt3R-SLAM，通过动态目标掩膜与置信度过滤降低地图干扰", "完成 Tello 视频流、视觉感知到飞行控制的端到端集成"]
    },
    bearfit: {
      title: "BearFit 多设备 IMU 健身感知系统", organization: "个人项目", period: "2024.09 - 2025.04；后续扩展戒指",
      bullets: ["融合手机、Apple Watch、耳机与 IMU 戒指数据进行身体动作感知", "基于 MQTT 与 FastAPI 构建多设备同步数据流", "面向日常健身场景设计实时训练追踪与动作反馈"]
    },
    "music-universe": {
      title: "音乐宇宙", organization: "数据可视化项目", period: "2025",
      bullets: ["将一百万首歌曲映射为可交互探索的视觉宇宙", "使用 XGBoost、PCA 与 UMAP 分析音乐流派及结构", "基于 Million Song Dataset 探索长期音乐趋势"]
    },
    braindance: {
      title: "Brain Dance VR", organization: "虚拟现实交互项目", period: "2025",
      bullets: ["基于 Quest 3 与 Unity 构建受《赛博朋克 2077》启发的录制记忆体验", "引入 3D Gaussian Splatting 实景重建，结合时间拖拽、记忆回放与分层线索发现"]
    },
    "soarm-vision": {
      title: "LeRobot SO-ARM101 视觉交互机械臂", organization: "个人项目", period: "2026",
      bullets: ["接入大模型 API，构建从视觉输入到机械臂动作的交互流程", "结合光流跟踪与简化场景图，减少完整图像上传与视觉 Token 开销"]
    },
    "llm-gateway": {
      title: "大模型 API 中转站", organization: "个人项目", period: "2025.02 - 至今",
      bullets: ["构建 Claude、OpenAI、DeepSeek、Kimi 等模型的统一 API 访问入口", "持续提供模型调用服务：https://aaccx.pw/"]
    }
  },
  experience: [
    { id: "algorithm-intern", title: "LLM 工程师", organization: "山东有向图智能科技有限公司", period: "2025.09 - 2026.02", bullets: ["负责智能讲解器的 LLM 微调、RAG 与知识图谱构建", "服务杭州中国茶叶博物馆及衢州古城项目"] },
    { id: "railway-engineer", title: "算法工程师", organization: "中铁华铁工程设计集团有限公司", period: "2023.09 - 2024.08", bullets: ["牵头墨西哥、重庆及滁宁段铁路检修地库智能维保模块建设", "从零完成通信系统、算法模块与 DDC 柜的一体化构建"] },
    { id: "web-intern", title: "Web 工程师实习生", organization: "百工信息科技", period: "2025.06 - 2025.09", bullets: ["开发施工动态监测平台的后端与前端功能", "设计 API 并与工程团队协作完成系统集成"] }
  ],
  publications: [
    {
      id: "svd-imoe",
      title: "SVD-IMOE: Pretrained Spectral Directions as Implicit Routers for Low-Rank Adaptation",
      bullets: ["ICLR 2027 投稿中"]
    },
    {
      id: "insulator-uav",
      title: "无人机视角下的轻量化绝缘子缺陷检测算法",
      bullets: ["提出面向无人机图像绝缘子缺陷检测的轻量化深度学习模型", "发表于《北京航空航天大学学报》（2025）"]
    },
    {
      id: "mapf-wt-rbf",
      title: "基于 WT-RBF Linear 与特征增强的多机器人路径规划",
      bullets: ["参与提出基于 DHC 的多机器人路径规划方法，引入 CBAM、WT-RBF Linear 与冲突消解策略", "发表于《南京邮电大学学报（自然科学版）》（2026）；平均成功率达到 96.5%"]
    }
  ]
};
