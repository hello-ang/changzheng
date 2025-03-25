document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.nav .menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const headerBg = document.querySelector('.header-bg');
    const navBg = document.querySelector('.nav-bg');
    let lastScrollTop = 0;
    
    // 修改汉堡按钮点击事件
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();  // 阻止事件冒泡
        console.log('Menu button clicked');  // 添加调试日志
        navContainer.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 点击导航链接后自动关闭菜单
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        const isClickInside = event.target.closest('.nav-container') || event.target.closest('.menu-toggle');
        if (!isClickInside && navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // 滚动时关闭菜单
    window.addEventListener('scroll', function() {
        if (navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // 原有的滚动处理代码...
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            headerBg.classList.add('hidden');
            navBg.classList.add('top');
        } else if (scrollTop < lastScrollTop) {
            if (scrollTop <= 50) {
                headerBg.classList.remove('hidden');
                navBg.classList.remove('top');
            }
        }
        lastScrollTop = scrollTop;
    });
});