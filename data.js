/* =============================================
   data.js - Mock数据层 + Store + API
   合力生态 HarmonyLink v2.0
   ============================================= */

// ========== MOCK DATA ==========
const MOCK_DATA = {
  user: {
    id: 'hl_001',
    nickname: '先行者Nebula',
    avatar: '🦁',
    hp: 12800,
    exp: 3200,
    watch: 5600,
    gov: 800,
    data: 1200,
    mp: 2400,
    willpower: 72400,
    willpowerMonthly: 8600,
    rank: 128,
    level: 5,
    levelName: 'Lv.5 先锋使者',
    honorsClaimed: [],
    orders: [],
    checkinToday: false,
    agentCreated: false,
    agentName: '',
    agentType: ''
  },

  levels: [
    { level: 1, name: '觉醒者', minWP: 0, maxWP: 5000, benefits: ['基础积分兑换', '参与投票'] },
    { level: 2, name: '探索者', minWP: 5000, maxWP: 15000, benefits: ['EXP积分解锁', '研报评论权'] },
    { level: 3, name: '先行者', minWP: 15000, maxWP: 35000, benefits: ['GOV积分解锁', '社区治理票'] },
    { level: 4, name: '建设者', minWP: 35000, maxWP: 70000, benefits: ['DATA积分解锁', '数据上链'] },
    { level: 5, name: '先锋使者', minWP: 70000, maxWP: 150000, benefits: ['MP积分解锁', '龙虾Agent'] },
    { level: 6, name: '意义创造者', minWP: 150000, maxWP: 999999, benefits: ['全部权益', 'DAO治理权'] }
  ],

  pointsPool: {
    totalHP: 50000000,
    circulatingHP: 32000000,
    destroyedHP: 8000000,
    sponsorReserve: 10000000
  },

  shows: [
    {
      id: 'zhizaozhe',
      type: 'season1',
      title: '《智造者》第一季',
      subtitle: '新质生产力上市公司探秘之旅',
      emoji: '🏭',
      status: 'upcoming',
      badge: 'Q3开机',
      episodes: 12,
      watchedEps: 0,
      sponsor: '比亚迪、中芯国际、华为等',
      desc: '首个聚焦新质生产力的S级综艺节目。流量艺人深入灯塔工厂，探索中国制造的智慧升级。每集完播奖励WATCH积分，限量发行企业联名徽章。',
      tags: ['灯塔工厂', '新质生产力', '流量艺人', 'S级制作'],
      reward_per_ep: 100,
      total_reward: 1200,
      episodes_data: [
        { id: 'e1', num: 1, title: '比亚迪：智能座舱革命', duration: '48分钟', watched: false, reward: 100, desc: '深入比亚迪仰望超级工厂，探秘智能座舱的AI进化' },
        { id: 'e2', num: 2, title: '中芯国际：芯片之战', duration: '52分钟', watched: false, reward: 100, desc: '揭秘中国芯片制造最前线，7nm工艺背后的故事' },
        { id: 'e3', num: 3, title: '华为：AI算力帝国', duration: '45分钟', watched: false, reward: 100, desc: '华为昇腾算力中心开放参观，AI时代的算力基础设施' },
        { id: 'e4', num: 4, title: '宁德时代：储能新世界', duration: '50分钟', watched: false, reward: 100, desc: '全球最大动力电池工厂，储能革命正在发生' },
        { id: 'e5', num: 5, title: '商汤科技：感知未来', duration: '44分钟', watched: false, reward: 100, desc: '计算机视觉领域的AI先锋，感知技术重塑世界' },
        { id: 'e6', num: 6, title: '海康威视：智慧眼', duration: '47分钟', watched: false, reward: 100, desc: '全球领先的视频技术企业，AI安防如何守护城市' },
        { id: 'e7', num: 7, title: '科大讯飞：语音的力量', duration: '46分钟', watched: false, reward: 100, desc: '语音AI的中国力量，讯飞如何让机器听懂中文' },
        { id: 'e8', num: 8, title: '三一重工：重工智能化', duration: '53分钟', watched: false, reward: 100, desc: '全球最大工程机械企业，重工业的智能化转型' },
        { id: 'e9', num: 9, title: '迈瑞医疗：生命守护者', duration: '48分钟', watched: false, reward: 100, desc: '中国医疗设备龙头，AI如何帮助医生救死扶伤' },
        { id: 'e10', num: 10, title: '隆基绿能：光伏新纪元', duration: '50分钟', watched: false, reward: 100, desc: '全球最大光伏企业，新能源如何重塑能源格局' },
        { id: 'e11', num: 11, title: '中国移动：5G覆盖', duration: '44分钟', watched: false, reward: 100, desc: '5G网络背后的建设者，数字中国的通信基础' },
        { id: 'e12', num: 12, title: '综合：新质生产力的未来', duration: '60分钟', watched: false, reward: 200, desc: '年度总结特辑，12家企业的智造故事与未来展望' }
      ],
      quizzes: [
        { id: 'q1', epId: 'e1', question: '比亚迪仰望U8采用了哪项核心技术实现原地转向？', options: ['四轮独立电驱', '液压转向系统', '传统转向助力', '线控转向'], answer: 0, points: 50 },
        { id: 'q2', epId: 'e2', question: '中芯国际目前最先进制程节点是？', options: ['28nm', '14nm', '7nm', '5nm'], answer: 2, points: 50 },
        { id: 'q3', epId: 'e3', question: '华为昇腾910B的算力相当于多少张NVIDIA A100？', options: ['1张', '0.5张', '1.5-2张', '3张'], answer: 2, points: 80 }
      ],
      comments: [
        { id: 'c1', user: '科技观察家', avatar: '🔬', text: '期待《智造者》开播！中国智造的故事值得被世界看见', time: '2026-05-20', likes: 234 },
        { id: 'c2', user: '先行者王总', avatar: '👨‍💼', text: '比亚迪那集最期待，超级工厂太震撼了', time: '2026-05-21', likes: 187 },
        { id: 'c3', user: 'AI投资人', avatar: '💼', text: '这个节目模式很创新，把上市公司和综艺结合，品牌曝光效果一定爆炸', time: '2026-05-22', likes: 156 }
      ]
    },
    {
      id: 'suanlijijilu',
      type: 'doc',
      title: '算力纪录片《先行者》',
      subtitle: 'Q2先行转化，铺垫热度',
      emoji: '⚡',
      status: 'airing',
      badge: '热播中',
      episodes: 4,
      watchedEps: 2,
      sponsor: '华为、商汤科技',
      desc: 'Q2推出的算力主题纪录片，每集约15分钟，讲述AI算力产业的先行者故事。完播奖励50 CP积分，引导用户进入完整的积分经济体系。',
      tags: ['算力', '纪录片', 'AI产业', '先行转化'],
      reward_per_ep: 50,
      total_reward: 200,
      episodes_data: [
        { id: 'ed1', num: 1, title: '算力时代序章', duration: '15分钟', watched: true, reward: 50, desc: '从CPU到GPU，从云计算到AI算力，一场静悄悄的算力革命' },
        { id: 'ed2', num: 2, title: '大模型背后的算力战争', duration: '16分钟', watched: true, reward: 50, desc: '训练一个GPT-4级模型需要多少算力？背后的商业与政治博弈' },
        { id: 'ed3', num: 3, title: '中国算力的突围', duration: '15分钟', watched: false, reward: 50, desc: '在算力卡脖子的压力下，中国如何构建自主算力体系' },
        { id: 'ed4', num: 4, title: '算力普惠的未来', duration: '18分钟', watched: false, reward: 50, desc: '当算力像水电一样普及，每个人都能拥有AI超能力' }
      ],
      quizzes: [],
      comments: [
        { id: 'cc1', user: '算力爱好者', avatar: '⚡', text: '前两集看完了，制作很扎实，数据翔实', time: '2026-05-10', likes: 89 }
      ]
    }
  ],

  companies: [
    { id: 'byd', name: '比亚迪', code: '002594.SZ', sector: '新能源汽车', index: 92.4, change: +3.2, attention: 95, heat: 89, mp: 78, desc: '全球新能源汽车龙头，智能座舱+电动化双驱动', stories: ['智能座舱革命', '刀片电池技术突破', '全球工厂扩张'], rank: 1 },
    { id: 'smic', name: '中芯国际', code: '688981.SH', sector: '半导体', index: 88.7, change: +1.8, attention: 91, heat: 85, mp: 82, desc: '中国最先进的集成电路晶圆代工企业', stories: ['7nm工艺突破', '国产替代加速', '扩产计划公告'], rank: 2 },
    { id: 'catl', name: '宁德时代', code: '300750.SZ', sector: '储能', index: 86.3, change: -0.5, attention: 88, heat: 82, mp: 75, desc: '全球最大动力电池及储能电池生产商', stories: ['麒麟电池发布', '储能出海战略', '固态电池研发'], rank: 3 },
    { id: 'hikvision', name: '海康威视', code: '002415.SZ', sector: 'AI视觉', index: 84.1, change: +2.1, attention: 85, heat: 79, mp: 73, desc: '全球视频监控龙头，AIoT智能物联网布局', stories: ['萤石云上市', 'AIoT新业务', '海外市场开拓'], rank: 4 },
    { id: 'sensetime', name: '商汤科技', code: '0020.HK', sector: 'AI', index: 82.8, change: +4.7, attention: 87, heat: 83, mp: 88, desc: '亚洲最大AI软件公司，日日新大模型领跑', stories: ['日日新3.5发布', 'AI眼镜战略', '算力中心扩建'], rank: 5 },
    { id: 'iflytek', name: '科大讯飞', code: '002230.SZ', sector: 'AI', index: 80.5, change: +1.2, attention: 82, heat: 77, mp: 71, desc: '中文语音AI技术引领者，教育+医疗双赛道', stories: ['讯飞星火4.0', '讯飞医疗AI', '教育大模型'], rank: 6 },
    { id: 'longi', name: '隆基绿能', code: '601012.SH', sector: '新能源', index: 78.9, change: -1.3, attention: 78, heat: 71, mp: 69, desc: '全球最大太阳能电池制造商，BC技术领先', stories: ['HPBC电池效率', 'BC组件全球发货', '氢能战略'], rank: 7 },
    { id: 'sanyi', name: '三一重工', code: '600031.SH', sector: '工程机械', index: 77.2, change: +0.8, attention: 76, heat: 70, mp: 66, desc: '全球工程机械Top3，电动化智能化转型', stories: ['灯塔工厂认证', '电动挖掘机', '出海东南亚'], rank: 8 }
  ],

  products: [
    { id: 'byd-service', name: '比亚迪汽车服务券', company: '比亚迪', emoji: '🚗', category: 'service', price: 800, originalPrice: 1500, stock: 50, desc: '比亚迪任意车型保养服务券一次，含机油更换及全车检查', tags: ['热门', '限量'] },
    { id: 'huawei-trade', name: '华为手机以旧换新券', company: '华为', emoji: '📱', category: 'service', price: 1200, originalPrice: 2000, stock: 30, desc: '华为任意手机以旧换新，额外补贴500元', tags: ['爆款'] },
    { id: 'smic-salon', name: '中芯国际产业沙龙票', company: '中芯国际', emoji: '🎫', category: 'show', price: 300, originalPrice: 500, stock: 100, desc: '月度产业洞察沙龙，限量参会票，与芯片大佬面对面', tags: ['知识', '稀缺'] },
    { id: 'zhizaozhe-ticket', name: '《智造者》首映票', company: '合力生态', emoji: '🎬', category: 'show', price: 200, originalPrice: 500, stock: 200, desc: '《智造者》第一集北京首映式，含礼品袋和明星见面机会', tags: ['首映', '独家'] },
    { id: 'catl-camp', name: '宁德时代研学营名额', company: '宁德时代', emoji: '🔋', category: 'service', price: 2000, originalPrice: 4000, stock: 20, desc: '参观宁德时代工厂，学习电池技术，获颁研学证书', tags: ['高端', '教育'] },
    { id: 'ai-credit', name: '算力使用券100元', company: '合力生态', emoji: '⚡', category: 'digital', price: 500, originalPrice: 800, stock: 500, desc: '平台算力资源使用券，可用于龙虾Agent训练和API调用', tags: ['数字权益'] },
    { id: 'pioneer-nft', name: 'Pioneer OS先行者NFT', company: 'Pioneer OS', emoji: '🚀', category: 'digital', price: 3000, originalPrice: 5000, stock: 100, desc: '限量版Pioneer OS先行者数字藏品，持有者享受平台永久VIP权益', tags: ['NFT', '限量', '珍藏'] },
    { id: 'sensetime-api', name: '商汤AI API体验包', company: '商汤科技', emoji: '🤖', category: 'digital', price: 800, originalPrice: 1200, stock: 300, desc: '商汤科技API接口30天体验包，含图像识别、人脸分析等接口', tags: ['API', '开发者'] }
  ],

  honors: [
    { id: 'h1', title: '《智造者》早鸟观众', icon: '🎬', desc: '完整观看《智造者》第一季所有剧集', req: '观看12集并全部完成', cost: 5000, costType: 'willpower', claimed: false, rare: 'legendary' },
    { id: 'h2', title: 'Pioneer先行者', icon: '🚀', desc: '访问Pioneer OS并完成首次叙事互动', req: '访问Pioneer OS子站', cost: 1000, costType: 'mp', claimed: false, rare: 'epic' },
    { id: 'h3', title: '合力指数分析师', icon: '📊', desc: '对5家企业发表深度分析评论', req: '发表5篇分析', cost: 2000, costType: 'exp', claimed: false, rare: 'rare' },
    { id: 'h4', title: '龙虾Agent创建者', icon: '🦞', desc: '成功创建并激活个人龙虾Agent', req: '创建Agent', cost: 3000, costType: 'willpower', claimed: false, rare: 'epic' },
    { id: 'h5', title: '积分大师', icon: '💎', desc: '五种积分类型各达到1000以上', req: '全积分类型达标', cost: 5000, costType: 'willpower', claimed: false, rare: 'legendary' },
    { id: 'h6', title: '飞轮贡献者', icon: '🔄', desc: '参与平台生态建设，完成飞轮各节点贡献', req: '完成5个飞轮节点任务', cost: 2500, costType: 'gov', claimed: false, rare: 'rare' }
  ],

  wpRecords: [
    { id: 'w1', action: '观看《先行者》第2集', amount: 80, time: '2026-05-22 21:30', type: 'watch' },
    { id: 'w2', action: '发表指数分析：比亚迪', amount: 200, time: '2026-05-22 15:00', type: 'exp' },
    { id: 'w3', action: '社区投票：积分规则升级', amount: 150, time: '2026-05-21 18:00', type: 'gov' },
    { id: 'w4', action: '数据贡献：上传行为数据', amount: 100, time: '2026-05-21 10:00', type: 'data' },
    { id: 'w5', action: '意义贡献：MP积分达标', amount: 300, time: '2026-05-20 16:00', type: 'mp' },
    { id: 'w6', action: '每日签到奖励', amount: 50, time: '2026-05-20 09:00', type: 'checkin' }
  ],

  pointsRecords: [
    { id: 'p1', action: '观看《先行者》奖励', amount: +50, type: 'watch', cat: 'WATCH', time: '2026-05-22 21:30' },
    { id: 'p2', action: '发表深度评论', amount: +100, type: 'exp', cat: 'EXP', time: '2026-05-22 15:00' },
    { id: 'p3', action: '参与治理投票', amount: +80, type: 'gov', cat: 'GOV', time: '2026-05-21 18:00' },
    { id: 'p4', action: '数据贡献确权', amount: +60, type: 'data', cat: 'DATA', time: '2026-05-21 10:00' },
    { id: 'p5', action: 'WATCH→HP兑换', amount: -500, type: 'watch', cat: 'WATCH', time: '2026-05-20 14:00' },
    { id: 'p6', action: 'WATCH→HP兑换', amount: +100, type: 'hp', cat: 'HP', time: '2026-05-20 14:00' },
    { id: 'p7', action: '每日签到', amount: +20, type: 'hp', cat: 'HP', time: '2026-05-20 09:00' }
  ],

  merchant: {
    name: '比亚迪品牌营销部',
    email: 'byd@example.com',
    loggedIn: false,
    dashboard: {
      monthRevenue: 2840000,
      monthOrders: 1283,
      activeUsers: 8924,
      brandScore: 92.4,
      conversionRate: 3.8,
      attentionGrowth: 24.5
    }
  },

  pioneerMode: 'c',

  agentTemplates: [
    { id: 'content', name: '内容分析Agent', icon: '📝', desc: '自动分析行业研报、上市公司公告，生成深度评论获取EXP积分', reward: '+200 EXP/篇', available: true },
    { id: 'watch', name: '观看守护Agent', icon: '👁', desc: '自动提醒新剧集上线，智能追踪观看进度，最大化WATCH积分获取', reward: '+50 WATCH/集', available: true },
    { id: 'gov', name: '治理参与Agent', icon: '🗳', desc: '分析社区提案，根据你的偏好自动参与投票，获取GOV积分', reward: '+100 GOV/次', available: true },
    { id: 'data', name: '数据贡献Agent', icon: '📡', desc: '在保护隐私的前提下，将你的行为数据上链确权，获取DATA积分', reward: '+60 DATA/天', available: false }
  ],

  brainMessages: {
    c: [
      { role: 'assistant', text: '你好！我是合力智脑，你的专属积分管家 🤖\n\n我可以帮你：\n• 制定个性化积分增长计划\n• 分析你的积分健康度\n• 推荐适合你的内容和荣誉\n• 解答合力生态一切问题\n\n有什么我能帮到你的？', time: '09:35' }
    ],
    b: [
      { role: 'assistant', text: '您好！我是合力智脑商家版 🏪\n\n我可以为您：\n• 自动生成月度运营报告\n• 分析用户行为数据\n• 制定积分激励策略\n• 优化品牌曝光路径\n\n请问您今天有什么商业需求？', time: '09:35' }
    ]
  }
};

// ========== Store ==========
const Store = {
  _data: {},
  _listeners: [],

  init() {
    const saved = localStorage.getItem('hl_store_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._data = { ...MOCK_DATA, ...parsed };
        // 深度合并user
        this._data.user = { ...MOCK_DATA.user, ...parsed.user };
      } catch(e) {
        this._data = { ...MOCK_DATA };
      }
    } else {
      this._data = { ...MOCK_DATA };
      // 深拷贝数组
      this._data.shows = JSON.parse(JSON.stringify(MOCK_DATA.shows));
      this._data.products = JSON.parse(JSON.stringify(MOCK_DATA.products));
      this._data.companies = JSON.parse(JSON.stringify(MOCK_DATA.companies));
      this._data.honors = JSON.parse(JSON.stringify(MOCK_DATA.honors));
      this._data.wpRecords = JSON.parse(JSON.stringify(MOCK_DATA.wpRecords));
      this._data.pointsRecords = JSON.parse(JSON.stringify(MOCK_DATA.pointsRecords));
      this._data.brainMessages = JSON.parse(JSON.stringify(MOCK_DATA.brainMessages));
    }
  },

  get(key) {
    return this._data[key];
  },

  set(key, val) {
    this._data[key] = val;
    this._save();
    this._notify();
  },

  update(key, fn) {
    this._data[key] = fn(this._data[key]);
    this._save();
    this._notify();
  },

  _save() {
    try {
      localStorage.setItem('hl_store_v2', JSON.stringify(this._data));
    } catch(e) {}
  },

  _notify() {
    this._listeners.forEach(fn => fn());
  },

  subscribe(fn) {
    this._listeners.push(fn);
  }
};

// ========== API ==========
const API = {
  async checkin() {
    await sleep(400);
    const user = Store.get('user');
    if (user.checkinToday) return { success: false, msg: '今日已签到' };
    const hpGain = 20 + Math.floor(Math.random() * 30);
    const wpGain = 50;
    Store.update('user', u => ({
      ...u,
      hp: u.hp + hpGain,
      willpower: u.willpower + wpGain,
      willpowerMonthly: u.willpowerMonthly + wpGain,
      checkinToday: true
    }));
    const records = Store.get('pointsRecords');
    records.unshift({ id: 'p_' + Date.now(), action: '每日签到', amount: +hpGain, type: 'hp', cat: 'HP', time: formatTime() });
    Store.set('pointsRecords', records);
    return { success: true, hp: hpGain, wp: wpGain, msg: `签到成功！+${hpGain} HP +${wpGain} 贡献值` };
  },

  async watchEpisode(showId, epId) {
    await sleep(600);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const ep = show.episodes_data.find(e => e.id === epId);
    if (!ep || ep.watched) return { success: false, msg: '已领取过奖励' };
    ep.watched = true;
    show.watchedEps = show.episodes_data.filter(e => e.watched).length;
    Store.set('shows', shows);
    Store.update('user', u => ({
      ...u,
      watch: u.watch + ep.reward,
      willpower: u.willpower + Math.floor(ep.reward * 0.8),
      willpowerMonthly: u.willpowerMonthly + Math.floor(ep.reward * 0.8)
    }));
    return { success: true, reward: ep.reward, msg: `观看完成！+${ep.reward} WATCH积分` };
  },

  async submitComment(showId, text) {
    await sleep(500);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const user = Store.get('user');
    show.comments.unshift({ id: 'c_' + Date.now(), user: user.nickname, avatar: user.avatar, text, time: formatDate(), likes: 0 });
    Store.set('shows', shows);
    Store.update('user', u => ({ ...u, exp: u.exp + 30, willpower: u.willpower + 50 }));
    return { success: true, msg: '+30 EXP积分' };
  },

  async submitQuiz(showId, quizId, optionIdx) {
    await sleep(600);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const quiz = show.quizzes.find(q => q.id === quizId);
    if (!quiz) return { success: false };
    const correct = optionIdx === quiz.answer;
    if (correct) {
      Store.update('user', u => ({ ...u, exp: u.exp + quiz.points, willpower: u.willpower + 100 }));
    }
    return { success: true, correct, points: correct ? quiz.points : 0, correctOption: quiz.answer, msg: correct ? `答对了！+${quiz.points} EXP` : '答错了，继续加油！' };
  },

  async exchangePoints(fromType, fromAmount) {
    await sleep(500);
    const rates = { watch: 0.2, exp: 0.5, gov: 1.2, data: 0.8, mp: 1.5 };
    const rate = rates[fromType];
    if (!rate) return { success: false };
    const user = Store.get('user');
    if (user[fromType] < fromAmount) return { success: false, msg: '积分不足' };
    const hpGain = Math.floor(fromAmount * rate);
    Store.update('user', u => ({ ...u, [fromType]: u[fromType] - fromAmount, hp: u.hp + hpGain }));
    return { success: true, hp: hpGain, msg: `兑换成功！+${hpGain} HP` };
  },

  async createOrder(productId, qty) {
    await sleep(700);
    const products = Store.get('products');
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false };
    const user = Store.get('user');
    const total = product.price * qty;
    if (user.hp < total) return { success: false, msg: 'HP积分不足' };
    Store.update('user', u => ({
      ...u,
      hp: u.hp - total,
      orders: [{ id: 'o_' + Date.now(), productId, productName: product.name, qty, total, status: '已下单', time: formatTime() }, ...u.orders]
    }));
    return { success: true, msg: `订单创建成功，消耗 ${total} HP` };
  },

  async claimHonor(honorId) {
    await sleep(600);
    const honors = Store.get('honors');
    const honor = honors.find(h => h.id === honorId);
    if (!honor || honor.claimed) return { success: false, msg: '荣誉已兑换' };
    const user = Store.get('user');
    const costKey = honor.costType === 'willpower' ? 'willpower' : honor.costType;
    if (user[costKey] < honor.cost) return { success: false, msg: `${honor.costType}不足` };
    honor.claimed = true;
    Store.set('honors', honors);
    Store.update('user', u => ({
      ...u,
      [costKey]: u[costKey] - honor.cost,
      honorsClaimed: [...u.honorsClaimed, honorId]
    }));
    return { success: true, msg: `🎖 获得「${honor.title}」` };
  },

  async merchantLogin(email, pwd) {
    await sleep(800);
    if (email === 'byd@example.com' && pwd === '123456') {
      Store.update('merchant', m => ({ ...m, loggedIn: true }));
      return { success: true };
    }
    return { success: false, msg: '邮箱或密码错误' };
  },

  async brainChat(mode, message) {
    await sleep(800 + Math.random() * 600);
    const responses = {
      c: {
        '积分': '你目前有 HP:12800、WATCH:5600、EXP:3200、GOV:800、DATA:1200、MP:2400。\n\n建议策略：\n1. 先把 WATCH积分 兑换为HP（汇率0.2），可得1120 HP\n2. 观看《智造者》全季，额外获得1200 WATCH\n3. 发表品牌分析，EXP积分快速增长\n\n预计本月HP可达15000+，够兑换华为以旧换新券 🎯',
        '指数': '合力指数是比传统财报早3-6个月的先行指标，当前TOP3是：\n1. 比亚迪 92.4分 ↑+3.2\n2. 中芯国际 88.7分 ↑+1.8\n3. 宁德时代 86.3分 ↓-0.5\n\n推荐关注商汤科技，近期MP维度大幅提升，可能有重大事件',
        'agent': '龙虾Agent是你的注意力资产化通道 🦞\n\n你当前是Lv.5先锋使者，可以创建个人Agent！\n\n推荐先创建「内容分析Agent」，自动分析行业研报并生成评论，每篇可获+200 EXP，一周可积累1400 EXP。\n\n要现在去创建吗？',
        'pioneer': 'Pioneer OS是合力生态的子站，专注上市公司垂直产业叙事。\n\n核心能力：\n• 将企业故事转化为可量化的产业温度数据\n• 区块链存证，不可篡改\n• 与合力指数深度联动\n\n建议你先看比亚迪的产业叙事，体验一下如何用故事驱动估值'
      },
      b: {
        '报告': '正在生成本月运营周报...\n\n📊 **5月运营摘要**\n• 月度收入：284万元（环比+18%）\n• 活跃用户：8924人（较上月+1200）\n• 品牌指数：92.4（涨3.2）\n• 注意力ROI：比传统广告高4.2倍\n\n🎯 **下月建议**\n1. 发布新一批产品券（预计带来200+订单）\n2. 参与《智造者》赞助可获品牌叙事内容\n3. 启动积分激励任务，目标召回流失用户300人',
        '策略': '根据你的用户数据，推荐以下积分激励策略：\n\n🎯 策略一：复购激励\n条件：30天内未下单用户\n激励：首单额外-200HP\n预计ROI：3.2x\n\n🎯 策略二：内容互动\n条件：看完企业纪录片\n激励：+50 WATCH积分\n预计激活率：38%\n\n🎯 策略三：转介绍奖励\n条件：成功邀请1位好友注册\n激励：双方各得+100HP\n预计增长：15%新用户'
      }
    };

    const msgs = Store.get('brainMessages');
    const modeKey = mode || 'c';
    const lower = message.toLowerCase();
    let reply = '';
    const respMap = responses[modeKey] || responses.c;

    for (const [key, val] of Object.entries(respMap)) {
      if (lower.includes(key)) { reply = val; break; }
    }

    if (!reply) {
      reply = modeKey === 'c'
        ? `关于「${message}」，我来帮你分析一下：\n\n在合力生态中，这个问题涉及多个维度。基于你目前 Lv.5 的等级和积分状况，建议你先了解相关的积分规则，通过观看内容和参与互动来累积更多价值。\n\n具体来说：WATCH积分通过观看综艺获取，EXP通过发表专业评论获取，MP积分是衡量你人性温度贡献的核心指标。\n\n有更具体的问题可以继续问我！`
        : `关于「${message}」的商业策略建议：\n\n结合合力生态的注意力经济模型，建议从三个维度切入：\n\n1. **内容曝光**：赞助相关综艺内容，获取精准用户注意力\n2. **积分激励**：设计合理的HP积分任务，提升用户活跃度\n3. **指数管理**：维护好品牌在合力指数中的各维度评分\n\n需要我生成具体的执行方案吗？`;
    }

    return { success: true, reply };
  }
};

// ========== 工具函数 ==========
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatTime() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDate() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function pad(n) { return n < 10 ? '0' + n : n; }

function formatNumber(n) {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + '亿';
  if (n >= 10000) return (n / 10000).toFixed(1) + '万';
  if (n >= 1000) return n.toLocaleString();
  return n.toString();
}
