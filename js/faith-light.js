// 信仰标语轮播效果
function initFaithQuotes() {
    const quotes = [
        "信仰的火焰永不熄灭",
        "为中国人民谋幸福",
        "为中华民族谋复兴",
        "不忘初心，牢记使命",
        "坚定信念，永远跟党走"
    ];
    
    const container = document.querySelector('.faith-quotes');
    if (!container) return;

    // 清空容器
    container.innerHTML = '';
    
    // 创建标语元素
    quotes.forEach((quote, index) => {
        const quoteItem = document.createElement('div');
        quoteItem.className = 'quote-item';
        if (index === 0) quoteItem.classList.add('active');
        
        const quoteText = document.createElement('div');
        quoteText.className = 'quote-text';
        quoteText.textContent = quote;
        
        quoteItem.appendChild(quoteText);
        container.appendChild(quoteItem);
    });

    let currentIndex = 0;
    const items = container.querySelectorAll('.quote-item');

    // 切换标语
    function showNextQuote() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    // 每4秒切换一次
    setInterval(showNextQuote, 4000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 创建火焰元素
    const lamps = document.querySelectorAll('.eternal-lamp');
    lamps.forEach(lamp => {
        // 添加火焰
        const flame = document.createElement('div');
        flame.className = 'lamp-flame';
        lamp.appendChild(flame);

        // 添加光晕
        const glow = document.createElement('div');
        glow.className = 'lamp-glow';
        lamp.appendChild(glow);
    });

    // 初始化标语
    initFaithQuotes();
}); 