// 轮播图控制
class Carousel {
  private slides: HTMLElement[];
  private prevBtn: HTMLElement;
  private nextBtn: HTMLElement;
  private currentIndex: number;
  private autoPlayTimer: number | null;
  public carouselContainer: HTMLElement;

  constructor() {
    this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
    this.prevBtn = document.querySelector('.prev-btn')!;
    this.nextBtn = document.querySelector('.next-btn')!;
    this.carouselContainer = document.querySelector('.carousel-container')!;
    this.currentIndex = 0;
    this.autoPlayTimer = null;
    this.init();
  }

  private init(): void {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.autoPlay();
    const container = document.querySelector('.carousel-container')!;
    container.addEventListener('mouseenter', () => this.pauseAutoPlay());
    container.addEventListener('mouseleave', () => this.autoPlay());
  }

  private showSlide(index: number): void {
    this.slides.forEach((s) => s.classList.remove('active'));
    this.currentIndex = (index + this.slides.length) % this.slides.length;
    this.slides[this.currentIndex].classList.add('active');
  }

  private prevSlide(): void {
    this.showSlide(this.currentIndex - 1);
  }
  private nextSlide(): void {
    this.showSlide(this.currentIndex + 1);
  }

  private autoPlay(): void {
    this.autoPlayTimer = window.setInterval(() => this.nextSlide(), 4000);
  }

  private pauseAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

// 游戏管理（返回主页 + 打开游戏）
class GameManager {
  private static instance: GameManager;

  private list: HTMLElement;
  private iframe: HTMLIFrameElement;
  private cards: HTMLElement[];
  private carouselContainer: HTMLElement;

  constructor() {
    this.list = document.getElementById('game-list')! as HTMLElement;
    this.iframe = document.getElementById('game-iframe')! as HTMLIFrameElement;
    this.cards = Array.from(document.querySelectorAll('.game-card'));
    this.carouselContainer = document.querySelector('.carousel-container')!;
    this.init();
  }

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  private init(): void {
    this.cards.forEach((card) => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-game')!;
        this.startGame(url);
      });
    });
  }

  private startGame(url: string): void {
    // 玩游戏 → 隐藏轮播 + 隐藏列表 + 显示游戏
    this.carouselContainer.classList.add('hidden');
    this.iframe.src = url;
    this.iframe.classList.add('running');
    this.list.classList.add('hidden');
  }

  public backHome(): void {
    // 返回主页 → 显示轮播 + 显示列表 + 关闭游戏
    this.carouselContainer.classList.remove('hidden');
    this.iframe.src = '';
    this.iframe.classList.remove('running');
    this.list.classList.remove('hidden');
  }
}

// 抽屉面板
class DrawerManager {
  private overlay: HTMLElement;
  private aboutDrawer: HTMLElement;
  private donateDrawer: HTMLElement;

  constructor() {
    this.overlay = document.querySelector('.drawer-overlay')!;
    this.aboutDrawer = document.querySelector('.about-drawer')!;
    this.donateDrawer = document.querySelector('.donate-drawer')!;
    this.init();
  }

  private init(): void {
    // 返回主页
    document.querySelector('.menu-home')!.addEventListener('click', () => {
      GameManager.getInstance().backHome();
    });

    // 关于我
    document.querySelector('.menu-about')!.addEventListener('click', () => {
      this.closeAll();
      this.aboutDrawer.classList.add('show');
      this.overlay.classList.add('show');
    });

    // 赞助
    document.querySelector('.menu-donate')!.addEventListener('click', () => {
      this.closeAll();
      this.donateDrawer.classList.add('show');
      this.overlay.classList.add('show');
    });

    // 关闭按钮
    document.querySelectorAll('.drawer-close').forEach((btn) => {
      btn.addEventListener('click', () => this.closeAll());
    });

    // 点击遮罩关闭
    this.overlay.addEventListener('click', () => this.closeAll());
  }

  private closeAll(): void {
    this.aboutDrawer.classList.remove('show');
    this.donateDrawer.classList.remove('show');
    this.overlay.classList.remove('show');
  }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  new Carousel();
  GameManager.getInstance();
  new DrawerManager();
});
