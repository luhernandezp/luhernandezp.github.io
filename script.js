/* ==========================================================================
   Luis D. Hernández — Minimalist Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* 1. THEME TOGGLE (Default Light Paper / Optional Dark) */
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('ldh-minimal-theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('ldh-minimal-theme', next);
      drawRegressionPlot();
    });
  }

  /* 2. BILINGUAL SUPPORT (ES / EN) */
  const translations = {
    es: {
      'nav.about': 'Sobre mí',
      'nav.projects': 'Proyectos',
      'nav.research': 'Investigación',
      'nav.stack': 'Habilidades',
      'nav.contact': 'Contacto',
      'sidebar.focus': 'Áreas de Énfasis',
      'hero.badge': 'Estadístico · M.Sc. (c) en Estadística',
      'about.heading': '01 // SOBRE MÍ & FORMACIÓN',
      'about.title': 'Estadística Aplicada, Modelado Matemático y Ciencia de Datos',
      'about.p1': 'Soy <strong>Estadístico</strong> egresado de la <strong>Universidad Nacional de Colombia</strong> y actualmente curso la <strong>Maestría en Ciencias - Estadística</strong> en la Sede Medellín. Mi perfil integra una base rigurosa en teoría de la probabilidad, inferencia estadística (clásica y bayesiana) y álgebra lineal numérica con el desarrollo moderno de Ciencia de Datos e Inteligencia Artificial.',
      'about.p2': 'Trabajo en la intersección entre el <strong>modelado matemático</strong> y el <strong>aprendizaje automático</strong>, transformando la incertidumbre y los datos complejos en evidencia cuantitativa sólida para la toma de decisiones clínicas, científicas y de negocio. Tengo un especial interés en la <strong>inferencia causal en series de tiempo</strong>.',
      'about.p3': 'En la práctica, diseño flujos analíticos reproducibles de principio a fin: desde consultoría bioestadística y análisis de supervivencia en <strong>R y Quarto</strong>, hasta la experimentación con arquitecturas de aprendizaje profundo (<em>Sparse Transformers</em>, factorización matricial) y el despliegue de sistemas de evaluación en producción con <strong>Python y FastAPI</strong>.',
      'about.edu1_degree': 'Maestría en Ciencias - Estadística',
      'about.edu1_date': 'En curso',
      'about.edu2_degree': 'Estadístico (Pregrado)',
      'about.edu2_date': 'Pregrado',
      'projects.heading': '02 // PORTAFOLIO',
      'projects.title': 'Proyectos y Análisis de Datos',
      'projects.filter_all': 'Todos',
      'projects.filter_stats': 'Estadística & R',
      'projects.filter_ml': 'Machine Learning',
      'projects.filter_eng': 'Producción & IA',
      'projects.p1_desc': 'Servicio en producción que audita transcripciones de llamadas de cobranza frente a una rúbrica de 10 criterios. Combina validadores determinísticos en español con evaluación por LLMs (Gemini, Groq, OpenRouter), documentando métricas de precisión, sensibilidad, F1-score, reproducibilidad y costos operativos.',
      'projects.p2_desc': 'Investigación e implementación experimental de mecanismos de atención dispersa (<em>Sparse Attention</em>) y aproximaciones de rango bajo mediante factorización matricial para reducir la complejidad cuadrática O(N²) en arquitecturas Transformer.',
      'projects.p3_desc': 'Estudio bioestadístico de cohortes oncológicas evaluando la expresión de PD-L1 y supervivencia a 5 años. Incluye estimadores no paramétricos de Kaplan-Meier, pruebas Log-Rank, modelos de riesgos proporcionales de Cox y modelos paramétricos flexibles.',
      'projects.p4_desc': 'Desarrollo teórico-práctico de posgrado en la Maestría en Ciencias - Estadística (UNAL Medellín). Comprende modelado avanzado de regresión, regularización, validación cruzada y fundamentos matemáticos de redes neuronales.',
      'projects.p5_desc': 'Solución integral de principio a fin para ciencia de datos: análisis exploratorio (EDA), limpieza, ajuste y diagnóstico de modelos, y generación de informe técnico reproducible en PDF/HTML con Quarto y scripts modulares en R.',
      'projects.p6_desc': 'Aplicación de métodos multivariados sobre estructuras de covarianza y alta dimensión: Componentes Principales (PCA), Análisis Factorial, MANOVA, clasificación discriminante y agrupamiento (Clustering).',
      'research.heading': '03 // INVESTIGACIÓN',
      'research.title': 'Líneas de Estudio en la Maestría',
      'research.r1_title': 'Aprendizaje Estadístico & Aproximaciones de Rango Bajo',
      'research.r1_desc': 'Estudio de factorización de matrices y mecanismos de atención eficiente (<em>Sparse Attention</em>) para escalar modelos de aprendizaje profundo en secuencias largas y alta dimensión.',
      'research.r2_title': 'Análisis de Supervivencia & Bioestadística',
      'research.r2_desc': 'Modelado de tiempos hasta el evento con censura en cohortes clínicas, inferencia sobre riesgos proporcionales y distribuciones paramétricas para identificar factores pronósticos.',
      'research.r3_title': 'Evaluación Cuantitativa de Sistemas de IA',
      'research.r3_desc': 'Diseño de métricas de desempeño, análisis de concordancia y control de incertidumbre en sistemas híbridos que combinan reglas determinísticas y grandes modelos de lenguaje (LLMs).',
      'lab.title': 'Nota interactiva: Convergencia en Regresión Lineal',
      'lab.subtitle': 'Simulación en vivo de Y = 1.5 + 2.2X + ε con banda de confianza al 95%.',
      'lab.simulate_btn': 'Nueva muestra',
      'stack.heading': '04 // STACK TÉCNICO',
      'stack.title': 'Habilidades y Herramientas',
      'stack.c1_title': 'Computación Estadística (R)',
      'stack.c2_title': 'Python & Machine Learning',
      'stack.c3_title': 'Métodos Estadísticos',
      'stack.c4_title': 'Ingeniería & Herramientas'
    },
    en: {
      'nav.about': 'About Me',
      'nav.projects': 'Projects',
      'nav.research': 'Research',
      'nav.stack': 'Skills',
      'nav.contact': 'Contact',
      'sidebar.focus': 'Focus Areas',
      'hero.badge': 'Statistician · M.Sc. (c) in Statistics',
      'about.heading': '01 // ABOUT ME & EDUCATION',
      'about.title': 'Applied Statistics, Mathematical Modeling & Data Science',
      'about.p1': 'I am a <strong>Statistician</strong> graduated from the <strong>National University of Colombia</strong>, currently pursuing an <strong>M.Sc. in Statistics</strong> at the Medellín Campus. My profile integrates a rigorous foundation in probability theory, classical and Bayesian statistical inference, and numerical linear algebra with modern Data Science and Artificial Intelligence.',
      'about.p2': 'I work at the intersection of <strong>mathematical modeling</strong> and <strong>machine learning</strong>, transforming uncertainty and complex data into solid quantitative evidence for clinical, scientific, and business decision-making. I am particularly interested in <strong>causal inference in time series</strong>.',
      'about.p3': 'In practice, I design end-to-end reproducible analytical workflows: from biostatistical consulting and survival analysis in <strong>R and Quarto</strong>, to experimenting with deep learning architectures (<em>Sparse Transformers</em>, matrix factorization) and deploying production evaluation systems with <strong>Python and FastAPI</strong>.',
      'about.edu1_degree': 'M.Sc. in Statistics',
      'about.edu1_date': 'Ongoing',
      'about.edu2_degree': 'B.Sc. in Statistics (Statistician)',
      'about.edu2_date': 'Undergraduate',
      'projects.heading': '02 // PORTFOLIO',
      'projects.title': 'Projects & Data Analysis',
      'projects.filter_all': 'All',
      'projects.filter_stats': 'Statistics & R',
      'projects.filter_ml': 'Machine Learning',
      'projects.filter_eng': 'Production & AI',
      'projects.p1_desc': 'Production service that audits debt-collection call transcripts against a 10-criteria rubric. Combines deterministic Spanish validators with LLM judges (Gemini, Groq, OpenRouter), documenting precision, recall, F1-score, reproducibility, and operating costs.',
      'projects.p2_desc': 'Experimental research and implementation of Sparse Attention mechanisms and low-rank matrix factorization to reduce quadratic O(N²) self-attention complexity in Transformer architectures.',
      'projects.p3_desc': 'Biostatistical study of oncology cohorts assessing PD-L1 expression and 5-year survival. Includes non-parametric Kaplan-Meier estimators, Log-Rank tests, Cox proportional hazards models, and flexible parametric models.',
      'projects.p4_desc': 'Graduate theoretical and practical coursework in the M.Sc. in Statistics (UNAL Medellín). Covers advanced regression modeling, regularization, cross-validation, and mathematical foundations of neural networks.',
      'projects.p5_desc': 'End-to-end data science technical solution: exploratory data analysis (EDA), data cleaning, model fitting & diagnostics, and reproducible executive reporting in PDF/HTML using Quarto and modular R scripts.',
      'projects.p6_desc': 'Application of multivariate methods on covariance structures and high-dimensional data: Principal Component Analysis (PCA), Factor Analysis, MANOVA, discriminant classification, and clustering.',
      'research.heading': '03 // RESEARCH',
      'research.title': 'M.Sc. Research Focus',
      'research.r1_title': 'Statistical Learning & Low-Rank Approximations',
      'research.r1_desc': 'Study of matrix factorization and efficient attention mechanisms (<em>Sparse Attention</em>) to scale deep learning models on long sequences and high-dimensional settings.',
      'research.r2_title': 'Survival Analysis & Biostatistics',
      'research.r2_desc': 'Time-to-event modeling with censoring in clinical cohorts, proportional hazards inference, and parametric distributions to identify prognostic factors.',
      'research.r3_title': 'Quantitative Evaluation of AI Systems',
      'research.r3_desc': 'Performance metric design, agreement analysis, and uncertainty control in hybrid systems combining deterministic rules and Large Language Models (LLMs).',
      'lab.title': 'Interactive Note: Linear Regression Convergence',
      'lab.subtitle': 'Live simulation of Y = 1.5 + 2.2X + ε with 95% confidence band.',
      'lab.simulate_btn': 'New sample',
      'stack.heading': '04 // TECH STACK',
      'stack.title': 'Skills & Tools',
      'stack.c1_title': 'Statistical Computing (R)',
      'stack.c2_title': 'Python & Machine Learning',
      'stack.c3_title': 'Statistical Methods',
      'stack.c4_title': 'Engineering & Tools'
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
    if (langLabel) langLabel.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
  }

  applyTranslations(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      localStorage.setItem('ldh-lang', currentLang);
      applyTranslations(currentLang);
    });
  }

  /* 3. PROJECT FILTERING */
  const filterBtns = document.querySelectorAll('.filter-link');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        item.style.display = (filter === 'all' || categories.includes(filter)) ? 'block' : 'none';
      });
    });
  });

  /* 4. MINIMALIST OLS REGRESSION PLOT */
  const regCanvas = document.getElementById('regressionCanvas');
  const nSlider = document.getElementById('sample-size-slider');
  const noiseSlider = document.getElementById('noise-slider');
  const nValEl = document.getElementById('sample-size-val');
  const noiseValEl = document.getElementById('noise-val');
  const resimBtn = document.getElementById('resimulate-btn');
  const olsEstEl = document.getElementById('ols-estimates');
  const r2ValEl = document.getElementById('r2-value');

  const TRUE_B0 = 1.5;
  const TRUE_B1 = 2.2;
  let simData = [];

  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function generateSample() {
    if (!nSlider || !noiseSlider) return;
    const n = parseInt(nSlider.value, 10);
    const sigma = parseFloat(noiseSlider.value);
    nValEl.textContent = n;
    noiseValEl.textContent = sigma.toFixed(2);

    simData = [];
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) / n * 4.0 + (Math.random() - 0.5) * 0.12;
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
    return { b0, b1, r2, s2, meanX, sxx, n };
  }

  function drawRegressionPlot() {
    if (!regCanvas || simData.length === 0) return;
    const ctx = regCanvas.getContext('2d');
    const w = regCanvas.width;
    const h = regCanvas.height;
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';

    const stats = computeOLS(simData);
    olsEstEl.textContent = `β̂₀ = ${stats.b0.toFixed(2)}, β̂₁ = ${stats.b1.toFixed(2)}`;
    r2ValEl.textContent = `R² = ${stats.r2.toFixed(3)}`;

    ctx.clearRect(0, 0, w, h);

    const padL = 32, padR = 16, padT = 14, padB = 24;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const xMin = -0.1, xMax = 4.1;
    const yMin = -1.5, yMax = 12.5;

    const toPxX = x => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const toPxY = y => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    // Minimal Tufte axes
    ctx.strokeStyle = isDark ? '#2e3136' : '#dcdcd6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // 95% Confidence Band
    ctx.beginPath();
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const yHat = stats.b0 + stats.b1 * x;
      const seMean = Math.sqrt(stats.s2 * (1 / stats.n + ((x - stats.meanX) ** 2) / stats.sxx));
      const px = toPxX(x), py = toPxY(yHat + 1.96 * seMean);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = steps; i >= 0; i--) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const yHat = stats.b0 + stats.b1 * x;
      const seMean = Math.sqrt(stats.s2 * (1 / stats.n + ((x - stats.meanX) ** 2) / stats.sxx));
      ctx.lineTo(toPxX(x), toPxY(yHat - 1.96 * seMean));
    }
    ctx.closePath();
    ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.14)' : 'rgba(15, 76, 129, 0.11)';
    ctx.fill();

    // True Line (dashed subtle)
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(toPxX(xMin), toPxY(TRUE_B0 + TRUE_B1 * xMin));
    ctx.lineTo(toPxX(xMax), toPxY(TRUE_B0 + TRUE_B1 * xMax));
    ctx.strokeStyle = isDark ? '#6e6e6a' : '#9a9a92';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // OLS Fitted Line
    ctx.beginPath();
    ctx.moveTo(toPxX(xMin), toPxY(stats.b0 + stats.b1 * xMin));
    ctx.lineTo(toPxX(xMax), toPxY(stats.b0 + stats.b1 * xMax));
    ctx.strokeStyle = isDark ? '#60a5fa' : '#0f4c81';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Data points
    for (const d of simData) {
      ctx.beginPath();
      ctx.arc(toPxX(d.x), toPxY(d.y), 2.8, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#d4d4d0' : '#2c2c2a';
      ctx.fill();
    }
  }

  if (nSlider && noiseSlider && resimBtn) {
    nSlider.addEventListener('input', generateSample);
    noiseSlider.addEventListener('input', generateSample);
    resimBtn.addEventListener('click', generateSample);
    generateSample();
  }
});