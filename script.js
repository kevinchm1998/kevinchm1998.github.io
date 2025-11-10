// 免責聲明彈出視窗 - 修改版本：按X取消視窗並進入主頁
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 啟動免責聲明功能');
    
    const disclaimerModal = document.getElementById('disclaimerModal');
    const closeBtn = document.querySelector('.disclaimer-close');
    const agreeBtn = document.querySelector('.disclaimer-agree');
    
    if (!disclaimerModal) {
        console.error('❌ 找不到免責聲明元素');
        return;
    }
    
    // 顯示免責聲明
    function showDisclaimer() {
        console.log('✅ 顯示免責聲明');
        disclaimerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('disclaimer-scroll-lock');
    }
    
    // 隱藏免責聲明並進入主頁
    function hideDisclaimerAndEnter() {
        console.log('✅ 關閉免責聲明，進入主頁');
        disclaimerModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('disclaimer-scroll-lock');
        
        console.log('🏠 進入主頁面');
        
        try {
            localStorage.setItem('disclaimerClosed', 'true');
            console.log('💾 已保存關閉狀態到本地存儲');
        } catch (error) {
            console.error('❌ 保存本地存儲失敗:', error);
        }
    }
    
    // 檢查是否已經關閉過
    let hasClosed = false;
    try {
        const stored = localStorage.getItem('disclaimerClosed');
        hasClosed = stored === 'true';
        console.log('📊 本地存儲狀態:', hasClosed);
    } catch (error) {
        console.error('❌ 讀取本地存儲失敗:', error);
        hasClosed = false;
    }
    
    // 修復關閉按鈕事件
    if (closeBtn) {
        console.log('🔧 修復關閉按鈕事件');
        
        // 移除舊的事件監聽
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        
        // 重新獲取按鈕
        const currentCloseBtn = document.querySelector('.disclaimer-close');
        
        // 雙重綁定確保可靠
        currentCloseBtn.onclick = function(e) {
            console.log('🖱️ X按鈕被點擊 - onclick方法');
            e.preventDefault();
            e.stopPropagation();
            hideDisclaimerAndEnter();
            return false;
        };
        
        currentCloseBtn.addEventListener('click', function(e) {
            console.log('🖱️ X按鈕被點擊 - addEventListener方法');
            e.preventDefault();
            e.stopPropagation();
            hideDisclaimerAndEnter();
            return false;
        });
    }
    
    // 事件監聽 - 同意按鈕（如果有的話）
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 同意按鈕被點擊 - 進入主頁');
            hideDisclaimerAndEnter();
        });
    }
    
    // 點擊背景關閉
    disclaimerModal.addEventListener('click', function(e) {
        if (e.target === disclaimerModal) {
            console.log('🎯 背景被點擊 - 關閉視窗並進入主頁');
            hideDisclaimerAndEnter();
        }
    });
    
    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && disclaimerModal.classList.contains('active')) {
            console.log('⌨️ ESC 鍵被按下 - 關閉視窗並進入主頁');
            hideDisclaimerAndEnter();
        }
    });
    
    // 顯示免責聲明（無論之前是否關閉過）
    console.log('🔄 準備顯示免責聲明');
    setTimeout(showDisclaimer, 1500);
});

// 🍔 漢堡選單功能 - 修改版本
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 啟動漢堡選單功能');
    
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!hamburger || !mobileMenu || !menuOverlay) {
        console.error('❌ 找不到漢堡選單元素');
        return;
    }
    
    console.log('✅ 找到所有漢堡選單元素');
    
    // 切換菜單函數
    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // 關閉選單
            console.log('❌ 關閉手機選單');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // 打開選單
            console.log('✅ 打開手機選單');
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // 綁定漢堡按鈕點擊事件
    hamburger.addEventListener('click', function(e) {
        console.log('🖱️ 漢堡按鈕被點擊');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // 綁定疊層點擊事件
    menuOverlay.addEventListener('click', function(e) {
        console.log('🎯 疊層被點擊');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // 手機導航連結點擊處理 - 修復外部連結問題
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是內部連結，關閉選單
            if (href.startsWith('#') || this.classList.contains('mobile-nav-link')) {
                console.log('🔗 內部連結點擊 - 關閉選單');
                toggleMenu();
            } else {
                // 外部連結 - 阻止默認行為，清理後在新分頁打開
                console.log('🌐 外部連結點擊:', href);
                e.preventDefault();
                
                // 清理網址（移除可能的多餘參數）
                let cleanUrl = href;
                if (href.includes('nwd.com.hk')) {
                    // 簡單清理：只保留主要參數
                    cleanUrl = href.split('?')[0];
                    const mainParam = href.includes('QXw7jD2r2h'); // 你的主要參數
                    if (mainParam) {
                        cleanUrl = href; // 如果包含主要參數，保持原樣
                    }
                }
                
                console.log('🧹 打開網址:', cleanUrl);
                
                // 在新分頁打開
                window.open(cleanUrl, '_blank');
                
                // 關閉手機選單
                toggleMenu();
            }
        });
    });
    
    // ESC 鍵關閉選單
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            console.log('⌨️ ESC 鍵 - 關閉手機選單');
            toggleMenu();
        }
    });
    
    console.log('✅ 漢堡選單事件綁定完成');
});

// 測試功能
window.testCloseButton = function() {
    const closeBtn = document.querySelector('.disclaimer-close');
    const modal = document.getElementById('disclaimerModal');
    
    console.log('🧪 測試關閉按鈕功能');
    console.log('關閉按鈕:', closeBtn);
    console.log('模態框:', modal);
    
    if (closeBtn && modal) {
        console.log('✅ 元素存在，測試點擊');
        closeBtn.click();
    }
};

// 漢堡選單測試功能
window.testHamburgerMenu = function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('🧪 測試漢堡選單功能');
    console.log('漢堡按鈕:', hamburger);
    console.log('手機菜單:', mobileMenu);
    
    if (hamburger) {
        console.log('✅ 觸發漢堡按鈕點擊');
        hamburger.click();
    }
};

// 強制清理外部頁面垃圾導航
function cleanExternalNavigation() {
    const selectorsToRemove = [
        '#residential-menu',
        '#property-menu',
        '#residential',
        '.toggle-input',
        '.toggle',
        '.arrow',
        '.pmenu',
        '[onclick*="residential"]',
        '[class*="residential"]',
        '[class*="property"][class*="menu"]',
        '#residential-toggle',
        '#property-toggle'
    ];
    
    selectorsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element && element.parentNode) {
                element.remove();
            }
        });
    });
    
    // 特別處理頁頭
    const pageHeader = document.getElementById('page-header');
    if (pageHeader) {
        const children = Array.from(pageHeader.children);
        children.forEach(child => {
            if (child && 
                !child.classList.contains('logo') && 
                !child.classList.contains('hamburger-menu') &&
                child.id !== 'property-logo' &&
                child.id !== 'page-lang') {
                child.remove();
            }
        });
    }
}

// 頁面加載後執行清理
document.addEventListener('DOMContentLoaded', cleanExternalNavigation);

// 持續監控清理（每2秒執行一次）
setInterval(cleanExternalNavigation, 2000);

// 視頻自動播放處理
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.background-video');
    if (video) {
        video.play().catch(error => {
            console.log('🎬 視頻自動播放被阻止:', error);
        });
    }
});

// 調試功能
window.fixAll = {
    // 免責聲明功能
    showDisclaimer: function() {
        const modal = document.getElementById('disclaimerModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ 強制顯示免責聲明');
        }
    },
    hideDisclaimer: function() {
        const modal = document.getElementById('disclaimerModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('✅ 隱藏免責聲明');
        }
    },
    resetDisclaimer: function() {
        try {
            localStorage.removeItem('disclaimerClosed');
            console.log('✅ 免責聲明記錄已清除，請刷新頁面');
        } catch (error) {
            console.error('❌ 清除本地存儲失敗:', error);
        }
    },
    
    // 導航清理功能
    cleanNavigation: function() {
        cleanExternalNavigation();
        console.log('✅ 手動執行導航清理');
    },
    
    // 滾動修復
    fixScroll: function() {
        document.body.style.overflow = '';
        document.body.classList.remove('disclaimer-scroll-lock');
        console.log('✅ 滾動已修復');
    },
    
    // 漢堡選單功能
    showMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ 強制顯示手機選單');
        }
    },
    hideMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('✅ 強制隱藏手機選單');
        }
    },
    
    // 狀態檢查
    status: function() {
        const modal = document.getElementById('disclaimerModal');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        console.log('📊 當前狀態:');
        console.log('- 免責聲明顯示:', modal ? modal.classList.contains('active') : '找不到元素');
        console.log('- 手機選單顯示:', mobileMenu ? mobileMenu.classList.contains('active') : '找不到元素');
        console.log('- Body 滾動鎖定:', document.body.classList.contains('disclaimer-scroll-lock'));
        console.log('- Body overflow:', document.body.style.overflow);
        
        try {
            const stored = localStorage.getItem('disclaimerClosed');
            console.log('- 本地存儲狀態:', stored);
        } catch (error) {
            console.log('- 本地存儲狀態: 讀取失敗');
        }
    },
    
    // 測試功能
    testClose: function() {
        testCloseButton();
    },
    testHamburger: function() {
        testHamburgerMenu();
    }
};

console.log('🔧 調試命令已加載:');
console.log('- fixAll.showDisclaimer() - 顯示免責聲明');
console.log('- fixAll.hideDisclaimer() - 隱藏免責聲明');
console.log('- fixAll.resetDisclaimer() - 重置免責聲明');
console.log('- fixAll.cleanNavigation() - 清理導航垃圾');
console.log('- fixAll.fixScroll() - 修復滾動問題');
console.log('- fixAll.showMobileMenu() - 顯示手機選單');
console.log('- fixAll.hideMobileMenu() - 隱藏手機選單');
console.log('- fixAll.status() - 檢查當前狀態');
console.log('- fixAll.testClose() - 測試關閉按鈕');
console.log('- fixAll.testHamburger() - 測試漢堡選單');
console.log('- testCloseButton() - 直接測試關閉按鈕');
console.log('- testHamburgerMenu() - 直接測試漢堡選單');

// 頁面完全加載後的最終檢查
window.addEventListener('load', function() {
    console.log('🎉 頁面完全加載完成');
    
    // 最終清理
    setTimeout(cleanExternalNavigation, 500);
    
    // 確保滾動正常
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 1000);
});