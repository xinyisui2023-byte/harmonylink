// ==================== 合力生态平台 Mock数据层 ====================

const MOCK_DATA = {
  user: {
    id: '1', nickname: '科技爱好者', avatar: '🧑‍💻',
    points: 1000, willpower: 5000, willpowerMonthly: 1200,
    rank: 128, level: 2, honorsClaimed: [], orders: [],
    checkinToday: false, email: '',
    // 多积分体系
    hp: 1000,     // 消费积分（HP）- 基础积分，可消费、可兑换商品
    exp: 350,     // 指数评价积分（EXP）- 专业贡献，1 EXP = 0.5 HP
    watch: 280,   // 观看互动积分（WATCH）- 日常行为，1 WATCH = 0.2 HP
    gov: 50       // 治理积分（GOV）- 治理权，1 GOV = 1.2 HP
  },
  // 积分兑换汇率（单向兑换，仅支持非HP积分兑换为HP）
  pointsExchange: {
    'exp': { rate: 0.5, name: '指数评价积分', icon: '📊', color: '#8B5CF6' },
    'watch': { rate: 0.2, name: '观看互动积分', icon: '📺', color: '#F18F01' },
    'gov': { rate: 1.2, name: '治理积分', icon: '🗳️', color: '#10B981' }
  },
  // 积分池数据（展示平台整体积分经济模型）
  pointsPool: {
    totalHP: 50000000,       // 总铸造HP
    circulatingHP: 32000000, // 流通HP
    destroyedHP: 8000000,    // 已销毁HP
    sponsorReserve: 10000000 // 赞助商储备金
  },
  levels: [
    { id: 0, name: '基础级', minWp: 0, maxWp: 999, color: '#6B7280', icon: '🌱', perks: '基础功能访问' },
    { id: 1, name: '进阶级', minWp: 1000, maxWp: 4999, color: '#3B82F6', icon: '⚡', perks: '进阶内容+竞猜特权' },
    { id: 2, name: '高级级', minWp: 5000, maxWp: 19999, color: '#F18F01', icon: '🔥', perks: '专属徽章+优先兑换' },
    { id: 3, name: '专家级', minWp: 20000, maxWp: Infinity, color: '#8B5CF6', icon: '💎', perks: '投资者报告+专属活动' }
  ],
  shows: [
    { id: '1', title: '新质中国·第一期：AI革命', cover: null, status: '回放', episode: 1, watchReward: 50, betReward: 100, viewers: 128500, duration: 5400, summary: '探索人工智能如何重塑中国制造业的未来图景，专访优必选、科大讯飞等AI领军企业。', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      questions: [{ id: 'q1', text: '本期最具潜力的AI企业是？', options: [{ id: 'a', text: '优必选机器人', odds: 1.8, bets: 342 }, { id: 'b', text: '科大讯飞', odds: 2.1, bets: 289 }, { id: 'c', text: '商汤科技', odds: 3.5, bets: 156 }, { id: 'd', text: '旷视科技', odds: 4.2, bets: 89 }], correct: 'a', settled: false }],
      comments: [{ id: 'c1', uid: 'u2', nick: '投资达人', time: '2026-03-27 20:15', content: '优必选的人形机器人真的太震撼了！量产能力超预期。', likes: 45 }, { id: 'c2', uid: 'u3', nick: '科技观察', time: '2026-03-27 20:32', content: '讯飞的语音技术已经到了毫秒级响应，B端落地速度惊人。', likes: 38 }]
    },
    { id: '2', title: '新质中国·第二期：绿色能源', cover: null, status: '回放', episode: 2, watchReward: 50, betReward: 100, viewers: 96800, duration: 5400, summary: '新能源汽车与储能技术的双轮驱动，理想、蔚来如何定义下一代出行体验。', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      questions: [{ id: 'q2', text: '谁将率先实现全固态电池量产？', options: [{ id: 'a', text: '理想汽车', odds: 2.2, bets: 415 }, { id: 'b', text: '蔚来汽车', odds: 2.8, bets: 312 }, { id: 'c', text: '比亚迪', odds: 1.5, bets: 589 }], correct: null, settled: false }],
      comments: []
    },
    { id: '3', title: '新质中国·第三期：智慧医疗', cover: null, status: '即将直播', episode: 3, watchReward: 80, betReward: 150, viewers: 0, duration: 5400, summary: '大健康赛道的新质生产力，AI辅助诊断+基因科技+手术机器人的医疗新生态。', videoUrl: '',
      questions: [], comments: []
    }
  ],
  products: [
    { id: 'p1', name: 'UBTECH Walker S 人形机器人模型', price: 2999, hpPrice: 5000, stock: 88, category: 'AI', brand: 'UBTECH优必选', image: null, desc: '1:10等比例还原Walker S人形机器人，精密机械结构，可编程交互展示。', sales: 342 },
    { id: 'p2', name: '讯飞AI学习机X3 Pro', price: 3999, hpPrice: 6000, stock: 156, category: 'AI', brand: '科大讯飞', image: null, desc: '搭载星火大模型，拥有自适应学习路径，全科AI辅导。', sales: 890 },
    { id: 'p3', name: '理想MEGA智能露营套装', price: 1299, hpPrice: 2000, stock: 230, category: '新能源', brand: '理想汽车', image: null, desc: '理想MEGA专属智能露营套装，支持车载供电，2000W大功率输出。', sales: 567 },
    { id: 'p4', name: '蔚来NIO Life智能水杯', price: 299, hpPrice: 500, stock: 500, category: '新能源', brand: '蔚来汽车', image: null, desc: '智能温显，磁吸底座，NIO ID身份识别，饮水记录同步App。', sales: 1245 },
    { id: 'p5', name: '小米14 Ultra 影像旗舰', price: 6499, hpPrice: 9000, stock: 45, category: 'AI', brand: '小米集团', image: null, desc: '徕卡Summicron镜头，1英寸主摄，4K120fps专业摄影，骁龙8 Gen3。', sales: 2341 },
    { id: 'p6', name: '华为MatePad Pro 13.2 曲面屏', price: 5999, hpPrice: 8500, stock: 67, category: 'AI', brand: '华为', image: null, desc: '全球首款曲面屏平板，OLED原色屏，鸿蒙4.0系统，支持AI翻译。', sales: 1876 },
    { id: 'p7', name: '新质中国×优必选联名T恤', price: 199, hpPrice: 300, stock: 1000, category: '衣食住行', brand: 'UBTECH优必选', image: null, desc: '《新质中国》节目联名款，优质棉质，机器人刺绣图案，限量发行。', sales: 456 },
    { id: 'p8', name: '合力生态专属研报·AI赛道2026Q1', price: 99, hpPrice: 1500, stock: 9999, category: 'AI', brand: '合力研究院', image: null, desc: '2026年Q1 AI赛道深度研报，涵盖人形机器人、具身智能、大模型应用三大方向。', sales: 789 }
  ],
  companies: [
    { id: 'c1', name: '优必选科技', stock: 'HK: 09880', sector: 'AI', score: 88, trend: '+3.2', logo: '🤖', desc: '全球领先的人形机器人企业，Walker系列已进入宝马、吉利等工厂量产部署。', scores: { tech: 95, delivery: 82, commercial: 78, capital: 88, ecosystem: 92 }, awards: ['2025年最佳人形机器人企业', '新质中国年度科技标杆', '深圳市独角兽企业'], recentSearch: [120,135,142,158,165,170,180,195,200,188,205,215,220,225,230,240,245,250,255,260,265,270,280,285,290,295,300,310,315,320] },
    { id: 'c2', name: '科大讯飞', stock: 'SZ: 002230', sector: 'AI', score: 85, trend: '+1.8', logo: '🎙️', desc: '中国最大的语音智能平台，星火大模型在教育、医疗、政务领域全面落地。', scores: { tech: 90, delivery: 85, commercial: 88, capital: 78, ecosystem: 85 }, awards: ['2025年AI教育创新奖', '最佳大模型应用平台'], recentSearch: [200,210,205,215,220,225,230,240,235,245,250,260,255,265,270,280,275,285,290,295,300,305,310,315,320,325,330,335,340,345] },
    { id: 'c3', name: '理想汽车', stock: 'HK: 02015', sector: '新能源', score: 82, trend: '+2.1', logo: '🚗', desc: '中国销量领先的新能源SUV品牌，MEGA车型引领MPV电动化新标准。', scores: { tech: 85, delivery: 90, commercial: 92, capital: 75, ecosystem: 68 }, awards: ['2025年最佳新能源汽车品牌', '智能驾驶技术创新奖'], recentSearch: [310,320,315,325,330,340,335,345,350,360,355,365,370,380,375,385,390,400,395,405,410,420,415,425,430,440,435,445,450,460] },
    { id: 'c4', name: '蔚来汽车', stock: 'NYSE: NIO', sector: '新能源', score: 79, trend: '-0.5', logo: '⚡', desc: '高端智能电动汽车品牌，换电网络+NIO Life生态构建差异化竞争壁垒。', scores: { tech: 82, delivery: 78, commercial: 80, capital: 72, ecosystem: 85 }, awards: ['最佳换电技术创新奖', '用户体验标杆品牌'], recentSearch: [280,275,285,290,295,300,295,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415] },
    { id: 'c5', name: '小米集团', stock: 'HK: 01810', sector: 'AI', score: 91, trend: '+4.5', logo: '📱', desc: '小米汽车SU7大爆款带动集团估值突破历史新高，IoT生态连接设备超8亿台。', scores: { tech: 88, delivery: 95, commercial: 96, capital: 90, ecosystem: 88 }, awards: ['2025年最佳科技生态奖', '小米SU7年度爆款产品'], recentSearch: [400,410,420,415,425,430,440,435,445,450,460,455,465,470,480,475,485,490,500,495,505,510,520,515,525,530,540,535,545,550] },
    { id: 'c6', name: '华为技术', stock: '未上市', sector: 'AI', score: 94, trend: '+5.1', logo: '🌐', desc: '鸿蒙生态月活突破10亿，昇腾AI芯片国产替代加速，遥遥领先已不是玩笑。', scores: { tech: 98, delivery: 92, commercial: 90, capital: 96, ecosystem: 95 }, awards: ['2025年最具创新力科技企业', '鸿蒙生态年度突破奖', '国产AI芯片领导者'], recentSearch: [500,510,520,515,525,530,540,535,545,550,560,555,565,570,580,575,585,590,600,595,605,610,620,615,625,630,640,635,645,650] }
  ],
  honors: [
    { id: 'h1', name: '新质先锋', icon: '🏅', cost: 500, desc: '率先完成意志输出的先锋用户', type: '徽章' },
    { id: 'h2', name: '综艺达人', icon: '🎬', cost: 1000, desc: '观看3期及以上节目的忠实用户', type: '徽章' },
    { id: 'h3', name: '意志大师', icon: '⚡', cost: 2000, desc: '贡献值超过2000的核心用户', type: '徽章' },
    { id: 'h4', name: '投资洞察', icon: '📊', cost: 3000, desc: '可获取专属上市公司深度分析报告', type: '特权' },
    { id: 'h5', name: '指数专家', icon: '🔬', cost: 5000, desc: '参与合力指数评审委员会', type: '特权' },
    { id: 'h6', name: '合力元老', icon: '👑', cost: 10000, desc: '平台创始元老，永久专属标识', type: '特权' }
  ],
  wpRecords: [
    { id: 'r1', time: '2026-03-27 21:00', action: '发表评论', wp: 10, icon: '💬' },
    { id: 'r2', time: '2026-03-27 20:30', action: '观看节目(30分钟)', wp: 20, icon: '📺' },
    { id: 'r3', time: '2026-03-27 10:05', action: '每日签到', wp: 5, icon: '✅' },
    { id: 'r4', time: '2026-03-26 22:15', action: '发表文章', wp: 50, icon: '📝' },
    { id: 'r5', time: '2026-03-26 19:45', action: '分享节目', wp: 10, icon: '📤' },
    { id: 'r6', time: '2026-03-25 16:30', action: '竞猜正确', wp: 100, icon: '🎯' },
    { id: 'r7', time: '2026-03-25 10:00', action: '每日签到', wp: 5, icon: '✅' },
    { id: 'r8', time: '2026-03-24 21:20', action: '评论企业', wp: 10, icon: '💬' },
    { id: 'r9', time: '2026-03-23 18:00', action: '观看节目(全程)', wp: 50, icon: '📺' },
    { id: 'r10', time: '2026-03-22 12:00', action: '发表评论', wp: 10, icon: '💬' }
  ],
  pointsRecords: [
    { id: 'pr1', time: '2026-03-27 21:00', action: '发表评论奖励', pts: 5, type: 'earn', category: 'hp' },
    { id: 'pr2', time: '2026-03-27 20:30', action: '观看节目奖励', pts: 30, type: 'earn', category: 'watch' },
    { id: 'pr3', time: '2026-03-27 10:05', action: '每日签到', pts: 5, type: 'earn', category: 'hp' },
    { id: 'pr4', time: '2026-03-26 15:30', action: '购买商品抵扣', pts: -200, type: 'spend', category: 'hp' },
    { id: 'pr5', time: '2026-03-25 16:30', action: '竞猜奖励', pts: 180, type: 'earn', category: 'hp' },
    { id: 'pr6', time: '2026-03-25 16:00', action: '竞猜下注', pts: -100, type: 'spend', category: 'hp' },
    { id: 'pr7', time: '2026-03-25 14:00', action: '上传研报奖励', pts: 50, type: 'earn', category: 'exp' },
    { id: 'pr8', time: '2026-03-24 11:00', action: '治理投票奖励', pts: 20, type: 'earn', category: 'gov' },
    { id: 'pr9', time: '2026-03-23 09:00', action: '观看互动奖励', pts: 40, type: 'earn', category: 'watch' }
  ],
  // 各积分类型独立记录
  expRecords: [
    { id: 'er1', time: '2026-03-25 14:00', action: '上传研报奖励', pts: 50, type: 'earn' },
    { id: 'er2', time: '2026-03-20 16:00', action: '指数评论奖励', pts: 30, type: 'earn' },
    { id: 'er3', time: '2026-03-15 10:00', action: '专业分析奖励', pts: 80, type: 'earn' }
  ],
  watchRecords: [
    { id: 'wr1', time: '2026-03-27 20:30', action: '观看节目奖励', pts: 30, type: 'earn' },
    { id: 'wr2', time: '2026-03-26 20:00', action: '观看节目奖励', pts: 25, type: 'earn' },
    { id: 'wr3', time: '2026-03-25 19:30', action: '分享节目奖励', pts: 10, type: 'earn' },
    { id: 'wr4', time: '2026-03-24 20:00', action: '点赞评论奖励', pts: 5, type: 'earn' }
  ],
  govRecords: [
    { id: 'gr1', time: '2026-03-24 11:00', action: '参与平台投票', pts: 20, type: 'earn' },
    { id: 'gr2', time: '2026-03-15 14:00', action: '社区治理贡献', pts: 30, type: 'earn' }
  ],
  merchant: {
    email: 'ubtrobot@example.com',
    password: 'KEY-2026-UBTROBOT-001',
    name: 'UBTECH优必选旗舰店',
    logo: '🤖',
    status: '认证商家',
    totalSales: 4521,
    totalRevenue: 1298560,
    customers: 3890,
    avgRating: 4.8,
    salesTrend: [28000, 32000, 29000, 35000, 38000, 42000, 45000, 48000, 44000, 51000, 55000, 58000, 62000, 59000, 65000, 68000, 72000, 70000, 75000, 78000, 82000, 85000, 80000, 88000, 92000, 95000, 91000, 98000, 102000, 108000],
    topProducts: [
      { name: 'Walker S 人形机器人模型', sales: 342, revenue: 1024758 },
      { name: '新质中国联名T恤', sales: 456, revenue: 90744 },
      { name: 'UBTECH教育机器人', sales: 189, revenue: 567000 },
      { name: '智能编程套件', sales: 234, revenue: 117000 },
      { name: '人形机器人周边文具', sales: 678, revenue: 33900 }
    ],
    newCustomers: 312,
    repurchaseRate: 34.5,
    avgOrderValue: 333,
    conversionRate: 8.2,
    pointsIssued: 228100,
    pointsRedeemed: 156800,
    pointsRetained: 71300
  },
  apiLogs: [],

  // ==================== AI & Agent 数据层 ====================
  agentConfig: {
    enabled: false,
    autoCheckin: true,
    autoWatch: false,
    autoBet: false,
    autoBetCategory: '全部',
    autoRedeem: false,
    autoRedeemThreshold: 2000,
    lastRun: null,
    totalAutoPoints: 0,
    totalAutoWp: 0,
    runCount: 0
  },

  aiArticles: [
    { id: 'a1', time: '2026-03-30 18:30', keywords: '人形机器人 优必选 量产', content: '2026年，人形机器人赛道进入量产元年。优必选Walker S已进驻宝马、吉利等头部制造商，日产能突破50台。从技术指标看，其运动控制精度达到±0.1mm，远超行业均值0.5mm。这意味着中国人形机器人已具备工业替代能力，而非仅停留于展示层面。对投资者而言，优必选的核心护城河在于运动控制算法积累——这是用金钱和时间堆砌起来的壁垒，短期内竞争者难以复制。', wp: 80, liked: 0 },
    { id: 'a2', time: '2026-03-29 14:15', keywords: '新能源 固态电池 比亚迪', content: '全固态电池是新能源汽车的"圣杯"。比亚迪2025年已完成第一批固态原型电池内部测试，能量密度达到400Wh/kg，较当前主流液态电池提升80%。更关键的是安全性：固态电解质无液态电解液泄漏风险，热失控概率降低95%以上。预计2027年前，比亚迪将率先实现固态电池小批量装车，这将是新能源赛道最重要的技术分水岭。', wp: 80, liked: 0 }
  ],

  willpowerMarket: [
    { id: 'm1', company: '优必选科技', logo: '🤖', title: '征集：Walker S应用场景深度分析报告', desc: '需要500字以上行业分析，覆盖制造业、物流、医疗三大场景，数据充分，逻辑清晰。', reward: 300, deadline: '2026-04-15', type: '研报', submissions: 12, status: 'open' },
    { id: 'm2', company: '科大讯飞', logo: '🎙️', title: '征集：星火大模型教育场景落地案例分析', desc: '对比讯飞与同类产品在K12教育场景的实际效果，数据支撑，字数800字以上。', reward: 250, deadline: '2026-04-20', type: '对比分析', submissions: 8, status: 'open' },
    { id: 'm3', company: '理想汽车', logo: '🚗', title: '征集：2026年MPV新能源市场竞争格局', desc: '分析理想、腾势、岚图三大MPV玩家的产品定位与用户画像差异，1000字以上。', reward: 400, deadline: '2026-04-10', type: '市场分析', submissions: 5, status: 'open' },
    { id: 'm4', company: '小米集团', logo: '📱', title: '征集：小米SU7二手车保值率预测模型', desc: '基于历史新能源车型保值率数据，预测SU7一年/三年保值率区间，需要数据图表支持。', reward: 500, deadline: '2026-05-01', type: '数据模型', submissions: 3, status: 'open' },
    { id: 'm5', company: '华为技术', logo: '🌐', title: '征集：鸿蒙生态与安卓开发者迁移成本分析', desc: '从开发者视角量化鸿蒙迁移的时间、人力、学习成本，给出迁移ROI建议。', reward: 600, deadline: '2026-04-25', type: '技术评估', submissions: 7, status: 'open' }
  ],

  mySubmissions: [],

  // ==================== 合力智脑 数据层 ====================
  brainConfig: {
    activated: false,
    cEndGoal: '',           // 用户的积分目标商品ID
    cEndGoalPoints: 0,      // 目标所需HP
    autoExecute: false,     // 是否已授权自动执行
    notifications: true,
    lastPlanDate: null,
    planCache: null         // 缓存的积分规划
  },

  brainChatHistory: [
    {
      id: 'sys1',
      role: 'brain',
      content: '你好！我是**合力智脑**，你的专属积分管家 🧠\n\n我可以帮你：\n• 📊 **规划积分路径** — 告诉我你想换什么，我计算最短路径\n• ⚡ **一键自动执行** — 授权后我每天替你签到、领积分\n• 🔔 **智能提醒** — 积分够了第一时间通知你\n\n试试说："我想换小米14 Ultra" 或者 "帮我看看今天有什么任务"',
      time: new Date().toLocaleString()
    }
  ],

  merchantBrainHistory: [
    {
      id: 'msys1',
      role: 'brain',
      content: '欢迎使用**合力智脑 · 商家版** 🤖\n\n我是您的专属AI运营助手，可以：\n• 📈 **自动生成周报** — 每周一自动分析销售数据\n• 💡 **积分任务建议** — 分析转化瓶颈，推荐激励方案\n• 🎯 **智能客服** — 自动回复用户产品问题\n\n试试说："帮我生成本周运营周报" 或 "哪款产品需要增加积分激励？"',
      time: new Date().toLocaleString()
    }
  ],

  weeklyReportCache: null
};

// 状态管理（简易Pinia替代）
const Store = {
  _data: null,
  _listeners: [],

  init() {
    const saved = localStorage.getItem('heli_store');
    if (saved) {
      try { this._data = JSON.parse(saved); } catch(e) { this._data = null; }
    }
    if (!this._data) {
      this._data = JSON.parse(JSON.stringify(MOCK_DATA));
    }
  },

  get(key) { return this._data[key]; },

  set(key, val) {
    this._data[key] = val;
    this._save();
    this._notify(key);
  },

  update(key, fn) {
    fn(this._data[key]);
    this._save();
    this._notify(key);
  },

  _save() {
    try { localStorage.setItem('heli_store', JSON.stringify(this._data)); } catch(e) {}
  },

  subscribe(fn) { this._listeners.push(fn); return () => { this._listeners = this._listeners.filter(l => l !== fn); }; },
  _notify(key) { this._listeners.forEach(fn => fn(key)); }
};

// API封装（Mock）
const API = {
  _log(method, url, status) {
    const logs = Store.get('apiLogs') || [];
    logs.unshift({ id: Date.now(), time: new Date().toLocaleTimeString(), method, url, status });
    if (logs.length > 50) logs.pop();
    Store.set('apiLogs', logs);
  },

  async call(method, url, data) {
    await new Promise(r => setTimeout(r, 120));
    this._log(method, url, 200);
    return { success: true };
  },

  async checkin() {
    const user = Store.get('user');
    if (user.checkinToday) return { success: false, msg: '今日已签到' };
    user.points += 5;
    user.willpower += 5;
    user.checkinToday = true;
    const wpr = Store.get('wpRecords');
    wpr.unshift({ id: 'r' + Date.now(), time: new Date().toLocaleString(), action: '每日签到', wp: 5, icon: '✅' });
    const pr = Store.get('pointsRecords');
    pr.unshift({ id: 'pr' + Date.now(), time: new Date().toLocaleString(), action: '每日签到', pts: 5, type: 'earn' });
    Store.set('user', user);
    Store.set('wpRecords', wpr);
    Store.set('pointsRecords', pr);
    this._log('POST', '/api/user/checkin', 200);
    return { success: true, points: 5, willpower: 5 };
  },

  async addWillpower(amount, action, icon) {
    const user = Store.get('user');
    user.willpower += amount;
    user.willpowerMonthly += amount;
    const wpr = Store.get('wpRecords');
    wpr.unshift({ id: 'r' + Date.now(), time: new Date().toLocaleString(), action, wp: amount, icon: icon || '⭐' });
    Store.set('user', user);
    Store.set('wpRecords', wpr);
    this._log('POST', '/api/user/willpower', 200);
    return { success: true };
  },

  async addPoints(amount, action, category = 'hp') {
    const user = Store.get('user');
    // 根据类别更新对应积分
    if (category === 'hp') user.hp += amount;
    else if (category === 'exp') user.exp += amount;
    else if (category === 'watch') user.watch += amount;
    else if (category === 'gov') user.gov += amount;
    // 兼容旧逻辑
    user.points += amount;
    const pr = Store.get('pointsRecords');
    pr.unshift({ id: 'pr' + Date.now(), time: new Date().toLocaleString(), action, pts: amount, type: amount > 0 ? 'earn' : 'spend', category });
    Store.set('user', user);
    Store.set('pointsRecords', pr);
    this._log('POST', '/api/user/points', 200);
    return { success: true };
  },

  // 积分兑换（单向：EXP/WATCH/GOV → HP）
  async exchangePoints(fromCategory, amount) {
    const exchange = Store.get('pointsExchange');
    if (!exchange[fromCategory]) return { success: false, msg: '不支持该积分类型' };
    const user = Store.get('user');
    if (user[fromCategory] < amount) return { success: false, msg: '积分不足' };
    const rate = exchange[fromCategory].rate;
    const hpAmount = Math.floor(amount * rate);
    user[fromCategory] -= amount;
    user.hp += hpAmount;
    user.points += hpAmount;
    // 记录HP流水
    const pr = Store.get('pointsRecords');
    pr.unshift({
      id: 'pr' + Date.now(),
      time: new Date().toLocaleString(),
      action: `${exchange[fromCategory].name}兑换HP`,
      pts: hpAmount,
      type: 'earn',
      category: 'hp',
      sourceCategory: fromCategory,
      sourceAmount: amount
    });
    // 记录对应类别消耗
    const fromRecords = Store.get(fromCategory + 'Records') || [];
    fromRecords.unshift({
      id: fromCategory[0] + 'r' + Date.now(),
      time: new Date().toLocaleString(),
      action: `兑换为${hpAmount}HP`,
      pts: -amount,
      type: 'spend'
    });
    Store.set('user', user);
    Store.set('pointsRecords', pr);
    Store.set(fromCategory + 'Records', fromRecords);
    this._log('POST', '/api/user/points/exchange', 200);
    return { success: true, hpAmount, rate };
  },

  async claimWatchReward(episodeId, duration) {
    await this.addPoints(30, '观看节目奖励');
    await this.addWillpower(20, '观看节目(' + Math.floor(duration/60) + '分钟)', '📺');
    this._log('POST', '/api/show/watch/claim', 200);
    return { success: true };
  },

  async submitBet(episodeId, optionId, points) {
    const user = Store.get('user');
    if (user.points < points) return { success: false, msg: '积分不足' };
    user.points -= points;
    const pr = Store.get('pointsRecords');
    pr.unshift({ id: 'pr' + Date.now(), time: new Date().toLocaleString(), action: '竞猜下注', pts: -points, type: 'spend' });
    Store.set('user', user);
    Store.set('pointsRecords', pr);
    this._log('POST', '/api/show/betting/submit', 200);
    return { success: true, betId: 'bet_' + Date.now() };
  },

  async postComment(episodeId, content) {
    await this.addWillpower(10, '发表评论', '💬');
    this._log('POST', '/api/show/comments', 200);
    return { success: true, commentId: 'c_' + Date.now() };
  },

  async createOrder(productId, quantity, usedPoints) {
    const product = Store.get('products').find(p => p.id === productId);
    if (!product) return { success: false };
    const user = Store.get('user');
    if (user.points < usedPoints) return { success: false, msg: '积分不足' };
    const discount = usedPoints * 0.01;
    const finalPrice = Math.max(0, product.price - discount);
    user.points -= usedPoints;
    const order = { id: 'ORD' + Date.now(), productId, productName: product.name, productPrice: product.price, usedPoints, discount, finalPrice, quantity, status: '已支付', time: new Date().toLocaleString() };
    user.orders.unshift(order);
    const pr = Store.get('pointsRecords');
    if (usedPoints > 0) pr.unshift({ id: 'pr' + Date.now(), time: new Date().toLocaleString(), action: '购买商品积分抵扣', pts: -usedPoints, type: 'spend' });
    Store.set('user', user);
    Store.set('pointsRecords', pr);
    this._log('POST', '/api/order/create', 200);
    return { success: true, orderId: order.id };
  },

  async claimHonor(honorId) {
    const honor = Store.get('honors').find(h => h.id === honorId);
    if (!honor) return { success: false };
    const user = Store.get('user');
    if (user.willpower < honor.cost) return { success: false, msg: '贡献值不足' };
    if (user.honorsClaimed.includes(honorId)) return { success: false, msg: '已兑换' };
    user.willpower -= honor.cost;
    user.honorsClaimed.push(honorId);
    Store.set('user', user);
    this._log('POST', '/api/user/honors/claim', 200);
    return { success: true, newWillpower: user.willpower };
  },

  async merchantLogin(email, password) {
    const m = Store.get('merchant');
    if (email === m.email && password === m.password) {
      this._log('POST', '/api/merchant/login', 200);
      return { success: true, merchant: m };
    }
    this._log('POST', '/api/merchant/login', 401);
    return { success: false, msg: '账号或密码错误' };
  }
};

Store.init();
