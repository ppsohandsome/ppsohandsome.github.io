/* Long-form project narratives. Keep CV bullets concise in resume-data.js. */
window.PROJECT_DETAILS = {
  'parcel-sorting': {
    en: [
      {
        title: 'Problem and system scope',
        paragraphs: ['This team project connected a Nova5 robot, an Orbbec depth camera and a Schmalz vacuum gripper into one parcel-sorting cell. The system had to turn an image-space detection into a reachable grasp pose, execute the pick-and-place sequence and recover cleanly when perception or suction failed.'],
        facts: ['Python and Tkinter operator interface', 'YOLO detection with RGB-D input', 'TCP/IP robot control and digital I/O for the vacuum system']
      },
      {
        title: 'From pixels to a grasp pose',
        paragraphs: ['YOLO first isolates the parcel region. The corresponding depth pixels are converted into a local point cloud, filtered and analysed with Open3D and PCA to estimate a stable surface direction and candidate grasp point. Hand-eye calibration then maps that camera-frame result into robot coordinates; tool-centre-point offsets are applied before the final end-effector pose is sent to the Nova5.']
      },
      {
        title: 'Execution and failure handling',
        paragraphs: ['A state machine coordinates identification, approach, suction, transport and placement instead of issuing unrelated robot commands. While one parcel is being transported, the vision side can preselect the next candidate. Stability checks and duplicate removal prevent a moving or already handled parcel from immediately re-entering the queue, while motion recovery, status logs and live monitoring make failed cycles diagnosable.']
      },
      {
        title: 'Field validation',
        paragraphs: ['The integrated system was trialled for one month at a postal parcel distribution site in Jinan. This stage tested the complete perception-to-action loop under real parcel appearance, placement and operating conditions rather than only on a prepared laboratory sample.']
      }
    ],
    zh: [
      {
        title: '问题与系统范围',
        paragraphs: ['这是一个团队协作完成的包裹分拣系统，将 Nova5 机械臂、Orbbec 深度相机和 Schmalz 真空吸盘接入同一工作单元。系统不仅要检测包裹，还要把图像坐标转换为机械臂可执行的抓取位姿，完成吸取、搬运和放置，并在感知或吸附失败时恢复。'],
        facts: ['Python 与 Tkinter 操作界面', 'YOLO 检测与 RGB-D 输入', 'TCP/IP 机械臂控制及真空系统数字 I/O']
      },
      {
        title: '从图像到抓取位姿',
        paragraphs: ['首先由 YOLO 确定包裹区域，再将对应深度像素转换为局部点云。利用 Open3D 完成点云过滤，并通过 PCA 估计较稳定的表面方向和候选抓取点；随后使用手眼标定把相机坐标转换到机械臂坐标系，并补偿工具中心点偏移，得到最终末端位姿。']
      },
      {
        title: '执行流程与异常处理',
        paragraphs: ['识别、接近、吸附、搬运和放置由状态机统一协调，而不是分散执行机器人指令。搬运当前包裹时，视觉模块可提前筛选下一目标；稳定性检查与去重避免运动中的包裹或已处理目标重复进入队列，运动恢复、状态日志和实时监控则用于定位失败环节。']
      },
      {
        title: '现场验证',
        paragraphs: ['完整系统曾在济南市邮政快递集散点试运行一个月。该阶段验证的是实际包裹外观、摆放和现场运行条件下的整条感知到动作链路，而不只是实验室中的固定样例。']
      }
    ]
  },
  'autonomous-drone': {
    en: [
      {
        title: 'RGB-only flight objective',
        paragraphs: ['This independently developed Tello prototype combines vehicle following, monocular obstacle avoidance and scene reconstruction using the drone camera as the primary visual input. The central constraint was to derive useful motion and geometry cues without a dedicated depth sensor while keeping control responsive enough for flight.']
      },
      {
        title: 'Target following and control',
        paragraphs: ['YOLO provides vehicle detection across larger pose changes, while AprilTag supplies more accurate frontal distance cues when the marker is visible. The controller divides the image into a 7 by 7 grid and maps target displacement to flight velocity. Speed decreases in steps as the target approaches the image centre, from approximately 30 cm/s near the boundary to zero in the centre region, reducing oscillation around the desired view.']
      },
      {
        title: 'Monocular obstacle cues',
        paragraphs: ['Depth Anything v2 estimates a normalized depth map from each RGB frame. A horizontal Sobel operator highlights strong depth discontinuities, which are used as obstacle boundaries for steering decisions. This is a visual avoidance cue rather than metric depth sensing, so the pipeline is designed around relative structure and conservative flight tests.']
      },
      {
        title: 'Dynamic-scene reconstruction',
        paragraphs: ['MASt3R-SLAM handles initialization, tracking and relocalization for 3D reconstruction. To reduce corruption from the followed vehicle, the YOLO mask is expanded by three pixels, converted into an alpha mask and excluded from feature confidence and tracking. This keeps the static environment available to SLAM while suppressing the dominant moving object.']
      }
    ],
    zh: [
      {
        title: '仅依赖 RGB 的飞行目标',
        paragraphs: ['该项目独立实现 Tello 无人机的车辆跟随、单目动态避障和场景重建，主要视觉输入来自机载相机。核心约束是在没有专用深度传感器的情况下提取可用的运动与几何信息，同时让控制链路保持足够及时。']
      },
      {
        title: '目标跟随与飞行控制',
        paragraphs: ['YOLO 负责适应较大姿态变化的车辆检测，AprilTag 在正面可见时提供更准确的距离参考。控制器将画面划分为 7×7 网格，根据目标偏离中心的程度映射飞行速度；目标从边缘接近中心时，速度按约 10 cm/s 的步长由 30 cm/s 降至 0，从而降低中心附近的来回振荡。']
      },
      {
        title: '单目障碍线索',
        paragraphs: ['Depth Anything v2 从 RGB 帧预测归一化深度图，再通过水平方向 Sobel 算子提取明显的深度突变，作为转向决策中的障碍边界。这里使用的是相对深度和结构线索，而不是米制深度，因此实验以受控、保守的飞行为边界。']
      },
      {
        title: '动态场景三维重建',
        paragraphs: ['三维部分使用 MASt3R-SLAM 处理初始化、跟踪与重定位。为避免被跟随车辆破坏静态地图，系统将 YOLO 掩膜向外扩展 3 个像素并转换为 Alpha 掩膜，把覆盖区域的特征置信度置零并跳过跟踪，在保留静态环境特征的同时抑制主要运动目标。']
      }
    ]
  },
  'drone-inspection': {
    en: [
      {
        title: 'Inspection problem and data',
        paragraphs: ['The project targets UAV inspection for CHN Energy Xinshuo Railway. Its data volume exceeds 100 TB and includes more than 50 equipment and defect categories, such as insulators, pins and W-locks. The main difficulty is that many defects occupy only a small region of a large aerial image and vary strongly with viewpoint, scale and background.']
      },
      {
        title: 'Small-object detection',
        paragraphs: ['The detection branch was optimized for railway components and subtle defects rather than generic objects. Training and evaluation focused on preserving small targets through the feature hierarchy and producing locations that can be reviewed in the original UAV imagery. This work also formed the basis of the published lightweight insulator-defect detection paper.']
      },
      {
        title: 'Visual-language reasoning',
        paragraphs: ['Qwen2.5-VL was introduced as a complementary reasoning layer for defect localization and zero/few-shot analysis. The visual-language model is used where class descriptions, contextual relationships or limited examples are useful; it does not replace the deterministic detector for every frame. This separation keeps high-volume screening and open-ended visual interpretation as distinct stages.']
      },
      {
        title: 'Equipment knowledge graph',
        paragraphs: ['A knowledge graph links equipment, visible defects and possible fault descriptions so that model outputs are not left as isolated labels. It provides a structured vocabulary for downstream retrieval and reporting, and creates a bridge between image evidence and maintenance-oriented fault analysis.']
      }
    ],
    zh: [
      {
        title: '巡检问题与数据范围',
        paragraphs: ['项目面向国家能源集团新朔铁路无人机巡检，数据规模超过 100 TB，覆盖绝缘子、销钉、W 锁等 50 余类设备与缺陷。主要难点是许多缺陷在大幅航拍图中占比很小，并且会受到视角、尺度和复杂背景影响。']
      },
      {
        title: '小目标缺陷检测',
        paragraphs: ['检测分支针对铁路部件和细微缺陷进行优化，而不是直接沿用通用目标检测配置。训练与评估重点关注小目标特征在网络层级中的保留，并将检测位置准确映射回原始无人机图像，便于人工复核；相关工作也形成了轻量化绝缘子缺陷检测论文。']
      },
      {
        title: '视觉语言推理',
        paragraphs: ['项目引入 Qwen2.5-VL 作为补充推理层，用于缺陷定位及零样本、少样本分析。VLM 更适合利用类别描述、上下文关系和少量示例，不直接替代逐帧确定性检测器；高通量筛查与开放式视觉理解因此保持为两个边界清晰的阶段。']
      },
      {
        title: '设备故障知识图谱',
        paragraphs: ['知识图谱连接设备、可见缺陷与可能故障描述，避免模型输出停留在孤立标签层面。它为后续检索和报告提供统一的结构化词汇，也把图像证据与面向检修的故障分析连接起来。']
      }
    ]
  },
  'railway-monitoring': {
    en: [
      {
        title: 'Multi-stream edge deployment',
        paragraphs: ['The system monitors railway maintenance depots with more than 30 concurrent 1080p RTSP streams at each site. Jetson hardware decoding and a DeepStream inference pipeline keep video processing on the edge, avoiding a design that forwards every raw stream to a central server.']
      },
      {
        title: 'Two-stage perception',
        paragraphs: ['Primary detection locates operational equipment and train regions, including pantographs, isolating switches and train noses. Secondary models then handle state classification and OCR tasks such as plate-number recognition. Separating localization from specialized interpretation makes the per-task models easier to tune and deploy.']
      },
      {
        title: 'Real-time data flow',
        paragraphs: ['Kafka and MQTT connect inference events with the surrounding monitoring system. The processing path was designed to consume the newest frames rather than build an ever-growing queue, keeping end-to-end latency below 0.3 seconds and preventing accumulated delay during continuous daily operation.']
      },
      {
        title: 'Deployment status',
        paragraphs: ['The monitoring solution has been deployed in Chongqing and on the Chuzhou-Nanjing section. A Mexico deployment also completed its pre-delivery stage, requiring the inference and integration workflow to be packaged beyond a single development machine.']
      }
    ],
    zh: [
      {
        title: '多路视频边缘部署',
        paragraphs: ['系统面向铁路检修地库，单站点需要同时处理 30 路以上 1080p RTSP 视频。Jetson 硬件解码与 DeepStream 推理流水线把主要视频计算保留在边缘端，避免将全部原始视频持续回传至中心服务器。']
      },
      {
        title: '两级视觉感知',
        paragraphs: ['一级检测负责定位受电弓、隔离开关、车头等设备与列车区域，二级模型进一步完成设备状态分类和车牌号 OCR 等专门任务。将区域定位与细粒度判别分开，可以分别调优不同任务并降低部署耦合。']
      },
      {
        title: '实时数据链路',
        paragraphs: ['Kafka 与 MQTT 将推理事件接入现场监控系统。处理链路优先消费最新帧，而不是让视频帧在队列中持续堆积，使端到端延迟保持在 0.3 秒以内，并避免全天连续运行后产生累计延时。']
      },
      {
        title: '部署情况',
        paragraphs: ['方案已在重庆和滁宁段部署运行，墨西哥段也完成预交付。这意味着推理、消息和现场集成流程需要被整理成可交付系统，而不是只在单台开发机上运行。']
      }
    ]
  },
  'zilo-ring': {
    en: [
      {
        title: 'Input concept',
        paragraphs: ['Zilo Ring explores whether very small finger motions can become a low-bandwidth input method. A downward motion represents 0, an upward motion represents 1 and a rapid double gesture confirms the current sequence. The confirmed binary sequence is decoded through a Morse-style mapping to produce text.']
      },
      {
        title: 'Acquisition and signal conditioning',
        paragraphs: ['A desktop application receives accelerometer and gyroscope samples from the ring over BLE without blocking the interface. The raw stream passes through bias correction and filtering before recognition, reducing the effect of sensor offset and high-frequency jitter while retaining the short waveform of a deliberate micro-gesture.']
      },
      {
        title: 'Temporal recognition pipeline',
        paragraphs: ['Recognition starts with temporal segmentation rather than classifying every sample independently. Candidate motion windows are compared with recorded waveform examples using a temporal KNN approach. Negative examples, out-of-distribution checks and low-confidence rejection prevent every incidental finger movement from being forced into 0, 1 or confirm.']
      },
      {
        title: 'Experiment and diagnostics',
        paragraphs: ['The current video demonstrates text entry through subtle finger movement rather than a conventional keyboard. Accepted and rejected candidates are logged together with raw and bias-corrected IMU data, so threshold changes and recognition errors can be traced back to the actual sensor waveform.']
      }
    ],
    zh: [
      {
        title: '输入方式',
        paragraphs: ['Zilo Ring 探索如何把手指细微运动转化为低带宽输入。向下微动表示 0，向上微动表示 1，快速双次动作确认当前序列；确认后的二进制序列再通过类似摩斯码的映射转换为文本。']
      },
      {
        title: '采集与信号处理',
        paragraphs: ['桌面端通过 BLE 接收戒指的加速度计和陀螺仪数据，同时避免阻塞界面线程。原始数据在识别前完成偏置校正与滤波，降低传感器静态偏移和高频抖动的影响，同时尽量保留短促微手势的时序波形。']
      },
      {
        title: '时序识别链路',
        paragraphs: ['系统先做动作时序分段，而不是独立分类每一个采样点。候选动作窗口通过时序波形 KNN 与已录制样本比较，并加入负样本、分布外检查和低置信度拒识，避免把每次无意的手指运动都强制判为 0、1 或确认。']
      },
      {
        title: '实验与诊断',
        paragraphs: ['当前视频演示了不用传统键盘、仅通过手指细微运动完成文本输入的过程。系统同时记录接受与拒绝的候选动作、原始 IMU 和偏置校正后数据，使阈值调整和误识别可以追溯到具体传感器波形。']
      }
    ]
  },
  bearfit: {
    en: [
      {
        title: 'Multi-device sensing',
        paragraphs: ['BearFit is a workout-sensing prototype that combines motion signals already available around the body. The iPhone contributes device IMU data, AirPods provide head-related motion, Apple Watch samples are transferred to the phone through WatchConnectivity, and the later ring extension adds independent left- and right-hand IMU streams.']
      },
      {
        title: 'Collection and transport',
        paragraphs: ['The iOS side stores sessions as JSONL so raw samples remain inspectable after a workout. On the local network, phone, AirPods and Watch samples are published to separate MQTT topics. Linux receivers append each session to backend/mqtt_data, and the subscriber design allows recording, visualization and experimental processing to consume the same stream without coupling them into one process.']
      },
      {
        title: 'Ring integration',
        paragraphs: ['Ring bridges translate the BLE IMU feed into the same transport model used by the other devices, including support for multiple rings. Keeping source identity and timing information separate makes it possible to compare wrist, head, phone and finger motion instead of prematurely merging them into one opaque feature vector.']
      },
      {
        title: 'Analysis experiments',
        paragraphs: ['The backend contains experiments for movement segmentation, repetition and progress estimation, completion-model training and pose fusion. These modules are evaluated as building blocks for exercise understanding: first align and inspect the sensor streams, then derive features and compare model output with the visible movement, rather than presenting a single unverified fitness score.']
      }
    ],
    zh: [
      {
        title: '多设备身体感知',
        paragraphs: ['BearFit 是一个融合身体周围多种运动传感器的健身感知原型。iPhone 提供机身 IMU，AirPods 提供头部相关运动，Apple Watch 数据通过 WatchConnectivity 传回手机，后续加入的左右手 IMU 戒指则补充独立的手指与手部运动数据。']
      },
      {
        title: '采集与传输',
        paragraphs: ['iOS 端将训练过程保存为 JSONL，便于在运动结束后直接检查原始采样。局域网中，手机、AirPods 和手表数据发布到相互独立的 MQTT 主题；Linux 接收端按 session 写入 backend/mqtt_data，并允许记录、可视化和实验处理模块同时订阅同一数据流。']
      },
      {
        title: '戒指接入',
        paragraphs: ['戒指桥接程序把 BLE IMU 数据转换为与其他设备一致的传输形式，并支持多戒指输入。设备来源和时间信息保持独立，使手腕、头部、手机与手指运动能够对齐比较，而不是过早合并成难以解释的单一特征。']
      },
      {
        title: '分析实验',
        paragraphs: ['后端包含动作分段、次数与进度估计、完成度模型训练和姿态融合等实验模块。当前定位是逐步验证健身动作理解的组成部分：先对齐并检查多源数据，再提取特征并把模型输出与可见动作对照，而不是直接给出缺乏验证的单一健身评分。']
      }
    ]
  },
  'soarm-vision': {
    en: [
      {
        title: 'Vision-to-action prototype',
        paragraphs: ['This personal prototype explores how a large-model API can interpret a camera view and drive a SO-ARM101 interaction. The goal is not to stream every frame to the model, but to preserve enough object and motion context for the model to decide what changed and what action should follow.']
      },
      {
        title: 'Tracking before model calls',
        paragraphs: ['Optical flow carries visual points and object regions between frames locally. When the tracked scene remains stable, the system can reuse existing observations instead of repeatedly uploading a full-resolution image. A fresh visual request is reserved for meaningful motion, tracking loss or a task step that needs renewed interpretation.']
      },
      {
        title: 'Simplified scene graph',
        paragraphs: ['Tracked entities and their relationships are represented as a compact scene graph. The model receives object identity, relative state and observed changes rather than an undifferentiated sequence of images, reducing visual-token input and making the reason for an action easier to inspect.']
      },
      {
        title: 'Current boundary',
        paragraphs: ['The work is an experimental interaction pipeline rather than a validated autonomous manipulation product. Its reliability still depends on scene complexity, optical-flow stability and the external model response, so the project focuses on reducing redundant perception calls and exposing intermediate state.']
      }
    ],
    zh: [
      {
        title: '视觉到动作原型',
        paragraphs: ['该个人项目探索如何让大模型 API 理解相机画面并驱动 SO-ARM101 交互。目标不是把每一帧都上传给模型，而是保留足够的目标与运动上下文，让模型判断场景发生了什么变化以及下一步应执行什么动作。']
      },
      {
        title: '模型调用前的本地跟踪',
        paragraphs: ['光流在本地连续帧之间传递特征点和目标区域。场景保持稳定时，系统复用已有观察，不重复上传完整高分辨率图像；只有出现明显运动、跟踪丢失或任务步骤需要重新理解时，才请求新的视觉分析。']
      },
      {
        title: '简化场景图',
        paragraphs: ['被跟踪的实体及其关系被整理为紧凑场景图。大模型接收的是目标身份、相对状态和已观察变化，而不是没有结构的连续图像，从而减少视觉 Token 输入，也让动作依据更容易检查。']
      },
      {
        title: '当前边界',
        paragraphs: ['目前它是实验性交互链路，不是经过完整验证的自主操作产品。可靠性仍受场景复杂度、光流稳定性和外部模型响应影响，因此项目重点放在减少冗余感知调用和暴露中间状态。']
      }
    ]
  },
  'llm-gateway': {
    en: [
      {
        title: 'Why a unified gateway',
        paragraphs: ['Applications often need to switch between Claude, OpenAI, DeepSeek and Kimi without rewriting every integration. This maintained gateway exposes one service entry point and keeps provider-specific endpoints, model names and request differences behind an adapter layer.']
      },
      {
        title: 'Request path',
        paragraphs: ['A client submits a request through the unified interface, selects the intended model and receives a normalized response path. Provider adapters translate the shared request into the corresponding upstream format, so application code can remain focused on its own prompt and output handling.']
      },
      {
        title: 'Operational focus',
        paragraphs: ['The project is run as a public-facing service rather than only a local API experiment. Maintenance work therefore centres on interface consistency, provider compatibility and keeping the access point usable as upstream model services evolve. Commercial and traffic figures are intentionally not published.']
      }
    ],
    zh: [
      {
        title: '为什么需要统一入口',
        paragraphs: ['应用在 Claude、OpenAI、DeepSeek 和 Kimi 之间切换时，不应反复重写整套接入代码。该中转站提供统一服务入口，并用适配层隔离各供应商的接口地址、模型命名和请求差异。']
      },
      {
        title: '请求链路',
        paragraphs: ['客户端通过统一接口提交请求并选择目标模型，服务端再将公共请求转换为对应上游格式，并返回统一的响应链路。这样应用侧可以把重点放在提示词和输出处理，而不是在每个模型供应商的协议差异之间切换。']
      },
      {
        title: '运营重点',
        paragraphs: ['该项目作为公开可访问的服务持续维护，而不只是本地 API 实验。因此维护重点是接口一致性、供应商兼容性，以及在上游模型服务变化时保持入口可用；商业和流量数据不公开。']
      }
    ]
  },
  braindance: {
    en: [
      {
        title: 'Recorded-memory experience',
        paragraphs: ['Inspired by Cyberpunk 2077, this team project treats a captured scene as a memory that can be revisited rather than a linear video. The user moves through the reconstructed space, scrubs time and switches sensory layers to uncover clues embedded in the event.']
      },
      {
        title: 'Time and sensory layers',
        paragraphs: ['A Unity timeline maps the recorded sequence to a normalized 0-1, or 0-100, control range so controller input can move backward and forward through the memory. Visual, auditory and infrared/X-ray modes alter materials, lighting and surfaces, exposing information that is deliberately hidden in the default view.']
      },
      {
        title: 'Interaction design',
        paragraphs: ['Swimming-style locomotion makes navigation feel different from ordinary joystick walking. Controller scanner triggers highlight relevant objects and open clue canvases, while area limits, NPC placement and story events keep the player inside the intended narrative path.']
      },
      {
        title: 'Reconstructed environment',
        paragraphs: ['The scene uses the Unity Gaussian Splatting package to import a reconstructed PLY environment. Runtime controls adjust the RGB contribution of Gaussian points for sensory transitions, while thermal materials and object-level swaps provide clearer interactive states where raw reconstruction alone is insufficient.']
      }
    ],
    zh: [
      {
        title: '录制记忆体验',
        paragraphs: ['该团队项目受《赛博朋克 2077》启发，将采集场景设计成可反复进入的记忆，而不是线性视频。体验者可以在重建空间中移动、拖拽时间，并切换不同感知层寻找事件中隐藏的线索。']
      },
      {
        title: '时间与感知层',
        paragraphs: ['Unity 时间轴把录制过程映射到归一化的 0-1 或 0-100 控制范围，使手柄输入可以让记忆前进或回退。视觉、听觉和红外/X-ray 模式通过改变材质、光照与表面状态，展示默认视角中不可见的信息。']
      },
      {
        title: '交互设计',
        paragraphs: ['游泳式移动让空间导航区别于普通摇杆行走。手柄扫描触发器负责高亮相关物体并弹出线索画布，区域限制、NPC 位置与剧情事件则把玩家约束在预期叙事路径内。']
      },
      {
        title: '重建环境',
        paragraphs: ['场景通过 Unity Gaussian Splatting 插件导入 PLY 重建环境，并在运行时调整高斯点的 RGB 分量完成感知模式过渡。当原始重建难以表达明确交互状态时，再结合热成像材质和物体级材质切换增强可读性。']
      }
    ]
  },
  'music-universe': {
    en: [
      {
        title: 'From catalogue to spatial map',
        paragraphs: ['The project turns the Million Song Dataset into an explorable 3D map instead of a conventional list. A labelled CD2C subset of 191,401 tracks across 15 genres provides supervision, and the learned genre labels are then transferred to the larger one-million-track collection.']
      },
      {
        title: 'Genre classification',
        paragraphs: ['XGBoost was selected to work with the tabular audio descriptors and the uneven class distribution in the labelled data. The classifier creates a consistent genre layer for the larger catalogue; it is used as an organizational signal, not as a claim that every song has one objectively correct genre.']
      },
      {
        title: 'Dimensionality reduction',
        paragraphs: ['The feature space is reduced from 272 dimensions to 50 with PCA before UMAP embeds it into three dimensions. PCA first removes redundancy and lowers computational load, while UMAP produces the final neighbourhood structure used by the interactive visualization.']
      },
      {
        title: 'Exploring musical change',
        paragraphs: ['Tracks can be explored by position, genre and time in the 3D universe. For each genre and year, the project also calculates a centroid in the embedding and links those points from 1955 to 2010, creating a compact trajectory of how the dataset representation shifts over time.']
      }
    ],
    zh: [
      {
        title: '从曲库到空间地图',
        paragraphs: ['项目将 Million Song Dataset 转换为可探索的三维地图，而不是传统歌曲列表。首先使用包含 191,401 首歌曲、覆盖 15 种流派的 CD2C 标注子集进行监督学习，再把预测出的流派标签扩展到一百万首歌曲的数据集。']
      },
      {
        title: '流派分类',
        paragraphs: ['XGBoost 用于处理表格化音频描述特征以及标注数据中的类别不平衡。分类器为大规模曲库提供一致的组织维度，但流派在这里是可视化信号，并不意味着每首歌都只有唯一、绝对正确的流派。']
      },
      {
        title: '降维流程',
        paragraphs: ['特征先通过 PCA 从 272 维降至 50 维，再由 UMAP 嵌入三维空间。PCA 用于去除冗余并降低计算量，UMAP 则生成最终交互可视化所使用的邻域结构。']
      },
      {
        title: '观察音乐变化',
        paragraphs: ['用户可以在三维音乐宇宙中按照位置、流派和时间探索歌曲。项目还计算每个流派在每一年的三维质心，并连接 1955 至 2010 年的质心点，以紧凑轨迹展示数据表示随时间的变化。']
      }
    ]
  }
};
