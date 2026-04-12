// 车检监拆复勘系统 - 公共脚本

// 显示Toast通知
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

// 照片采集项折叠/展开
function togglePhotoItem(headerEl) {
  const body = headerEl.nextElementSibling;
  if (!body) return;
  const isHidden = body.style.display === 'none' || body.style.display === '';
  body.style.display = isHidden ? 'block' : 'none';
}

// 物损项折叠/展开
function toggleWusunItem(headerEl) {
  const photoRow = headerEl.nextElementSibling;
  if (!photoRow) return;
  const isHidden = photoRow.style.display === 'none' || photoRow.style.display === '';
  photoRow.style.display = isHidden ? 'block' : 'none';
}

// 添加物损项
let wusunCount = 1;
function addWusunItem() {
  wusunCount++;
  const list = document.getElementById('wusun-items-list');
  if (!list) return;
  const item = document.createElement('div');
  item.className = 'wusun-item';
  item.style.borderBottom = '1px solid var(--gray)';
  item.innerHTML = `
    <div class="wusun-header">
      <div class="wusun-name">物损项目 ${wusunCount}</div>
      <div style="font-size:12px;color:#f0a020;cursor:pointer" onclick="this.closest('.wusun-item').remove()">删除</div>
    </div>
    <div style="padding:0 14px 12px">
      <div class="form-item" style="margin-bottom:8px">
        <label class="form-label">物品名称</label>
        <input class="form-input" type="text" placeholder="请输入物品名称">
      </div>
      <div class="form-item" style="margin-bottom:8px">
        <label class="form-label">损坏程度</label>
        <div class="form-select" onclick="showToast('请选择损坏程度')">请选择 <span class="arr">›</span></div>
      </div>
      <div class="form-item" style="margin-bottom:8px">
        <label class="form-label">估损金额（元）</label>
        <input class="form-input" type="number" placeholder="请输入金额">
      </div>
    </div>`;
  list.appendChild(item);
  showToast('已添加物损项目 ' + wusunCount);
}

// 返回上一页（带fallback）
function goBack(fallbackUrl) {
  if (document.referrer && document.referrer !== '') {
    history.back();
  } else if (fallbackUrl) {
    location.href = fallbackUrl;
  } else {
    location.href = '../home/index.html';
  }
}
