// ==================== 合力生态平台 · 核心UI渲染 ====================

// Toast通知
function toast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// 页面导航
let pageStack = [];
const pages = ['page-home', 'page-show-list', 'page-show-detail', 'page-mall', 'page-product', 'page-order-confirm', 'page-order-list', 'page-rank', 'page-brand', 'page-willpower', 'page-wp-records', 'page-honor-list', 'page-points-detail', 'page-mine', 'page-merchant-login', 'page-merchant-dashboard'];

function navigate(pageId, data) {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active', 'fade-in');
    target.scrollTop = 0;
    // 触发页面渲染
    if (typeof window['render_' + pageId.replace(/-/g, '_')] === 'function') {
      window['render_' + pageId.replace(/-/g, '_')](data);
    }
    pageStack.push({ pageId, data });
    updateTabBar(pageId);
  }
}

function goBack() {
  if (pageStack.length > 1) {
    pageStack.pop();
    const prev = pageStack[pageStack.length - 1];
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(prev.pageId);
    if (target) {
      target.classList.add('active', 'fade-in');
      updateTabBar(prev.pageId);
    }
  }
}

function updateTabBar(pageId) {
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  const map = { 'page-home': 'tab-home', 'page-show-list': 'tab-show', 'page-mall': 'tab-mall', 'page-rank': 'tab-rank', 'page-mine': 'tab-mine' };
  const tabId = Object.entries(map).find(([k]) => pageId.startsWith(k.split('-').slice(0,2).join('-')));
  // Simple: activate based on top-level
  if (pageId === 'page-home') document.getElementById('tab-home').classList.add('active');
  else if (pageId.startsWith('page-show')) document.getElementById('tab-show').classList.add('active');
  else if (pageId.startsWith('page-mall') || pageId === 'page-product' || pageId.startsWith('page-order')) document.getElementById('tab-mall').classList.add('active');
  else if (pageId === 'page-rank' || pageId === 'page-brand') document.getElementById('tab-rank').classList.add('active');
  else if (pageId === 'page-mine' || pageId === 'page-willpower' || pageId === 'page-wp-records' || pageId === 'page-honor-list' || pageId === 'page-points-detail' || pageId.startsWith('page-merchant')) document.getElementById('tab-mine').classList.add('active');
}

// 通用SVG图标
const Icons = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  tv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  bell: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

function getLevelInfo(wp) {
  const levels = Store.get('levels');
  return levels.find(l => wp >= l.minWp && wp < l.maxWp) || levels[levels.length - 1];
}

function getLevelProgress(wp) {
  const level = getLevelInfo(wp);
  if (level.maxWp === Infinity) return 100;
  return Math.min(100, Math.round((wp - level.minWp) / (level.maxWp - level.minWp) * 100));
}

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

function productEmoji(cat, name) {
  if (name.includes('机器人')) return '🤖';
  if (name.includes('学习机') || name.includes('平板')) return '📱';
  if (name.includes('露营')) return '🏕️';
  if (name.includes('水杯')) return '🥤';
  if (name.includes('小米') || name.includes('14')) return '📱';
  if (name.includes('华为') || name.includes('Mate')) return '📲';
  if (name.includes('T恤') || name.includes('联名')) return '👕';
  if (name.includes('研报')) return '📊';
  return '🛍️';
}

// ==================== 页面渲染函数 ====================

// 首页
window.render_page_home = function() {
  const user = Store.get('user');
  const shows = Store.get('shows');
  const companies = Store.get('companies');
  const products = Store.get('products');
  const level = getLevelInfo(user.willpower);
  const progress = getLevelProgress(user.willpower);
  const nextLevel = Store.get('levels')[Math.min(level.id + 1, 3)];
  const toNext = level.maxWp === Infinity ? 0 : nextLevel.minWp - user.willpower;
  const latestShow = shows[0];

  document.getElementById('page-home').innerHTML = `
    <div class="nav-bar">
      <span class="logo-text"><span class="hl">合</span>力生态</span>
      <div style="display:flex;gap:14px;align-items:center;">
        <span style="font-size:13px;color:rgba(255,255,255,0.85);">HP ${user.points}</span>
        ${Icons.bell}
      </div>
    </div>

    <!-- 综艺Banner -->
    <div class="show-banner" onclick="navigate('page-show-detail','${latestShow.id}')">
      <div class="show-banner-bg">
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;font-size:80px;display:flex;align-items:center;justify-content:center;opacity:0.15;">📺</div>
        <div class="show-banner-ep">第${latestShow.episode}期 · 新质中国</div>
        <div class="show-banner-title">${latestShow.title}</div>
        <div class="show-banner-meta">
          <span class="${latestShow.status === '即将直播' ? 'live-badge' : 'replay-badge'}">${latestShow.status}</span>
          <span style="color:rgba(255,255,255,0.7);font-size:12px;">👀 ${formatNum(latestShow.viewers)}</span>
          <span style="color:rgba(255,255,255,0.7);font-size:12px;">+${latestShow.watchReward} HP</span>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-entry">
      <div class="quick-item" onclick="handleCheckin()">
        <span class="quick-icon">✅</span>
        <span class="quick-label">签到</span>
      </div>
      <div class="quick-item" onclick="navigate('page-show-list')">
        <span class="quick-icon">📺</span>
        <span class="quick-label">综艺</span>
      </div>
      <div class="quick-item" onclick="navigate('page-mall')">
        <span class="quick-icon">🛍️</span>
        <span class="quick-label">商城</span>
      </div>
      <div class="quick-item" onclick="navigate('page-willpower')">
        <span class="quick-icon">⚡</span>
        <span class="quick-label">意志</span>
      </div>
    </div>

    <!-- 意志速览 -->
    <div class="willpower-card" onclick="navigate('page-willpower')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <div style="font-size:12px;opacity:0.75;margin-bottom:4px;">意志吞吐量</div>
          <div style="font-size:26px;font-weight:900;">${user.willpower.toLocaleString()} <span style="font-size:14px;font-weight:500;opacity:0.8;">贡献值</span></div>
        </div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 14px;border-radius:20px;font-size:13px;font-weight:700;">
          ${level.icon} ${level.name}
        </div>
      </div>
      <div class="wp-level-bar">
        <div class="wp-level-fill" style="width:${progress}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;opacity:0.75;margin-top:6px;">
        <span>近30天 +${user.willpowerMonthly}</span>
        ${level.maxWp !== Infinity ? `<span>距下一级还需 ${toNext}</span>` : '<span>已达满级 💎</span>'}
      </div>
    </div>

    <!-- 上市公司旗舰店 -->
    <div class="section-header">
      <span class="section-title">🏢 上市公司旗舰店</span>
      <span class="section-more" onclick="navigate('page-rank')">全部 ›</span>
    </div>
    <div class="h-scroll">
      ${companies.slice(0,5).map(c => `
        <div class="company-card" onclick="navigate('page-brand','${c.id}')">
          <div class="company-logo">${c.logo}</div>
          <div class="company-name">${c.name}</div>
          <span class="badge badge-primary">${c.stock}</span>
        </div>
      `).join('')}
    </div>

    <!-- 热门商品 -->
    <div class="section-header">
      <span class="section-title">🔥 热门商品</span>
      <span class="section-more" onclick="navigate('page-mall')">更多 ›</span>
    </div>
    <div class="product-grid">
      ${products.slice(0,4).map(p => `
        <div class="product-card" onclick="navigate('page-product','${p.id}')">
          <div class="product-img">${productEmoji(p.category, p.name)}</div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-price-cash">¥${p.price}</div>
            <div class="product-price-hp">或 ${p.hpPrice} HP</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

async function handleCheckin() {
  const result = await API.checkin();
  if (result.success) {
    toast('✅ 签到成功！+5 HP 积分 +5 贡献值');
    render_page_home();
  } else {
    toast(result.msg || '今日已签到');
  }
}

// 综艺列表
window.render_page_show_list = function() {
  const shows = Store.get('shows');
  document.getElementById('page-show-list').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 综艺节目</div>
    </div>
    ${shows.map(s => `
      <div class="show-card" onclick="navigate('page-show-detail','${s.id}')">
        <div class="show-card-cover">
          <span>📺</span>
          <div style="position:absolute;top:10px;right:10px;">
            <span class="${s.status === '即将直播' ? 'live-badge' : 'replay-badge'}">${s.status}</span>
          </div>
        </div>
        <div class="show-card-body">
          <div style="font-size:15px;font-weight:700;margin-bottom:6px;">${s.title}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;line-height:1.5;">${s.summary}</div>
          <div style="display:flex;gap:12px;font-size:12px;color:var(--text-muted);">
            <span>👀 ${formatNum(s.viewers)}</span>
            <span>+${s.watchReward} HP观看</span>
            <span>🎯 +${s.betReward} HP竞猜</span>
          </div>
        </div>
      </div>
    `).join('')}
  `;
};

// 综艺详情
let watchTimer = null;
let watchedSeconds = 0;
let claimedMilestones = new Set();

window.render_page_show_detail = function(showId) {
  clearInterval(watchTimer);
  watchedSeconds = 0;
  claimedMilestones = new Set();
  const shows = Store.get('shows');
  const show = shows.find(s => s.id === showId) || shows[0];
  const actualId = show.id;

  function renderDetail() {
    const user = Store.get('user');
    const milestones = [
      { seconds: 900, label: '15分钟', pts: 20, wp: 10 },
      { seconds: 1800, label: '30分钟', pts: 30, wp: 20 },
      { seconds: 5400, label: '全程', pts: 50, wp: 30 }
    ];

    document.getElementById('page-show-detail').innerHTML = `
      <div class="nav-bar">
        <div class="nav-back" onclick="goBack()">${Icons.back} ${show.title}</div>
      </div>

      <!-- 视频播放器 -->
      <div class="video-wrapper">
        ${show.status === '即将直播' ?
          `<div style="height:200px;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;color:white;"><div style="font-size:40px;">📡</div><div>即将直播，敬请期待</div></div>` :
          `<video id="show-video" controls playsinline preload="metadata" src="${show.videoUrl}" style="width:100%;max-height:220px;background:#000;display:block;"></video>`
        }
      </div>

      <!-- 观看积分 -->
      <div style="padding:14px 16px;background:white;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:10px;">🎁 观看时长奖励</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${milestones.map(m => {
            const claimed = claimedMilestones.has(m.seconds);
            const reached = watchedSeconds >= m.seconds;
            return `<button onclick="claimWatchReward('${actualId}', ${m.seconds}, ${m.pts}, ${m.wp})" ${claimed ? 'disabled' : ''} class="btn btn-sm ${claimed ? 'btn-outline' : reached ? 'btn-accent' : 'btn-outline'}" id="milestone-${m.seconds}">
              ${claimed ? '✓' : ''} ${m.label} +${m.pts}HP
            </button>`;
          }).join('')}
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">已观看: <span id="watch-time">0</span> 秒</div>
      </div>

      <!-- 竞猜 -->
      ${show.questions.length > 0 ? `
      <div class="card" style="margin-bottom:10px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;">🎯 竞猜互动</div>
        ${show.questions.map(q => `
          <div>
            <div style="font-size:14px;font-weight:600;margin-bottom:10px;">${q.text}</div>
            <div id="bet-options-${q.id}">
              ${q.options.map(opt => `
                <div class="bet-option ${q.settled && q.correct === opt.id ? 'correct' : ''}" onclick="selectBetOption('${q.id}','${opt.id}',this)">
                  <div>
                    <div style="font-size:13px;font-weight:600;">${opt.text}</div>
                    <div style="font-size:11px;color:var(--text-muted);">赔率 ${opt.odds}x · ${opt.bets}人下注</div>
                  </div>
                  ${q.settled && q.correct === opt.id ? '<span class="badge badge-success">正确</span>' : ''}
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:8px;align-items:center;margin-top:10px;">
              <input type="number" id="bet-amount" class="input" style="flex:1;padding:8px 12px;" placeholder="下注积分数" min="1" max="${Store.get('user').points}">
              <button class="btn btn-accent btn-sm" onclick="submitBet('${actualId}','${q.id}')">确认下注</button>
            </div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">当前积分: ${Store.get('user').points} HP</div>
          </div>
        `).join('')}
      </div>` : ''}

      <!-- 评论 -->
      <div class="card">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;">💬 评论互动 <span style="font-size:12px;font-weight:400;color:var(--accent);">+10 贡献值</span></div>
        <div style="display:flex;gap:8px;margin-bottom:14px;">
          <input type="text" id="comment-input" class="input" style="flex:1;" placeholder="发表你的见解...">
          <button class="btn btn-primary btn-sm" onclick="submitComment('${actualId}')">发送</button>
        </div>
        <div id="comment-list">
          ${show.comments.map(c => `
            <div style="padding:10px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <div style="width:28px;height:28px;border-radius:50%;background:var(--gradient-main);display:flex;align-items:center;justify-content:center;font-size:12px;color:white;font-weight:700;">${c.nick[0]}</div>
                <span style="font-size:13px;font-weight:600;">${c.nick}</span>
                <span style="font-size:11px;color:var(--text-muted);">${c.time}</span>
              </div>
              <div style="font-size:13px;color:var(--text-primary);line-height:1.5;">${c.content}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 启动计时器
    if (show.status !== '即将直播') {
      const video = document.getElementById('show-video');
      if (video) {
        video.addEventListener('timeupdate', () => {
          watchedSeconds = Math.floor(video.currentTime);
          const el = document.getElementById('watch-time');
          if (el) el.textContent = watchedSeconds;
          // 更新按钮状态
          milestones.forEach(m => {
            const btn = document.getElementById('milestone-' + m.seconds);
            if (btn && !claimedMilestones.has(m.seconds) && watchedSeconds >= m.seconds) {
              btn.className = 'btn btn-sm btn-accent';
            }
          });
        });
      }
    }
  }

  renderDetail();
};

let selectedBetOption = {};
function selectBetOption(qId, optId, el) {
  selectedBetOption[qId] = optId;
  document.querySelectorAll(`#bet-options-${qId} .bet-option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

async function claimWatchReward(showId, seconds, pts, wp) {
  const result = await API.claimWatchReward(showId, seconds);
  if (result.success) {
    claimedMilestones.add(seconds);
    toast(`🎁 领取成功！+${pts} HP 积分 +${wp} 贡献值`);
    const btn = document.getElementById('milestone-' + seconds);
    if (btn) { btn.disabled = true; btn.innerHTML = '✓ 已领取'; }
  }
}

async function submitBet(showId, qId) {
  const optId = selectedBetOption[qId];
  const amount = parseInt(document.getElementById('bet-amount').value);
  if (!optId) return toast('请先选择竞猜选项');
  if (!amount || amount < 1) return toast('请输入下注积分数');
  const result = await API.submitBet(showId, optId, amount);
  if (result.success) {
    toast(`✅ 下注成功！已扣除 ${amount} HP`);
    document.getElementById('bet-amount').value = '';
  } else {
    toast(result.msg || '下注失败');
  }
}

async function submitComment(showId) {
  const input = document.getElementById('comment-input');
  const content = input.value.trim();
  if (!content) return toast('请输入评论内容');
  const result = await API.postComment(showId, content);
  if (result.success) {
    input.value = '';
    toast('✅ 评论成功！+10 贡献值');
    const user = Store.get('user');
    const newComment = { id: result.commentId, uid: user.id, nick: user.nickname, time: new Date().toLocaleString(), content, likes: 0 };
    const list = document.getElementById('comment-list');
    if (list) {
      const div = document.createElement('div');
      div.style.cssText = 'padding:10px 0;border-bottom:1px solid var(--border);';
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:12px;color:white;font-weight:700;">${user.nickname[0]}</div>
          <span style="font-size:13px;font-weight:600;">${user.nickname}</span>
          <span style="font-size:11px;color:var(--text-muted);">刚刚</span>
        </div>
        <div style="font-size:13px;color:var(--text-primary);line-height:1.5;">${content}</div>`;
      list.insertBefore(div, list.firstChild);
    }
  }
}

// 商城
let currentCategory = '全部';
window.render_page_mall = function() {
  const products = Store.get('products');
  const categories = ['全部', 'AI', '具身智能', '新能源', '衣食住行'];
  
  function renderMall() {
    const filtered = currentCategory === '全部' ? products : products.filter(p => p.category === currentCategory);
    const mallEl = document.getElementById('page-mall');
    mallEl.innerHTML = `
      <div class="nav-bar">
        <span class="logo-text"><span class="hl">合</span>力商城</span>
        <span style="font-size:13px;color:rgba(255,255,255,0.85);">${Icons.shop}</span>
      </div>

      <!-- 分类筛选 -->
      <div class="category-scroll">
        ${categories.map(c => `
          <div class="cat-btn ${c === currentCategory ? 'active' : ''}" onclick="setCategory('${c}')">${c}</div>
        `).join('')}
      </div>

      <!-- 入驻Banner -->
      <div style="margin:0 16px 14px;background:var(--gradient-main);border-radius:var(--radius-sm);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;" onclick="navigate('page-merchant-login')">
        <div>
          <div style="color:rgba(255,255,255,0.75);font-size:11px;margin-bottom:3px;">上市公司专属通道</div>
          <div style="color:white;font-size:14px;font-weight:700;">申请商家入驻 →</div>
        </div>
        <span style="font-size:36px;">🏪</span>
      </div>

      <!-- 商品网格 -->
      <div class="product-grid" id="product-grid">
        ${filtered.map(p => `
          <div class="product-card" onclick="navigate('page-product','${p.id}')">
            <div class="product-img">${productEmoji(p.category, p.name)}</div>
            <div class="product-info">
              <div class="product-name">${p.name}</div>
              <div class="product-price-cash">¥${p.price}</div>
              <div class="product-price-hp">或 ${p.hpPrice} HP</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  window.setCategory = function(cat) {
    currentCategory = cat;
    renderMall();
  };
  
  renderMall();
};

// 商品详情
window.render_page_product = function(productId) {
  const products = Store.get('products');
  const product = products.find(p => p.id === productId) || products[0];
  const user = Store.get('user');
  const maxHp = Math.min(user.points, product.hpPrice, Math.floor(product.price * 0.3 / 0.01));
  let usedHp = 0;

  function renderProduct() {
    const discount = usedHp * 0.01;
    const finalPrice = Math.max(0, product.price - discount);
    document.getElementById('page-product').innerHTML = `
      <div class="nav-bar">
        <div class="nav-back" onclick="goBack()">${Icons.back} 商品详情</div>
      </div>

      <div class="product-detail-img">${productEmoji(product.category, product.name)}</div>

      <div style="padding:16px 20px;background:white;margin-bottom:10px;">
        <div style="font-size:18px;font-weight:700;margin-bottom:8px;">${product.name}</div>
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;">
          <span style="font-size:24px;font-weight:900;color:var(--danger);">¥${product.price}</span>
          <span style="font-size:13px;color:var(--accent);">或 ${product.hpPrice} HP兑换</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);">品牌：${product.brand} · 库存：${product.stock}件</div>
      </div>

      <div class="card">
        <div style="font-size:14px;font-weight:700;margin-bottom:8px;">商品描述</div>
        <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">${product.desc}</div>
      </div>

      <div class="card">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;">💰 HP积分抵扣</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">可用积分：${user.points} HP（最多可抵扣 ${maxHp} HP = ¥${(maxHp*0.01).toFixed(2)}）</div>
        
        <input type="range" class="slider" id="hp-slider" min="0" max="${maxHp}" value="${usedHp}" oninput="updateHpCalc(this.value,'${product.id}')">
        
        <div class="calculator-box" id="calc-box">
          <div class="calc-row">
            <span>商品原价</span><span>¥${product.price}</span>
          </div>
          <div class="calc-row">
            <span style="color:var(--accent);">HP积分抵扣 (${usedHp} HP)</span>
            <span style="color:var(--accent);">-¥${discount.toFixed(2)}</span>
          </div>
          <div style="border-top:2px solid var(--border);margin:8px 0;"></div>
          <div class="calc-row">
            <span style="font-weight:700;">最终支付</span>
            <span class="calc-total">${finalPrice <= 0 ? '免费兑换 🎉' : '¥' + finalPrice.toFixed(2)}</span>
          </div>
        </div>
        <input type="number" class="input" id="hp-input" value="${usedHp}" min="0" max="${maxHp}" oninput="updateHpCalcInput(this.value,'${product.id}')">
      </div>

      <div style="padding:16px;display:flex;gap:10px;">
        <button class="btn btn-outline" style="flex:1;" onclick="navigate('page-mall')">返回商城</button>
        <button class="btn btn-accent" style="flex:2;" onclick="goToOrderConfirm('${product.id}')">立即购买</button>
      </div>
    `;
  }

  window.updateHpCalc = function(val, pid) {
    usedHp = parseInt(val);
    document.getElementById('hp-input').value = usedHp;
    updateCalcBox(pid);
  };

  window.updateHpCalcInput = function(val, pid) {
    usedHp = Math.min(maxHp, Math.max(0, parseInt(val) || 0));
    document.getElementById('hp-slider').value = usedHp;
    updateCalcBox(pid);
  };

  function updateCalcBox(pid) {
    const discount = usedHp * 0.01;
    const finalPrice = Math.max(0, product.price - discount);
    document.getElementById('calc-box').innerHTML = `
      <div class="calc-row"><span>商品原价</span><span>¥${product.price}</span></div>
      <div class="calc-row"><span style="color:var(--accent);">HP积分抵扣 (${usedHp} HP)</span><span style="color:var(--accent);">-¥${discount.toFixed(2)}</span></div>
      <div style="border-top:2px solid var(--border);margin:8px 0;"></div>
      <div class="calc-row"><span style="font-weight:700;">最终支付</span><span class="calc-total">${finalPrice <= 0 ? '免费兑换 🎉' : '¥' + finalPrice.toFixed(2)}</span></div>
    `;
  }

  window.goToOrderConfirm = function(pid) {
    navigate('page-order-confirm', { productId: pid, usedHp });
  };

  renderProduct();
};

// 订单确认
window.render_page_order_confirm = function(data) {
  const product = Store.get('products').find(p => p.id === data.productId);
  if (!product) return;
  const usedHp = data.usedHp || 0;
  const discount = usedHp * 0.01;
  const finalPrice = Math.max(0, product.price - discount);

  document.getElementById('page-order-confirm').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 确认订单</div>
    </div>

    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">📦 商品信息</div>
      <div style="display:flex;gap:12px;align-items:center;">
        <div style="font-size:40px;">${productEmoji(product.category, product.name)}</div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:600;margin-bottom:4px;">${product.name}</div>
          <div style="font-size:12px;color:var(--text-muted);">${product.brand}</div>
          <div style="font-size:15px;font-weight:700;color:var(--danger);margin-top:4px;">¥${product.price}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">💰 价格明细</div>
      <div class="calc-row" style="display:flex;justify-content:space-between;padding:6px 0;">
        <span>商品原价</span><span>¥${product.price}</span>
      </div>
      ${usedHp > 0 ? `<div class="calc-row" style="display:flex;justify-content:space-between;padding:6px 0;color:var(--accent);"><span>HP积分抵扣 (${usedHp} HP)</span><span>-¥${discount.toFixed(2)}</span></div>` : ''}
      <div style="border-top:2px solid var(--border);margin:8px 0;padding-top:8px;display:flex;justify-content:space-between;">
        <span style="font-weight:700;">实付金额</span>
        <span style="font-size:20px;font-weight:800;color:var(--danger);">${finalPrice <= 0 ? '¥0（积分兑换）' : '¥' + finalPrice.toFixed(2)}</span>
      </div>
    </div>

    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">💳 支付方式</div>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 0;cursor:pointer;">
        <input type="radio" name="pay" checked style="accent-color:var(--primary);">
        <span style="font-size:22px;">🟢</span>
        <span style="font-size:14px;font-weight:500;">微信支付</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 0;cursor:pointer;">
        <input type="radio" name="pay" style="accent-color:var(--primary);">
        <span style="font-size:22px;">💰</span>
        <span style="font-size:14px;font-weight:500;">账户余额</span>
      </label>
    </div>

    <div style="padding:16px;">
      <button class="btn btn-accent btn-block" style="height:52px;font-size:16px;" onclick="submitOrder('${product.id}', ${usedHp})">
        立即支付 ${finalPrice <= 0 ? '（积分免费兑换）' : '¥' + finalPrice.toFixed(2)}
      </button>
    </div>
  `;
};

async function submitOrder(productId, usedHp) {
  const result = await API.createOrder(productId, 1, usedHp);
  if (result.success) {
    toast('✅ 订单提交成功！');
    navigate('page-order-list');
  } else {
    toast(result.msg || '下单失败');
  }
}

// 订单列表
let orderTab = '全部';
window.render_page_order_list = function() {
  const user = Store.get('user');
  const allOrders = user.orders || [];
  const tabs = ['全部', '待付款', '已支付', '已完成'];
  
  function renderOrders() {
    const filtered = orderTab === '全部' ? allOrders : allOrders.filter(o => o.status === orderTab);
    document.getElementById('page-order-list').innerHTML = `
      <div class="nav-bar">
        <div class="nav-back" onclick="goBack()">${Icons.back} 我的订单</div>
      </div>
      <div class="tabs">
        ${tabs.map(t => `<div class="tab-btn ${t === orderTab ? 'active' : ''}" onclick="setOrderTab('${t}')">${t}</div>`).join('')}
      </div>
      ${filtered.length === 0 ? `<div class="empty-state"><div class="icon">📦</div><p>暂无订单</p></div>` :
        filtered.map(o => `
          <div class="order-card">
            <div class="order-header">
              <span style="font-size:12px;color:var(--text-muted);">订单号：${o.id}</span>
              <span class="badge badge-success">${o.status}</span>
            </div>
            <div class="order-body">
              <div class="order-thumb">${productEmoji('', o.productName)}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;margin-bottom:4px;">${o.productName}</div>
                <div style="font-size:12px;color:var(--text-muted);">x${o.quantity}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${o.time}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:15px;font-weight:700;color:var(--danger);">¥${o.finalPrice.toFixed(2)}</div>
                ${o.usedPoints > 0 ? `<div style="font-size:11px;color:var(--accent);">-${o.usedPoints} HP</div>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
    `;
  }

  window.setOrderTab = function(tab) {
    orderTab = tab;
    renderOrders();
  };

  renderOrders();
};
