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
      'nav.dark': 'Oscuro',
      'nav.light': 'Claro',
      'sidebar.focus': 'Áreas de Énfasis',
      'sidebar.f1': 'Inferencia Causal en Series de Tiempo',
      'sidebar.f2': 'Inferencia Estadística',
      'sidebar.f3': 'Machine Learning & DL',
      'sidebar.f4': 'Análisis de Supervivencia',
      'sidebar.f5': 'Estadística Multivariada',
      'sidebar.f6': 'Modelado en R & Python',
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
      'lab.title': 'Nota interactiva: Dinámica e Intervención en Series de Tiempo',
      'lab.subtitle': 'Proceso estocástico en tiempo real Y<sub>t</sub> = φY<sub>t−1</sub> + τ·I<sub>t</sub> + ε<sub>t</sub> con trayectoria contrafactual e intervalo al 95%.',
      'lab.shock_btn': 'Pulso causal (τ)',
      'lab.simulate_btn': 'Pausar',
      'lab.resume_btn': 'Reanudar',
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
      'nav.dark': 'Dark',
      'nav.light': 'Light',
      'sidebar.focus': 'Focus Areas',
      'sidebar.f1': 'Causal Inference in Time Series',
      'sidebar.f2': 'Statistical Inference',
      'sidebar.f3': 'Machine Learning & DL',
      'sidebar.f4': 'Survival Analysis',
      'sidebar.f5': 'Multivariate Statistics',
      'sidebar.f6': 'Modeling in R & Python',
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
      'lab.title': 'Interactive Note: Time Series Dynamics & Causal Intervention',
      'lab.subtitle': 'Real-time stochastic process Y<sub>t</sub> = φY<sub>t−1</sub> + τ·I<sub>t</sub> + ε<sub>t</sub> with counterfactual & 95% band.',
      'lab.shock_btn': 'Causal pulse (τ)',
      'lab.simulate_btn': 'Pause',
      'lab.resume_btn': 'Resume',
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
  let isPaused = false;

  function updatePauseButtonLabel() {
    const resimBtn = document.getElementById('resimulate-btn');
    if (!resimBtn) return;
    const key = isPaused ? 'lab.resume_btn' : 'lab.simulate_btn';
    resimBtn.textContent = translations[currentLang][key];
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    updatePauseButtonLabel();
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

  /* 4. CONTINUOUSLY MOVING TIME SERIES WITH CAUSAL INTERVENTION & COUNTERFACTUAL */
  const tsCanvas = document.getElementById('regressionCanvas');
  const phiSlider = document.getElementById('sample-size-slider');
  const sigmaSlider = document.getElementById('noise-slider');
  const phiValEl = document.getElementById('sample-size-val');
  const sigmaValEl = document.getElementById('noise-val');
  const pauseBtn = document.getElementById('resimulate-btn');
  const shockBtn = document.getElementById('shock-btn');
  const ytValEl = document.getElementById('ols-estimates');
  const tauValEl = document.getElementById('r2-value');

  const WINDOW_SIZE = 120;
  const STEP_INTERVAL_MS = 95; // Smooth streaming speed
  let seriesHistory = [];
  let yObs = 0;
  let yCf = 0; // Counterfactual (without intervention)
  let activeShock = 0;
  let lastStepTime = performance.now();
  let scrollProgress = 0;

  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function getParams() {
    const phi = phiSlider ? parseFloat(phiSlider.value) : 0.82;
    const sigma = sigmaSlider ? parseFloat(sigmaSlider.value) : 0.55;
    if (phiValEl) phiValEl.textContent = phi.toFixed(2);
    if (sigmaValEl) sigmaValEl.textContent = sigma.toFixed(2);
    return { phi, sigma };
  }

  function advanceTimeSeries(isInitial = false) {
    const { phi, sigma } = getParams();
    const eps = randn() * sigma;

    // Counterfactual evolves purely by AR(1)
    yCf = phi * yCf + eps;

    // Observed series includes decaying causal impulse / level effect
    yObs = phi * yObs + activeShock + eps;
    activeShock *= 0.88; // Decay impulse smoothly
    if (Math.abs(activeShock) < 0.01) activeShock = 0;

    // Stationary/conditional 95% band width
    const stationarySd = sigma / Math.sqrt(Math.max(0.08, 1 - phi * phi));
    const ci95 = 1.96 * stationarySd * 0.65;

    const isInterventionPoint = !isInitial && seriesHistory.length > 0 && seriesHistory._justShocked;
    if (seriesHistory._justShocked) seriesHistory._justShocked = false;

    seriesHistory.push({
      yObs,
      yCf,
      ci: ci95,
      shockMarker: isInterventionPoint
    });

    if (seriesHistory.length > WINDOW_SIZE + 2) {
      seriesHistory.shift();
    }

    if (!isInitial && ytValEl && tauValEl) {
      const causalEffect = yObs - yCf;
      ytValEl.innerHTML = `Y<sub>t</sub> = ${yObs >= 0 ? '+' : ''}${yObs.toFixed(2)}`;
      tauValEl.innerHTML = `τ̂<sub>t</sub> = ${causalEffect >= 0 ? '+' : ''}${causalEffect.toFixed(2)}`;
    }
  }

  // Initialize buffer
  for (let i = 0; i < WINDOW_SIZE + 2; i++) {
    advanceTimeSeries(true);
  }

  function drawTimeSeries(frac) {
    if (!tsCanvas || seriesHistory.length < 4) return;
    const ctx = tsCanvas.getContext('2d');
    const w = tsCanvas.width;
    const h = tsCanvas.height;
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';

    ctx.clearRect(0, 0, w, h);

    const padL = 34, padR = 14, padT = 14, padB = 22;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const yMin = -4.8, yMax = 4.8;
    const toPxY = y => {
      const clamped = Math.max(yMin, Math.min(yMax, y));
      return padT + plotH - ((clamped - yMin) / (yMax - yMin)) * plotH;
    };

    const n = WINDOW_SIZE;
    const toPxX = (idx) => padL + ((idx - frac) / (n - 1)) * plotW;

    // Subtle horizontal zero baseline & Tufte bottom axis
    const zeroY = toPxY(0);
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, zeroY);
    ctx.lineTo(padL + plotW, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = isDark ? '#2e3136' : '#dcdcd6';
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Y-axis minimal labels (+3, 0, -3)
    ctx.fillStyle = isDark ? '#6e6e6a' : '#8c8c84';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('+3', padL - 6, toPxY(3));
    ctx.fillText('0', padL - 6, zeroY);
    ctx.fillText('-3', padL - 6, toPxY(-3));

    ctx.save();
    ctx.beginPath();
    ctx.rect(padL, padT, plotW, plotH);
    ctx.clip();

    // 1. 95% Credible / Confidence Interval Band around Counterfactual/Process
    ctx.beginPath();
    for (let i = 0; i < seriesHistory.length; i++) {
      const pt = seriesHistory[i];
      const px = toPxX(i);
      const py = toPxY(pt.yCf + pt.ci);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = seriesHistory.length - 1; i >= 0; i--) {
      const pt = seriesHistory[i];
      const px = toPxX(i);
      const py = toPxY(pt.yCf - pt.ci);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.11)' : 'rgba(15, 76, 129, 0.08)';
    ctx.fill();

    // 2. Shaded Causal Effect Area between Observed and Counterfactual when diverged
    ctx.beginPath();
    for (let i = 0; i < seriesHistory.length; i++) {
      const px = toPxX(i);
      const py = toPxY(seriesHistory[i].yObs);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = seriesHistory.length - 1; i >= 0; i--) {
      const px = toPxX(i);
      const py = toPxY(seriesHistory[i].yCf);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.18)' : 'rgba(15, 76, 129, 0.14)';
    ctx.fill();

    // 3. Vertical intervention markers (t₀)
    for (let i = 0; i < seriesHistory.length; i++) {
      if (seriesHistory[i].shockMarker) {
        const sx = toPxX(i);
        ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.65)' : 'rgba(180, 83, 9, 0.55)';
        ctx.lineWidth = 1.1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(sx, padT);
        ctx.lineTo(sx, padT + plotH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('t₀ (τ)', sx + 4, padT + 10);
      }
    }

    // 4. Counterfactual Trajectory (Dashed)
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    for (let i = 0; i < seriesHistory.length; i++) {
      const px = toPxX(i);
      const py = toPxY(seriesHistory[i].yCf);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = isDark ? '#787872' : '#94948c';
    ctx.lineWidth = 1.25;
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Observed Time Series Y_t (Solid Smooth Line)
    ctx.beginPath();
    for (let i = 0; i < seriesHistory.length; i++) {
      const px = toPxX(i);
      const py = toPxY(seriesHistory[i].yObs);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = isDark ? '#60a5fa' : '#0f4c81';
    ctx.lineWidth = 1.85;
    ctx.stroke();

    // Live leading pulse dot at the right edge
    const lastIdx = seriesHistory.length - 2;
    const nextIdx = seriesHistory.length - 1;
    if (lastIdx >= 0) {
      const interpY = seriesHistory[lastIdx].yObs * (1 - frac) + seriesHistory[nextIdx].yObs * frac;
      const headX = toPxX(lastIdx + frac);
      const headY = toPxY(interpY);

      ctx.beginPath();
      ctx.arc(headX, headY, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#60a5fa' : '#0f4c81';
      ctx.fill();
    }

    ctx.restore();
  }

  function animateLoop(now) {
    if (!isPaused) {
      const elapsed = now - lastStepTime;
      if (elapsed >= STEP_INTERVAL_MS) {
        advanceTimeSeries(false);
        lastStepTime = now - (elapsed % STEP_INTERVAL_MS);
      }
      scrollProgress = (now - lastStepTime) / STEP_INTERVAL_MS;
    }
    drawTimeSeries(scrollProgress);
    requestAnimationFrame(animateLoop);
  }

  if (phiSlider) phiSlider.addEventListener('input', getParams);
  if (sigmaSlider) sigmaSlider.addEventListener('input', getParams);

  if (shockBtn) {
    shockBtn.addEventListener('click', () => {
      // Inject a clean positive or negative causal shock
      const sign = yObs > 1.2 ? -1 : 1;
      activeShock += sign * 2.1;
      seriesHistory._justShocked = true;
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      lastStepTime = performance.now();
      updatePauseButtonLabel();
    });
  }

  // Trigger an initial subtle causal pulse after 1.5s so visitors immediately see the counterfactual comparison
  setTimeout(() => {
    activeShock = 1.85;
    seriesHistory._justShocked = true;
  }, 1200);

  requestAnimationFrame(animateLoop);
});
