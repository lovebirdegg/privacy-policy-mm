/**
 * 英语学习应用 - 交互原型脚本
 * 版本: 1.0
 * 日期: 2026-04-01
 */

// ============================================
// 主题管理
// ============================================
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || 'light';
    this.applyTheme(this.currentTheme);
    this.initializeToggle();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  applyTheme(theme) {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    this.currentTheme = theme;
    this.updateToggleIcon();
  }

  initializeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    if (darkModeToggle) {
      darkModeToggle.checked = this.currentTheme === 'dark';
      darkModeToggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }

  updateToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

// ============================================
// 页面导航
// ============================================
function navigateTo(pageName) {
  // 隐藏所有页面
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // 显示目标页面
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // 更新导航状态
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === pageName) {
      item.classList.add('active');
    }
  });

  // 滚动到顶部
  const appMain = document.querySelector('.app-main');
  if (appMain) {
    appMain.scrollTop = 0;
  }
}

// ============================================
// 单词卡片交互
// ============================================
function initializeWordCard() {
  const wordCard = document.getElementById('wordCard');
  if (wordCard) {
    wordCard.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  }
}

function playAudio() {
  // 模拟播放音频
  const audioBtn = document.querySelector('.audio-btn');
  if (audioBtn) {
    audioBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      audioBtn.style.transform = 'scale(1)';
    }, 150);
  }
  console.log('播放音频...');
}

function nextWord() {
  // 模拟切换到下一个单词
  const wordCard = document.getElementById('wordCard');
  if (wordCard) {
    wordCard.style.opacity = '0';
    wordCard.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      wordCard.style.opacity = '1';
      wordCard.style.transform = 'translateX(0)';
    }, 300);
  }
}

// ============================================
// 掌握程度评分
// ============================================
function initializeMasteryButtons() {
  const masteryBtns = document.querySelectorAll('.mastery-btn');
  masteryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      masteryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const level = this.dataset.level;
      console.log(`用户评分: ${level}`);
    });
  });
}

// ============================================
// 测试选项交互
// ============================================
function initializeTestOptions() {
  const testOptions = document.querySelectorAll('.test-option');
  testOptions.forEach(option => {
    option.addEventListener('click', function() {
      // 移除其他选项的选中状态
      testOptions.forEach(opt => opt.classList.remove('selected'));
      
      // 添加当前选项的选中状态
      this.classList.add('selected');
      
      // 模拟答案检查
      const optionValue = this.dataset.option;
      console.log(`选择答案: ${optionValue}`);
      
      // 显示答案解析（模拟）
      setTimeout(() => {
        const explanation = document.querySelector('.answer-explanation');
        if (explanation) {
          explanation.style.display = 'block';
          explanation.classList.add('slide-down');
        }
      }, 500);
    });
  });
}

function nextQuestion() {
  // 模拟切换到下一题
  const testOptions = document.querySelectorAll('.test-option');
  testOptions.forEach(option => {
    option.classList.remove('selected', 'correct', 'wrong');
  });
  
  const explanation = document.querySelector('.answer-explanation');
  if (explanation) {
    explanation.style.display = 'none';
  }
  
  // 更新进度
  const currentEl = document.querySelector('.test-progress .current');
  if (currentEl) {
    const current = parseInt(currentEl.textContent);
    currentEl.textContent = current + 1;
  }
}

// ============================================
// 复习系统
// ============================================
function startReview() {
  navigateTo('learn');
  console.log('开始艾宾浩斯复习...');
}

// ============================================
// 滑块交互
// ============================================
function initializeSliders() {
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => {
    const goalValue = slider.parentElement.querySelector('.goal-value');
    
    slider.addEventListener('input', function() {
      if (goalValue) {
        goalValue.textContent = `${this.value}个/天`;
      }
    });
  });
}

// ============================================
// 分类标签切换
// ============================================
function initializeCategoryTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ============================================
// 时间更新
// ============================================
function updateTime() {
  const timeEl = document.querySelector('.status-bar .time');
  if (timeEl) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;
  }
}

// ============================================
// 触摸滑动支持
// ============================================
function initializeTouchSupport() {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const appMain = document.querySelector('.app-main');
  if (appMain) {
    appMain.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    appMain.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      const pages = ['home', 'learn', 'review', 'vocabulary', 'profile'];
      const activePage = document.querySelector('.page.active');
      const currentPageId = activePage ? activePage.id.replace('page-', '') : 'home';
      const currentIndex = pages.indexOf(currentPageId);
      
      if (diff > 0 && currentIndex < pages.length - 1) {
        // 向左滑动，下一页
        navigateTo(pages[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        // 向右滑动，上一页
        navigateTo(pages[currentIndex - 1]);
      }
    }
  }
}

// ============================================
// 动画效果
// ============================================
function initializeAnimations() {
  // 为元素添加进入动画
  const animatedElements = document.querySelectorAll('.stats-card, .task-card, .word-card, .action-btn');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(el);
  });
  
  // 添加动画类后的样式
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // 初始化主题管理
  new ThemeManager();
  
  // 初始化各组件
  initializeWordCard();
  initializeMasteryButtons();
  initializeTestOptions();
  initializeSliders();
  initializeCategoryTabs();
  initializeTouchSupport();
  initializeAnimations();
  
  // 更新时间
  updateTime();
  setInterval(updateTime, 60000);
  
  // 添加键盘快捷键支持
  document.addEventListener('keydown', (e) => {
    // 数字键 1-5 选择掌握程度
    if (e.key >= '1' && e.key <= '5') {
      const masteryBtns = document.querySelectorAll('.mastery-btn');
      const index = parseInt(e.key) - 1;
      if (masteryBtns[index]) {
        masteryBtns[index].click();
      }
    }
    
    // 方向键切换页面
    if (e.key === 'ArrowLeft') {
      const pages = ['home', 'learn', 'review', 'vocabulary', 'profile'];
      const activePage = document.querySelector('.page.active');
      const currentPageId = activePage ? activePage.id.replace('page-', '') : 'home';
      const currentIndex = pages.indexOf(currentPageId);
      if (currentIndex > 0) {
        navigateTo(pages[currentIndex - 1]);
      }
    }
    
    if (e.key === 'ArrowRight') {
      const pages = ['home', 'learn', 'review', 'vocabulary', 'profile'];
      const activePage = document.querySelector('.page.active');
      const currentPageId = activePage ? activePage.id.replace('page-', '') : 'home';
      const currentIndex = pages.indexOf(currentPageId);
      if (currentIndex < pages.length - 1) {
        navigateTo(pages[currentIndex + 1]);
      }
    }
  });
  
  console.log('🎉 英语学习应用原型已加载完成！');
  console.log('📱 可用快捷键：');
  console.log('   1-5: 选择掌握程度');
  console.log('   ← →: 切换页面');
});

// 导出函数供全局使用
window.navigateTo = navigateTo;
window.playAudio = playAudio;
window.nextWord = nextWord;
window.nextQuestion = nextQuestion;
window.startReview = startReview;
