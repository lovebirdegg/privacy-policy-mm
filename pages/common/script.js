// 车检监拆复勘系统 v2 - 公共脚本
function showToast(msg, duration) {
  var t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.querySelector('.phone-container').appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(function() { t.style.display = 'none'; }, duration || 1800);
}

function togglePhotoItem(header) {
  var body = header.nextElementSibling;
  var arrow = header.querySelector('.photo-collect-arrow');
  var isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.classList.toggle('open', !isOpen);
}

function toggleWusunItem(header) {
  var body = header.nextElementSibling;
  if (!body) return;
  var isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
}

function addWusunItem() {
  var list = document.getElementById('wusun-items-list');
  if (!list) return;
  var count = list.querySelectorAll('.wusun-item').length + 1;
  var item = document.createElement('div');
  item.className = 'wusun-item';
  item.style.borderBottom = '1px solid var(--gray)';
  item.innerHTML = '<div class="wusun-header" onclick="toggleWusunItem(this)"><div><div class="wusun-name">物损项目 ' + count + '</div></div><div style="font-size:12px;color:var(--red);cursor:pointer" onclick="this.closest(\'.wusun-item\').remove();event.stopPropagation()">删除</div></div><div style="display:none;padding:0 14px 12px"><div class="form-item" style="padding-left:0;padding-right:0"><label class="form-label">物品名称</label><input class="form-input" type="text" placeholder="请输入物品名称"></div><div class="form-item" style="padding-left:0;padding-right:0"><label class="form-label">损坏程度</label><div class="form-select" onclick="showToast(\'选择损坏程度\')">请选择 <span class="arr">›</span></div></div><div class="form-item" style="padding-left:0;padding-right:0;border-bottom:none"><label class="form-label">估损金额</label><input class="form-input" type="number" placeholder="请输入金额"></div></div>';
  list.appendChild(item);
  showToast('已添加物损项 ' + count);
}
