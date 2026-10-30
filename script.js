/* ==========================================================================
   Luis D. Hernández — Interactive Portfolio Script
   Features:
   1. Dark/Light Theme Switcher with persistence
   2. ES/EN Language Toggle
   3. Project Category Filtering
   4. Interactive Gaussian Process / Posterior Credible Interval Chart (Hero)
   5. Interactive OLS / Bayesian Linear Regression Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. THEME TOGGLE (Dark / Light)
     ------------------------------------------------------------------------ */
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('ldh-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('ldh-theme', next);
    drawHeroChart();
    drawRegressionPlot();
  });

  /* ------------------------------------------------------------------------
     2. MOBILE MENU
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ------------------------------------------------------------------------
     3. BILINGUAL SUPPORT (ES / EN)
     ------------------------------------------------------------------------ */
  const translations = {
    es: {
      'nav.about': 'Perfil',
      'nav.projects': 'Proyectos',
      'nav.research': 'Investigación & Maestría',
      'nav.stack': 'Stack Técnico',
      'nav.lab': 'Simulador',
      'nav.contact': 'Contacto',
      'hero.badge': 'Estadístico • M.Sc. (c) en Estadística — UNAL Medellín',
      'hero.greeting': 'Hola, soy',
      'hero.subtitle': 'Transformo incertidumbre y datos complejos en decisiones rigurosas mediante <strong>inferencia estadística</strong>, <strong>aprendizaje automático</strong> y <strong>modelos matemáticos</strong> reproducibles.',
      'hero.cta_projects': 'Explorar Proyectos',
      'hero.cta_contact': 'Contactar',
      'hero.metric1': 'Pregrado & Posgrado en Estadística',
      'hero.metric2': 'Modelado, Quarto, PyTorch & FastAPI',
      'hero.metric3': 'Repositorios Públicos de Ciencia de Datos',
      'hero.viz_title': 'Inferencia en Tiempo Real: f(x | D)',
      'hero.viz_hint': 'Mueve el cursor sobre la curva para inspeccionar intervalos de credibilidad (95% CI)',
      'about.title': 'Rigor matemático aplicado a problemas reales',
      'about.p1': 'Soy <strong>Estadístico</strong> y actualmente curso la <strong>Maestría en Ciencias - Estadística</strong> en la <strong>Universidad Nacional de Colombia (Sede Medellín)</strong>. Mi formación combina una base sólida en teoría de la probabilidad, inferencia estadística y álgebra lineal numérica con el desarrollo moderno de soluciones de Ciencia de Datos e Inteligencia Artificial.',
      'about.p2': 'Me especializo en diseñar flujos analíticos completos y reproducibles: desde el diseño experimental, limpieza de datos e inferencia clásica/bayesiana en <strong>R y Quarto</strong>, hasta el entrenamiento de modelos de aprendizaje profundo (<em>Sparse Transformers</em>, factorización matricial) y el despliegue de servicios de evaluación automatizada en producción con <strong>Python, FastAPI y Docker</strong>.',
      'about.pillar1_title': 'Modelado Estadístico & Consultoría',
      'about.pillar1_desc': 'Modelos lineales generalizados (GLM), análisis de supervivencia (Kaplan-Meier, Cox, modelos paramétricos), estadística multivariada y bioestadística clínica.',
      'about.pillar2_title': 'Machine Learning & Deep Learning',
      'about.pillar2_desc': 'Modelos predictivos supervisados y no supervisados, redes neuronales, mecanismos de atención dispersa (Sparse Attention) y aproximación de rango bajo.',
      'about.pillar3_title': 'Ciencia de Datos Reproducible & IA',
      'about.pillar3_desc': 'Reportes científicos automatizados en Quarto/LaTeX, validación rigurosa con métricas de precisión/F1 y arquitecturas híbridas (reglas determinísticas + LLMs).',
      'about.edu_title': 'Trayectoria Académica',
      'about.edu1_date': 'En curso • Posgrado',
      'about.edu1_degree': 'Maestría en Ciencias - Estadística',
      'about.edu1_desc': 'Profundización en Aprendizaje Automático avanzado, Métodos Multivariados, Modelos Estadísticos y Computación Científica.',
      'about.edu2_date': 'Pregrado Universitario',
      'about.edu2_degree': 'Estadístico',
      'about.edu2_desc': 'Formación rigurosa en inferencia estadística, probabilidad, muestreo, diseño de experimentos, regresión, series de tiempo y consultoría estadística aplicada.',
      'projects.title': 'Proyectos Destacados de Estadística & Data Science',
      'projects.filter_all': 'Todos',
      'projects.filter_stats': 'Estadística & R',
      'projects.filter_ml': 'Machine Learning & DL',
      'projects.filter_eng': 'IA & Producción',
      'projects.p1_desc': 'Servicio en producción que audita transcripciones de llamadas de cobranza contra una rúbrica de 10 criterios de negocio. Combina validadores determinísticos en español con evaluación por LLMs (Gemini, Groq, OpenRouter), logrando un análisis riguroso de precisión, sensibilidad, F1 y costo por lote.',
      'projects.p2_desc': 'Estudio e implementación experimental de mecanismos de Sparse Attention y factorización de matrices para reducir la complejidad cuadrática O(N²) de la autoatención en arquitecturas Transformer, evaluando el compromiso entre eficiencia computacional y capacidad de representación.',
      'projects.p3_desc': 'Análisis bioestadístico integral de cohortes clínicas (expresión de PD-L1 y estado vital a 5 años). Incluye estimación de curvas de Kaplan-Meier, pruebas Log-Rank, regresión de riesgos proporcionales de Cox y modelos paramétricos de supervivencia (survival, flexsurv, survminer).',
      'projects.p4_desc': 'Desarrollo práctico y teórico del posgrado en Ciencias-Estadística (UNAL Medellín). Aborda modelado avanzado de regresión, regularización, validación cruzada, optimización por descenso de gradiente y fundamentos matemáticos de redes neuronales artificiales.',
      'projects.p5_desc': 'Resolución integral de caso aplicado para Ciencia de Datos: exploración estadística (EDA), ingeniería de características, ajuste y diagnóstico de modelos, y generación de informe ejecutivo reproducible en PDF/HTML mediante Quarto y scripts modulares en R.',
      'projects.p6_desc': 'Implementación de técnicas de reducción de dimensionalidad y estructura de covarianza: Análisis de Componentes Principales (PCA), Análisis Factorial, MANOVA, Análisis Discriminante y métodos de agrupamiento (Clustering) con inferencia sobre vectores de medias.',
      'projects.view_repo': 'Repositorio',
      'research.title': 'Enfoque en la Maestría en Estadística',
      'research.subtitle': 'Áreas de investigación, modelado matemático y producción académica desarrolladas durante mi formación de posgrado en la Universidad Nacional de Colombia.',
      'research.r1_title': 'Aprendizaje Estadístico & Arquitecturas Eficientes',
      'research.r1_desc': 'Exploración de la intersección entre el álgebra lineal numérica y el aprendizaje profundo: aproximaciones de bajo rango, factorización matricial y mecanismos de atención dispersa (Sparse Attention) para escalar modelos secuenciales y de alta dimensión.',
      'research.r2_title': 'Análisis de Supervivencia & Bioestadística Aplicada',
      'research.r2_desc': 'Modelado de tiempos hasta el evento con censura por derecha en estudios clínicos y oncológicos (como biomarcadores PD-L1). Evaluación de riesgos proporcionales, distribuciones Weibull/Log-Normal e identificación de factores pronósticos.',
      'research.r3_title': 'Evaluación Estadística de Sistemas de IA & LLMs',
      'research.r3_desc': 'Diseño de rúbricas cuantitativas, medición de concordancia y estimación de tasas de error (Precisión, Sensibilidad, F1-score, reproducibilidad estocástica) en arquitecturas híbridas que integran reglas determinísticas y modelos de lenguaje.',
      'stack.title': 'Stack Técnico de Estadística & Ciencia de Datos',
      'stack.c1_title': 'Ecosistema R & Computación Estadística',
      'stack.c1_desc': 'Análisis inferencial, bioestadística, visualización científica y reportería reproducible.',
      'stack.c2_title': 'Python, Machine Learning & Deep Learning',
      'stack.c2_desc': 'Modelado predictivo, redes neuronales, procesamiento de lenguaje natural y evaluación de modelos.',
      'stack.c3_title': 'Metodologías Estadísticas & Matemáticas',
      'stack.c3_desc': 'Fundamentación teórica y aplicada para la toma de decisiones bajo incertidumbre.',
      'stack.c4_title': 'Ingeniería de Datos, Bases de Datos & Despliegue',
      'stack.c4_desc': 'Puesta en producción de modelos, control de versiones y documentación científica.',
      'lab.title': 'Simulador de Inferencia Bayesiana & Regresión',
      'lab.subtitle': 'Un pequeño módulo interactivo en el navegador: ajusta el tamaño muestral (n) y el nivel de ruido (σ) para observar cómo converge el estimador de mínimos cuadrados / posterior bayesiano hacia la función verdadera.',
      'lab.sample_size': 'Tamaño de muestra (n):',
      'lab.noise_level': 'Desviación del error (σ):',
      'lab.simulate_btn': 'Generar Nueva Muestra Aleatoria',
      'contact.title': '¿Hablamos sobre datos, estadística o investigación?',
      'contact.desc': 'Estoy abierto a oportunidades en <strong>Ciencia de Datos</strong>, <strong>Modelado Estadístico</strong>, <strong>Consultoría Bioestadística / Analítica</strong> y colaboraciones académicas o de investigación.'
    },
    en: {
      'nav.about': 'Profile',
      'nav.projects': 'Projects',
      'nav.research': "Research & Master's",
      'nav.stack': 'Tech Stack',
      'nav.lab': 'Simulator',
      'nav.contact': 'Contact',
      'hero.badge': 'Statistician • M.Sc. (c) in Statistics — UNAL Medellín',
      'hero.greeting': "Hi, I'm",
      'hero.subtitle': 'Transforming uncertainty and complex data into rigorous decisions through <strong>statistical inference</strong>, <strong>machine learning</strong>, and reproducible <strong>mathematical modeling</strong>.',
      'hero.cta_projects': 'Explore Projects',
      'hero.cta_contact': 'Get in Touch',
      'hero.metric1': 'B.Sc. & M.Sc. (c) in Statistics',
      'hero.metric2': 'Modeling, Quarto, PyTorch & FastAPI',
      'hero.metric3': 'Public Data Science Repositories',
      'hero.viz_title': 'Real-Time Inference: f(x | D)',
      'hero.viz_hint': 'Hover over the curve to inspect 95% credible intervals (CI)',
      'about.title': 'Mathematical rigor applied to real-world problems',
      'about.p1': 'I am a <strong>Statistician</strong> currently pursuing an <strong>M.Sc. in Statistics</strong> at the <strong>National University of Colombia (Medellín Campus)</strong>. My background combines a strong foundation in probability theory, statistical inference, and numerical linear algebra with modern Data Science and Artificial Intelligence engineering.',
      'about.p2': 'I specialize in designing end-to-end reproducible analytical workflows: from experimental design, data cleaning, and classical/Bayesian inference in <strong>R and Quarto</strong>, to training deep learning architectures (<em>Sparse Transformers</em>, matrix factorization) and deploying automated evaluation microservices with <strong>Python, FastAPI, and Docker</strong>.',
      'about.pillar1_title': 'Statistical Modeling & Consulting',
      'about.pillar1_desc': 'Generalized Linear Models (GLM), survival analysis (Kaplan-Meier, Cox, parametric survival), multivariate statistics, and clinical biostatistics.',
      'about.pillar2_title': 'Machine Learning & Deep Learning',
      'about.pillar2_desc': 'Supervised and unsupervised predictive modeling, neural networks, Sparse Attention mechanisms, and low-rank matrix approximations.',
      'about.pillar3_title': 'Reproducible Data Science & AI',
      'about.pillar3_desc': 'Automated scientific reporting with Quarto/LaTeX, rigorous precision/F1 validation, and hybrid architectures (deterministic rules + LLMs).',
      'about.edu_title': 'Academic Background',
      'about.edu1_date': 'Ongoing • Graduate Studies',
      'about.edu1_degree': 'M.Sc. in Statistics',
      'about.edu1_desc': 'Advanced coursework and research in Machine Learning, Multivariate Methods, Statistical Modeling, and Scientific Computing.',
      'about.edu2_date': 'Undergraduate Degree',
      'about.edu2_degree': 'B.Sc. in Statistics (Statistician)',
      'about.edu2_desc': 'Rigorous training in statistical inference, probability, sampling theory, experimental design, regression, time series, and statistical consulting.',
      'projects.title': 'Featured Statistics & Data Science Projects',
      'projects.filter_all': 'All',
      'projects.filter_stats': 'Statistics & R',
      'projects.filter_ml': 'Machine Learning & DL',
      'projects.filter_eng': 'AI & Production',
      'projects.p1_desc': 'Production service that audits debt-collection voice transcripts against a 10-criteria business rubric. Combines deterministic Spanish validators with LLM judges (Gemini, Groq, OpenRouter), featuring full precision, recall, F1, and batch cost analysis.',
      'projects.p2_desc': 'Experimental study and implementation of Sparse Attention mechanisms and matrix factorization to reduce quadratic O(N²) self-attention complexity in Transformers, analyzing computational efficiency vs. representation capacity.',
      'projects.p3_desc': 'Comprehensive biostatistical study of clinical cohorts (PD-L1 biomarker expression and 5-year vital status). Includes Kaplan-Meier survival curves, Log-Rank tests, Cox proportional hazards regression, and parametric survival models.',
      'projects.p4_desc': 'Graduate coursework and practical implementations for the M.Sc. in Statistics (UNAL Medellín). Covers advanced regression, regularization, cross-validation, gradient optimization, and mathematical foundations of neural networks.',
      'projects.p5_desc': 'End-to-end resolution of a Data Science technical case: exploratory data analysis (EDA), feature engineering, model fitting & diagnostics, and reproducible executive reporting in PDF/HTML using Quarto and modular R scripts.',
      'projects.p6_desc': 'Implementation of dimensionality reduction and covariance structure methods: Principal Component Analysis (PCA), Factor Analysis, MANOVA, Discriminant Analysis, and Clustering with multivariate mean vector inference.',
      'projects.view_repo': 'Repository',
      'research.title': "M.Sc. in Statistics Research Focus",
      'research.subtitle': 'Research lines, mathematical modeling, and academic work developed during my graduate studies at the National University of Colombia.',
      'research.r1_title': 'Statistical Learning & Efficient Architectures',
      'research.r1_desc': 'Exploring the intersection of numerical linear algebra and deep learning: low-rank approximations, matrix factorization, and Sparse Attention mechanisms to scale sequential and high-dimensional models.',
      'research.r2_title': 'Survival Analysis & Applied Biostatistics',
      'research.r2_desc': 'Time-to-event modeling under right-censoring in clinical and oncology studies (such as PD-L1 biomarkers). Proportional hazards diagnostics, Weibull/Log-Normal models, and prognostic factor selection.',
      'research.r3_title': 'Statistical Evaluation of AI & LLM Systems',
      'research.r3_desc': 'Quantitative rubric design, agreement metrics, and error rate estimation (Precision, Recall, F1-score, stochastic reproducibility) in hybrid deterministic + LLM architectures.',
      'stack.title': 'Statistics & Data Science Tech Stack',
      'stack.c1_title': 'R Ecosystem & Statistical Computing',
      'stack.c1_desc': 'Inferential analysis, biostatistics, scientific visualization, and reproducible reporting.',
      'stack.c2_title': 'Python, Machine Learning & Deep Learning',
      'stack.c2_desc': 'Predictive modeling, neural networks, natural language processing, and model evaluation.',
      'stack.c3_title': 'Statistical & Mathematical Methodologies',
      'stack.c3_desc': 'Theoretical and applied foundations for decision-making under uncertainty.',
      'stack.c4_title': 'Data Engineering, Databases & Deployment',
      'stack.c4_desc': 'Model deployment, version control, automated testing, and scientific documentation.',
      'lab.title': 'Bayesian Inference & Regression Simulator',
      'lab.subtitle': 'An interactive browser module: adjust the sample size (n) and noise standard deviation (σ) to observe how the OLS / Bayesian posterior estimator converges toward the true population function.',
      'lab.sample_size': 'Sample size (n):',
      'lab.noise_level': 'Error std. dev (σ):',
      'lab.simulate_btn': 'Draw New Random Sample',
      'contact.title': "Let's talk about data, statistics, or research",
      'contact.desc': 'I am open to opportunities in <strong>Data Science</strong>, <strong>Statistical Modeling</strong>, <strong>Biostatistical / Analytical Consulting</strong>, and academic or research collaborations.'
    }
  };

  let currentLang = localStorage.getItem('ldh-lang') || 'es';
  const langToggleBtn = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    langLabel.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
  }

  applyTranslations(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('ldh-lang', currentLang);
    applyTranslations(currentLang);
  });

  /* ------------------------------------------------------------------------
     4. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. HERO CHART: Interactive Gaussian Process / Credible Band Visualization
     ------------------------------------------------------------------------ */
  const heroCanvas = document.getElementById('heroChart');
  let hoverX = null;
  let phase = 0;

  if (heroCanvas) {
    heroCanvas.addEventListener('mousemove', e => {
      const rect = heroCanvas.getBoundingClientRect();
      hoverX = (e.clientX - rect.left) / rect.width;
      drawHeroChart();
    });

    heroCanvas.addEventListener('mouseleave', () => {
      hoverX = null;
      drawHeroChart();
    });
  }

  function drawHeroChart() {
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext('2d');
    const w = heroCanvas.width;
    const h = heroCanvas.height;
    const isLight = htmlEl.getAttribute('data-theme') === 'light';

    ctx.clearRect(0, 0, w, h);

    // Subtle horizontal grid lines
    ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.07)' : 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 25; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Posterior mean function & credible interval width
    const meanFn = t => h * 0.52 - Math.sin(t * Math.PI * 2.2 + phase) * 34 - Math.cos(t * Math.PI * 1.1) * 16;
    const ciFn = t => 14 + Math.abs(Math.sin(t * Math.PI * 3.1)) * 22;

    // Draw 95% Credible Band
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const t = x / w;
      const y = meanFn(t) - ciFn(t);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let x = w; x >= 0; x -= 4) {
      const t = x / w;
      const y = meanFn(t) + ciFn(t);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.16)' : 'rgba(56, 189, 248, 0.16)';
    ctx.fill();

    // Draw Posterior Mean Curve
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const t = x / w;
      const y = meanFn(t);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = isLight ? '#0284c7' : '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Observed knots
    const knots = [0.12, 0.28, 0.48, 0.68, 0.86];
    knots.forEach(kt => {
      const kx = kt * w;
      const ky = meanFn(kt);
      ctx.beginPath();
      ctx.arc(kx, ky, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7';
      ctx.fill();
      ctx.strokeStyle = isLight ? '#ffffff' : '#090d16';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Interactive Hover Inspection
    if (hoverX !== null && hoverX >= 0 && hoverX <= 1) {
      const px = hoverX * w;
      const py = meanFn(hoverX);
      const ci = ciFn(hoverX);

      // Vertical line
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(px, py - ci);
      ctx.lineTo(px, py + ci);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);

      // Point on mean
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Readout label
      const valMean = ((h - py) / 40).toFixed(2);
      const valCI = (ci / 40).toFixed(2);
      const label = `E[f(x)] = ${valMean} ± ${valCI}`;
      ctx.font = '500 11px "JetBrains Mono", monospace';
      const textW = ctx.measureText(label).width + 14;
      const boxX = Math.min(Math.max(px - textW / 2, 6), w - textW - 6);
      const boxY = Math.max(py - ci - 28, 8);

      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.88)' : 'rgba(9, 13, 22, 0.9)';
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, textW, 22, 5);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(label, boxX + 7, boxY + 15);
    }
  }

  drawHeroChart();

  /* ------------------------------------------------------------------------
     6. INTERACTIVE OLS / BAYESIAN LINEAR REGRESSION SIMULATOR
     ------------------------------------------------------------------------ */
  const regCanvas = document.getElementById('regressionCanvas');
  const nSlider = document.getElementById('sample-size-slider');
  const noiseSlider = document.getElementById('noise-slider');
  const nValEl = document.getElementById('sample-size-val');
  const noiseValEl = document.getElementById('noise-val');
  const resimBtn = document.getElementById('resimulate-btn');

  const olsEstEl = document.getElementById('ols-estimates');
  const r2ValEl = document.getElementById('r2-value');
  const seValEl = document.getElementById('se-value');

  const TRUE_B0 = 1.5;
  const TRUE_B1 = 2.2;
  let simData = [];

  // Box-Muller Standard Normal generator
  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function generateSample() {
    const n = parseInt(nSlider.value, 10);
    const sigma = parseFloat(noiseSlider.value);
    nValEl.textContent = n;
    noiseValEl.textContent = sigma.toFixed(2);

    simData = [];
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) / n * 4.0 + (Math.random() - 0.5) * 0.15; // X in [0, 4]
      const y = TRUE_B0 + TRUE_B1 * x + randn() * sigma;
      simData.push({ x, y });
    }
    drawRegressionPlot();
  }

  function computeOLS(data) {
    const n = data.length;
    const meanX = data.reduce((s, d) => s + d.x, 0) / n;
    const meanY = data.reduce((s, d) => s + d.y, 0) / n;

    let sxx = 0, sxy = 0, syy = 0;
    for (const d of data) {
      const dx = d.x - meanX;
      const dy = d.y - meanY;
      sxx += dx * dx;
      sxy += dx * dy;
      syy += dy * dy;
    }

    const b1 = sxy / sxx;
    const b0 = meanY - b1 * meanX;

    let sse = 0;
    for (const d of data) {
      const pred = b0 + b1 * d.x;
      sse += (d.y - pred) ** 2;
    }

    const r2 = Math.max(0, 1 - sse / syy);
    const s2 = sse / Math.max(1, n - 2);
    const seB1 = Math.sqrt(s2 / sxx);

    return { b0, b1, r2, seB1, s2, meanX, sxx, n };
  }

  function drawRegressionPlot() {
    if (!regCanvas || simData.length === 0) return;
    const ctx = regCanvas.getContext('2d');
    const w = regCanvas.width;
    const h = regCanvas.height;
    const isLight = htmlEl.getAttribute('data-theme') === 'light';

    const stats = computeOLS(simData);
    olsEstEl.textContent = `β̂₀ = ${stats.b0.toFixed(2)}, β̂₁ = ${stats.b1.toFixed(2)}`;
    r2ValEl.textContent = `R² = ${stats.r2.toFixed(3)}`;
    seValEl.textContent = `SE = ${stats.seB1.toFixed(3)}`;

    ctx.clearRect(0, 0, w, h);

    const padL = 44, padR = 20, padT = 20, padB = 34;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const xMin = -0.2, xMax = 4.2;
    const yMin = -1.5, yMax = 12.5;

    const toPxX = x => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const toPxY = y => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    // Grid
    ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 4; gx += 1) {
      const px = toPxX(gx);
      ctx.beginPath();
      ctx.moveTo(px, padT);
      ctx.lineTo(px, padT + plotH);
      ctx.stroke();

      ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(gx.toString(), px - 4, h - 12);
    }

    for (let gy = 0; gy <= 12; gy += 3) {
      const py = toPxY(gy);
      ctx.beginPath();
      ctx.moveTo(padL, py);
      ctx.lineTo(padL + plotW, py);
      ctx.stroke();

      ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(gy.toString(), 14, py + 4);
    }

    // 95% Confidence Band for E[Y|x]
    ctx.beginPath();
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const yHat = stats.b0 + stats.b1 * x;
      const seMean = Math.sqrt(stats.s2 * (1 / stats.n + ((x - stats.meanX) ** 2) / stats.sxx));
      const yUpper = yHat + 1.96 * seMean;
      const px = toPxX(x), py = toPxY(yUpper);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = steps; i >= 0; i--) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const yHat = stats.b0 + stats.b1 * x;
      const seMean = Math.sqrt(stats.s2 * (1 / stats.n + ((x - stats.meanX) ** 2) / stats.sxx));
      const yLower = yHat - 1.96 * seMean;
      ctx.lineTo(toPxX(x), toPxY(yLower));
    }
    ctx.closePath();
    ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.18)' : 'rgba(56, 189, 248, 0.2)';
    ctx.fill();

    // True Population Line
    ctx.beginPath();
    ctx.setLineDash([6, 5]);
    ctx.moveTo(toPxX(xMin), toPxY(TRUE_B0 + TRUE_B1 * xMin));
    ctx.lineTo(toPxX(xMax), toPxY(TRUE_B0 + TRUE_B1 * xMax));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Estimated OLS Line
    ctx.beginPath();
    ctx.moveTo(toPxX(xMin), toPxY(stats.b0 + stats.b1 * xMin));
    ctx.lineTo(toPxX(xMax), toPxY(stats.b0 + stats.b1 * xMax));
    ctx.strokeStyle = isLight ? '#0284c7' : '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data Points
    for (const d of simData) {
      const px = toPxX(d.x);
      const py = toPxY(d.y);
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7';
      ctx.fill();
      ctx.strokeStyle = isLight ? '#ffffff' : '#090d16';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  if (nSlider && noiseSlider && resimBtn) {
    nSlider.addEventListener('input', generateSample);
    noiseSlider.addEventListener('input', generateSample);
    resimBtn.addEventListener('click', generateSample);
    generateSample();
  }
});
