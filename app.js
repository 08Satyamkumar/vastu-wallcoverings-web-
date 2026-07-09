/**
 * Vastu Home Decor India - Core Application Logic
 * Implements client-side SPA routing, Wallpaper Visualizer, Comparison Slider,
 * roll calculators, filterable catalog, and store locator.
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  // Application State
  state: {
    activeRoute: 'home',
    wallpaperVisualizer: {
      canvas: null,
      ctx: null,
      backgroundImage: null,
      activePatternImage: null,
      activePatternName: 'Sanskriti',
      patterns: {
        'Sanskriti': 'assets/sanskriti_ethnic.png',
        'Florina': 'assets/florina_botanical.png',
        'Bohemia': 'assets/bohemia_geometric.png'
      },
      // Accent Wall Polygon in mockup (trapezoid coords on 1000x625 grid)
      wallPolygon: [
        { x: 535, y: 80 },   // Top-Left
        { x: 940, y: 15 },   // Top-Right
        { x: 940, y: 575 },  // Bottom-Right
        { x: 535, y: 495 }   // Bottom-Left
      ]
    },
    heroSlider: {
      currentIndex: 0,
      intervalId: null,
      slides: [
        {
          image: 'assets/sanskriti_ethnic.png',
          subtitle: 'The Sanskriti Collection',
          title: 'Timeless Indian Heritage',
          desc: 'Bring cultural elegance to your walls with gold mandala motifs and royal textures.'
        },
        {
          image: 'assets/florina_botanical.png',
          subtitle: 'The Florina Collection',
          title: 'Soft Watercolor Florals',
          desc: 'Delicate pastel magnolias and lush leaves designed to create a peaceful, organic sanctuary.'
        },
        {
          image: 'assets/bohemia_geometric.png',
          subtitle: 'The Bohemia Collection',
          title: 'Modern Gold & Navy Lines',
          desc: 'Vibrant geometric abstractions and sleek metallic stripes for contemporary accents.'
        }
      ]
    },
    products: [
      { id: 'BOR102', name: 'GRAIN(Golden Tan) (BOR 102)', collection: 'Attitude', pattern: 'Bricks & Stones', color: 'Brown', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/sanskriti_ethnic.png', badge: 'Popular' },
      { id: 'BOR162', name: 'CLIMBER(Willow Green) (BOR 162)', collection: 'Autograph', pattern: 'Florals', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/florina_botanical.png', badge: 'Trending' },
      { id: 'BOR160', name: 'TERRANE(Celadon Green) (BOR 160)', collection: 'Botanica', pattern: 'Contemporary', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/mural_paradise.png', badge: 'New' },
      { id: 'BOR158', name: 'FLORAGRID(Garden Green) (BOR 158)', collection: 'Carrara', pattern: 'Florals', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/florina_botanical.png', badge: 'Eco' },
      { id: 'BOR167', name: 'FIELD(Moss Green) (BOR 167)', collection: 'Chelsea', pattern: 'Florals', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/mural_prakriti.png', badge: '' },
      { id: 'BOR204', name: 'FOREST(Leafy Green) (BOR 204)', collection: 'Attitude', pattern: 'Florals', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/mural_landscape.png', badge: '' },
      { id: 'BOR110', name: 'LINEA(Sage Green) (BOR 110)', collection: 'Autograph', pattern: 'Contemporary', color: 'Green', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/bohemia_geometric.png', badge: '' },
      { id: 'BOR123', name: 'WEAVE(Warm Beige) (BOR 123)', collection: 'Botanica', pattern: 'Bricks & Stones', color: 'Brown', price: '₹1,820', spec: 'Roll (57 sq ft)', image: 'assets/elite_living_room.png', badge: '' }
    ],
    murals: [
      { id: 'ZHA188', name: 'Desert Horizons(Beige) ( ZHA 188 )', collection: 'ZAHA', pattern: '3D', color: 'Beige', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_autograph.png', badge: '' },
      { id: 'ZHA181', name: 'Calm Horizons(Grey) ( ZHA 181 )', collection: 'ZAHA', pattern: 'Contemporary', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_funzone.png', badge: '' },
      { id: 'ZHA177', name: 'Architectural Flow(Black and White) ( ZHA 177 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_krsnaa.png', badge: '' },
      { id: 'ZHA187', name: 'Desert Horizons(Blue) ( ZHA 187 )', collection: 'ZAHA', pattern: '3D', color: 'Blue', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_landscape.png', badge: '' },
      { id: 'ZHA186', name: 'Desert Horizons(Green) ( ZHA 186 )', collection: 'ZAHA', pattern: 'City & Landscape', color: 'Green', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_prakriti.png', badge: '' },
      { id: 'ZHA184', name: 'Whispers of the Sky(Pink) ( ZHA 184 )', collection: 'ZAHA', pattern: 'Contemporary', color: 'Pink', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_paradise.png', badge: '' },
      { id: 'ZHA182', name: 'Whispers of the Sky(Beige) ( ZHA 182 )', collection: 'ZAHA', pattern: 'Contemporary', color: 'Beige', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_autograph.png', badge: '' },
      { id: 'ZHA180', name: 'Earthen Scribble(Grey) ( ZHA 180 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_funzone.png', badge: '' },
      { id: 'ZHA178', name: 'Earthen Scribble(Beige) ( ZHA 178 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Beige', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_krsnaa.png', badge: '' },
      { id: 'ZHA176', name: 'Culinary Lines(Black and White) ( ZHA 176 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_landscape.png', badge: '' },
      { id: 'ZHA175', name: 'Clay Arches(Black and White) ( ZHA 175 )', collection: 'ZAHA', pattern: 'Contemporary', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_prakriti.png', badge: '' },
      { id: 'ZHA174', name: 'Clay Arches(Grey) ( ZHA 174 )', collection: 'ZAHA', pattern: 'Contemporary', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_paradise.png', badge: '' },
      { id: 'ZHA143', name: 'Gridlines(Blue) ( ZHA 143 )', collection: 'ZAHA', pattern: '3D', color: 'Blue', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_autograph.png', badge: '' },
      { id: 'ZHA142', name: 'Gridlines(Teal) ( ZHA 142 )', collection: 'ZAHA', pattern: '3D', color: 'Blue', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_funzone.png', badge: '' },
      { id: 'ZHA141', name: 'Monochrome Motion(Grey) ( ZHA 141 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Black', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_krsnaa.png', badge: '' },
      { id: 'ZHA140', name: 'Golden Veil(Tnl) ( ZHA 140 )', collection: 'ZAHA', pattern: 'Corporate', color: 'Gold', price: '₹1,938', spec: 'Roll (57 sq ft)', image: 'assets/mural_landscape.png', badge: '' }
    ],
    stores: [
      { city: 'Mumbai', name: 'Vastu Home Decor Flagship Gallery', address: 'Worli Naka, Worli, Mumbai - 400018', phone: '022-40700000', email: 'worli@vastuhomedecor.com' },
      { city: 'Mumbai', name: 'Vastu Home Decor Studio Suburban', address: 'Linking Road, Santa Cruz West, Mumbai - 400054', phone: '022-40800000', email: 'scruz@vastuhomedecor.com' },
      { city: 'Delhi', name: 'Delhi Design Center', address: 'Kirti Nagar Industrial Area, Phase-I, New Delhi - 110015', phone: '011-45600000', email: 'delhi@vastuhomedecor.com' },
      { city: 'Bengaluru', name: 'Bengaluru Experience Hub', address: '80 Feet Road, Indiranagar, Bengaluru - 560038', phone: '080-41200000', email: 'blr@vastuhomedecor.com' },
      { city: 'Pune', name: 'Pune Wallcoverings Studio', address: 'Senapati Bapat Road, Pune - 411016', phone: '020-25600000', email: 'pune@vastuhomedecor.com' },
      { city: 'Hyderabad', name: 'Hyderabad Galleria', address: 'Banjara Hills, Road No. 12, Hyderabad - 500034', phone: '040-49200000', email: 'hyd@vastuhomedecor.com' }
    ],
    wishlist: JSON.parse(localStorage.getItem('vhd_wishlist') || '[]'),
    cart: JSON.parse(localStorage.getItem('vhd_cart') || '[]')
  },

  // Initialize Modules
  init() {
    this.initRouter();
    this.initHeaderEffects();
    this.initMobileNav();
    this.initModalEvents();
    this.initSearchOverlay();
    this.initCurrencySwitcher();
    
    // Initial UI Sync for wishlist & cart
    this.updateWishlistUI();
    this.updateCartUI();
    
    // Initial Route Trigger
    this.handleRouting();
  },

  // ==========================================
  // SPA ROUTER
  // ==========================================
  initRouter() {
    window.addEventListener('hashchange', () => this.handleRouting());
    
    // Click events to close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
        }
        const toggle = document.querySelector('.mobile-toggle');
        if (toggle && toggle.classList.contains('open')) {
          toggle.classList.remove('open');
        }
      });
    });
  },

  handleRouting() {
    let hash = window.location.hash.substring(1) || 'home';
    // Strip leading slash if present (e.g. /collections -> collections)
    if (hash.startsWith('/')) {
      hash = hash.substring(1);
    }
    this.state.activeRoute = hash;

    // Toggle active view panel
    document.querySelectorAll('.page-view').forEach(panel => {
      panel.style.display = 'none';
    });

    const activePanel = document.getElementById(`view-${hash}`);
    if (activePanel) {
      activePanel.style.display = 'block';
    } else {
      // Fallback
      document.getElementById('view-home').style.display = 'block';
      this.state.activeRoute = 'home';
    }

    // Update active nav state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    const route = this.state.activeRoute;
    if (route === 'home') {
      document.getElementById('nav-link-home')?.classList.add('active');
    } else if (route === 'collections') {
      document.getElementById('nav-link-collections')?.classList.add('active');
    } else if (route === 'mds') {
      document.getElementById('nav-link-mds')?.classList.add('active');
    } else if (['why-wallcoverings', 'gallery', 'partners', 'contact'].includes(route)) {
      document.getElementById('nav-link-explore')?.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Initialize page-specific scripts
    this.loadPageScripts(this.state.activeRoute);
  },

  loadPageScripts(route) {
    if (this.state.heroSlider.intervalId) {
      clearInterval(this.state.heroSlider.intervalId);
    }

    switch (route) {
      case 'home':
        this.initHeroSlider();
        this.initCompareCarousel();
        this.initAccordion();
        this.initReviewsCarousel();
        this.initMythsCarousel();
        this.initTryOnVisualizer();
        break;
      case 'collections':
        this.initCatalog();
        break;
      case 'mds':
        this.initMuralCatalog();
        break;
      case 'why-wallcoverings':
        this.initCompareSlider();
        this.initAccordion();
        break;
      case 'contact':
        this.initStoreFinder();
        break;
      case 'wishlist':
        this.renderWishlist();
        break;
    }
  },

  // ==========================================
  // HEADER EFFECT
  // ==========================================
  initHeaderEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  },

  initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.classList.toggle('open');
      });
    }
  },

  // ==========================================
  // HERO IMAGE SLIDER
  // ==========================================
  initHeroSlider() {
    const sliderContainer = document.querySelector('.hero-section');
    if (!sliderContainer) return;

    // Build Slide markup dynamically
    sliderContainer.innerHTML = '';
    this.state.heroSlider.slides.forEach((slide, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `hero-slide ${idx === 0 ? 'active' : ''}`;
      slideDiv.innerHTML = `
        <div class="hero-bg" style="background-image: url('${slide.image}')"></div>
        <div class="container">
          <div class="hero-content">
            <h4 class="hero-subtitle">${slide.subtitle}</h4>
            <h1 class="hero-title">${slide.title}</h1>
            <p class="hero-description">${slide.desc}</p>
            <div class="hero-btns">
              <a href="#/collections" class="cta-btn">View Collection</a>
              <a href="#/why-wallcoverings" class="btn-secondary">Why Wallpapers?</a>
            </div>
          </div>
        </div>
      `;
      sliderContainer.appendChild(slideDiv);
    });

    // Build Dots indicator
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'slider-dots';
    this.state.heroSlider.slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goToSlide(idx));
      dotsDiv.appendChild(dot);
    });
    sliderContainer.appendChild(dotsDiv);

    // Setup autoplay
    this.state.heroSlider.currentIndex = 0;
    this.state.heroSlider.intervalId = setInterval(() => {
      let nextIdx = (this.state.heroSlider.currentIndex + 1) % this.state.heroSlider.slides.length;
      this.goToSlide(nextIdx);
    }, 6000);
  },

  goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slides.length) return;

    slides[this.state.heroSlider.currentIndex].classList.remove('active');
    dots[this.state.heroSlider.currentIndex].classList.remove('active');

    this.state.heroSlider.currentIndex = index;

    slides[index].classList.add('active');
    dots[index].classList.add('active');
  },

  // ==========================================
  // WALLPAPER VISUALIZER ENGINE (CANVAS)
  // ==========================================
  initVisualizer(canvasId, selectorGroupClass) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const state = this.state.wallpaperVisualizer;
    state.canvas = canvas;
    state.ctx = canvas.getContext('2d');

    // Setup Canvas Resolution (Retina-ready sizing)
    const setCanvasSize = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = 1000;  // Target coordinates base width
      canvas.height = 625; // Target coordinates base height
    };
    setCanvasSize();

    // Load Mockup Background
    state.backgroundImage = new Image();
    state.backgroundImage.src = 'assets/room_mockup.png';
    state.backgroundImage.onload = () => {
      this.drawVisualizer();
    };

    // Build Pattern Selector Buttons dynamically
    const selectorGroup = document.querySelector(`.${selectorGroupClass}`);
    if (selectorGroup) {
      selectorGroup.innerHTML = '';
      Object.keys(state.patterns).forEach(name => {
        const option = document.createElement('div');
        option.className = `pattern-option ${name === state.activePatternName ? 'active' : ''}`;
        option.dataset.name = name;
        option.innerHTML = `
          <img src="${state.patterns[name]}" alt="${name}" class="pattern-thumb">
          <div class="pattern-name">${name}</div>
        `;
        option.addEventListener('click', (e) => {
          document.querySelectorAll(`.${selectorGroupClass} .pattern-option`).forEach(opt => {
            opt.classList.remove('active');
          });
          option.classList.add('active');
          this.changeVisualizerPattern(name);
        });
        selectorGroup.appendChild(option);
      });
    }

    // Load Default Pattern
    this.changeVisualizerPattern(state.activePatternName);
  },

  changeVisualizerPattern(name) {
    const state = this.state.wallpaperVisualizer;
    state.activePatternName = name;
    
    state.activePatternImage = new Image();
    state.activePatternImage.src = state.patterns[name];
    state.activePatternImage.onload = () => {
      this.drawVisualizer();
    };
  },

  drawVisualizer() {
    const state = this.state.wallpaperVisualizer;
    if (!state.ctx || !state.backgroundImage) return;

    const ctx = state.ctx;
    const w = state.canvas.width;
    const h = state.canvas.height;

    // 1. Clear Canvas
    ctx.clearRect(0, 0, w, h);

    // 2. Draw base room image
    ctx.drawImage(state.backgroundImage, 0, 0, w, h);

    // 3. Draw wallpaper if loaded
    if (state.activePatternImage) {
      ctx.save();

      // Create a clip path for the wall trapezoid area
      ctx.beginPath();
      ctx.moveTo(state.wallPolygon[0].x, state.wallPolygon[0].y);
      ctx.lineTo(state.wallPolygon[1].x, state.wallPolygon[1].y);
      ctx.lineTo(state.wallPolygon[2].x, state.wallPolygon[2].y);
      ctx.lineTo(state.wallPolygon[3].x, state.wallPolygon[3].y);
      ctx.closePath();
      ctx.clip();

      // Create repeating pattern
      // To simulate perspective, we can scale down the tile drawing or just draw a repeating pattern.
      // 2D pattern repetition:
      const pattern = ctx.createPattern(state.activePatternImage, 'repeat');
      ctx.fillStyle = pattern;
      
      // We can translate/scale the canvas context slightly to align the texture
      ctx.scale(0.5, 0.5); // Adjust tile size
      ctx.fillRect(0, 0, w * 2, h * 2);
      ctx.scale(2, 2); // Reset scale
      
      // 4. Ambient depth shadows & shading (gives high-fidelity realism!)
      // Muted linear gradient on the corner (left edge of the accent wall) to simulate room corner depth
      const leftEdgeX = state.wallPolygon[0].x;
      const cornerShadow = ctx.createLinearGradient(leftEdgeX, 0, leftEdgeX + 90, 0);
      cornerShadow.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      cornerShadow.addColorStop(0.3, 'rgba(0, 0, 0, 0.2)');
      cornerShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cornerShadow;
      ctx.fillRect(leftEdgeX, 0, w - leftEdgeX, h);

      // Muted top-to-bottom ambient light ceiling shadow
      const ceilingShadow = ctx.createLinearGradient(0, 0, 0, 150);
      ceilingShadow.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
      ceilingShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ceilingShadow;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    }
  },

  // ==========================================
  // PAINT VS WALLPAPER COMPARISON SLIDER
  // ==========================================
  initCompareCarousel() {
    const canvasLeft = document.getElementById('compare-canvas-left');
    const canvasRight = document.getElementById('compare-canvas-right');
    if (!canvasLeft || !canvasRight) return;

    const ctxLeft = canvasLeft.getContext('2d');
    const ctxRight = canvasRight.getContext('2d');

    // Canvas base coordinates
    const cw = 1000;
    const ch = 625;
    canvasLeft.width = cw;
    canvasLeft.height = ch;
    canvasRight.width = cw;
    canvasRight.height = ch;

    // Room base mockup background
    const bgImage = new Image();
    bgImage.src = 'assets/room_mockup.png';

    // Slide comparison configurations (mural wall vs paint)
    const slides = [
      { name: 'Landscape', src: 'assets/mural_landscape.png' }, // Tropical landscape matching user's screenshot
      { name: 'Prakriti', src: 'assets/mural_prakriti.png' },
      { name: 'KRSNAA Mehta', src: 'assets/mural_krsnaa.png' },
      { name: 'Fun Zone', src: 'assets/mural_funzone.png' }
    ];
    let activeIdx = 0;

    const wallPoly = [
      { x: 535, y: 80 },   // Top-Left corner of visualizer accent wall
      { x: 940, y: 15 },   // Top-Right
      { x: 940, y: 575 },  // Bottom-Right
      { x: 535, y: 495 }   // Bottom-Left
    ];

    const drawComparison = () => {
      if (!bgImage.complete) return;

      // 1. Draw Right Side: Plain Bumpy Paint
      ctxRight.clearRect(0, 0, cw, ch);
      ctxRight.drawImage(bgImage, 0, 0, cw, ch);

      ctxRight.save();
      ctxRight.beginPath();
      ctxRight.moveTo(wallPoly[0].x, wallPoly[0].y);
      ctxRight.lineTo(wallPoly[1].x, wallPoly[1].y);
      ctxRight.lineTo(wallPoly[2].x, wallPoly[2].y);
      ctxRight.lineTo(wallPoly[3].x, wallPoly[3].y);
      ctxRight.closePath();
      ctxRight.clip();

      // Bumpy paint background fill color
      ctxRight.fillStyle = '#E6E1D5';
      ctxRight.fillRect(0, 0, cw, ch);

      // Simple overlay texture coordinates to simulate subtle wall bumps
      ctxRight.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 535; i < 940; i += 6) {
        for (let j = 15; j < 575; j += 6) {
          if (Math.random() > 0.5) {
            ctxRight.fillRect(i, j, 2, 2);
          }
        }
      }
      ctxRight.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let i = 536; i < 940; i += 6) {
        for (let j = 16; j < 575; j += 6) {
          if (Math.random() > 0.6) {
            ctxRight.fillRect(i, j, 1.5, 1.5);
          }
        }
      }

      // Draw ambient ceiling & depth shadows on Paint wall
      const cornerShadow = ctxRight.createLinearGradient(535, 0, 625, 0);
      cornerShadow.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      cornerShadow.addColorStop(0.3, 'rgba(0, 0, 0, 0.2)');
      cornerShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctxRight.fillStyle = cornerShadow;
      ctxRight.fillRect(535, 0, 405, ch);

      const ceilingShadow = ctxRight.createLinearGradient(0, 0, 0, 150);
      ceilingShadow.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
      ceilingShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctxRight.fillStyle = ceilingShadow;
      ctxRight.fillRect(0, 0, cw, ch);
      ctxRight.restore();

      // 2. Draw Left Side: Luxury Wallpaper Mural
      ctxLeft.clearRect(0, 0, cw, ch);
      ctxLeft.drawImage(bgImage, 0, 0, cw, ch);

      const muralImg = new Image();
      muralImg.src = slides[activeIdx].src;
      muralImg.onload = () => {
        ctxLeft.save();
        ctxLeft.beginPath();
        ctxLeft.moveTo(wallPoly[0].x, wallPoly[0].y);
        ctxLeft.lineTo(wallPoly[1].x, wallPoly[1].y);
        ctxLeft.lineTo(wallPoly[2].x, wallPoly[2].y);
        ctxLeft.lineTo(wallPoly[3].x, wallPoly[3].y);
        ctxLeft.closePath();
        ctxLeft.clip();

        // Stretches and draws the mural image directly onto the wall bounds to simulate perspective
        ctxLeft.drawImage(muralImg, 535, 15, 405, 560);

        // Draw ambient ceiling & depth shadows on Wallpaper
        ctxLeft.fillStyle = cornerShadow;
        ctxLeft.fillRect(535, 0, 405, ch);
        ctxLeft.fillStyle = ceilingShadow;
        ctxLeft.fillRect(0, 0, cw, ch);
        ctxLeft.restore();
      };
    };

    bgImage.onload = drawComparison;
    if (bgImage.complete) drawComparison();

    // Bind prev/next slide control triggers
    const prevBtn = document.getElementById('compare-prev-btn');
    const nextBtn = document.getElementById('compare-next-btn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        activeIdx = (activeIdx - 1 + slides.length) % slides.length;
        drawComparison();
      });
      nextBtn.addEventListener('click', () => {
        activeIdx = (activeIdx + 1) % slides.length;
        drawComparison();
      });
    }
  },

  // ==========================================
  // BUSTING MYTHS VIDEO CAROUSEL
  // ==========================================
  initMythsCarousel() {
    const track = document.getElementById('myths-track');
    const prevBtn = document.getElementById('myths-prev-btn');
    const nextBtn = document.getElementById('myths-next-btn');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.myth-video-card');
    const totalCards = cards.length;
    const visibleCount = 3; // 3 cards visible at once
    let currentIdx = 0;

    const getCardWidth = () => {
      if (!cards[0]) return 0;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 24;
      return cards[0].offsetWidth + gap;
    };

    const updateTrack = () => {
      const shift = currentIdx * getCardWidth();
      track.style.transform = `translateX(-${shift}px)`;

      // Disable/enable buttons at boundaries
      prevBtn.style.opacity = currentIdx === 0 ? '0.4' : '1';
      prevBtn.style.pointerEvents = currentIdx === 0 ? 'none' : 'auto';
      nextBtn.style.opacity = currentIdx >= totalCards - visibleCount ? '0.4' : '1';
      nextBtn.style.pointerEvents = currentIdx >= totalCards - visibleCount ? 'none' : 'auto';
    };

    prevBtn.addEventListener('click', () => {
      if (currentIdx > 0) { currentIdx--; updateTrack(); }
    });
    nextBtn.addEventListener('click', () => {
      if (currentIdx < totalCards - visibleCount) { currentIdx++; updateTrack(); }
    });

    updateTrack(); // Initialize state
  },

  // ==========================================
  // TRY-ON WALLPAPER VISUALIZER (HOME)
  // ==========================================
  initTryOnVisualizer() {
    const canvas = document.getElementById('tryon-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1000, H = 625;
    canvas.width = W; canvas.height = H;

    // Room scenes (background images + wall polygon per scene)
    const rooms = [
      {
        src: 'assets/room_mockup.png',
        wall: [ {x:535,y:15}, {x:940,y:15}, {x:940,y:575}, {x:535,y:495} ]
      },
      {
        src: 'assets/room_mockup.png',
        wall: [ {x:535,y:15}, {x:940,y:15}, {x:940,y:575}, {x:535,y:495} ],
        hue: 'hue-rotate(45deg) brightness(95%)'
      },
      {
        src: 'assets/room_mockup.png',
        wall: [ {x:535,y:15}, {x:940,y:15}, {x:940,y:575}, {x:535,y:495} ],
        hue: 'hue-rotate(180deg) brightness(90%)'
      }
    ];

    // All available wallpaper swatches
    const swatches = [
      { name: 'Sanskriti', src: 'assets/sanskriti_ethnic.png' },
      { name: 'Florina',   src: 'assets/florina_botanical.png' },
      { name: 'Bohemia',   src: 'assets/bohemia_geometric.png' },
      { name: 'Prakriti',  src: 'assets/florina_botanical.png' },
      { name: 'Muasir',    src: 'assets/bohemia_geometric.png' },
      { name: 'Chelsea',   src: 'assets/sanskriti_ethnic.png' },
      { name: 'Nirvana',   src: 'assets/sanskriti_ethnic.png' },
      { name: 'Ombre',     src: 'assets/florina_botanical.png' },
      { name: 'Organic',   src: 'assets/bohemia_geometric.png' },
      { name: 'Funzone',   src: 'assets/bohemia_geometric.png' },
      { name: 'Mural 1',   src: 'assets/mural_paradise.png' },
      { name: 'Mural 2',   src: 'assets/mural_landscape.png' }
    ];
    const PER_PAGE = 9;

    let roomIdx = 0;
    let swatchPage = 0;
    let activeSwatchSrc = swatches[0].src;
    let bgImg = null;
    let patternImg = null;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (!bgImg) return;
      ctx.drawImage(bgImg, 0, 0, W, H);
      if (!patternImg) return;
      const wall = rooms[roomIdx].wall;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(wall[0].x, wall[0].y);
      wall.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.clip();
      const pat = ctx.createPattern(patternImg, 'repeat');
      ctx.fillStyle = pat;
      ctx.scale(0.5, 0.5);
      ctx.fillRect(0, 0, W * 2, H * 2);
      ctx.scale(2, 2);
      // Corner depth shadow
      const g = ctx.createLinearGradient(wall[0].x, 0, wall[0].x + 80, 0);
      g.addColorStop(0, 'rgba(0,0,0,0.35)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(wall[0].x, 0, W, H);
      ctx.restore();
    };

    const loadRoom = (idx) => {
      bgImg = new Image();
      bgImg.onload = draw;
      bgImg.src = rooms[idx].src;
    };

    const loadPattern = (src) => {
      patternImg = new Image();
      patternImg.onload = draw;
      patternImg.src = src;
    };

    const buildSwatchGrid = () => {
      const grid = document.getElementById('tryon-swatch-grid');
      if (!grid) return;
      grid.innerHTML = '';
      const start = swatchPage * PER_PAGE;
      const visible = swatches.slice(start, start + PER_PAGE);
      visible.forEach((sw, i) => {
        const btn = document.createElement('button');
        btn.className = 'tryon-swatch-circle' + (sw.src === activeSwatchSrc && swatchPage * PER_PAGE + i === swatches.findIndex(s => s.src === activeSwatchSrc && s.name === sw.name) ? ' active' : '');
        btn.title = sw.name;
        btn.style.backgroundImage = `url('${sw.src}')`;
        btn.addEventListener('click', () => {
          activeSwatchSrc = sw.src;
          grid.querySelectorAll('.tryon-swatch-circle').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          loadPattern(sw.src);
        });
        grid.appendChild(btn);
      });
      // Update page nav opacity
      const prevBtn = document.getElementById('tryon-swatch-prev');
      const nextBtn = document.getElementById('tryon-swatch-next');
      if (prevBtn) prevBtn.style.opacity = swatchPage === 0 ? '0.35' : '1';
      if (nextBtn) nextBtn.style.opacity = (swatchPage + 1) * PER_PAGE >= swatches.length ? '0.35' : '1';
    };

    // Wire room nav
    const prevRoom = document.getElementById('tryon-room-prev');
    const nextRoom = document.getElementById('tryon-room-next');
    if (prevRoom) prevRoom.addEventListener('click', () => {
      roomIdx = (roomIdx - 1 + rooms.length) % rooms.length;
      loadRoom(roomIdx);
    });
    if (nextRoom) nextRoom.addEventListener('click', () => {
      roomIdx = (roomIdx + 1) % rooms.length;
      loadRoom(roomIdx);
    });

    // Wire swatch page nav
    const prevSwatch = document.getElementById('tryon-swatch-prev');
    const nextSwatch = document.getElementById('tryon-swatch-next');
    if (prevSwatch) prevSwatch.addEventListener('click', () => {
      if (swatchPage > 0) { swatchPage--; buildSwatchGrid(); }
    });
    if (nextSwatch) nextSwatch.addEventListener('click', () => {
      if ((swatchPage + 1) * PER_PAGE < swatches.length) { swatchPage++; buildSwatchGrid(); }
    });

    // Initialize
    loadRoom(roomIdx);
    loadPattern(activeSwatchSrc);
    buildSwatchGrid();
  },

  // ==========================================
  // INTERACTIVE ACCORDION (WHY WALLCOVERINGS)
  // ==========================================
  initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentNode;
        const isActive = item.classList.contains('active');
        
        // Collapse all other items
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-content').style.maxHeight = '0';
        });

        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.accordion-content');
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
    });
  },

  // ==========================================
  // BROWSE COLLECTIONS CATALOG
  // ==========================================
  initCatalog() {
    this.renderProductCards(this.state.products);
    this.initCatalogFilters();

    // Grid Layout Toggle click handlers
    const toggleBtns = document.querySelectorAll('#view-collections .grid-toggle-btn');
    const gridContainer = document.querySelector('#view-collections .product-grid');
    if (toggleBtns && gridContainer) {
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all
          toggleBtns.forEach(b => {
            b.classList.remove('active');
            b.style.backgroundColor = '#F0EDE8';
            b.style.color = '#555555';
          });
          
          // Add active class to clicked
          btn.classList.add('active');
          btn.style.backgroundColor = '#D36C2F';
          btn.style.color = '#FFFFFF';

          // Shift grid layouts
          const layoutMode = btn.dataset.grid;
          gridContainer.classList.remove('grid-4', 'grid-3', 'grid-2', 'list-view');
          if (layoutMode === '4') {
            gridContainer.classList.add('grid-4');
          } else if (layoutMode === '3') {
            gridContainer.classList.add('grid-3');
          } else if (layoutMode === '2') {
            gridContainer.classList.add('grid-2');
          } else if (layoutMode === 'list') {
            gridContainer.classList.add('list-view');
          }
        });
      });
    }
  },

  initMuralCatalog() {
    this.renderMuralCards(this.state.murals);
    this.initMuralCatalogFilters();

    // Mural Grid Layout Toggle click handlers
    const toggleBtns = document.querySelectorAll('#view-mds .grid-toggle-btn');
    const gridContainer = document.querySelector('#view-mds #mural-grid');
    if (toggleBtns && gridContainer) {
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all
          toggleBtns.forEach(b => {
            b.classList.remove('active');
            b.style.backgroundColor = '#F0EDE8';
            b.style.color = '#555555';
          });
          
          // Add active class to clicked
          btn.classList.add('active');
          btn.style.backgroundColor = '#D36C2F';
          btn.style.color = '#FFFFFF';

          // Shift grid layouts
          const layoutMode = btn.dataset.grid;
          gridContainer.classList.remove('grid-4', 'grid-3', 'grid-2', 'list-view');
          if (layoutMode === '4') {
            gridContainer.classList.add('grid-4');
          } else if (layoutMode === '3') {
            gridContainer.classList.add('grid-3');
          } else if (layoutMode === '2') {
            gridContainer.classList.add('grid-2');
          } else if (layoutMode === 'list') {
            gridContainer.classList.add('list-view');
          }
        });
      });
    }
  },

  toggleFilterGroup(groupId) {
    const list = document.getElementById(`filter-group-${groupId}`);
    const header = list?.previousElementSibling;
    const icon = header?.querySelector('i');
    if (list) {
      if (list.style.display === 'none') {
        list.style.display = 'flex';
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      } else {
        list.style.display = 'none';
        if (icon) {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        }
      }
    }
  },

  renderProductCards(items) {
    const grid = document.querySelector('#view-collections .product-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:5rem 0; font-size:1.8rem; color:var(--color-text-secondary);">No wallpapers match your selected filters.</div>';
      return;
    }

    grid.innerHTML = '';
    items.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img-wrapper" onclick="App.openVisualizerWithWallpaper('${product.image}', '${product.collection}')" style="cursor: pointer;">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <div class="product-actions-overlay" onclick="event.stopPropagation();">
            <button class="action-icon-btn wishlist-btn" onclick="App.toggleWishlist('${product.id}')" aria-label="Add to Wishlist">
              <i class="${App.isInWishlist(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <button class="action-icon-btn cart-btn" onclick="App.addToCart('${product.id}')" aria-label="Add to Cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">${product.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  renderMuralCards(items) {
    const grid = document.querySelector('#view-mds #mural-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:5rem 0; font-size:1.8rem; color:var(--color-text-secondary);">No murals match your selected filters.</div>';
      return;
    }

    grid.innerHTML = '';
    items.forEach(mural => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img-wrapper" onclick="App.openVisualizerWithWallpaper('${mural.image}', '${mural.collection}')" style="cursor: pointer;">
          <img src="${mural.image}" alt="${mural.name}" class="product-img">
          <div class="product-actions-overlay" onclick="event.stopPropagation();">
            <button class="action-icon-btn wishlist-btn" onclick="App.toggleWishlist('${mural.id}')" aria-label="Add to Wishlist">
              <i class="${App.isInWishlist(mural.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <button class="action-icon-btn cart-btn" onclick="App.addToCart('${mural.id}')" aria-label="Add to Cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${mural.name}</h3>
          <div class="product-price">${mural.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  openVisualizerWithWallpaper(patternSrc, name) {
    // Switch state active pattern and load visualizer page
    this.state.wallpaperVisualizer.activePatternName = name;
    this.state.wallpaperVisualizer.patterns[name] = patternSrc;
    window.location.hash = '#/visualizer';
  },

  initCatalogFilters() {
    const searchInput = document.querySelector('#view-collections .search-input');
    const sortSelect = document.querySelector('#view-collections .sort-wrapper select');
    const filterCheckboxes = document.querySelectorAll('#view-collections .catalog-sidebar input[type="checkbox"]');

    const filterProducts = () => {
      let filtered = [...this.state.products];

      // 1. Search Query filter
      if (searchInput && searchInput.value) {
        const query = searchInput.value.toLowerCase().trim();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.collection.toLowerCase().includes(query) ||
          p.pattern.toLowerCase().includes(query)
        );
      }

      // 2. Sidebar Filters (Collection, Pattern, Color)
      const activeFilters = {
        collection: [],
        pattern: [],
        color: []
      };

      filterCheckboxes.forEach(cb => {
        if (cb.checked) {
          activeFilters[cb.name].push(cb.value);
        }
      });

      // Filter by Collection
      if (activeFilters.collection.length > 0) {
        filtered = filtered.filter(p => activeFilters.collection.includes(p.collection));
      }
      // Filter by Pattern
      if (activeFilters.pattern.length > 0) {
        filtered = filtered.filter(p => activeFilters.pattern.includes(p.pattern));
      }
      // Filter by Color Grouping
      if (activeFilters.color.length > 0) {
        filtered = filtered.filter(p => {
          return activeFilters.color.some(col => p.color.includes(col));
        });
      }

      // 3. Sorting logic
      if (sortSelect) {
        const sortBy = sortSelect.value;
        if (sortBy === 'price-low') {
          filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
        } else if (sortBy === 'price-high') {
          filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
        } else {
          // Default sorting (alphabetical)
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

      this.renderProductCards(filtered);
    };

    // Attach Listeners
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (sortSelect) sortSelect.addEventListener('change', filterProducts);
    filterCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
  },

  initMuralCatalogFilters() {
    const sortSelect = document.querySelector('#view-mds #mural-sort-dropdown');
    const filterCheckboxes = document.querySelectorAll('#view-mds .catalog-sidebar input[type="checkbox"]');

    const filterMurals = () => {
      let filtered = [...this.state.murals];

      // 1. Sidebar Filters (Collection, Pattern, Color)
      const activeFilters = {
        'mural-collection': [],
        'mural-pattern': [],
        'mural-color': []
      };

      filterCheckboxes.forEach(cb => {
        if (cb.checked) {
          if (activeFilters[cb.name]) {
            activeFilters[cb.name].push(cb.value);
          }
        }
      });

      // Filter by Collection
      if (activeFilters['mural-collection'].length > 0) {
        filtered = filtered.filter(p => activeFilters['mural-collection'].includes(p.collection));
      }
      // Filter by Pattern
      if (activeFilters['mural-pattern'].length > 0) {
        filtered = filtered.filter(p => activeFilters['mural-pattern'].includes(p.pattern));
      }
      // Filter by Color Grouping
      if (activeFilters['mural-color'].length > 0) {
        filtered = filtered.filter(p => {
          return activeFilters['mural-color'].some(col => p.color.includes(col));
        });
      }

      // 2. Sorting logic
      if (sortSelect) {
        const sortBy = sortSelect.value;
        if (sortBy === 'price-low') {
          filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
        } else if (sortBy === 'price-high') {
          filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
        } else {
          // Default sorting (alphabetical)
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

      // Update Count
      const countLabel = document.getElementById('mural-product-count');
      if (countLabel) {
        countLabel.textContent = `${filtered.length} products`;
      }

      this.renderMuralCards(filtered);
    };

    // Attach Listeners
    if (sortSelect) sortSelect.addEventListener('change', filterMurals);
    filterCheckboxes.forEach(cb => cb.addEventListener('change', filterMurals));
  },

  initSearchOverlay() {
    const searchBtn = document.getElementById('nav-search-btn');
    const overlay = document.getElementById('search-overlay');
    const closeBtn = document.getElementById('close-search-btn');
    const input = document.getElementById('global-search-input');

    if (searchBtn && overlay && closeBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.display = 'flex';
        input?.focus();
      });

      closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        if (input) input.value = '';
      });

      // Search on enter keypress
      input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.triggerGlobalSearch();
        }
      });
    }
  },

  triggerGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const query = input ? input.value.trim() : '';
    if (query) {
      // Set global query state
      this.state.globalSearchQuery = query;
      // Close overlay
      const overlay = document.getElementById('search-overlay');
      if (overlay) overlay.style.display = 'none';
      // Redirect to collections catalog
      window.location.hash = '#/collections';
      
      // Auto fill and trigger catalog filter if it exists
      const catalogSearchInput = document.querySelector('#view-collections .search-input');
      if (catalogSearchInput) {
        catalogSearchInput.value = query;
        // Trigger input event
        catalogSearchInput.dispatchEvent(new Event('input'));
      }
    }
  },

  initCurrencySwitcher() {
    const switcher = document.getElementById('nav-currency-selector');
    const menu = document.getElementById('currency-dropdown-menu');
    const arrow = document.getElementById('current-currency-arrow');
    
    const switcherMobile = document.getElementById('nav-currency-selector-mobile');
    const menuMobile = document.getElementById('currency-dropdown-menu-mobile');

    if (switcher && menu) {
      switcher.addEventListener('click', (e) => {
        e.stopPropagation();
        // Hide mobile menu if open
        if (menuMobile) menuMobile.style.display = 'none';
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        if (arrow) {
          if (isOpen) {
            arrow.classList.remove('fa-chevron-up');
            arrow.classList.add('fa-chevron-down');
          } else {
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-up');
          }
        }
      });
    }

    if (switcherMobile && menuMobile) {
      switcherMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        // Hide desktop menu if open
        if (menu) menu.style.display = 'none';
        const isOpen = menuMobile.style.display === 'block';
        menuMobile.style.display = isOpen ? 'none' : 'block';
      });
    }

    document.addEventListener('click', () => {
      if (menu) menu.style.display = 'none';
      if (menuMobile) menuMobile.style.display = 'none';
      if (arrow) {
        arrow.classList.remove('fa-chevron-up');
        arrow.classList.add('fa-chevron-down');
      }
    });
  },

  selectCurrency(label, flagUrl) {
    const textSpan = document.getElementById('current-currency-text');
    const flagImg = document.getElementById('current-currency-flag');
    
    const textSpanMobile = document.getElementById('current-currency-text-mobile');
    const flagImgMobile = document.getElementById('current-currency-flag-mobile');

    let currencyCode = 'INR';
    if (label !== 'Auto Location') {
      const matches = label.match(/\(([^)]+)\)/);
      currencyCode = matches ? matches[1] : label;
    }

    if (textSpan) textSpan.textContent = currencyCode;
    if (flagImg) flagImg.src = flagUrl;
    
    if (textSpanMobile) textSpanMobile.textContent = currencyCode;
    if (flagImgMobile) flagImgMobile.src = flagUrl;

    // Close both dropdowns
    const menu = document.getElementById('currency-dropdown-menu');
    if (menu) menu.style.display = 'none';
    
    const menuMobile = document.getElementById('currency-dropdown-menu-mobile');
    if (menuMobile) menuMobile.style.display = 'none';
  },

  // ==========================================
  // MDS CUSTOM MURAL CALCULATOR
  // ==========================================
  initMdsCalculator() {
    const calcWidth = document.getElementById('calc-width');
    const calcHeight = document.getElementById('calc-height');
    const calcUnit = document.getElementById('calc-unit');
    const calcMaterial = document.getElementById('calc-material');
    const calculateBtn = document.getElementById('calculate-btn');

    if (!calculateBtn) return;

    const handleCalculation = () => {
      const width = parseFloat(calcWidth.value) || 0;
      const height = parseFloat(calcHeight.value) || 0;
      const unit = calcUnit.value;
      const rate = parseFloat(calcMaterial.value);

      if (width <= 0 || height <= 0) {
        alert('Please enter valid width and height dimensions.');
        return;
      }

      // Convert dimensions to sq ft if entered in meters
      let areaSqFt = width * height;
      if (unit === 'm') {
        areaSqFt = width * height * 10.764; // 1 sq meter = 10.764 sq ft
      }

      // Wallpaper Roll coverage: Standard roll covers approx 50 usable sq ft after matches/wastage
      const rollArea = 50; 
      const safetyMultiplier = 1.15; // 15% waste buffer for pattern matching
      
      const rollsNeeded = Math.ceil((areaSqFt / rollArea) * safetyMultiplier);
      const estPrice = rollsNeeded * rate;

      // Display results
      document.getElementById('result-area').textContent = `${Math.round(areaSqFt)} sq ft`;
      document.getElementById('result-rolls').textContent = `${rollsNeeded} Rolls`;
      document.getElementById('result-price').textContent = `₹${estPrice.toLocaleString('en-IN')}`;
    };

    calculateBtn.addEventListener('click', handleCalculation);
    
    // Auto-calculate on input keys
    [calcWidth, calcHeight].forEach(el => {
      el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCalculation();
      });
    });
  },

  // ==========================================
  // STORE LOCATOR FINDER
  // ==========================================
  initStoreFinder() {
    const searchInput = document.getElementById('store-search');
    const listContainer = document.querySelector('.stores-list');
    if (!listContainer) return;

    const renderStores = (filteredStores) => {
      listContainer.innerHTML = '';
      if (filteredStores.length === 0) {
        listContainer.innerHTML = '<div style="padding:2rem 0; color:var(--color-text-secondary);">No experience centers found in this city.</div>';
        return;
      }

      filteredStores.forEach(store => {
        const card = document.createElement('div');
        card.className = 'store-card';
        card.innerHTML = `
          <h4>${store.name} (${store.city})</h4>
          <p style="font-size:1.4rem; color:var(--color-text-secondary); margin-bottom:1rem;">${store.address}</p>
          <p style="font-size:1.3rem; margin-bottom:0.5rem;"><strong>Phone:</strong> ${store.phone}</p>
          <p style="font-size:1.3rem;"><strong>Email:</strong> <a href="mailto:${store.email}" style="color:var(--color-accent-gold-dark);">${store.email}</a></p>
        `;
        listContainer.appendChild(card);
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const filtered = this.state.stores.filter(store => 
          store.city.toLowerCase().includes(query) || 
          store.name.toLowerCase().includes(query)
        );
        renderStores(filtered);
      });
    }

    // Load all stores initially
    renderStores(this.state.stores);
  },

  // ==========================================
  // GLOBAL ENQUIRY MODAL EVENTS
  // ==========================================
  initModalEvents() {
    const modal = document.getElementById('enquiry-modal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('modal-enquiry-form');

    if (!modal) return;

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Fetch values
        const name = document.getElementById('enq-name').value;
        const phone = document.getElementById('enq-phone').value;
        const type = document.getElementById('enq-type').value;

        if (!name || !phone) {
          alert('Please fill out your Name and Phone Number.');
          return;
        }

        // Simulating form submission
        alert(`Thank you, ${name}! Your enquiry for "${type}" has been received. Our decor consultant will contact you shortly.`);
        form.reset();
        modal.classList.remove('active');
      });
    }
  },

  openEnquiryModal(productName = '') {
    const modal = document.getElementById('enquiry-modal');
    if (!modal) return;

    const selectType = document.getElementById('enq-type');
    if (selectType && productName) {
      // Set default query to specific wallpaper
      selectType.value = `Sample Request: ${productName}`;
    } else if (selectType) {
      selectType.value = 'General Consultation';
    }

    modal.classList.add('active');
  },

  filterCatalogByCollection(collectionName) {
    // Navigate to collections page
    window.location.hash = '#/collections';
    
    // Wait a tiny bit for the page rendering and checkboxes to load
    setTimeout(() => {
      // Uncheck all checkboxes first
      document.querySelectorAll('.catalog-sidebar input[name="collection"]').forEach(cb => {
        cb.checked = false;
      });
      
      // Check the matching checkbox
      const targetCheckbox = document.querySelector(`.catalog-sidebar input[name="collection"][value="${collectionName}"]`);
      if (targetCheckbox) {
        targetCheckbox.checked = true;
      }
      
      // Trigger search input event to refilter list
      const searchInput = document.getElementById('product-search-bar');
      if (searchInput) {
        searchInput.value = ''; // Reset search text
        searchInput.dispatchEvent(new Event('input'));
      }
    }, 120);
  },

  filterCatalogByPattern(patternName) {
    // Navigate to collections page
    window.location.hash = '#/collections';
    
    // Wait a tiny bit for the page rendering and checkboxes to load
    setTimeout(() => {
      // Uncheck all pattern checkboxes first
      document.querySelectorAll('.catalog-sidebar input[name="pattern"]').forEach(cb => {
        cb.checked = false;
      });
      
      // Check the matching checkbox
      const targetCheckbox = document.querySelector(`.catalog-sidebar input[name="pattern"][value="${patternName}"]`);
      if (targetCheckbox) {
        targetCheckbox.checked = true;
      }
      
      // Trigger search input event to refilter list
      const searchInput = document.getElementById('product-search-bar');
      if (searchInput) {
        searchInput.value = ''; // Reset search text
        searchInput.dispatchEvent(new Event('input'));
      }
    }, 120);
  },

  initReviewsCarousel() {
    const prevBtn = document.getElementById('reviews-prev-btn');
    const nextBtn = document.getElementById('reviews-next-btn');
    const container = document.getElementById('reviews-carousel-container');
    if (!container || !prevBtn || !nextBtn) return;
    
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -350, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 350, behavior: 'smooth' });
    });
  },

  switchWhyTab(btn, tabKey) {
    document.querySelectorAll('.tab-control-btn').forEach(button => {
      button.classList.remove('active-tab');
    });
    btn.classList.add('active-tab');
    
    const titleEl = document.getElementById('why-display-title');
    const bodyEl = document.getElementById('why-display-body');
    if (!titleEl || !bodyEl) return;
    
    const tabContents = {
      hours: {
        title: "6 Hours Application",
        content: `<p>Installing wallpapers is quick, clean, and hassle-free. A typical room can be completely wallpapered in just 6 hours, without any mess, dust, or unpleasant chemical smells associated with traditional painting projects.</p>
                 <p>Our trained professional installers make sure that sheets are aligned seamlessly, leaving you with beautiful walls ready to live in the same day.</p>`
      },
      life: {
        title: "Long Life",
        content: `<p>Vastu Home Decor wallcoverings are designed to last. With high durability, resistance to fading, and sturdy backing, they easily last for 15+ years under standard room conditions, outliving paint cycles by 3 to 4 times.</p>
                 <p>They do not peel, crack, or yellow, ensuring your walls retain their pristine elegance and colors over a long life span.</p>`
      },
      washable: {
        title: "Washable",
        content: `<p>Unlike standard paint that stains easily, our wallcoverings are fully washable. You can easily wipe away stains, scribbles, grease, and dust with a damp cloth or sponge and mild soapy water, keeping your walls fresh.</p>
                 <p>This scrubbable protection makes it highly reliable for dining rooms, kitchens, kids play spaces, and high-traffic corridors.</p>`
      },
      energy: {
        title: "Energy Saver",
        content: `<p>Wallcoverings add an extra thermal barrier layer to your walls. This helps retain cooling from air conditioners in summer and warmth in winter, resulting in lower power bills and higher energy efficiency.</p>
                 <p>By insulating concrete walls from external temperature fluctuations, they reduce active heat transfer significantly.</p>`
      },
      fire: {
        title: "Fire Retardant",
        content: `<p>Safety first. Our wallcoverings are treated with fire-retardant elements. They do not ignite easily and resist flame spread, giving your family crucial extra time during safety emergencies.</p>
                 <p>They comply with global smoke density and flame spread rating criteria, making them safe for corporate offices, hotels, and homes.</p>`
      },
      hygienic: {
        title: "Hygienic",
        content: `<p>The seamless surface of wallcoverings repels dust, allergens, and moisture. This prevents the growth of fungi, mildew, and bacteria, ensuring a clean and hygienic environment for infants and children.</p>
                 <p>Unlike paint which flakes off and can lead to inhalation hazards, wallcoverings remain securely bonded and clean.</p>`
      },
      safety: {
        title: "Safety",
        content: `<p>Lead is contained in paints, when paints wear off lead-flake leakage can be hazardous to health. Vastu Home Decor Wallcoverings have '0' lead and hence are truly safe.</p>
                 <p>Dust too, is repelled from Vastu Home Decor Wallcoverings; assuring clearer breathing for all. For every space in which hygiene is vital, Vastu Home Decor Wallcoverings is the natural choice.</p>
                 <p>Paints contain lead, which is harmful and hazardous to health. Wallcoverings contain no lead, and are made with water based inks. Thus, very safe.</p>`
      },
      eco: {
        title: "Eco Friendly",
        content: `<p>Made from natural fibers and sustainable wood pulp, our wallcoverings are printed with organic, water-based non-toxic inks. They contain zero VOCs (volatile organic compounds), protecting both indoor air quality and the earth.</p>
                 <p>We prioritize sustainable product sourcing and energy-efficient green manufacturing methods across all collections.</p>`
      }
    };
    
    const selected = tabContents[tabKey] || tabContents['safety'];
    
    // Quick fade transition
    bodyEl.style.opacity = '0';
    titleEl.style.opacity = '0';
    
    setTimeout(() => {
      titleEl.textContent = selected.title;
      bodyEl.innerHTML = selected.content;
      bodyEl.style.opacity = '1';
      titleEl.style.opacity = '1';
    }, 150);
  },

  toggleCartDrawer(show) {
    const overlay = document.getElementById('cart-drawer-overlay');
    const panel = document.getElementById('cart-drawer-panel');
    if (overlay && panel) {
      if (show) {
        overlay.style.display = 'flex';
        // Force reflow for transitions
        overlay.offsetHeight;
        overlay.style.opacity = '1';
        panel.style.transform = 'translateX(0)';
      } else {
        panel.style.transform = 'translateX(100%)';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
      }
    }
  },

  isInWishlist(id) {
    return this.state.wishlist.includes(id);
  },

  toggleWishlist(id) {
    const index = this.state.wishlist.indexOf(id);
    if (index > -1) {
      this.state.wishlist.splice(index, 1);
    } else {
      this.state.wishlist.push(id);
    }
    localStorage.setItem('vhd_wishlist', JSON.stringify(this.state.wishlist));
    this.updateWishlistUI();
    
    // Re-render currently active view if collections/mds/wishlist to keep active hearts synced
    if (this.state.activeRoute === 'collections') {
      this.renderProductCards(this.state.products);
    } else if (this.state.activeRoute === 'mds') {
      this.renderMuralCards(this.state.murals);
    }
  },

  updateWishlistUI() {
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
      badge.textContent = this.state.wishlist.length;
      badge.style.display = this.state.wishlist.length > 0 ? 'flex' : 'none';
    }
    if (this.state.activeRoute === 'wishlist') {
      this.renderWishlist();
    }
  },

  renderWishlist() {
    const container = document.querySelector('#view-wishlist');
    if (!container) return;

    // We replace the whole contents with page title and sections
    const itemsHtml = '';
    const allItems = [...this.state.products, ...this.state.murals];
    const wishlistItems = allItems.filter(item => this.state.wishlist.includes(item.id));

    if (wishlistItems.length === 0) {
      container.innerHTML = `
        <div class="collections-banner" style="background-color: #F7F6F0; padding: 4.5rem 0; text-align: center; border-bottom: 1px solid rgba(230, 229, 224, 0.5);">
          <h1 style="font-family: var(--font-body); font-size: 3.2rem; font-weight: 700; color: #1a1a1a; margin: 0; letter-spacing: 0.02em;">Wishlist</h1>
        </div>
        <section class="section-padding" style="padding: 10rem 0; min-height: 50vh; display: flex; align-items: center; justify-content: center; background-color: #FFFFFF;">
          <div style="text-align: center; font-family: var(--font-body);">
            <h2 style="font-size: 1.8rem; font-weight: 700; color: #1a1a1a; margin-bottom: 2rem; letter-spacing: 0.01em;">No products were added to your wishlist.</h2>
            <a href="#/collections" style="font-size: 1.35rem; color: #1a1a1a; text-decoration: none; font-weight: 600; border-bottom: 1px solid #1a1a1a; padding-bottom: 2px;">Continue shopping</a>
          </div>
        </section>
      `;
      return;
    }

    container.innerHTML = `
      <div class="collections-banner" style="background-color: #F7F6F0; padding: 4.5rem 0; text-align: center; border-bottom: 1px solid rgba(230, 229, 224, 0.5);">
        <h1 style="font-family: var(--font-body); font-size: 3.2rem; font-weight: 700; color: #1a1a1a; margin: 0; letter-spacing: 0.02em;">Wishlist (${wishlistItems.length})</h1>
      </div>
      <section class="section-padding" style="padding: 6rem 0; background-color: #FFFFFF; min-height: 50vh;">
        <div class="container">
          <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 3rem;">
          </div>
        </div>
      </section>
    `;

    const grid = container.querySelector('.product-grid');
    wishlistItems.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <div class="product-actions-overlay">
            <button class="overlay-btn view-btn" onclick="App.openVisualizerWithWallpaper('${product.image}', '${product.collection}')">Visualizer</button>
            <button class="overlay-btn" onclick="App.openEnquiryModal('${product.name}')">Enquiry</button>
          </div>
          <div class="product-hover-actions">
            <button class="hover-action-btn wishlist-btn" onclick="event.stopPropagation(); App.toggleWishlist('${product.id}')" aria-label="Remove from Wishlist">
              <i class="fa-solid fa-heart"></i>
            </button>
            <button class="hover-action-btn cart-btn" onclick="event.stopPropagation(); App.addToCart('${product.id}')" aria-label="Add to Cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">${product.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  addToCart(productId) {
    const allItems = [...this.state.products, ...this.state.murals];
    const item = allItems.find(p => p.id === productId);
    if (!item) return;

    const cartItem = this.state.cart.find(c => c.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.state.cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('vhd_cart', JSON.stringify(this.state.cart));
    this.updateCartUI();
    this.toggleCartDrawer(true);
  },

  removeFromCart(productId) {
    const index = this.state.cart.findIndex(c => c.id === productId);
    if (index > -1) {
      this.state.cart.splice(index, 1);
    }
    localStorage.setItem('vhd_cart', JSON.stringify(this.state.cart));
    this.updateCartUI();
  },

  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const cartItem = this.state.cart.find(c => c.id === productId);
    if (cartItem) {
      cartItem.quantity = qty;
    }
    localStorage.setItem('vhd_cart', JSON.stringify(this.state.cart));
    this.updateCartUI();
  },

  updateCartUI() {
    // Update cart badge in header
    const cartBtn = document.getElementById('nav-cart-btn');
    if (cartBtn) {
      let badge = cartBtn.querySelector('.cart-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.style.cssText = 'position: absolute; top: -6px; right: -6px; background-color: #D36C2F; color: #FFFFFF; font-size: 1rem; width: 1.6rem; height: 1.6rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; line-height: 1;';
        cartBtn.appendChild(badge);
      }
      const totalQty = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    // Update cart drawer panel body
    const drawerContent = document.getElementById('cart-drawer-content');
    if (!drawerContent) return;

    if (this.state.cart.length === 0) {
      drawerContent.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 3.5rem;">
          <div>
            <h2 style="font-size: 2.8rem; font-weight: 700; color: #1a1a1a; margin-bottom: 2rem; letter-spacing: 0.01em;">Your cart is empty</h2>
            <button onclick="App.toggleCartDrawer(false); window.location.hash='#/collections';" style="background-color: #D36C2F; color: #FFFFFF; border: none; padding: 1.4rem 4rem; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 1.35rem; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='#bd1a2b'" onmouseout="this.style.backgroundColor='#D36C2F'">Continue Shopping</button>
          </div>
          
          <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 3.5rem; width: 100%;">
            <h3 style="font-size: 1.8rem; font-weight: 700; color: #1a1a1a; margin-bottom: 1rem; letter-spacing: 0.01em;">Have an account?</h3>
            <p style="font-size: 1.35rem; color: #444;">
              <a href="#/login" onclick="App.toggleCartDrawer(false);" style="color: #1a1a1a; text-decoration: underline; font-weight: 600;">Log in</a> to check out faster.
            </p>
          </div>
        </div>
      `;
      return;
    }

    let itemsHtml = '';
    let subtotal = 0;

    this.state.cart.forEach(item => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
      subtotal += priceNum * item.quantity;

      itemsHtml += `
        <div style="display: flex; gap: 1.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2rem; align-items: center; text-align: left;">
          <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(0,0,0,0.05);">
          <div style="flex: 1;">
            <h4 style="font-size: 1.35rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.5rem; line-height: 1.3;">${item.name}</h4>
            <div style="font-size: 1.3rem; color: #D36C2F; font-weight: 700; margin-bottom: 0.8rem;">${item.price}</div>
            <div style="display: flex; align-items: center; gap: 1.2rem;">
              <div style="display: flex; align-items: center; border: 1px solid #ccc; border-radius: 4px; overflow: hidden; height: 2.8rem; background-color: #FFFFFF;">
                <button onclick="App.updateCartQty('${item.id}', ${item.quantity - 1})" style="border: none; background: transparent; width: 2.5rem; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: bold; color: #555;">-</button>
                <span style="font-size: 1.2rem; font-weight: 700; padding: 0 0.8rem; min-width: 2rem; text-align: center; color: #1a1a1a;">${item.quantity}</span>
                <button onclick="App.updateCartQty('${item.id}', ${item.quantity + 1})" style="border: none; background: transparent; width: 2.5rem; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: bold; color: #555;">+</button>
              </div>
              <button onclick="App.removeFromCart('${item.id}')" style="background: transparent; border: none; color: #bd1a2b; font-size: 1.2rem; font-weight: 600; cursor: pointer; text-decoration: underline; padding: 0;">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    drawerContent.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; text-align: left;">
        <h2 style="font-size: 2.2rem; font-weight: 700; color: #1a1a1a; margin-bottom: 3rem; border-bottom: 2px solid #D36C2F; padding-bottom: 1rem; width: fit-content; font-family: var(--font-heading);">Shopping Cart</h2>
        
        <div style="flex: 1; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 2rem; max-height: calc(100vh - 350px);">
          ${itemsHtml}
        </div>
        
        <div style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 2rem; margin-top: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <span style="font-size: 1.6rem; font-weight: 600; color: #555;">Subtotal</span>
            <span style="font-size: 2rem; font-weight: 700; color: #1a1a1a;">₹${subtotal.toLocaleString('en-IN')}</span>
          </div>
          <button onclick="App.openCheckoutModal()" style="width: 100%; background-color: #D36C2F; color: #FFFFFF; border: none; padding: 1.6rem 0; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 1.4rem; letter-spacing: 0.05em; transition: background-color 0.2s ease; text-align: center;" onmouseover="this.style.backgroundColor='#bd1a2b'" onmouseout="this.style.backgroundColor='#D36C2F'">PROCEED TO CHECKOUT</button>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="#" onclick="App.toggleCartDrawer(false); event.preventDefault();" style="font-size: 1.3rem; color: #555; text-decoration: underline;">Continue Shopping</a>
          </div>
        </div>
      </div>
    `;
  },

  openCheckoutModal() {
    this.toggleCartDrawer(false);
    alert('Thank you for shopping with Vastu Home Decor! This is a demo checkout. Your order has been logged.');
    this.state.cart = [];
    localStorage.setItem('vhd_cart', '[]');
    this.updateCartUI();
  },

  toggleChatbot() {
    const panel = document.getElementById('chatbot-panel');
    if (panel) {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) {
        document.getElementById('chatbot-input-text')?.focus();
      }
    }
  },

  sendChatMessage() {
    const input = document.getElementById('chatbot-input-text');
    const messagesContainer = document.getElementById('chatbot-messages-body');
    const sendBtn = document.getElementById('chatbot-send-btn');
    if (!input || !messagesContainer) return;

    const messageText = input.value.trim();
    if (!messageText) return;

    // 1. Add User message bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = messageText;
    messagesContainer.appendChild(userBubble);

    // Clear and reset field
    input.value = '';
    sendBtn?.classList.remove('active');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Simulate Bot Typing/Thinking Response
    setTimeout(() => {
      const responseText = this.getBotReply(messageText);
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      botBubble.innerHTML = responseText;
      messagesContainer.appendChild(botBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 850);
  },

  getBotReply(msg) {
    const q = msg.toLowerCase();
    
    // Core Q&A matching logic
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello! How can I help you choose the perfect wallpaper or custom mural today?";
    }
    if (q.includes('wallpaper') || q.includes('collection')) {
      return "We have beautiful dynamic collections: <strong>Sanskriti</strong> (Indian Heritage), <strong>Florina</strong> (Watercolor Florals), and <strong>Bohemia</strong> (Navy & Gold Geometrics). You can try them on instantly inside our <a href='#/collections' onclick='App.toggleChatbot()'>interactive Room Visualizer</a>!";
    }
    if (q.includes('mural') || q.includes('custom') || q.includes('mds')) {
      return "Our MDS (Mural Design Studio) offers gorgeous high-definition custom size wallpapers like <em>Landscape, Prakriti, and Paradise</em>. Take a look at our <a href='#/mds' onclick='App.toggleChatbot()'>MDS Catalog</a>.";
    }
    if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
      return "Our premium wallpapers start at just <strong>₹1,820 per roll (57 sq ft)</strong> and murals start at <strong>₹1,938 per roll</strong>. You can switch currencies to USD or EUR in the top header!";
    }
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('email') || q.includes('call')) {
      return "You can call us directly at <strong>91221 35215</strong>, email support at <strong>vector.ai09@gmail.com</strong>, or request a free home consultant visit via our enquiry popups!";
    }
    if (q.includes('visualizer') || q.includes('try') || q.includes('room')) {
      return "Our live <strong>Room Visualizer</strong> lets you see how any collection looks on a room wall with live texture patterns! <a href='#/collections' onclick='App.toggleChatbot()'>Try it here</a>.";
    }
    if (q.includes('thank') || q.includes('thanks')) {
      return "You're very welcome! Let me know if you need anything else to decorate your home.";
    }
    
    return "I appreciate your query! Please feel free to email our design experts at <strong>vector.ai09@gmail.com</strong> or call us at <strong>91221 35215</strong> for customized assistance.";
  },

  handleRegisterSubmit() {
    alert('Account created successfully! Please sign in with your credentials.');
    window.location.hash = '#/login';
  }
};

// Bind active status toggle on chatbot input keyup
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatbot-input-text');
  const sendBtn = document.getElementById('chatbot-send-btn');
  if (input && sendBtn) {
    input.addEventListener('input', () => {
      if (input.value.trim().length > 0) {
        sendBtn.classList.add('active');
      } else {
        sendBtn.classList.remove('active');
      }
    });
  }
});

