document.addEventListener('DOMContentLoaded', function() {
    // 原有的轮播图点击事件
    const baguaItems = document.querySelectorAll('.bagua-item');
    baguaItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.bagua-text').textContent;
            alert(`您点击了"${text}"\n即将跳转到详情页面...`);
        });
    });

    // 长征精神切换效果
    const spiritItems = document.querySelectorAll('.spirit-item');
    const spiritDetails = document.querySelectorAll('.spirit-detail');

    spiritItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active类
            spiritItems.forEach(i => i.classList.remove('active'));
            spiritDetails.forEach(d => d.classList.remove('active'));
            
            // 添加active类到当前选中项
            this.classList.add('active');
            const spiritId = this.getAttribute('data-spirit');
            document.getElementById(spiritId).classList.add('active');
        });
    });

    // 垂直轮播图效果
    const carousels = document.querySelectorAll('.vertical-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.vertical-carousel-container');
        let scrollPosition = 0;
        let isScrolling = false;
        let autoScrollInterval;
        let autoShuffleInterval;
        const itemHeight = 120;
        
        // 获取所有项目并转换为数组
        const items = Array.from(container.querySelectorAll('.vertical-item'));
        const totalItems = items.length;
        const totalHeight = totalItems * itemHeight;
        
        // 用于记录已显示过的项目
        let shownItems = new Set();

        // 随机打乱数组顺序，优先选择未显示过的项目
        function shuffleArray(array) {
            // 将数组分成已显示和未显示两部分
            const notShown = array.filter(item => !shownItems.has(item.outerHTML));
            const shown = array.filter(item => shownItems.has(item.outerHTML));
            
            // 如果所有项目都显示过了，重置记录
            if (notShown.length === 0) {
                shownItems.clear();
                return shuffleArray(array); // 重新打乱
            }

            // 优先使用未显示的项目，然后随机填充剩余位置
            const result = [];
            
            // 随机打乱未显示的项目
            for (let i = notShown.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [notShown[i], notShown[j]] = [notShown[j], notShown[i]];
            }
            
            // 随机打乱已显示的项目
            for (let i = shown.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shown[i], shown[j]] = [shown[j], shown[i]];
            }

            // 合并两个数组，优先使用未显示的项目
            result.push(...notShown);
            result.push(...shown);

            // 记录本次显示的项目
            notShown.forEach(item => shownItems.add(item.outerHTML));

            return result;
        }

        // 重新排列DOM元素
        function reorderItems() {
            container.innerHTML = '';
            const shuffledItems = shuffleArray([...items]);
            shuffledItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                container.appendChild(clonedItem);
            });
        }

        // 自动滚动函数
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (!isScrolling) {
                    scrollPosition -= itemHeight;
                    if (Math.abs(scrollPosition) >= totalHeight) {
                        scrollPosition = 0;
                    }
                    container.style.transform = `translateY(${scrollPosition}px)`;
                }
            }, 3000);
        }

        // 开始自动随机排序
        function startAutoShuffle() {
            autoShuffleInterval = setInterval(() => {
                container.style.transition = 'none';
                scrollPosition = 0;
                container.style.transform = `translateY(0)`;
                reorderItems();
                setTimeout(() => {
                    container.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 5000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function stopAutoShuffle() {
            clearInterval(autoShuffleInterval);
        }

        // 初始化
        reorderItems();
        startAutoScroll();
        startAutoShuffle();

        // 鼠标进入停止自动效果
        carousel.addEventListener('mouseenter', () => {
            stopAutoScroll();
            stopAutoShuffle();
        });
        
        // 鼠标离开恢复自动效果
        carousel.addEventListener('mouseleave', () => {
            startAutoScroll();
            startAutoShuffle();
        });

        // 鼠标滚轮控制
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isScrolling) {
                isScrolling = true;
                stopAutoScroll();
                stopAutoShuffle();
                
                if (e.deltaY > 0) {
                    if (Math.abs(scrollPosition) < totalHeight - itemHeight) {
                        scrollPosition -= itemHeight;
                    } else {
                        scrollPosition = 0;
                    }
                } else {
                    if (scrollPosition < 0) {
                        scrollPosition += itemHeight;
                    } else {
                        scrollPosition = -(totalHeight - itemHeight);
                    }
                }

                container.style.transform = `translateY(${scrollPosition}px)`;
                
                setTimeout(() => {
                    isScrolling = false;
                    if (!carousel.matches(':hover')) {
                        startAutoScroll();
                        startAutoShuffle();
                    }
                }, 300);
            }
        });
    });
}); 