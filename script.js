// 等待DOM完全加載
document.addEventListener('DOMContentLoaded', function() {
    // 滾動時顯示動畫元素
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 觀察所有需要動態顯示的元素
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 滾動時改變導航欄樣式
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 40px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 40px';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 漢堡選單功能
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // 切換導航選單顯示
        navLinks.style.transform = navLinks.style.transform === 'translateX(0%)' ? 'translateX(100%)' : 'translateX(0%)';
        
        // 漢堡按鈕動畫
        burger.classList.toggle('toggle');
    });
    
    // 點擊導航項後收起選單
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.transform = 'translateX(100%)';
                burger.classList.remove('toggle');
            }
        });
    });
    
    // 技能進度條動畫
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 表單提交處理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 這裡可以添加表單提交邏輯，如AJAX請求
            
            // 模擬表單提交後重置
            alert('謝謝您的訊息！我會盡快回覆您。');
            contactForm.reset();
        });
    }
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const response = document.getElementById('response');
    const responseText = document.getElementById('responseText');
    
    // 當點擊「願意」按鈕
    yesBtn.addEventListener('click', function() {
        // 顯示回應
        response.classList.remove('hidden');
        response.classList.add('visible');
        responseText.textContent = '太好了！我很高興你接受了我的心意！這將是一段美好的旅程。💕';
        
        // 創建煙花效果
        createFireworks();
        
        // 隱藏按鈕
        document.querySelector('.buttons').style.display = 'none';
    });
    
    // 當點擊「考慮一下」按鈕
    noBtn.addEventListener('click', function() {
        // 讓「否」按鈕逃跑
        moveNoButton();
    });
    
    // 移動「否」按鈕的函數
    function moveNoButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        
        // 讓「是」按鈕變大一點
        yesBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            yesBtn.style.transform = 'scale(1)';
        }, 300);
    }
    
    // 創建煙花效果
    function createFireworks() {
        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'fireworks-container';
        document.body.appendChild(fireworksContainer);
        
        // 創建多個煙花
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createSingleFirework(fireworksContainer);
            }, i * 300);
        }
    }
    
    function createSingleFirework(container) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // 隨機位置
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() * 200 - 100);
        const endY = Math.random() * (window.innerHeight / 2);
        
        firework.style.left = startX + 'px';
        firework.style.bottom = '0';
        
        container.appendChild(firework);
        
        // 煙花上升動畫
        setTimeout(() => {
            firework.style.transform = `translate(${endX - startX}px, -${endY}px)`;
            firework.style.opacity = '0';
            
            // 爆炸效果
            setTimeout(() => {
                createParticles(endX, window.innerHeight - endY);
                firework.remove();
            }, 1000);
        }, 10);
    }
    
    function createParticles(x, y) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.left = x + 'px';
        particlesContainer.style.top = y + 'px';
        document.body.appendChild(particlesContainer);
        
        // 創建多個粒子
        const colors = ['#ff4081', '#ff80ab', '#f50057', '#ffb6c1', '#ff6090'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 隨機角度和距離
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const dirX = Math.cos(angle) * distance;
            const dirY = Math.sin(angle) * distance;
            
            particle.style.transform = `translate(${dirX}px, ${dirY}px) scale(0)`;
            particlesContainer.appendChild(particle);
            
            // 粒子動畫
            setTimeout(() => {
                particle.style.transform = `translate(${dirX}px, ${dirY}px) scale(1)`;
                particle.style.opacity = '1';
                
                setTimeout(() => {
                    particle.style.opacity = '0';
                }, 500 + Math.random() * 500);
            }, 10);
        }
        
        // 移除粒子容器
        setTimeout(() => {
            particlesContainer.remove();
        }, 2000);
    }
    
    // 為浮動愛心添加動畫
    animateFloatingHearts();
    
    function animateFloatingHearts() {
        const hearts = document.querySelectorAll('.floating-heart');
        
        hearts.forEach(heart => {
            // 隨機設置初始位置
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            
            // 創建動畫
            animateHeart(heart);
        });
    }
    
    function animateHeart(heart) {
        // 隨機移動方向和距離
        const xMovement = Math.random() * 100 - 50;
        const yMovement = -Math.random() * 80 - 20; // 主要向上移動
        
        // 設置動畫
        heart.style.opacity = '0.7';
        heart.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            heart.style.transition = 'all 8s ease-in-out';
            heart.style.transform = `translate(${xMovement}px, ${yMovement}px) scale(1) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
            
            // 動畫結束後重新開始
            setTimeout(() => {
                heart.style.transition = 'none';
                heart.style.transform = 'scale(0.5)';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = Math.random() * window.innerHeight + 'px';
                animateHeart(heart);
            }, 8000);
        }, 100);
    }
    
    // 添加CSS樣式
    const style = document.createElement('style');
    style.textContent = `
        .fireworks-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
        }
        
        .firework {
            position: absolute;
            width: 5px;
            height: 5px;
            background: #ff4081;
            border-radius: 50%;
            transition: all 1s ease-out;
            opacity: 1;
        }
        
        .particles-container {
            position: absolute;
            pointer-events: none;
            z-index: 101;
        }
        
        .particle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: 0;
            transition: all 1s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// 控制漢堡選單的CSS
document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('toggle');
});

// 添加CSS類以實現漢堡選單的動畫
const style = document.createElement('style');
style.innerHTML = `
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .burger.toggle .line2 {
        opacity: 0;
    }
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style); 
