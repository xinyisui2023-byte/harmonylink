// ==================== 合力生态平台 · 指数/意志/商家/我的 ====================

// 指数平台
let rankSearch = '';
let rankCat = '全部';
window.render_page_rank = function() {
  const companies = Store.get('companies');
  const cats = ['全部', 'AI', '新能源'];

  function renderRank() {
    const filtered = companies.filter(c => {
      const catOk = rankCat === '全部' || c.sector === rankCat;
      const searchOk = !rankSearch || c.name.includes(rankSearch);
      return catOk && searchOk;
    }).sort((a, b) => b.score - a.score);

    document.getElementById('page-rank').innerHTML = `
      <div class="nav-bar">
        <span class="logo-text"><span class="hl">合</span>力指数</span>
      </div>

      <!-- 五维模型说明 -->
      <div class="card card-blue" style="margin-top:14px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:6px;">📊 合力五维评估模型</div>
        <div style="font-size:12px;opacity:0.85;line-height:1.7;">
          技术能力 · 量产交付 · 商业落地 · 资本价值 · 生态贡献
        </div>
        <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">
          ${['🔬技术', '🏭交付', '💼商业', '📈资本', '🌐生态'].map(t => `
            <span style="background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;">${t}</span>
          `).join('')}
        </div>
      </div>

      <!-- 搜索&筛选 -->
      <div class="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="搜索企业名称..." value="${rankSearch}" oninput="rankSearchChange(this.value)">
      </div>
      <div class="category-scroll">
        ${cats.map(c => `<div class="cat-btn ${c === rankCat ? 'active' : ''}" onclick="setRankCat('${c}')">${c}</div>`).join('')}
      </div>

      <!-- 企业排名 -->
      <div id="rank-list">
        ${filtered.map((c, i) => `
          <div class="rank-item" onclick="navigate('page-brand','${c.id}')">
            <div class="rank-num ${i < 3 ? 'rank-' + (i + 1) : 'rank-other'}">${i + 1}</div>
            <div style="font-size:28px;">${c.logo}</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;">${c.name}</div>
              <div style="font-size:12px;color:var(--text-muted);">${c.stock} · ${c.sector}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:20px;font-weight:800;color:var(--primary);">${c.score}</div>
              <div style="font-size:12px;color:${c.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)'};">${c.trend}</div>
            </div>
            ${Icons.arrow}
          </div>
        `).join('')}
      </div>
    `;
  }

  window.rankSearchChange = function(val) { rankSearch = val; renderRank(); };
  window.setRankCat = function(cat) { rankCat = cat; renderRank(); };
  renderRank();
};

// 品牌详情
window.render_page_brand = function(companyId) {
  const companies = Store.get('companies');
  const company = companies.find(c => c.id === companyId) || companies[0];
  const products = Store.get('products').filter(p => p.brand.includes(company.name.replace('科技','').replace('汽车','').replace('集团','').replace('技术','')));
  
  const scoreItems = [
    { key: 'tech', label: '技术能力', icon: '🔬' },
    { key: 'delivery', label: '量产交付', icon: '🏭' },
    { key: 'commercial', label: '商业落地', icon: '💼' },
    { key: 'capital', label: '资本价值', icon: '📈' },
    { key: 'ecosystem', label: '生态贡献', icon: '🌐' }
  ];

  document.getElementById('page-brand').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 企业详情</div>
    </div>

    <div class="brand-hero">
      <div class="logo">${company.logo}</div>
      <div style="font-size:20px;font-weight:800;margin-bottom:6px;">${company.name}</div>
      <div style="font-size:12px;opacity:0.8;margin-bottom:10px;">${company.stock}</div>
      <div style="font-size:13px;opacity:0.9;line-height:1.6;text-align:left;">${company.desc}</div>
    </div>

    <!-- 指数得分 -->
    <div class="card" style="margin-top:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-size:15px;font-weight:700;">📊 合力指数得分</span>
        <span style="font-size:28px;font-weight:900;color:var(--accent);">${company.score}</span>
      </div>
      ${scoreItems.map(item => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
            <span>${item.icon} ${item.label}</span>
            <span style="font-weight:700;">${company.scores[item.key]}</span>
          </div>
          <div class="progress-bar dark">
            <div class="progress-fill" style="width:${company.scores[item.key]}%;background:var(--gradient-main);"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 投资者关注度 -->
    <div class="section-header"><span class="section-title">📈 投资者关注度</span></div>
    <div class="inv-stats">
      <div class="inv-stat">
        <div class="inv-stat-num">${company.recentSearch[company.recentSearch.length-1]}</div>
        <div class="inv-stat-label">今日搜索量</div>
      </div>
      <div class="inv-stat">
        <div class="inv-stat-num">${Math.floor(Math.random()*20+5)}</div>
        <div class="inv-stat-label">研报提及</div>
      </div>
      <div class="inv-stat">
        <div class="inv-stat-num">${Math.floor(Math.random()*10+2)}</div>
        <div class="inv-stat-label">券商调研</div>
      </div>
    </div>

    <!-- 搜索趋势图 -->
    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">近30天搜索量趋势</div>
      <div id="search-chart" style="height:180px;"></div>
    </div>

    <!-- 获奖信息 -->
    <div class="section-header"><span class="section-title">🏆 获奖荣誉</span></div>
    <div style="padding:0 16px 14px;">
      ${company.awards.map(a => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:white;border-radius:var(--radius-xs);box-shadow:var(--shadow);margin-bottom:8px;">
          <span style="font-size:20px;">🥇</span>
          <span style="font-size:13px;font-weight:600;">${a}</span>
        </div>
      `).join('')}
    </div>

    <!-- 在售商品 -->
    ${products.length > 0 ? `
      <div class="section-header"><span class="section-title">🛍️ 在售商品</span></div>
      <div class="product-grid">
        ${products.map(p => `
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
    ` : ''}

    <!-- 评论互动 -->
    <div class="card" style="margin-bottom:20px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">💬 发表评论 <span style="font-size:12px;font-weight:400;color:var(--accent);">+10 贡献值</span></div>
      <div style="display:flex;gap:8px;">
        <input type="text" id="brand-comment" class="input" style="flex:1;" placeholder="分享你对这家企业的看法...">
        <button class="btn btn-primary btn-sm" onclick="submitBrandComment()">发送</button>
      </div>
    </div>
  `;

  // 搜索趋势图
  setTimeout(() => renderMiniChart('search-chart', company.recentSearch, '#F18F01'), 100);
};

async function submitBrandComment() {
  const input = document.getElementById('brand-comment');
  if (!input.value.trim()) return toast('请输入内容');
  await API.addWillpower(10, '评论企业', '💬');
  toast('✅ 评论成功！+10 贡献值');
  input.value = '';
}

// 意志吞吐量
window.render_page_willpower = function() {
  const user = Store.get('user');
  const level = getLevelInfo(user.willpower);
  const progress = getLevelProgress(user.willpower);
  const nextLevel = Store.get('levels')[Math.min(level.id + 1, 3)];
  const toNext = level.maxWp === Infinity ? 0 : nextLevel.minWp - user.willpower;
  const records = Store.get('wpRecords').slice(0, 10);
  const honors = Store.get('honors');

  // 生成近30天趋势数据
  const wpTrend = Array.from({length: 30}, (_, i) => Math.floor(Math.random() * 80 + 20));

  document.getElementById('page-willpower').innerHTML = `
    <div class="nav-bar">
      <span class="logo-text">⚡ 意志吞吐量</span>
    </div>

    <!-- 顶部卡片 -->
    <div style="background:var(--gradient-card);color:white;padding:24px 20px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <div>
          <div style="font-size:11px;opacity:0.75;">总贡献值</div>
          <div style="font-size:30px;font-weight:900;margin-top:4px;">${user.willpower.toLocaleString()}</div>
        </div>
        <div>
          <div style="font-size:11px;opacity:0.75;">近30天贡献</div>
          <div style="font-size:30px;font-weight:900;margin-top:4px;color:var(--accent-light);">${user.willpowerMonthly}</div>
        </div>
        <div>
          <div style="font-size:11px;opacity:0.75;">全站排名</div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">Top ${Math.max(1, Math.round(user.rank / 50000 * 100))}%</div>
        </div>
        <div>
          <div style="font-size:11px;opacity:0.75;">当前等级</div>
          <div style="font-size:20px;font-weight:700;margin-top:4px;">${level.icon} ${level.name}</div>
        </div>
      </div>
      <div class="wp-level-bar">
        <div class="wp-level-fill" style="width:${progress}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;opacity:0.75;margin-top:6px;">
        <span>${level.name}（${level.minWp}）</span>
        ${level.maxWp !== Infinity ? `<span>距 ${nextLevel.name} 还需 ${toNext}</span>` : '<span>已达满级 💎</span>'}
      </div>
    </div>

    <!-- 趋势图 -->
    <div class="card" style="margin-top:14px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">📈 近30天贡献趋势</div>
      <div id="wp-trend-chart" style="height:180px;"></div>
    </div>

    <!-- 快速获取 -->
    <div class="section-header"><span class="section-title">⚡ 快速获取贡献值</span></div>
    <div class="wp-actions">
      <div class="wp-action-btn" onclick="quickWp(5,'每日签到','✅')">
        <span style="font-size:22px;">✅</span>
        <span class="num">+5</span>
        <span class="act">签到</span>
      </div>
      <div class="wp-action-btn" onclick="quickWp(10,'发表评论','💬')">
        <span style="font-size:22px;">💬</span>
        <span class="num">+10</span>
        <span class="act">评论</span>
      </div>
      <div class="wp-action-btn" onclick="quickWp(10,'分享内容','📤')">
        <span style="font-size:22px;">📤</span>
        <span class="num">+10</span>
        <span class="act">分享</span>
      </div>
      <div class="wp-action-btn" onclick="quickWp(50,'发布文章','📝')">
        <span style="font-size:22px;">📝</span>
        <span class="num">+50</span>
        <span class="act">文章</span>
      </div>
    </div>

    <!-- 等级说明 -->
    <div class="section-header"><span class="section-title">🏅 意志等级说明</span></div>
    <div class="level-grid">
      ${Store.get('levels').map(l => `
        <div class="level-card" style="border-color:${l.color}20;background:${l.color}08;">
          <div class="level-name" style="color:${l.color};">${l.icon} ${l.name}</div>
          <div class="level-range">${l.minWp} - ${l.maxWp === Infinity ? '∞' : l.maxWp}</div>
          <div class="level-perk" style="color:var(--text-muted);">${l.perks}</div>
        </div>
      `).join('')}
    </div>

    <!-- 荣誉兑换推荐 -->
    <div class="section-header">
      <span class="section-title">🎖️ 荣誉兑换</span>
      <span class="section-more" onclick="navigate('page-honor-list')">全部 ›</span>
    </div>
    <div class="h-scroll">
      ${honors.slice(0,4).map(h => {
        const canClaim = user.willpower >= h.cost && !user.honorsClaimed.includes(h.id);
        return `
          <div style="flex-shrink:0;width:150px;background:white;border-radius:var(--radius-sm);padding:14px;box-shadow:var(--shadow);text-align:center;" onclick="navigate('page-honor-list')">
            <div style="font-size:32px;margin-bottom:6px;">${h.icon}</div>
            <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${h.name}</div>
            <div style="font-size:12px;color:var(--accent);">${h.cost} 贡献值</div>
            <div style="margin-top:8px;" class="badge ${canClaim ? 'badge-success' : user.honorsClaimed.includes(h.id) ? 'badge-gray' : 'badge-accent'}">${user.honorsClaimed.includes(h.id) ? '已兑换' : canClaim ? '可兑换' : '未解锁'}</div>
          </div>`;
      }).join('')}
    </div>

    <!-- 贡献记录 -->
    <div class="section-header">
      <span class="section-title">📋 贡献记录</span>
      <span class="section-more" onclick="navigate('page-wp-records')">全部 ›</span>
    </div>
    <div style="background:white;border-radius:var(--radius-sm);margin:0 16px 20px;box-shadow:var(--shadow);overflow:hidden;">
      ${records.map(r => `
        <div class="list-item">
          <div class="list-icon">${r.icon}</div>
          <div class="list-content">
            <div class="list-title">${r.action}</div>
            <div class="list-sub">${r.time}</div>
          </div>
          <div style="color:var(--success);font-weight:700;font-size:15px;">+${r.wp}</div>
        </div>
      `).join('')}
    </div>
  `;

  setTimeout(() => renderMiniChart('wp-trend-chart', wpTrend, '#1E3A5F'), 100);
};

async function quickWp(amount, action, icon) {
  await API.addWillpower(amount, action, icon);
  toast(`✅ +${amount} 贡献值`);
  render_page_willpower();
}

// 贡献记录页
window.render_page_wp_records = function() {
  const records = Store.get('wpRecords');
  document.getElementById('page-wp-records').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 贡献记录</div>
    </div>
    <div style="background:white;margin:14px 16px;border-radius:var(--radius-sm);box-shadow:var(--shadow);overflow:hidden;">
      ${records.map(r => `
        <div class="list-item">
          <div class="list-icon">${r.icon}</div>
          <div class="list-content">
            <div class="list-title">${r.action}</div>
            <div class="list-sub">${r.time}</div>
          </div>
          <div style="color:var(--success);font-weight:700;font-size:15px;">+${r.wp}</div>
        </div>
      `).join('')}
    </div>
  `;
};

// 荣誉兑换
window.render_page_honor_list = function() {
  const honors = Store.get('honors');
  const user = Store.get('user');

  document.getElementById('page-honor-list').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 荣誉兑换</div>
    </div>
    <div style="padding:14px 16px 4px;font-size:13px;color:var(--text-muted);">当前贡献值：<span style="color:var(--primary);font-weight:700;">${user.willpower}</span></div>
    ${honors.map(h => {
      const claimed = user.honorsClaimed.includes(h.id);
      const canClaim = !claimed && user.willpower >= h.cost;
      return `
        <div class="honor-card">
          <div class="honor-icon">${h.icon}</div>
          <div class="honor-info">
            <div class="honor-name">${h.name}</div>
            <div class="honor-cost">需 ${h.cost} 贡献值 · ${h.type}</div>
            <div class="honor-desc">${h.desc}</div>
          </div>
          <button class="btn btn-sm ${claimed ? 'btn-outline' : canClaim ? 'btn-accent' : 'btn-outline'}" ${claimed || !canClaim ? 'disabled' : ''} onclick="claimHonor('${h.id}')">
            ${claimed ? '✓ 已兑换' : canClaim ? '立即兑换' : '贡献值不足'}
          </button>
        </div>`;
    }).join('')}
  `;
};

async function claimHonor(honorId) {
  if (!confirm('确认兑换此荣誉？')) return;
  const result = await API.claimHonor(honorId);
  if (result.success) {
    toast('🎉 兑换成功！');
    render_page_honor_list();
  } else {
    toast(result.msg || '兑换失败');
  }
}

// 积分明细
window.render_page_points_detail = function() {
  const records = Store.get('pointsRecords');
  const user = Store.get('user');
  document.getElementById('page-points-detail').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} HP积分明细</div>
    </div>
    <div style="padding:14px 16px 4px;font-size:13px;color:var(--text-muted);">当前 HP 积分：<span style="color:var(--accent);font-weight:700;font-size:18px;">${user.points}</span></div>
    <div style="background:white;margin:14px 16px;border-radius:var(--radius-sm);box-shadow:var(--shadow);overflow:hidden;">
      ${records.map(r => `
        <div class="list-item">
          <div class="list-icon">${r.type === 'earn' ? '💰' : '🛒'}</div>
          <div class="list-content">
            <div class="list-title">${r.action}</div>
            <div class="list-sub">${r.time}</div>
          </div>
          <div style="color:${r.type === 'earn' ? 'var(--success)' : 'var(--danger)'};font-weight:700;font-size:15px;">${r.pts > 0 ? '+' : ''}${r.pts} HP</div>
        </div>
      `).join('')}
    </div>
  `;
};

// 我的
window.render_page_mine = function() {
  const user = Store.get('user');
  const level = getLevelInfo(user.willpower);
  const devMode = localStorage.getItem('dev_mode') === 'true';
  const apiLogs = Store.get('apiLogs') || [];

  const menuItems = [
    { icon: '⚡', label: '意志吞吐量', sub: `${user.willpower} 贡献值`, page: 'page-willpower' },
    { icon: '📦', label: '我的订单', sub: `${(user.orders||[]).length} 个订单`, page: 'page-order-list' },
    { icon: '🎖️', label: '荣誉兑换', sub: `已获得 ${user.honorsClaimed.length} 个荣誉`, page: 'page-honor-list' },
    { icon: '💳', label: '积分明细', sub: `${user.points} HP 积分`, page: 'page-points-detail' },
    { icon: '📊', label: '合力指数', sub: '企业排名与评分', page: 'page-rank' },
    { icon: '🏪', label: '商家后台', sub: '商家数据看板', page: 'page-merchant-login' }
  ];

  document.getElementById('page-mine').innerHTML = `
    <div class="nav-bar">
      <span class="logo-text">我的</span>
    </div>

    <!-- 用户卡片 -->
    <div style="background:var(--gradient-card);color:white;padding:24px 20px;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:32px;">${user.avatar}</div>
        <div>
          <div style="font-size:18px;font-weight:700;">${user.nickname}</div>
          <div style="font-size:13px;opacity:0.8;margin-top:4px;">${level.icon} ${level.name} · 全站 Top ${Math.max(1, Math.round(user.rank/50000*100))}%</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:rgba(255,255,255,0.1);padding:14px;border-radius:var(--radius-sm);">
        <div style="text-align:center;">
          <div style="font-size:20px;font-weight:800;">${user.points}</div>
          <div style="font-size:11px;opacity:0.75;margin-top:2px;">HP 积分</div>
        </div>
        <div style="text-align:center;border-left:1px solid rgba(255,255,255,0.2);border-right:1px solid rgba(255,255,255,0.2);">
          <div style="font-size:20px;font-weight:800;">${user.willpower}</div>
          <div style="font-size:11px;opacity:0.75;margin-top:2px;">贡献值</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:20px;font-weight:800;">#${user.rank}</div>
          <div style="font-size:11px;opacity:0.75;margin-top:2px;">全站排名</div>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div style="background:white;border-radius:var(--radius-sm);margin:14px 16px;box-shadow:var(--shadow);overflow:hidden;">
      ${menuItems.map(item => `
        <div class="list-item" onclick="navigate('${item.page}')">
          <div class="list-icon">${item.icon}</div>
          <div class="list-content">
            <div class="list-title">${item.label}</div>
            <div class="list-sub">${item.sub}</div>
          </div>
          ${Icons.arrow}
        </div>
      `).join('')}
    </div>

    <!-- 开发者模式 -->
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:14px;font-weight:700;">🛠️ 开发者模式</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">查看 API 调用日志</div>
        </div>
        <label class="switch" style="position:relative;display:inline-block;width:48px;height:26px;">
          <input type="checkbox" ${devMode ? 'checked' : ''} onchange="toggleDevMode(this.checked)" style="opacity:0;width:0;height:0;">
          <span style="position:absolute;cursor:pointer;inset:0;background:${devMode ? 'var(--success)' : 'var(--border)'};border-radius:26px;transition:0.3s;"></span>
          <span style="position:absolute;content:'';height:20px;width:20px;left:${devMode ? '24px' : '3px'};bottom:3px;background:white;border-radius:50%;transition:0.3s;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></span>
        </label>
      </div>

      ${devMode ? `
        <div style="margin-top:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <span style="font-size:13px;font-weight:600;">API 日志 (${apiLogs.length})</span>
            <button class="btn btn-sm btn-outline" onclick="clearLogs()">清空日志</button>
          </div>
          <div style="background:var(--bg);border-radius:var(--radius-xs);max-height:200px;overflow-y:auto;font-family:monospace;">
            ${apiLogs.length === 0 ? '<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:12px;">暂无日志</div>' :
              apiLogs.map(log => `
                <div class="dev-log">
                  <span style="color:var(--text-muted);flex-shrink:0;">${log.time}</span>
                  <span class="method method-${log.method}">${log.method}</span>
                  <span style="color:var(--primary);flex:1;word-break:break-all;">${log.url}</span>
                  <span style="color:var(--success);">${log.status}</span>
                </div>
              `).join('')
            }
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:10px;width:100%;" onclick="showApiDocs()">📖 查看 API 文档</button>
        </div>
      ` : ''}
    </div>
  `;
};

function toggleDevMode(checked) {
  localStorage.setItem('dev_mode', checked);
  render_page_mine();
  toast(checked ? '🛠️ 开发者模式已开启' : '开发者模式已关闭');
}

function clearLogs() {
  Store.set('apiLogs', []);
  render_page_mine();
  toast('日志已清空');
}

function showApiDocs() {
  const modal = document.getElementById('api-docs-modal');
  modal.classList.add('show');
}

// 商家登录
window.render_page_merchant_login = function() {
  document.getElementById('page-merchant-login').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 商家登录</div>
    </div>
    <div style="padding:40px 24px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="font-size:56px;margin-bottom:12px;">🏪</div>
        <div style="font-size:20px;font-weight:800;color:var(--primary);">商家后台</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:6px;">合力生态 · 上市公司专属服务</div>
      </div>

      <div style="margin-bottom:16px;">
        <div class="input-label">商家账号</div>
        <input type="email" id="m-email" class="input" placeholder="请输入邮箱账号" value="ubtrobot@example.com">
      </div>
      <div style="margin-bottom:8px;">
        <div class="input-label">登录密码</div>
        <input type="password" id="m-pwd" class="input" placeholder="请输入密码" value="KEY-2026-UBTROBOT-001">
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:24px;">演示账号：ubtrobot@example.com · 密码：KEY-2026-UBTROBOT-001</div>

      <button class="btn btn-primary btn-block" style="height:52px;font-size:16px;" onclick="doMerchantLogin()">登录商家后台</button>
    </div>
  `;
};

async function doMerchantLogin() {
  const email = document.getElementById('m-email').value;
  const pwd = document.getElementById('m-pwd').value;
  const result = await API.merchantLogin(email, pwd);
  if (result.success) {
    toast('✅ 登录成功！');
    navigate('page-merchant-dashboard');
  } else {
    toast(result.msg || '登录失败');
  }
}

// 商家后台
window.render_page_merchant_dashboard = function() {
  const m = Store.get('merchant');
  document.getElementById('page-merchant-dashboard').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} ${m.name}</div>
    </div>

    <!-- 商家信息 -->
    <div style="background:var(--gradient-card);color:white;padding:20px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:48px;">${m.logo}</div>
        <div>
          <div style="font-size:17px;font-weight:700;">${m.name}</div>
          <div style="font-size:12px;opacity:0.8;margin-top:4px;">⭐ ${m.avgRating} · ${m.status}</div>
        </div>
      </div>
    </div>

    <!-- 核心数据 -->
    <div style="padding:14px 16px 4px;font-size:13px;font-weight:700;color:var(--text-secondary);">核心数据</div>
    <div class="dashboard-grid">
      <div class="dash-card">
        <div class="dash-num">${m.totalSales.toLocaleString()}</div>
        <div class="dash-label">总销量（件）</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">¥${(m.totalRevenue/10000).toFixed(1)}w</div>
        <div class="dash-label">总销售额</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${m.customers.toLocaleString()}</div>
        <div class="dash-label">累计客户数</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">⭐ ${m.avgRating}</div>
        <div class="dash-label">平均评分</div>
      </div>
    </div>

    <!-- 销售趋势图 -->
    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">📈 近30天销售额趋势</div>
      <div id="sales-trend-chart" style="height:180px;"></div>
    </div>

    <!-- 用户分析 -->
    <div style="padding:0 16px 4px;font-size:13px;font-weight:700;color:var(--text-secondary);">用户分析</div>
    <div class="dashboard-grid">
      <div class="dash-card">
        <div class="dash-num">${m.newCustomers}</div>
        <div class="dash-label">新客户数</div>
        <div style="font-size:11px;color:var(--success);margin-top:4px;">↑ 12.3%</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${m.repurchaseRate}%</div>
        <div class="dash-label">复购率</div>
        <div style="font-size:11px;color:var(--success);margin-top:4px;">↑ 3.1%</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">¥${m.avgOrderValue}</div>
        <div class="dash-label">客单价</div>
        <div style="font-size:11px;color:var(--danger);margin-top:4px;">↓ 2.0%</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${m.conversionRate}%</div>
        <div class="dash-label">转化率</div>
        <div style="font-size:11px;color:var(--success);margin-top:4px;">↑ 0.5%</div>
      </div>
    </div>

    <!-- 产品销售排行 -->
    <div class="card">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">🏆 产品销售 TOP 5</div>
      ${m.topProducts.map((p, i) => `
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
          <div style="width:22px;height:22px;border-radius:50%;background:${i < 3 ? 'var(--accent)' : 'var(--border)'};color:${i < 3 ? 'white' : 'var(--text-muted)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;font-size:13px;font-weight:500;">${p.name}</div>
          <div style="text-align:right;">
            <div style="font-size:13px;font-weight:600;">${p.sales} 件</div>
            <div style="font-size:11px;color:var(--text-muted);">¥${(p.revenue/10000).toFixed(1)}w</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 积分数据 -->
    <div style="padding:0 16px 4px;font-size:13px;font-weight:700;color:var(--text-secondary);">积分数据</div>
    <div class="dashboard-grid" style="margin-bottom:20px;">
      <div class="dash-card">
        <div class="dash-num">${(m.pointsIssued/1000).toFixed(1)}k</div>
        <div class="dash-label">已返积分</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${(m.pointsRedeemed/1000).toFixed(1)}k</div>
        <div class="dash-label">兑换积分</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${(m.pointsRetained/1000).toFixed(1)}k</div>
        <div class="dash-label">留存积分</div>
      </div>
      <div class="dash-card">
        <div class="dash-num">${(m.pointsRedeemed/m.pointsIssued*100).toFixed(1)}%</div>
        <div class="dash-label">积分转化率</div>
      </div>
    </div>
  `;

  setTimeout(() => renderMiniChart('sales-trend-chart', m.salesTrend, '#F18F01'), 100);
};

// ==================== 图表渲染 ====================
function renderMiniChart(containerId, data, color) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const w = container.offsetWidth || 320;
  const h = container.offsetHeight || 180;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = chartW / (data.length - 1);

  const points = data.map((v, i) => ({
    x: padding.left + i * step,
    y: padding.top + chartH - ((v - min) / range) * chartH
  }));

  const linePath = points.map((p, i) => (i === 0 ? `M${p.x.toFixed(1)},${p.y.toFixed(1)}` : `L${p.x.toFixed(1)},${p.y.toFixed(1)}`)).join(' ');
  const areaPath = linePath + ` L${(padding.left + chartW).toFixed(1)},${(padding.top + chartH).toFixed(1)} L${padding.left.toFixed(1)},${(padding.top + chartH).toFixed(1)} Z`;

  const yLabels = [min, Math.round((min + max) / 2), max].map((v, i) => {
    const y = padding.top + chartH - (i * chartH / 2);
    const label = v >= 10000 ? (v/10000).toFixed(1)+'w' : v >= 1000 ? (v/1000).toFixed(0)+'k' : v.toString();
    return `<text x="${padding.left - 5}" y="${y}" text-anchor="end" fill="#718096" font-size="10">${label}</text>`;
  }).join('');

  const xLabels = [0, Math.floor(data.length/2), data.length-1].map(i => {
    const x = padding.left + i * step;
    return `<text x="${x}" y="${padding.top + chartH + 20}" text-anchor="middle" fill="#718096" font-size="10">第${i+1}天</text>`;
  }).join('');

  container.innerHTML = `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible;">
      <defs>
        <linearGradient id="grad_${containerId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${[0,1,2].map(i => `<line x1="${padding.left}" y1="${padding.top + i * chartH/2}" x2="${padding.left + chartW}" y2="${padding.top + i * chartH/2}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}
      <path d="${areaPath}" fill="url(#grad_${containerId})"/>
      <path d="${linePath}" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${points.filter((_, i) => i % 6 === 0 || i === points.length-1).map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${color}" stroke="white" stroke-width="1.5"/>`).join('')}
      ${yLabels}
      ${xLabels}
    </svg>
  `;
}

// API文档数据
window.showApiDocs = function() {
  document.getElementById('api-docs-modal').classList.add('show');
};
window.closeApiDocs = function() {
  document.getElementById('api-docs-modal').classList.remove('show');
};
