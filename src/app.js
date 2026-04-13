// 轮播图控制
var Carousel = /** @class */ (function () {
    function Carousel() {
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.currentIndex = 0;
        this.autoPlayTimer = null;
        this.init();
    }
    Carousel.prototype.init = function () {
        var _this = this;
        this.prevBtn.addEventListener('click', function () { return _this.prevSlide(); });
        this.nextBtn.addEventListener('click', function () { return _this.nextSlide(); });
        this.autoPlay();
        var container = document.querySelector('.carousel-container');
        container.addEventListener('mouseenter', function () { return _this.pauseAutoPlay(); });
        container.addEventListener('mouseleave', function () { return _this.autoPlay(); });
    };
    Carousel.prototype.showSlide = function (index) {
        this.slides.forEach(function (s) { return s.classList.remove('active'); });
        this.currentIndex = (index + this.slides.length) % this.slides.length;
        this.slides[this.currentIndex].classList.add('active');
    };
    Carousel.prototype.prevSlide = function () {
        this.showSlide(this.currentIndex - 1);
    };
    Carousel.prototype.nextSlide = function () {
        this.showSlide(this.currentIndex + 1);
    };
    Carousel.prototype.autoPlay = function () {
        var _this = this;
        this.autoPlayTimer = window.setInterval(function () { return _this.nextSlide(); }, 4000);
    };
    Carousel.prototype.pauseAutoPlay = function () {
        if (this.autoPlayTimer !== null) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    };
    return Carousel;
}());
// 游戏管理（返回主页 + 打开游戏）
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.list = document.getElementById('game-list');
        this.iframe = document.getElementById('game-iframe');
        this.cards = Array.from(document.querySelectorAll('.game-card'));
        this.carouselContainer = document.querySelector('.carousel-container');
        this.init();
    }
    GameManager.getInstance = function () {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    };
    GameManager.prototype.init = function () {
        var _this = this;
        this.cards.forEach(function (card) {
            card.addEventListener('click', function () {
                var url = card.getAttribute('data-game');
                _this.startGame(url);
            });
        });
    };
    GameManager.prototype.startGame = function (url) {
        // 玩游戏 → 隐藏轮播 + 隐藏列表 + 显示游戏
        this.carouselContainer.classList.add('hidden');
        this.iframe.src = url;
        this.iframe.classList.add('running');
        this.list.classList.add('hidden');
    };
    GameManager.prototype.backHome = function () {
        // 返回主页 → 显示轮播 + 显示列表 + 关闭游戏
        this.carouselContainer.classList.remove('hidden');
        this.iframe.src = '';
        this.iframe.classList.remove('running');
        this.list.classList.remove('hidden');
    };
    return GameManager;
}());
// 抽屉面板
var DrawerManager = /** @class */ (function () {
    function DrawerManager() {
        this.overlay = document.querySelector('.drawer-overlay');
        this.aboutDrawer = document.querySelector('.about-drawer');
        this.donateDrawer = document.querySelector('.donate-drawer');
        this.init();
    }
    DrawerManager.prototype.init = function () {
        var _this = this;
        // 返回主页
        document.querySelector('.menu-home').addEventListener('click', function () {
            GameManager.getInstance().backHome();
        });
        // 关于我
        document.querySelector('.menu-about').addEventListener('click', function () {
            _this.closeAll();
            _this.aboutDrawer.classList.add('show');
            _this.overlay.classList.add('show');
        });
        // 赞助
        document.querySelector('.menu-donate').addEventListener('click', function () {
            _this.closeAll();
            _this.donateDrawer.classList.add('show');
            _this.overlay.classList.add('show');
        });
        // 关闭按钮
        document.querySelectorAll('.drawer-close').forEach(function (btn) {
            btn.addEventListener('click', function () { return _this.closeAll(); });
        });
        // 点击遮罩关闭
        this.overlay.addEventListener('click', function () { return _this.closeAll(); });
    };
    DrawerManager.prototype.closeAll = function () {
        this.aboutDrawer.classList.remove('show');
        this.donateDrawer.classList.remove('show');
        this.overlay.classList.remove('show');
    };
    return DrawerManager;
}());
// 初始化
window.addEventListener('DOMContentLoaded', function () {
    new Carousel();
    GameManager.getInstance();
    new DrawerManager();
});
