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
  const exchange = Store.get('pointsExchange');

  document.getElementById('page-points-detail').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 积分明细</div>
    </div>

    <!-- 多积分类型总览 -->
    <div class="multi-points-header">
      <div class="mpoints-hp-box">
        <div class="mpoints-hp-icon">💰</div>
        <div class="mpoints-hp-info">
          <div class="mpoints-hp-label">消费积分 HP</div>
          <div class="mpoints-hp-value">${user.hp.toLocaleString()}</div>
        </div>
      </div>
      <div class="mpoints-hp-actions">
        <button class="btn btn-sm mpoints-exchange-btn" onclick="navigate('page-points-exchange')">
          <span>兑换</span>
        </button>
      </div>
    </div>

    <!-- 其他积分类型 -->
    <div class="other-points-row">
      <div class="other-points-card exp-card" onclick="showPointsTypeDetail('exp')">
        <div class="other-points-icon">📊</div>
        <div class="other-points-info">
          <div class="other-points-name">指数积分 EXP</div>
          <div class="other-points-val">${user.exp.toLocaleString()}</div>
        </div>
        <div class="other-points-rate">1=${exchange.exp.rate}HP</div>
      </div>
      <div class="other-points-card watch-card" onclick="showPointsTypeDetail('watch')">
        <div class="other-points-icon">📺</div>
        <div class="other-points-info">
          <div class="other-points-name">观看积分 WATCH</div>
          <div class="other-points-val">${user.watch.toLocaleString()}</div>
        </div>
        <div class="other-points-rate">1=${exchange.watch.rate}HP</div>
      </div>
      <div class="other-points-card gov-card" onclick="showPointsTypeDetail('gov')">
        <div class="other-points-icon">🗳️</div>
        <div class="other-points-info">
          <div class="other-points-name">治理积分 GOV</div>
          <div class="other-points-val">${user.gov.toLocaleString()}</div>
        </div>
        <div class="other-points-rate">1=${exchange.gov.rate}HP</div>
      </div>
    </div>

    <!-- HP积分流水 -->
    <div style="padding:14px 16px 8px;font-size:13px;font-weight:600;color:var(--text-secondary);">
      💧 HP 积分流水
    </div>
    <div style="background:white;margin:0 16px 16px;border-radius:var(--radius-sm);box-shadow:var(--shadow);overflow:hidden;">
      ${records.map(r => `
        <div class="list-item">
          <div class="list-icon">${r.type === 'earn' ? '💰' : '🛒'}</div>
          <div class="list-content">
            <div class="list-title">${r.action}</div>
            <div class="list-sub">${r.time}</div>
          </div>
          <div style="color:${r.type === 'earn' ? 'var(--success)' : 'var(--danger)'};font-weight:700;font-size:15px;">${r.pts > 0 ? '+' : ''}${r.pts}</div>
        </div>
      `).join('')}
    </div>

    <!-- 设计原则说明 -->
    <div class="points-principles-card">
      <div class="pp-title">📋 积分经济模型设计原则</div>
      <div class="pp-item">• 积分是负债，背后有真实资金锚定</div>
      <div class="pp-item">• 多积分类型单向兑换，不可反向</div>
      <div class="pp-item">• 积分流动池动态平衡</div>
      <div class="pp-item">• 链上记录，公开透明可审计</div>
    </div>
  `;
};

// 显示特定积分类型明细
function showPointsTypeDetail(type) {
  const records = Store.get(type + 'Records') || [];
  const exchange = Store.get('pointsExchange');
  const info = exchange[type];
  const user = Store.get('user');

  document.getElementById('page-points-detail').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="render_page_points_detail()">${Icons.back} ${info.icon} ${info.name}</div>
    </div>

    <div class="points-type-header" style="border-left:4px solid ${info.color};">
      <div style="font-size:14px;opacity:0.8;">当前余额</div>
      <div style="font-size:32px;font-weight:900;margin-top:4px;">${user[type].toLocaleString()} <span style="font-size:16px;font-weight:600;">${type.toUpperCase()}</span></div>
      <div style="font-size:13px;margin-top:6px;">可兑换 <span style="color:${info.color};font-weight:700;">${Math.floor(user[type] * info.rate)} HP</span></div>
      <div style="font-size:12px;opacity:0.7;margin-top:2px;">汇率：1 ${type.toUpperCase()} = ${info.rate} HP</div>
    </div>

    <div style="background:white;margin:16px;border-radius:var(--radius-sm);box-shadow:var(--shadow);overflow:hidden;">
      ${records.length > 0 ? records.map(r => `
        <div class="list-item">
          <div class="list-icon">${r.type === 'earn' ? info.icon : '🔄'}</div>
          <div class="list-content">
            <div class="list-title">${r.action}</div>
            <div class="list-sub">${r.time}</div>
          </div>
          <div style="color:${r.type === 'earn' ? 'var(--success)' : 'var(--danger)'};font-weight:700;font-size:15px;">${r.pts > 0 ? '+' : ''}${r.pts}</div>
        </div>
      `).join('') : '<div style="padding:24px;text-align:center;color:var(--text-muted);">暂无记录</div>'}
    </div>

    <div class="card" style="margin:0 16px 16px;">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">💡 如何获取 ${info.name}？</div>
      ${type === 'exp' ? '<div class="pp-item">• 上传研报、接入Agent API发表专业评论</div><div class="pp-item">• 专业分析被企业采纳获得更多奖励</div>' : ''}
      ${type === 'watch' ? '<div class="pp-item">• 观看综艺节目、评论、点赞、分享</div><div class="pp-item">• 参与节目互动讨论</div>' : ''}
      ${type === 'gov' ? '<div class="pp-item">• 参与平台投票、社区治理</div><div class="pp-item">• 早期贡献者专属，稀缺资源</div>' : ''}
    </div>
  `;
}

// 积分兑换页面
window.render_page_points_exchange = function() {
  const user = Store.get('user');
  const exchange = Store.get('pointsExchange');

  document.getElementById('page-points-exchange').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 积分兑换</div>
    </div>

    <div class="exchange-header">
      <div style="font-size:14px;opacity:0.8;margin-bottom:6px;">当前消费积分</div>
      <div style="font-size:36px;font-weight:900;">💰 ${user.hp.toLocaleString()} <span style="font-size:16px;">HP</span></div>
      <div style="font-size:12px;opacity:0.7;margin-top:8px;">非HP积分可单向兑换为HP，不可反向</div>
    </div>

    <!-- 积分池概览 -->
    <div class="points-pool-card">
      <div class="ppool-title">🌊 积分流动池状态</div>
      <div class="ppool-stats">
        <div class="ppool-stat">
          <div class="ppool-stat-val">${(Store.get('pointsPool').totalHP/10000).toFixed(0)}w</div>
          <div class="ppool-stat-label">总铸造HP</div>
        </div>
        <div class="ppool-stat">
          <div class="ppool-stat-val">${(Store.get('pointsPool').circulatingHP/10000).toFixed(0)}w</div>
          <div class="ppool-stat-label">流通HP</div>
        </div>
        <div class="ppool-stat">
          <div class="ppool-stat-val">${(Store.get('pointsPool').destroyedHP/10000).toFixed(0)}w</div>
          <div class="ppool-stat-label">已销毁HP</div>
        </div>
      </div>
      <div class="ppool-bar">
        <div class="ppool-fill ppool-circulating" style="width:${(Store.get('pointsPool').circulatingHP/Store.get('pointsPool').totalHP*100).toFixed(1)}%"></div>
        <div class="ppool-fill ppool-destroyed" style="width:${(Store.get('pointsPool').destroyedHP/Store.get('pointsPool').totalHP*100).toFixed(1)}%"></div>
      </div>
      <div class="ppool-legend">
        <span class="ppool-legend-item"><span class="ppool-dot ppool-circulating"></span>流通</span>
        <span class="ppool-legend-item"><span class="ppool-dot ppool-destroyed"></span>已销毁</span>
      </div>
    </div>

    <!-- 兑换卡片 -->
    <div style="padding:0 16px 16px;">
      ${Object.entries(exchange).map(([key, info]) => `
        <div class="exchange-card" style="border-left:4px solid ${info.color};">
          <div class="exchange-card-header">
            <div class="exchange-card-icon">${info.icon}</div>
            <div class="exchange-card-info">
              <div class="exchange-card-name">${info.name}</div>
              <div class="exchange-card-balance">余额：<span style="font-weight:700;">${user[key].toLocaleString()}</span> ${key.toUpperCase()}</div>
            </div>
            <div class="exchange-card-rate" style="color:${info.color};">1 = ${info.rate} HP</div>
          </div>
          <div class="exchange-card-result">
            可兑换 <span style="font-weight:900;font-size:18px;color:${info.color};">${Math.floor(user[key] * info.rate)}</span> HP
          </div>
          <div class="exchange-input-row">
            <input type="number" class="exchange-input" id="exchange-input-${key}" placeholder="输入兑换数量" min="1" max="${user[key]}">
            <button class="btn btn-sm exchange-btn" style="background:${info.color};" onclick="handleExchange('${key}')">兑换</button>
          </div>
          <div class="exchange-quick-btns">
            <button class="exchange-quick-btn" onclick="document.getElementById('exchange-input-${key}').value=Math.floor(${user[key]}*0.25)">25%</button>
            <button class="exchange-quick-btn" onclick="document.getElementById('exchange-input-${key}').value=Math.floor(${user[key]}*0.5)">50%</button>
            <button class="exchange-quick-btn" onclick="document.getElementById('exchange-input-${key}').value=Math.floor(${user[key]}*0.75)">75%</button>
            <button class="exchange-quick-btn" onclick="document.getElementById('exchange-input-${key}').value=${user[key]}">全部</button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 兑换说明 -->
    <div class="exchange-rules">
      <div class="erule-title">📖 兑换规则</div>
      <div class="erule-item">✅ 单向兑换：非HP积分只能兑换为HP，不可反向</div>
      <div class="erule-item">✅ 实时汇率：按当前汇率即时结算</div>
      <div class="erule-item">✅ 积分负债：HP背后有赞助商资金锚定</div>
      <div class="erule-item">✅ 可审计：所有操作记录链上可查</div>
    </div>
  `;
};

// 处理积分兑换
async function handleExchange(fromCategory) {
  const input = document.getElementById('exchange-input-' + fromCategory);
  const amount = parseInt(input.value);
  if (!amount || amount <= 0) {
    toast('请输入有效的兑换数量');
    return;
  }
  const result = await API.exchangePoints(fromCategory, amount);
  if (result.success) {
    const exchange = Store.get('pointsExchange');
    toast(`成功兑换 ${result.hpAmount} HP！`);
    render_page_points_exchange();
  } else {
    toast(result.msg);
  }
}

// 我的
window.render_page_mine = function() {
  const user = Store.get('user');
  const level = getLevelInfo(user.willpower);
  const devMode = localStorage.getItem('dev_mode') === 'true';
  const apiLogs = Store.get('apiLogs') || [];
  const exchange = Store.get('pointsExchange');

  const menuItems = [
    { icon: '🧠', label: '合力智脑', sub: '对话式积分管家 · 智能规划路径', page: 'page-brain' },
    { icon: '⚡', label: '意志吞吐量', sub: `${user.willpower} 贡献值`, page: 'page-willpower' },
    { icon: '🤖', label: 'AI 写作助手', sub: 'AI 生成行业分析文章', page: 'page-ai-writer' },
    { icon: '🟢', label: '我的 Agent', sub: `自动任务 · 已执行 ${(Store.get('agentConfig')||{}).runCount||0} 次`, page: 'page-agent' },
    { icon: '🏦', label: '意志市场', sub: '企业任务接单，最高+600贡献值', page: 'page-market' },
    { icon: '📦', label: '我的订单', sub: `${(user.orders||[]).length} 个订单`, page: 'page-order-list' },
    { icon: '🎖️', label: '荣誉兑换', sub: `已获得 ${user.honorsClaimed.length} 个荣誉`, page: 'page-honor-list' },
    { icon: '💱', label: '积分兑换', sub: '多积分体系 · 单向兑换HP', page: 'page-points-exchange' },
    { icon: '💳', label: '积分明细', sub: `${user.hp} HP · ${user.exp} EXP · ${user.watch} WATCH`, page: 'page-points-detail' },
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

      <!-- 多积分体系展示 -->
      <div style="background:rgba(255,255,255,0.1);padding:14px;border-radius:var(--radius-sm);margin-bottom:12px;">
        <div style="font-size:12px;opacity:0.8;margin-bottom:10px;">💎 多积分体系</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;">
          <div>
            <div style="font-size:18px;font-weight:800;">${user.hp}</div>
            <div style="font-size:10px;opacity:0.75;">💰 HP</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#8B5CF6;">${user.exp}</div>
            <div style="font-size:10px;opacity:0.75;">📊 EXP</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#F18F01;">${user.watch}</div>
            <div style="font-size:10px;opacity:0.75;">📺 WATCH</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#10B981;">${user.gov}</div>
            <div style="font-size:10px;opacity:0.75;">🗳️ GOV</div>
          </div>
        </div>
        <div style="font-size:10px;opacity:0.6;margin-top:8px;text-align:center;">
          非HP积分可兑换为HP · 1 GOV=1.2HP · 1 EXP=0.5HP · 1 WATCH=0.2HP
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;background:rgba(255,255,255,0.1);padding:14px;border-radius:var(--radius-sm);">
        <div style="text-align:center;">
          <div style="font-size:20px;font-weight:800;">${user.willpower}</div>
          <div style="font-size:11px;opacity:0.75;margin-top:2px;">⚡ 贡献值</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:20px;font-weight:800;">#${user.rank}</div>
          <div style="font-size:11px;opacity:0.75;margin-top:2px;">🏆 全站排名</div>
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
    <div class="dashboard-grid" style="margin-bottom:14px;">
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

    <!-- 合力智脑 运营助手入口 -->
    <div class="merchant-brain-entry" onclick="navigate('page-merchant-brain')">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:40px;flex-shrink:0;">🧠</div>
        <div style="flex:1;">
          <div style="font-size:15px;font-weight:800;">合力智脑 · 运营版</div>
          <div style="font-size:12px;opacity:0.85;margin-top:3px;">自动生成周报 · 积分任务建议 · 智能客服</div>
          <div style="font-size:11px;color:var(--accent-light);margin-top:5px;font-weight:700;">问我："帮我生成本周运营周报" →</div>
        </div>
        <div style="color:rgba(255,255,255,0.7);flex-shrink:0;">${Icons.arrow}</div>
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

// ==================== AI 助手：写文章 ====================
window.render_page_ai_writer = function() {
  const articles = Store.get('aiArticles') || [];
  const user = Store.get('user');

  document.getElementById('page-ai-writer').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} AI 写作助手</div>
      <span style="font-size:12px;color:rgba(255,255,255,0.8);">+80 贡献值/篇</span>
    </div>

    <!-- 说明卡片 -->
    <div class="ai-hero-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div class="ai-icon-big">🤖</div>
        <div>
          <div style="font-size:17px;font-weight:800;">AI 意志生成引擎</div>
          <div style="font-size:12px;opacity:0.8;margin-top:3px;">输入关键词，AI 自动生成行业分析文章</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <span class="ai-tag">📝 用户署名</span>
        <span class="ai-tag">⚡ 贡献值归属用户</span>
        <span class="ai-tag">✅ 原创度检测</span>
      </div>
    </div>

    <!-- 生成区域 -->
    <div class="card" style="margin-top:14px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">✍️ 生成你的行业分析</div>
      <div style="margin-bottom:10px;">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">输入关键词（如：人形机器人 优必选 量产）</div>
        <input type="text" id="ai-keywords" class="input" placeholder="输入1-5个关键词，逗号或空格分隔" style="font-size:14px;">
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;" id="keyword-suggestions">
        ${['人形机器人', '新能源汽车', '鸿蒙生态', '固态电池', 'AI大模型', '智慧医疗'].map(kw =>
          `<span class="kw-chip" onclick="fillKeyword('${kw}')">${kw}</span>`
        ).join('')}
      </div>
      <button class="btn btn-primary btn-block" id="ai-gen-btn" onclick="generateAiArticle()" style="height:48px;font-size:15px;">
        🤖 AI 一键生成文章草稿
      </button>
    </div>

    <!-- 生成结果区（动态注入） -->
    <div id="ai-result-area"></div>

    <!-- 历史文章 -->
    <div class="section-header" style="margin-top:6px;">
      <span class="section-title">📚 我的 AI 文章（${articles.length}篇）</span>
    </div>
    ${articles.length === 0 ? `
      <div style="text-align:center;padding:32px;color:var(--text-muted);">
        <div style="font-size:40px;margin-bottom:10px;">📭</div>
        <div>还没有发布文章，快去生成第一篇吧</div>
      </div>
    ` : articles.map(a => `
      <div class="article-card">
        <div class="article-meta">
          <span class="badge badge-primary">AI辅助</span>
          <span style="font-size:11px;color:var(--text-muted);margin-left:8px;">${a.time}</span>
          <span style="font-size:11px;color:var(--success);margin-left:auto;">+${a.wp} 贡献值</span>
        </div>
        <div style="font-size:12px;color:var(--accent-dark);font-weight:600;margin:6px 0 4px;">🔑 ${a.keywords}</div>
        <div class="article-body">${a.content.substring(0,120)}…</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">
          <span style="font-size:12px;color:var(--text-muted);">👍 ${a.liked} 人点赞</span>
          <span class="badge badge-success">已发布</span>
        </div>
      </div>
    `).join('')}
  `;
};

window.fillKeyword = function(kw) {
  const inp = document.getElementById('ai-keywords');
  if (inp) inp.value = kw;
};

window.generateAiArticle = async function() {
  const kw = (document.getElementById('ai-keywords').value || '').trim();
  if (!kw) { toast('请先输入关键词'); return; }

  const btn = document.getElementById('ai-gen-btn');
  btn.disabled = true;
  btn.textContent = '🔄 AI 思考中…';

  // 模拟 AI 生成延迟（真实接入大模型 API 时替换此处）
  await new Promise(r => setTimeout(r, 1800));

  const templates = [
    `${kw}正在经历一场深刻的范式转变。从技术指标来看，头部企业的核心能力已进入快速迭代周期，行业壁垒正在从硬件制造向算法与数据层加速迁移。对于长期投资者而言，真正的护城河在于技术落地速度与场景覆盖广度的双重积累——这是资本和时间共同堆砌的结果，短期竞争者难以复制。2026年将是这一赛道从"概念验证"迈向"规模商业化"的关键节点，市场格局或将在未来12个月内出现决定性分化。`,
    `深入研究${kw}领域，有三个核心洞察值得关注：其一，技术成熟度已越过"死亡谷"，进入商业落地加速期；其二，供应链本土化率提升正显著压缩成本曲线，为大规模量产创造前提；其三，政策红利与市场需求在2026年形成难得的共振窗口。对合力指数评级体系而言，${kw}相关企业的"量产交付"维度权重应在Q2适度上调，以反映行业从研发期向收入期的真实转变。`,
    `${kw}的竞争格局正在从技术竞争演变为生态竞争。拥有完整软硬件协同能力的头部企业，正在构建一条基于数据飞轮的防御型护城河：硬件出货量→使用数据积累→算法迭代→产品体验提升→更高出货量，这一循环一旦启动，后发企业的追赶成本将呈指数级增长。从合力生态平台的交互数据来看，用户对${kw}相关内容的搜索热度在过去30天内增长了47%，这一信号早于机构报告发布，具有领先指标价值。`
  ];

  const content = templates[Math.floor(Math.random() * templates.length)];

  const resultArea = document.getElementById('ai-result-area');
  resultArea.innerHTML = `
    <div class="card" style="margin-top:8px;border:2px solid var(--accent);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;">📄 AI 生成草稿</div>
        <span class="badge badge-accent">待确认发布</span>
      </div>
      <div style="font-size:12px;color:var(--accent-dark);font-weight:600;margin-bottom:8px;">🔑 关键词：${kw}</div>
      <div id="ai-draft-content" style="font-size:13px;line-height:1.8;color:var(--text-primary);background:var(--bg);padding:12px;border-radius:var(--radius-xs);">${content}</div>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button class="btn btn-outline btn-sm" onclick="regenArticle()" style="flex:1;">🔄 重新生成</button>
        <button class="btn btn-accent" onclick="publishAiArticle('${encodeURIComponent(kw)}','${encodeURIComponent(content)}')" style="flex:2;height:44px;font-size:14px;">✅ 确认署名发布 (+80贡献值)</button>
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:8px;text-align:center;">发布即代表你已审核内容，贡献值归属你的账号</div>
    </div>
  `;

  btn.disabled = false;
  btn.textContent = '🤖 AI 一键生成文章草稿';
};

window.regenArticle = function() {
  document.getElementById('ai-gen-btn').click();
};

window.publishAiArticle = async function(kwEncoded, contentEncoded) {
  const kw = decodeURIComponent(kwEncoded);
  const content = decodeURIComponent(contentEncoded);

  const articles = Store.get('aiArticles') || [];
  const newArticle = {
    id: 'a' + Date.now(),
    time: new Date().toLocaleString(),
    keywords: kw,
    content,
    wp: 80,
    liked: 0
  };
  articles.unshift(newArticle);
  Store.set('aiArticles', articles);

  await API.addWillpower(80, 'AI辅助文章发布', '🤖');
  await API.addPoints(20, 'AI辅助文章奖励');

  toast('🎉 文章已发布！+80 贡献值 +20 HP');
  document.getElementById('ai-result-area').innerHTML = '';
  render_page_ai_writer();
};

// ==================== 个人 Agent 设置 ====================
window.render_page_agent = function() {
  const cfg = Store.get('agentConfig') || {};
  const user = Store.get('user');

  document.getElementById('page-agent').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 我的 Agent</div>
      <span style="font-size:12px;color:rgba(255,255,255,0.8);">智能体</span>
    </div>

    <!-- Agent 状态卡 -->
    <div class="agent-status-card ${cfg.enabled ? 'agent-on' : 'agent-off'}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:40px;">${cfg.enabled ? '🟢' : '⚪'}</div>
          <div>
            <div style="font-size:17px;font-weight:800;">个人积分 Agent</div>
            <div style="font-size:12px;opacity:0.8;margin-top:3px;">${cfg.enabled ? '运行中 · 替你自动完成重复任务' : '已暂停 · 开启后自动积累积分'}</div>
          </div>
        </div>
        <label class="ai-switch">
          <input type="checkbox" ${cfg.enabled ? 'checked' : ''} onchange="toggleAgent(this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;background:rgba(255,255,255,0.12);padding:12px;border-radius:var(--radius-sm);">
        <div style="text-align:center;">
          <div style="font-size:18px;font-weight:800;">${cfg.totalAutoPoints || 0}</div>
          <div style="font-size:10px;opacity:0.8;">自动获积分</div>
        </div>
        <div style="text-align:center;border-left:1px solid rgba(255,255,255,0.2);border-right:1px solid rgba(255,255,255,0.2);">
          <div style="font-size:18px;font-weight:800;">${cfg.totalAutoWp || 0}</div>
          <div style="font-size:10px;opacity:0.8;">自动获贡献值</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:18px;font-weight:800;">${cfg.runCount || 0}</div>
          <div style="font-size:10px;opacity:0.8;">执行次数</div>
        </div>
      </div>
      ${cfg.lastRun ? `<div style="font-size:11px;opacity:0.7;margin-top:8px;text-align:center;">最近执行：${cfg.lastRun}</div>` : ''}
    </div>

    <!-- Agent 任务配置 -->
    <div class="section-header" style="margin-top:14px;">
      <span class="section-title">⚙️ 自动任务配置</span>
    </div>

    <div class="card">
      <!-- 自动签到 -->
      <div class="agent-task-row">
        <div class="agent-task-info">
          <span style="font-size:22px;">✅</span>
          <div>
            <div style="font-size:14px;font-weight:600;">自动每日签到</div>
            <div style="font-size:12px;color:var(--text-muted);">每天自动签到，获得 +5 HP +5 贡献值</div>
          </div>
        </div>
        <label class="ai-switch">
          <input type="checkbox" ${cfg.autoCheckin ? 'checked' : ''} onchange="updateAgentCfg('autoCheckin',this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
      <div class="agent-task-divider"></div>

      <!-- 自动观看领积分 -->
      <div class="agent-task-row">
        <div class="agent-task-info">
          <span style="font-size:22px;">📺</span>
          <div>
            <div style="font-size:14px;font-weight:600;">自动领取观看奖励</div>
            <div style="font-size:12px;color:var(--text-muted);">综艺播出时自动领取观看积分</div>
          </div>
        </div>
        <label class="ai-switch">
          <input type="checkbox" ${cfg.autoWatch ? 'checked' : ''} onchange="updateAgentCfg('autoWatch',this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
      <div class="agent-task-divider"></div>

      <!-- 自动竞猜 -->
      <div class="agent-task-row">
        <div class="agent-task-info">
          <span style="font-size:22px;">🎯</span>
          <div>
            <div style="font-size:14px;font-weight:600;">AI 辅助竞猜</div>
            <div style="font-size:12px;color:var(--text-muted);">根据指数数据智能下注，每次消耗 50 HP</div>
          </div>
        </div>
        <label class="ai-switch">
          <input type="checkbox" ${cfg.autoBet ? 'checked' : ''} onchange="updateAgentCfg('autoBet',this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
      <div class="agent-task-divider"></div>

      <!-- 自动兑换 -->
      <div class="agent-task-row">
        <div class="agent-task-info">
          <span style="font-size:22px;">🎁</span>
          <div>
            <div style="font-size:14px;font-weight:600;">积分阈值自动兑换</div>
            <div style="font-size:12px;color:var(--text-muted);">HP 积分达到 ${cfg.autoRedeemThreshold || 2000} 时自动兑换商品</div>
          </div>
        </div>
        <label class="ai-switch">
          <input type="checkbox" ${cfg.autoRedeem ? 'checked' : ''} onchange="updateAgentCfg('autoRedeem',this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
    </div>

    <!-- 立即运行 -->
    <div style="padding:0 16px 14px;">
      <button class="btn btn-primary btn-block" style="height:52px;font-size:15px;" onclick="runAgentNow()">
        ▶ 立即执行一次 Agent 任务
      </button>
    </div>

    <!-- Agent 说明 -->
    <div class="card" style="background:rgba(30,58,95,0.04);border:1px solid var(--border);">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px;">💡 Agent 工作原理</div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.8;">
        Agent 是你在平台上的"数字分身"——你授权它代替你完成低价值重复操作（签到、领积分、下注），
        让你专注于真正需要判断力的意志输出（文章、研报、竞猜分析）。<br><br>
        Agent 积累的偏好数据属于你的资产，迁移成本随时间持续上升，形成平台粘性的底层护城河。
      </div>
    </div>
  `;
};

window.toggleAgent = function(checked) {
  const cfg = Store.get('agentConfig') || {};
  cfg.enabled = checked;
  Store.set('agentConfig', cfg);
  toast(checked ? '🟢 Agent 已开启，将自动执行配置的任务' : '⚪ Agent 已暂停');
  render_page_agent();
};

window.updateAgentCfg = function(key, val) {
  const cfg = Store.get('agentConfig') || {};
  cfg[key] = val;
  Store.set('agentConfig', cfg);
  toast('✅ 配置已保存');
};

window.runAgentNow = async function() {
  const cfg = Store.get('agentConfig') || {};
  const user = Store.get('user');
  let totalPts = 0, totalWp = 0, actions = [];

  if (cfg.autoCheckin && !user.checkinToday) {
    const r = await API.checkin();
    if (r.success) { totalPts += 5; totalWp += 5; actions.push('✅ 自动签到'); }
  }
  if (cfg.autoWatch) {
    await API.addPoints(30, 'Agent 自动领取观看积分');
    await API.addWillpower(20, 'Agent 自动观看奖励', '📺');
    totalPts += 30; totalWp += 20; actions.push('📺 领取观看奖励');
  }
  if (cfg.autoBet && user.points >= 50) {
    await API.submitBet('auto', 'a', 50);
    actions.push('🎯 AI 辅助竞猜下注');
  }

  cfg.totalAutoPoints = (cfg.totalAutoPoints || 0) + totalPts;
  cfg.totalAutoWp = (cfg.totalAutoWp || 0) + totalWp;
  cfg.runCount = (cfg.runCount || 0) + 1;
  cfg.lastRun = new Date().toLocaleString();
  Store.set('agentConfig', cfg);

  if (actions.length > 0) {
    toast('🤖 Agent 执行完成：' + actions.join('、'));
  } else {
    toast('Agent 今日任务均已完成或未配置');
  }
  render_page_agent();
};

// ==================== 意志市场 ====================
window.render_page_market = function() {
  const market = Store.get('willpowerMarket') || [];
  const subs = Store.get('mySubmissions') || [];
  const user = Store.get('user');
  let mktCat = window._mktCat || '全部';

  const cats = ['全部', '研报', '对比分析', '市场分析', '数据模型', '技术评估'];
  const filtered = mktCat === '全部' ? market : market.filter(m => m.type === mktCat);

  document.getElementById('page-market').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 意志市场</div>
      <span style="font-size:12px;color:rgba(255,255,255,0.8);">接单赚贡献值</span>
    </div>

    <!-- 说明横幅 -->
    <div class="market-hero">
      <div style="font-size:15px;font-weight:800;margin-bottom:6px;">🏦 意志市场</div>
      <div style="font-size:12px;opacity:0.85;line-height:1.7;">
        上市公司发布研究需求 → 你用 AI 辅助完成 → 平台审核后发放贡献值<br>
        最高单篇 <span style="color:var(--accent-light);font-weight:700;">+600 贡献值</span>，完全区别于普通内容
      </div>
    </div>

    <!-- 分类筛选 -->
    <div class="category-scroll" style="margin:10px 0 2px;">
      ${cats.map(c => `<div class="cat-btn ${c === mktCat ? 'active' : ''}" onclick="setMktCat('${c}')">${c}</div>`).join('')}
    </div>

    <!-- 任务列表 -->
    <div style="padding:0 16px;">
      ${filtered.map(task => {
        const submitted = subs.includes(task.id);
        return `
          <div class="market-task-card">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="font-size:36px;flex-shrink:0;">${task.logo}</div>
              <div style="flex:1;">
                <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${task.title}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">${task.desc}</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                  <span class="badge badge-accent">🏆 +${task.reward} 贡献值</span>
                  <span class="badge badge-primary">${task.type}</span>
                  <span style="font-size:11px;color:var(--text-muted);">📅 ${task.deadline}</span>
                  <span style="font-size:11px;color:var(--text-muted);margin-left:auto;">📬 ${task.submissions} 人已提交</span>
                </div>
              </div>
            </div>
            <div style="margin-top:12px;display:flex;gap:8px;">
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="previewTask('${task.id}')">查看详情</button>
              <button class="btn btn-sm ${submitted ? 'btn-outline' : 'btn-accent'}" style="flex:2;" ${submitted ? 'disabled' : ''} onclick="submitMarketTask('${task.id}')">
                ${submitted ? '✓ 已提交' : '🤖 AI 辅助接单'}
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- 我的提交 -->
    ${subs.length > 0 ? `
      <div class="section-header" style="margin-top:10px;">
        <span class="section-title">📬 我的提交（${subs.length} 个）</span>
      </div>
      <div style="padding:0 16px 20px;">
        ${subs.map(sid => {
          const t = market.find(m => m.id === sid);
          return t ? `
            <div class="list-item" style="background:white;border-radius:var(--radius-sm);box-shadow:var(--shadow);margin-bottom:8px;">
              <div class="list-icon">${t.logo}</div>
              <div class="list-content">
                <div class="list-title">${t.title.substring(0,20)}…</div>
                <div class="list-sub">${t.company} · 等待审核</div>
              </div>
              <span class="badge badge-primary">审核中</span>
            </div>
          ` : '';
        }).join('')}
      </div>
    ` : ''}
  `;
};

window.setMktCat = function(cat) {
  window._mktCat = cat;
  render_page_market();
};

window.previewTask = function(taskId) {
  const market = Store.get('willpowerMarket') || [];
  const task = market.find(m => m.id === taskId);
  if (!task) return;
  toast(`📋 ${task.company}：${task.title}`);
};

window.submitMarketTask = async function(taskId) {
  const market = Store.get('willpowerMarket') || [];
  const task = market.find(m => m.id === taskId);
  if (!task) return;

  // 模拟 AI 辅助生成提交
  toast('🤖 AI 正在生成提交内容…');
  await new Promise(r => setTimeout(r, 1200));

  const subs = Store.get('mySubmissions') || [];
  if (!subs.includes(taskId)) {
    subs.push(taskId);
    Store.set('mySubmissions', subs);
  }

  // 奖励贡献值（审核通过模拟）
  await API.addWillpower(task.reward, `意志市场：${task.company}任务`, '🏦');

  toast(`🎉 提交成功！预计获得 +${task.reward} 贡献值（审核后到账）`);
  render_page_market();
};

// ==================== 合力智脑 · C端积分管家 ====================
window.render_page_brain = function() {
  const user = Store.get('user');
  const brainCfg = Store.get('brainConfig') || {};
  const history = Store.get('brainChatHistory') || [];
  const products = Store.get('products');

  document.getElementById('page-brain').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 合力智脑</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="brain-status-dot ${brainCfg.activated ? 'active' : ''}"></div>
        <span style="font-size:12px;color:rgba(255,255,255,0.85);">${brainCfg.activated ? '运行中' : '未激活'}</span>
      </div>
    </div>

    <!-- 状态卡 -->
    <div class="brain-hero-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
        <div class="brain-avatar">🧠</div>
        <div style="flex:1;">
          <div style="font-size:17px;font-weight:800;">合力智脑</div>
          <div style="font-size:12px;opacity:0.8;margin-top:2px;">C端积分管家 · 意志即服务</div>
        </div>
        <label class="ai-switch" style="flex-shrink:0;">
          <input type="checkbox" ${brainCfg.activated ? 'checked' : ''} onchange="toggleBrain(this.checked)">
          <span class="ai-slider"></span>
        </label>
      </div>
      <!-- 用户积分快照 -->
      <div class="brain-stats-row">
        <div class="brain-stat">
          <div class="brain-stat-num">${user.points}</div>
          <div class="brain-stat-label">HP积分</div>
        </div>
        <div class="brain-stat" style="border-left:1px solid rgba(255,255,255,0.2);border-right:1px solid rgba(255,255,255,0.2);">
          <div class="brain-stat-num">${user.willpower}</div>
          <div class="brain-stat-label">贡献值</div>
        </div>
        <div class="brain-stat">
          <div class="brain-stat-num">${brainCfg.autoExecute ? '已授权' : '未授权'}</div>
          <div class="brain-stat-label">自动执行</div>
        </div>
      </div>
    </div>

    <!-- 快捷意图按钮 -->
    <div style="padding:12px 16px 4px;">
      <div style="font-size:13px;font-weight:700;color:var(--text-secondary);margin-bottom:10px;">💬 快速发起对话</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${[
          { label: '📱 我想换小米14', msg: '我想换小米14 Ultra，帮我规划积分路径' },
          { label: '📊 今日任务清单', msg: '帮我列一下今天能赚积分的任务' },
          { label: '⚡ 授权自动执行', msg: '我想授权你自动帮我签到和领积分' },
          { label: '🔔 积分够了叫我', msg: '积分够换蔚来NIO水杯时提醒我' },
          { label: '📈 本周积分总结', msg: '总结一下我本周的积分情况' }
        ].map(btn => `
          <div class="brain-quick-btn" onclick="sendBrainMsg(${JSON.stringify(btn.msg).replace(/"/g,'&quot;')})">${btn.label}</div>
        `).join('')}
      </div>
    </div>

    <!-- 对话历史 -->
    <div class="brain-chat-wrap" id="brain-chat-wrap">
      ${history.map(msg => renderBrainMsg(msg)).join('')}
      <div id="brain-typing" style="display:none;" class="brain-msg brain-msg-ai">
        <div class="brain-bubble">
          <div class="brain-typing-dots"><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="brain-input-bar">
      <input type="text" id="brain-input" class="brain-input-field" placeholder="问我任何关于积分的事…" onkeydown="if(event.key==='Enter')sendBrainMsgFromInput()">
      <button class="brain-send-btn" onclick="sendBrainMsgFromInput()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `;

  // 滚动到底部
  setTimeout(() => {
    const wrap = document.getElementById('brain-chat-wrap');
    if (wrap) wrap.scrollTop = wrap.scrollHeight;
  }, 50);
};

function renderBrainMsg(msg) {
  const isAI = msg.role === 'brain';
  const formatted = (msg.content || '')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  return `
    <div class="brain-msg ${isAI ? 'brain-msg-ai' : 'brain-msg-user'}">
      ${isAI ? '<div class="brain-avatar-sm">🧠</div>' : ''}
      <div class="brain-bubble ${isAI ? 'brain-bubble-ai' : 'brain-bubble-user'}">
        ${formatted}
        ${msg.actions ? `<div class="brain-action-btns">${msg.actions.map(a =>
          `<button class="btn btn-sm btn-accent brain-action-btn" onclick="${a.fn}">${a.label}</button>`
        ).join('')}</div>` : ''}
      </div>
    </div>
  `;
}

// 智脑对话处理逻辑（意图识别 + API编排）
const BrainIntents = {
  // 意图1：目标规划 - "我想换XX"
  planGoal: {
    patterns: /想换|换购|想要|目标|规划|攒积分/,
    handle: function(msg) {
      const user = Store.get('user');
      const products = Store.get('products');
      // 尝试匹配商品名
      const matched = products.find(p =>
        msg.includes(p.name.substring(0, 5)) ||
        msg.includes(p.brand.replace('集团','').replace('汽车','').replace('科技',''))
      );
      const target = matched || products.find(p => p.hpPrice > 0) || products[0];
      const gap = Math.max(0, target.hpPrice - user.points);
      const dailyEarn = 35; // 签到5+观看30 = 35/天
      const days = gap > 0 ? Math.ceil(gap / dailyEarn) : 0;

      // 缓存计划
      const cfg = Store.get('brainConfig') || {};
      cfg.cEndGoal = target.id;
      cfg.cEndGoalPoints = target.hpPrice;
      cfg.planCache = { targetName: target.name, gap, days };
      Store.set('brainConfig', cfg);

      if (gap <= 0) {
        return {
          content: `🎉 好消息！你当前 **${user.points} HP** 已经够换 **${target.name}**（需要 ${target.hpPrice} HP）了！\n\n要我帮你现在去下单吗？`,
          actions: [{ label: '🛍️ 立即去购买', fn: `navigate('page-product','${target.id}')` }]
        };
      }

      return {
        content: `📊 积分规划报告\n\n**目标商品：** ${target.name}\n**所需 HP：** ${target.hpPrice}\n**当前 HP：** ${user.points}\n**还差：** ${gap} HP\n\n**🚀 达成计划（${days} 天）：**\n• 每日签到 → +5 HP\n• 每期综艺观看奖励 → +30 HP\n• 每周写一篇 AI 研报 → +20 HP/天均摊\n\n按此节奏，预计 **${days} 天**后积分到账！要我帮你自动执行这些任务吗？`,
        actions: [
          { label: '⚡ 授权自动执行', fn: `authBrainAutoExecute()` },
          { label: '📺 去看综艺', fn: `navigate('page-show-list')` }
        ]
      };
    }
  },

  // 意图2：今日任务
  todayTasks: {
    patterns: /今天|任务|能赚|怎么赚|获取积分|今日/,
    handle: function(msg) {
      const user = Store.get('user');
      const shows = Store.get('shows');
      const checkedIn = user.checkinToday;
      const available = shows.filter(s => s.status !== '即将直播');

      return {
        content: `📋 **今日可执行任务清单：**\n\n${checkedIn ? '✅ 每日签到（已完成）' : '⬜ 每日签到 → **+5 HP +5 贡献值**（未完成）'}\n📺 观看《${available[0]?.title || '新质中国'}》完整版 → **+50 HP +30 贡献值**\n🎯 参与竞猜 → 最高 **+100 HP**（根据赔率）\n📝 AI 写作助手生成文章 → **+80 贡献值 +20 HP**\n🏦 意志市场接单 → 最高 **+600 贡献值**\n\n**今日预计可获：~155 HP + 155 贡献值**\n\n要我帮你一键执行签到和领积分吗？`,
        actions: [
          ...(checkedIn ? [] : [{ label: '✅ 立即签到', fn: `handleCheckin()` }]),
          { label: '🤖 一键执行所有', fn: `brainAutoDoTasks()` }
        ]
      };
    }
  },

  // 意图3：授权自动执行
  authorize: {
    patterns: /授权|自动|帮我|代劳|自动签到|懒人/,
    handle: function(msg) {
      return {
        content: `🔐 **授权自动执行**\n\n授权后，合力智脑将每天替你：\n• ✅ 自动签到（每日 +5 HP）\n• 📺 自动领取综艺观看积分（+30 HP）\n• 🎯 在积分充足时智能竞猜\n\n**你保留完全控制权：** 随时可以在「我的 Agent」页面关闭任意任务。\n\n是否授权？`,
        actions: [
          { label: '✅ 确认授权', fn: `authBrainAutoExecute()` },
          { label: '⚙️ 自定义设置', fn: `navigate('page-agent')` }
        ]
      };
    }
  },

  // 意图4：积分提醒
  notify: {
    patterns: /提醒|通知|够了|叫我|告诉我/,
    handle: function(msg) {
      const cfg = Store.get('brainConfig') || {};
      cfg.notifications = true;
      Store.set('brainConfig', cfg);
      const products = Store.get('products');
      const cheapest = [...products].sort((a, b) => a.hpPrice - b.hpPrice)[0];
      return {
        content: `🔔 **积分提醒已设置！**\n\n当你的 HP 积分足够兑换关注的商品时，我会第一时间告知你。\n\n📌 当前门槛最低商品：**${cheapest.name}**（${cheapest.hpPrice} HP）\n\n目前你有 **${Store.get('user').points} HP**，${Store.get('user').points >= cheapest.hpPrice ? '已经可以兑换啦！' : `还差 ${cheapest.hpPrice - Store.get('user').points} HP`}\n\n要直接去商城看看吗？`,
        actions: [{ label: '🛍️ 去商城', fn: `navigate('page-mall')` }]
      };
    }
  },

  // 意图5：本周总结
  summary: {
    patterns: /总结|周报|本周|最近|分析|情况/,
    handle: function(msg) {
      const user = Store.get('user');
      const records = (Store.get('pointsRecords') || []).slice(0, 6);
      const earned = records.filter(r => r.pts > 0).reduce((sum, r) => sum + r.pts, 0);
      const spent = Math.abs(records.filter(r => r.pts < 0).reduce((sum, r) => sum + r.pts, 0));
      return {
        content: `📈 **本周积分总结**\n\n**获得积分：** +${earned} HP\n**消耗积分：** -${spent} HP\n**净增加：** ${earned - spent} HP\n**当前余额：** ${user.points} HP\n\n**贡献值：** ${user.willpower}（近30天 +${user.willpowerMonthly}）\n**全站排名：** Top ${Math.max(1, Math.round(user.rank/50000*100))}%\n\n💡 **智脑建议：** 你本周${user.willpowerMonthly > 100 ? '贡献值增长不错！建议继续写 AI 研报冲击高等级' : '还有提升空间，试试用 AI 写作助手每周写一篇文章，每篇 +80 贡献值'}`,
        actions: [
          { label: '📝 去写文章', fn: `navigate('page-ai-writer')` },
          { label: '📊 查看明细', fn: `navigate('page-points-detail')` }
        ]
      };
    }
  },

  // 默认回复
  fallback: {
    handle: function(msg) {
      const user = Store.get('user');
      return {
        content: `我理解你说的是：「${msg.substring(0, 30)}」\n\n作为你的积分管家，我最擅长：\n• 说出商品名，我帮你规划最短积分路径\n• 询问今日任务，我给出行动清单\n• 授权后，我自动替你完成重复操作\n\n你现在有 **${user.points} HP 积分** 和 **${user.willpower} 贡献值**。\n\n试试说"我想换小米14"吧～`,
        actions: []
      };
    }
  }
};

window.sendBrainMsg = async function(userMsg) {
  if (!userMsg || !userMsg.trim()) return;
  const history = Store.get('brainChatHistory') || [];

  // 添加用户消息
  history.push({ id: 'u' + Date.now(), role: 'user', content: userMsg, time: new Date().toLocaleString() });
  Store.set('brainChatHistory', history);
  render_page_brain();

  // 显示打字中
  const typingEl = document.getElementById('brain-typing');
  if (typingEl) typingEl.style.display = 'flex';
  const wrap = document.getElementById('brain-chat-wrap');
  if (wrap) wrap.scrollTop = wrap.scrollHeight;

  await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

  // 意图识别
  let reply = null;
  for (const [key, intent] of Object.entries(BrainIntents)) {
    if (key === 'fallback') continue;
    if (intent.patterns && intent.patterns.test(userMsg)) {
      reply = intent.handle(userMsg);
      break;
    }
  }
  if (!reply) reply = BrainIntents.fallback.handle(userMsg);

  if (typingEl) typingEl.style.display = 'none';

  // 添加AI回复
  history.push({ id: 'ai' + Date.now(), role: 'brain', content: reply.content, actions: reply.actions || [], time: new Date().toLocaleString() });
  Store.set('brainChatHistory', history);
  render_page_brain();
};

window.sendBrainMsgFromInput = function() {
  const inp = document.getElementById('brain-input');
  const val = (inp?.value || '').trim();
  if (!val) return;
  inp.value = '';
  sendBrainMsg(val);
};

window.toggleBrain = function(checked) {
  const cfg = Store.get('brainConfig') || {};
  cfg.activated = checked;
  Store.set('brainConfig', cfg);
  toast(checked ? '🧠 合力智脑已激活！' : '智脑已暂停');
  render_page_brain();
};

window.authBrainAutoExecute = async function() {
  const cfg = Store.get('brainConfig') || {};
  cfg.autoExecute = true;
  cfg.activated = true;
  Store.set('brainConfig', cfg);
  // 同步到 Agent 配置
  const agentCfg = Store.get('agentConfig') || {};
  agentCfg.enabled = true;
  agentCfg.autoCheckin = true;
  agentCfg.autoWatch = true;
  Store.set('agentConfig', agentCfg);
  toast('✅ 已授权！合力智脑将自动执行每日积分任务');

  const history = Store.get('brainChatHistory') || [];
  history.push({
    id: 'ai' + Date.now(), role: 'brain',
    content: '✅ **授权成功！**\n\n我已同步到你的 Agent 配置，从现在起将每天自动执行：\n• 签到 → +5 HP +5 贡献值\n• 领取观看积分 → +30 HP\n\n你可以在「我的 Agent」页面查看执行记录，随时修改配置。',
    actions: [{ label: '⚙️ 查看 Agent 设置', fn: `navigate('page-agent')` }],
    time: new Date().toLocaleString()
  });
  Store.set('brainChatHistory', history);
  render_page_brain();
};

window.brainAutoDoTasks = async function() {
  toast('🤖 合力智脑执行中…');
  await new Promise(r => setTimeout(r, 800));
  const user = Store.get('user');
  let done = [];
  if (!user.checkinToday) {
    await API.checkin();
    done.push('签到 +5HP');
  }
  await API.addPoints(30, '智脑自动领取观看积分');
  await API.addWillpower(20, '智脑自动观看奖励', '📺');
  done.push('观看积分 +30HP');

  const history = Store.get('brainChatHistory') || [];
  history.push({
    id: 'ai' + Date.now(), role: 'brain',
    content: `✅ **执行完成！**\n\n已帮你完成：${done.map(d => '\n• ' + d).join('')}\n\n今日积分任务完成！继续保持～`,
    actions: [{ label: '📊 查看积分明细', fn: `navigate('page-points-detail')` }],
    time: new Date().toLocaleString()
  });
  Store.set('brainChatHistory', history);
  render_page_brain();
};

// ==================== 合力智脑 · B端商家运营助手 ====================
window.render_page_merchant_brain = function() {
  const m = Store.get('merchant');
  const history = Store.get('merchantBrainHistory') || [];

  document.getElementById('page-merchant-brain').innerHTML = `
    <div class="nav-bar">
      <div class="nav-back" onclick="goBack()">${Icons.back} 智脑运营助手</div>
      <span style="font-size:12px;color:rgba(255,255,255,0.85);">B端专属</span>
    </div>

    <!-- 商家信息条 -->
    <div style="background:var(--gradient-card);padding:16px 20px;display:flex;align-items:center;gap:12px;">
      <div style="font-size:36px;">${m.logo}</div>
      <div>
        <div style="font-size:15px;font-weight:700;color:white;">${m.name}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:2px;">合力智脑 · 运营版已接入</div>
      </div>
      <div style="margin-left:auto;">
        <div class="brain-status-dot active" style="width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;"></div>
      </div>
    </div>

    <!-- 快捷运营指令 -->
    <div style="padding:12px 16px 4px;">
      <div style="font-size:13px;font-weight:700;color:var(--text-secondary);margin-bottom:10px;">🚀 快速运营指令</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${[
          { label: '📊 生成本周周报', msg: '帮我生成本周运营周报' },
          { label: '💡 积分任务建议', msg: '哪款产品需要增加积分激励？' },
          { label: '🎯 转化分析', msg: '帮我分析浏览高但购买低的产品' },
          { label: '🤖 设置自动客服', msg: '帮我设置产品常见问题的自动回复' },
          { label: '📈 用户复购建议', msg: '如何提升复购率？' }
        ].map(btn => `
          <div class="brain-quick-btn" onclick="sendMerchantBrainMsg(${JSON.stringify(btn.msg).replace(/"/g,'&quot;')})">${btn.label}</div>
        `).join('')}
      </div>
    </div>

    <!-- 对话历史 -->
    <div class="brain-chat-wrap" id="merchant-brain-chat-wrap">
      ${history.map(msg => renderBrainMsg(msg)).join('')}
      <div id="merchant-brain-typing" style="display:none;" class="brain-msg brain-msg-ai">
        <div class="brain-bubble">
          <div class="brain-typing-dots"><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="brain-input-bar">
      <input type="text" id="merchant-brain-input" class="brain-input-field" placeholder="问我关于运营、数据、积分任务的问题…" onkeydown="if(event.key==='Enter')sendMerchantBrainMsgFromInput()">
      <button class="brain-send-btn" onclick="sendMerchantBrainMsgFromInput()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `;

  setTimeout(() => {
    const wrap = document.getElementById('merchant-brain-chat-wrap');
    if (wrap) wrap.scrollTop = wrap.scrollHeight;
  }, 50);
};

// 商家智脑意图处理
const MerchantBrainIntents = {
  // 周报生成
  weeklyReport: {
    patterns: /周报|本周|报告|总结|数据分析/,
    handle: function(msg) {
      const m = Store.get('merchant');
      const salesChange = '+12%';
      const pointsRatio = Math.round(m.pointsRedeemed / m.totalSales);
      return {
        content: `📊 **${m.name} · 本周运营周报**\n━━━━━━━━━━━━━━\n\n**销售概览：**\n• 总销量：${m.totalSales.toLocaleString()} 件（↑ ${salesChange}）\n• 总销售额：¥${(m.totalRevenue/10000).toFixed(1)}w\n• 新客户：${m.newCustomers} 人 ↑ 12.3%\n\n**积分数据：**\n• 已返积分：${(m.pointsIssued/1000).toFixed(1)}k HP\n• 来自积分兑换的用户：35%\n• 积分转化率：${(m.pointsRedeemed/m.pointsIssued*100).toFixed(1)}%\n\n**🤖 智脑建议：**\n1. Walker S 浏览量高但库存仅 88 件，建议补货\n2. 联名T恤复购率低，可设置"购后写真实体验 → +200 HP"刺激二次传播\n3. 下周综艺第三期将播，建议提前布置智慧医疗相关产品曝光`,
        actions: [
          { label: '💡 一键发布任务', fn: `publishMerchantTask()` },
          { label: '📦 查看商品数据', fn: `navigate('page-merchant-dashboard')` }
        ]
      };
    }
  },

  // 积分任务建议
  incentiveSuggestion: {
    patterns: /积分.*(建议|任务|设置)|任务建议|激励|刺激|转化/,
    handle: function(msg) {
      const m = Store.get('merchant');
      return {
        content: `💡 **积分任务智能建议**\n\n根据你的销售数据分析，有 3 个高优先级建议：\n\n**🔴 高优先级**\n📌 Walker S 人形机器人模型\n→ 浏览量高、购买转化低 (8.2%)\n→ 建议：发布"发表真实使用体验 +500 HP"任务\n→ 预期：转化率提升 15-20%\n\n**🟡 中优先级**\n📌 联名 T 恤（复购率仅 12%）\n→ 建议：发布"穿搭晒图 +200 HP"任务\n→ 预期：社媒传播量 +300%\n\n**🟢 长期价值**\n📌 研报系列商品\n→ 建议：与意志市场联动，发布企业研究任务\n→ 每篇优质研报为品牌带来 100+ 曝光\n\n要我帮你直接发布这些积分任务吗？`,
        actions: [
          { label: '✅ 发布高优先级任务', fn: `publishMerchantTask()` },
          { label: '🏦 查看意志市场', fn: `navigate('page-market')` }
        ]
      };
    }
  },

  // 自动客服
  autoService: {
    patterns: /客服|自动回复|问答|FAQ|回答|问题/,
    handle: function(msg) {
      return {
        content: `🤖 **智能客服设置**\n\n我已为 ${Store.get('merchant').name} 预置了 5 类常见问题自动回复：\n\n1. **"Walker S 有多少尺寸？"** → 自动回复产品规格\n2. **"积分怎么兑换？"** → 引导至商城兑换流程\n3. **"发货多久？"** → 回复标准物流时间\n4. **"有优惠吗？"** → 引导使用 HP 积分抵扣\n5. **"可以退货吗？"** → 回复退换货政策\n\n**未能识别的问题**将自动转人工，并标注"AI未能回答"标签。\n\n**当前设置：** 自动回复 + 积分引导模式\n\n要激活自动客服吗？`,
        actions: [
          { label: '✅ 激活自动客服', fn: `activateMerchantAutoService()` }
        ]
      };
    }
  },

  // 复购率提升
  repurchase: {
    patterns: /复购|留存|回头客|再次购买|粘性/,
    handle: function(msg) {
      const m = Store.get('merchant');
      return {
        content: `📈 **复购率提升方案**\n\n你当前复购率 **${m.repurchaseRate}%**，行业平均 28%，${m.repurchaseRate > 28 ? '**已超行业平均** 🎉' : '**有提升空间**'}\n\n**智脑推荐 3 个方案：**\n\n**方案A：积分续期制**\n购买满 30 天内复购，双倍 HP 返还\n预期复购率 +8-12%\n\n**方案B：专属会员积分池**\n累计消费满 ¥1000 的用户进入"品牌会员圈"\n会员专属积分任务，复购率 +15%\n\n**方案C：综艺联动**\n下期《新质中国》节目中植入商品，\n节目后 24 小时内购买 +300 HP\n预期当期销量 +25%\n\n推荐优先实施方案B，成本最低，效果最持久。`,
        actions: [
          { label: '📺 联系节目组植入', fn: `navigate('page-show-list')` }
        ]
      };
    }
  },

  // 默认
  fallback: {
    handle: function(msg) {
      const m = Store.get('merchant');
      return {
        content: `我理解你在询问：「${msg.substring(0, 30)}」\n\n作为 ${m.name} 的专属运营助手，我可以帮你：\n• 📊 生成销售数据周报\n• 💡 分析哪些产品需要积分激励\n• 🤖 设置常见问题自动回复\n• 📈 制定复购率提升方案\n\n试试说 **"帮我生成本周运营周报"** 看看效果？`,
        actions: []
      };
    }
  }
};

window.sendMerchantBrainMsg = async function(userMsg) {
  if (!userMsg || !userMsg.trim()) return;
  const history = Store.get('merchantBrainHistory') || [];

  history.push({ id: 'u' + Date.now(), role: 'user', content: userMsg, time: new Date().toLocaleString() });
  Store.set('merchantBrainHistory', history);
  render_page_merchant_brain();

  const typingEl = document.getElementById('merchant-brain-typing');
  if (typingEl) typingEl.style.display = 'flex';
  const wrap = document.getElementById('merchant-brain-chat-wrap');
  if (wrap) wrap.scrollTop = wrap.scrollHeight;

  await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));

  let reply = null;
  for (const [key, intent] of Object.entries(MerchantBrainIntents)) {
    if (key === 'fallback') continue;
    if (intent.patterns && intent.patterns.test(userMsg)) {
      reply = intent.handle(userMsg);
      break;
    }
  }
  if (!reply) reply = MerchantBrainIntents.fallback.handle(userMsg);

  if (typingEl) typingEl.style.display = 'none';

  history.push({ id: 'ai' + Date.now(), role: 'brain', content: reply.content, actions: reply.actions || [], time: new Date().toLocaleString() });
  Store.set('merchantBrainHistory', history);
  render_page_merchant_brain();
};

window.sendMerchantBrainMsgFromInput = function() {
  const inp = document.getElementById('merchant-brain-input');
  const val = (inp?.value || '').trim();
  if (!val) return;
  inp.value = '';
  sendMerchantBrainMsg(val);
};

window.publishMerchantTask = async function() {
  toast('🎉 积分任务已发布到意志市场！');
  await API.addWillpower(0, '商家发布积分任务', '🏦');
  const history = Store.get('merchantBrainHistory') || [];
  history.push({
    id: 'ai' + Date.now(), role: 'brain',
    content: '✅ **积分任务已发布！**\n\n"发表真实使用体验 → +500 HP"任务已发布到意志市场。\n\n预计在 24 小时内收到第一批用户提交，我会持续跟进并通知你审核结果。',
    actions: [{ label: '🏦 查看意志市场', fn: `navigate('page-market')` }],
    time: new Date().toLocaleString()
  });
  Store.set('merchantBrainHistory', history);
  render_page_merchant_brain();
};

window.activateMerchantAutoService = async function() {
  toast('🤖 智能客服已激活！');
  const history = Store.get('merchantBrainHistory') || [];
  history.push({
    id: 'ai' + Date.now(), role: 'brain',
    content: '✅ **智能客服已激活！**\n\n从现在起，用户在品牌详情页提问时，我将自动匹配知识库并回复。无法识别的问题将自动转人工并发送通知。\n\n你可以随时来这里更新知识库内容。',
    actions: [],
    time: new Date().toLocaleString()
  });
  Store.set('merchantBrainHistory', history);
  render_page_merchant_brain();
};
