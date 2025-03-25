class LoadingAnimation {
    constructor() {
        // 检查是否需要显示加载动画
        if (this.shouldShowLoading()) {
            this.initializeLoading();
        } else {
            this.skipLoading();
        }
    }

    // 检查是否需要显示加载动画
    shouldShowLoading() {
        // 检查是否是本次会话的首次访问
        if (!sessionStorage.getItem('hasVisited')) {
            // 标记已访问
            sessionStorage.setItem('hasVisited', 'true');
            return true;
        }
        return false;
    }

    // 初始化加载动画
    initializeLoading() {
        this.container = document.querySelector('.loading-container');
        this.progressText = document.querySelector('.progress-text');
        this.waterWave = document.querySelector('.water-wave');
        this.audio = document.querySelector('#bgMusic');
        this.musicControl = document.querySelector('.music-control');
        this.isPlaying = false;
        
        this.danmakuTexts = [
            "红军不怕远征难，万水千山只等闲",
            "跨过雪山草地，奔向新的征程",
            "长征精神永放光芒",
            "不怕牺牲、英勇斗争",
            "四渡赤水出奇兵",
            "飞夺泸定桥",
            "勇往直前、百折不挠",
            "为有牺牲多壮志",
            "敢教日月换新天",
            "万水千山只等闲",
            "星星之火可以燎原",
            "革命理想高于天",
            "众志成城、团结一心",
            "遵义会议转折点",
            "二万五千里长征路",
            "翻雪山、过草地",
            "苦奋斗、百折不挠",
            "革命理想高于天",
            "长征路上一盏明灯",
            "不怕牺牲、前赴后继",
            "为中国人民谋福",
            "为中华民族谋复兴",
            "坚持真理、坚守理想",
            "践行初心、担当使命",
            "不怕困难、英勇斗争",
            "对党忠诚、不负人民",
            "自力更生、艰苦奋斗",
            "实事求是、与时俱进",
            "继往开来、开拓创新",
            "长征路上战旗红",
            "红军精神永传承",
            "跨过千山万水",
            "踏遍祖国大地",
            "为理想而奋斗",
            "为信仰而行",
            "红色基因代代传",
            "革命精神永不灭",
            "不忘初心跟党走",
            "牢记使命向前进",
            "红军战士铁心跟党走",
            "长征精神永放光芒",
            "革命理想高于天",
            "英雄儿女写春秋",
            "红色江山代代传"
        ];
        
        this.createStars();
        this.createParticles();
        this.createRisingBeams();
        this.createShootingStars();
        this.createRedRibbon();
        this.init();

        // 显示加载容器
        this.container.style.display = 'flex';
        document.querySelector('main').style.display = 'none';
    }

    // 跳过加载动画
    skipLoading() {
        const container = document.querySelector('.loading-container');
        const main = document.querySelector('main');
        
        if (container) {
            container.style.display = 'none';
        }
        if (main) {
            main.style.display = 'block';
        }

        // 初始化音乐控制
        this.audio = document.querySelector('#bgMusic');
        this.musicControl = document.querySelector('.music-control');
        this.isPlaying = false;
        this.initMusicControl();
    }

    init() {
        this.startProgress();
        this.createDanmaku();
        this.initMusicControl();
        document.querySelector('main').style.display = 'none';
    }

    startProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 2.0;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.complete(), 500);
            }
            
            if(this.waterWave) {
                this.waterWave.style.width = `${progress}%`;
            }
            
            if(this.progressText) {
                this.progressText.textContent = `${Math.floor(progress)}%`;
            }
        }, 100);
    }

    createDanmaku() {
        const screenSegments = 20;
        const usedPositions = new Set();

        const createRandomDanmaku = () => {
            let x, y;
            do {
                x = Math.floor(Math.random() * screenSegments);
                y = Math.floor(Math.random() * screenSegments);
                if(usedPositions.size > screenSegments * 0.7) {
                    break;
                }
            } while (usedPositions.has(`${x},${y}`));

            const danmaku = document.createElement('div');
            danmaku.className = 'danmaku';
            
            // 随���选择样式，调整权重使default更常见
            const styles = [
                'default', 'default', 'default', 'default',
                'highlight', 'highlight',
                'glow',
                'outline'
            ];
            const randomStyle = styles[Math.floor(Math.random() * styles.length)];
            danmaku.classList.add(`danmaku-${randomStyle}`);
            
            // 根据样式调整大小
            const baseSize = 14;
            const sizeVariation = {
                'default': 0,
                'highlight': 2,
                'glow': 4,
                'outline': 2
            };
            const fontSize = baseSize + sizeVariation[randomStyle];
            danmaku.style.fontSize = `${fontSize}px`;
            
            // 设置文本内容
            danmaku.textContent = this.danmakuTexts[Math.floor(Math.random() * this.danmakuTexts.length)];
            
            // 设置初始位置
            const xPos = (x / screenSegments) * 100;
            const yPos = (y / screenSegments) * 100;
            danmaku.style.left = `${xPos}%`;
            danmaku.style.top = `${yPos}%`;

            // 设置动画
            const duration = 6 + Math.random() * 4;
            const distance = 150 + Math.random() * 100;
            const direction = Math.random() > 0.5 ? 1 : -1;
            
            danmaku.style.setProperty('--duration', `${duration}s`);
            danmaku.style.setProperty('--start-transform', `translateX(${distance * -direction}px)`);
            danmaku.style.setProperty('--end-transform', `translateX(${distance * direction}px)`);

            const container = document.querySelector('.danmaku-container');
            if(container) {
                container.appendChild(danmaku);
                usedPositions.add(`${x},${y}`);

                danmaku.addEventListener('animationend', () => {
                    danmaku.remove();
                    usedPositions.delete(`${x},${y}`);
                });
            }
        };

        // 每100ms创建1-2个弹幕
        setInterval(() => {
            const count = 1 + Math.floor(Math.random() * 2);
            for(let i = 0; i < count; i++) {
                setTimeout(createRandomDanmaku, i * 50);
            }
        }, 100);
    }

    initMusicControl() {
        this.musicControl = document.querySelector('.music-control');
        this.audio = document.querySelector('#bgMusic');
        
        // 进场自动播放
        setTimeout(() => {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.musicControl.classList.add('playing');
            }).catch(() => {
                // 如果自动播放失败(某些浏览器限制),等待用户交互时播放
                document.addEventListener('click', () => {
                    if (!this.isPlaying) {
                        this.audio.play();
                        this.musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                        this.musicControl.classList.add('playing');
                        this.isPlaying = true;
                    }
                }, { once: true });
            });
        }, 1000);

        // 点击控制按钮切换播放状态
        this.musicControl.addEventListener('click', () => {
            if (this.isPlaying) {
                this.audio.pause();
                this.musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                this.musicControl.classList.remove('playing');
            } else {
                this.audio.play();
                this.musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.musicControl.classList.add('playing');
            }
            this.isPlaying = !this.isPlaying;
        });
    }

    complete() {
        this.container.style.opacity = '0';
        setTimeout(() => {
            this.container.style.display = 'none';
            document.querySelector('main').style.display = 'block';
        }, 500);
    }

    createStars() {
        const starsContainer = document.querySelector('.decorative-stars');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            star.style.opacity = Math.random() * 0.5 + 0.3;
            star.style.transform = `scale(${Math.random() * 0.8 + 0.2})`;
            starsContainer.appendChild(star);
        }
    }

    createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        this.container.appendChild(container);

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机大小
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机起始位置
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            
            // 随机终点位置
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = -10;
            
            // 随机动画时长
            const duration = 3 + Math.random() * 4;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // 设置动画属性
            particle.style.setProperty('--start-x', `${startX}px`);
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--size', `${size}px`);
            
            container.appendChild(particle);
            
            // 动画结束后移除粒子
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        };

        // 初始创建一批粒子
        for (let i = 0; i < 30; i++) {
            setTimeout(createParticle, Math.random() * 2000);
        }

        // 持续创建新粒子
        setInterval(createParticle, 200);
    }

    createRisingBeams() {
        const container = document.createElement('div');
        container.className = 'light-beam-container';
        this.container.appendChild(container);

        const createBeam = () => {
            const beam = document.createElement('div');
            beam.className = 'rising-beam';
            
            // 随机起始位置
            const startX = Math.random() * window.innerWidth;
            beam.style.left = `${startX}px`;
            
            // 随机角度
            const angle = (Math.random() - 0.5) * 30; // -15度到15度之间
            beam.style.setProperty('--angle', `${angle}deg`);
            
            // 随机动画时长
            const duration = 2 + Math.random() * 3;
            beam.style.setProperty('--duration', `${duration}s`);
            
            // 随机透明度
            const opacity = 0.3 + Math.random() * 0.3;
            beam.style.setProperty('--opacity', opacity);
            
            // 随机高度
            const height = 30 + Math.random() * 50;
            beam.style.height = `${height}px`;
            
            container.appendChild(beam);
            
            // 动画结束后移除光束
            beam.addEventListener('animationend', () => {
                beam.remove();
            });
        };

        // 初始创建一批光束
        for (let i = 0; i < 20; i++) {
            setTimeout(createBeam, Math.random() * 2000);
        }

        // 持续创建新光束
        setInterval(createBeam, 200);
    }

    createShootingStars() {
        const container = document.createElement('div');
        container.className = 'shooting-stars-container';
        this.container.appendChild(container);

        const createShootingStar = () => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // 随机起始位置和角度
            const startX = Math.random() * window.innerWidth;
            const angle = -15 - Math.random() * 30;
            const distance = 100 + Math.random() * 200;
            
            star.style.left = `${startX}px`;
            star.style.setProperty('--angle', `${angle}deg`);
            star.style.setProperty('--distance', `${distance}px`);
            
            container.appendChild(star);
            
            star.addEventListener('animationend', () => star.remove());
        };

        // 每隔一段时间创建流星
        setInterval(createShootingStar, 2000);
    }

    createRedRibbon() {
        const container = document.createElement('div');
        container.className = 'ribbon-container';
        this.container.appendChild(container);

        const createRibbon = () => {
            const ribbon = document.createElement('div');
            ribbon.className = 'red-ribbon';
            
            const startX = Math.random() * window.innerWidth;
            const startY = -50;
            
            ribbon.style.left = `${startX}px`;
            ribbon.style.top = `${startY}px`;
            
            // 设置随机的飘带路径
            const controlPoint1X = startX + (Math.random() - 0.5) * 200;
            const controlPoint1Y = window.innerHeight * 0.3;
            const controlPoint2X = startX + (Math.random() - 0.5) * 200;
            const controlPoint2Y = window.innerHeight * 0.6;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = window.innerHeight + 50;
            
            ribbon.style.setProperty('--path', `
                M ${startX} ${startY}
                C ${controlPoint1X} ${controlPoint1Y},
                  ${controlPoint2X} ${controlPoint2Y},
                  ${endX} ${endY}
            `);
            
            container.appendChild(ribbon);
            
            ribbon.addEventListener('animationend', () => ribbon.remove());
        };

        // 定���创建飘带
        setInterval(createRibbon, 3000);
    }
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    new LoadingAnimation();
});