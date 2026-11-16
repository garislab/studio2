/**
 * ============================================================================
 * GARIS CERITA STUDIO (PT GARIS CERITA KARYA / GCK)
 * REVISED 2D SKETCH PARALLAX ARCHITECTURE STUDIO WEBSITE
 * ============================================================================
 * Mengelola ruang sketsa 2D interaktif dengan efek multi-layer paralaks,
 * 5 tombol tautan menu langsung di dalam gambar sketsa (About Studio,
 * Portfolio, Research & Lab, Archive/History, dan Contact), zoom halus ke
 * objek sketsa, sinkronisasi live GitHub API @garislab, efek dering telepon
 * mekanik (Web Audio API), serta tampilan responsif untuk HP, Tablet, & Desktop.
 */

class GarisCeritaApp {
  constructor() {
    this.data = window.STUDIO_DATA;
    this.sound = window.soundEngine;

    this.activeOverlay = null;
    this.selectedProjectId = null;
    this.portfolioFilter = "all";
    this.portfolioSearch = "";
    this.labFilter = "all";
    this.aboutTab = "philosophy";
    this.teamFilter = "all";
    this.archiveTab = "history";
    this.modalOpenTimer = null;
    this.phoneShakeTimer = null;

    this.githubCacheKey = "gck_garislab_repos_v1";
    this.githubRepos = null;
    this.githubStatus = "loading";

    // Parallax state
    this.viewport = document.getElementById("sketch-parallax-viewport");
    this.sceneFrame = document.getElementById("sketch-scene-frame");
    this.zoomRig = document.getElementById("sketch-zoom-rig");
    this.parallaxPlanes = Array.from(document.querySelectorAll(".parallax-plane[data-depth]"));

    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.lastPointerMoveTime = 0;
    this.isFitMode = false;

    this._initParallaxEngine();
    this._initParticlesCanvas();
    this._bindInSketchMenuLinks();
    this._bindGlobalControls();
    this._centerMobileStageOnLoad();
    this._prefetchGitHubRepos();
    this._hideLoadingScreen();
  }

  // --------------------------------------------------------------------------
  // 1. MULTI-PLANE 2D SKETCH PARALLAX ENGINE (MOUSE, TOUCH, GYRO & BREATHING)
  // --------------------------------------------------------------------------
  _initParallaxEngine() {
    window.addEventListener(
      "pointermove",
      (e) => {
        if (this.activeOverlay) return;
        const nx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
        const ny = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
        this.targetX = Math.max(-1, Math.min(1, nx));
        this.targetY = Math.max(-1, Math.min(1, ny));
        this.lastPointerMoveTime = performance.now();
      },
      { passive: true }
    );

    // Subtle gyroscope parallax support on mobile/tablet
    window.addEventListener(
      "deviceorientation",
      (e) => {
        if (this.activeOverlay || e.gamma === null || e.beta === null) return;
        const gx = Math.max(-1, Math.min(1, e.gamma / 28));
        const gy = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
        this.targetX = gx * 0.75;
        this.targetY = gy * 0.75;
        this.lastPointerMoveTime = performance.now();
      },
      { passive: true }
    );

    // Update parallax slightly when horizontal touch-scrolling on portrait mobile
    if (this.viewport) {
      this.viewport.addEventListener(
        "scroll",
        () => {
          const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
          if (maxScroll > 10) {
            const ratio = (this.viewport.scrollLeft / maxScroll - 0.5) * 2;
            this.targetX = Math.max(-1, Math.min(1, ratio * 0.85));
            this.lastPointerMoveTime = performance.now();
          }
        },
        { passive: true }
      );
    }

    const tick = (now) => {
      // Gentle organic breathing motion when pointer is idle
      const idleElapsed = now - this.lastPointerMoveTime;
      let goalX = this.targetX;
      let goalY = this.targetY;

      if (idleElapsed > 2200 && !this.activeOverlay) {
        const t = now * 0.00075;
        goalX = Math.sin(t) * 0.28;
        goalY = Math.cos(t * 0.82) * 0.22;
      }

      this.currentX += (goalX - this.currentX) * 0.075;
      this.currentY += (goalY - this.currentY) * 0.075;

      const isCompact = window.innerWidth <= 900;
      const maxShiftX = isCompact ? 10 : 22;
      const maxShiftY = isCompact ? 6 : 14;

      for (let i = 0; i < this.parallaxPlanes.length; i++) {
        const plane = this.parallaxPlanes[i];
        const depth = parseFloat(plane.dataset.depth || "0.5");
        const dx = (-this.currentX * depth * maxShiftX).toFixed(2);
        const dy = (-this.currentY * depth * maxShiftY).toFixed(2);
        plane.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  // --------------------------------------------------------------------------
  // 2. FLOATING ARCHITECTURAL SUNLIGHT DUST & DRAFTING PARTICLES
  // --------------------------------------------------------------------------
  _initParticlesCanvas() {
    const canvas = document.getElementById("sketch-particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth || 1376;
      canvas.height = canvas.clientHeight || 768;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = 28;
    const particles = Array.from({ length: count }, (_, idx) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: -0.00012 - Math.random() * 0.00024,
      alpha: 0.18 + Math.random() * 0.36,
      isCross: idx % 7 === 0
    }));

    const drawParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const pxOffset = -this.currentX * 16;
      const pyOffset = -this.currentY * 10;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const sx = p.x * w + pxOffset;
        const sy = p.y * h + pyOffset;

        if (p.isCross) {
          ctx.strokeStyle = `rgba(224, 122, 46, ${p.alpha * 0.75})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(sx - 3.5, sy);
          ctx.lineTo(sx + 3.5, sy);
          ctx.moveTo(sx, sy - 3.5);
          ctx.lineTo(sx, sy + 3.5);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 245, 222, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(drawParticles);
    };

    requestAnimationFrame(drawParticles);
  }

  // --------------------------------------------------------------------------
  // 3. SYNCHRONIZED IN-SKETCH MENU LINKS, HOVER STATES & OBJECT ZOOM
  // --------------------------------------------------------------------------
  _bindInSketchMenuLinks() {
    const interactiveTargets = document.querySelectorAll("[data-menu-target]");

    interactiveTargets.forEach((el) => {
      const sectionId = el.dataset.menuTarget;

      el.addEventListener("mouseenter", () => {
        this._setMenuHoverState(sectionId, true);
        if (this.sound) this.sound.playHoverTick();
      });

      el.addEventListener("mouseleave", () => {
        this._setMenuHoverState(sectionId, false);
      });

      el.addEventListener("focus", () => {
        this._setMenuHoverState(sectionId, true);
      });

      el.addEventListener("blur", () => {
        this._setMenuHoverState(sectionId, false);
      });

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openSection(sectionId);
      });

      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openSection(sectionId);
        }
      });
    });
  }

  _setMenuHoverState(sectionId, isHovered) {
    document
      .querySelectorAll(`.sketch-object-hitbox[data-menu-target="${sectionId}"]`)
      .forEach((box) => box.classList.toggle("is-hovered", isHovered));

    document
      .querySelectorAll(`.sketch-menu-node[data-menu-node="${sectionId}"]`)
      .forEach((node) => node.classList.toggle("is-hovered", isHovered));

    document
      .querySelectorAll(`.portrait-sketch-card[data-menu-target="${sectionId}"]`)
      .forEach((card) => card.classList.toggle("active", isHovered));
  }

  zoomSketchToObject(sectionId) {
    if (!this.zoomRig) return;

    // Scroll portrait mobile stage to center the selected object first
    this._scrollMobileViewportToObject(sectionId);

    const targets = {
      about: { origin: "13.2% 34.5%", scale: 1.85 },
      portfolio: { origin: "31.0% 41.5%", scale: 1.78 },
      lab: { origin: "53.8% 45.0%", scale: 1.88 },
      archive: { origin: "75.0% 38.0%", scale: 1.72 },
      contact: { origin: "14.8% 53.5%", scale: 1.95 }
    };

    const t = targets[sectionId];
    if (t) {
      this.zoomRig.style.transformOrigin = t.origin;
      this.zoomRig.style.transform = `scale(${t.scale})`;
    }
  }

  resetSketchZoom() {
    if (!this.zoomRig) return;
    this.zoomRig.style.transform = "scale(1)";
  }

  _scrollMobileViewportToObject(sectionId) {
    if (!this.viewport || this.isFitMode) return;
    const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
    if (maxScroll <= 10) return;

    const xCenters = {
      about: 0.12,
      contact: 0.14,
      portfolio: 0.32,
      lab: 0.54,
      archive: 0.80
    };
    const ratio = xCenters[sectionId] ?? 0.42;
    const targetLeft = Math.max(
      0,
      Math.min(
        maxScroll,
        ratio * this.viewport.scrollWidth - this.viewport.clientWidth * 0.5
      )
    );
    this.viewport.scrollTo({ left: targetLeft, behavior: "smooth" });
  }

  _centerMobileStageOnLoad() {
    setTimeout(() => {
      if (!this.viewport) return;
      const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
      if (maxScroll > 20) {
        // Center initially on the drafting board & computer desk
        this.viewport.scrollLeft = maxScroll * 0.36;
      }
    }, 120);
  }

  _triggerPhoneSketchAnimation() {
    const phoneBox = document.getElementById("sketch-phone-object");
    if (!phoneBox) return;
    phoneBox.classList.add("phone-ringing-anim");
    if (this.phoneShakeTimer) clearTimeout(this.phoneShakeTimer);
    this.phoneShakeTimer = setTimeout(() => {
      phoneBox.classList.remove("phone-ringing-anim");
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 4. GLOBAL UI CONTROLS (SOUND MUTE, MOBILE FIT SWITCHER, MODAL BACKDROP)
  // --------------------------------------------------------------------------
  _bindGlobalControls() {
    // Top-left brand click resets zoom / closes modal
    document.getElementById("btn-brand-reset")?.addEventListener("click", () => {
      this.closeOverlay(true);
    });

    // Sound toggle buttons (in-sketch & mobile pill)
    const updateSoundButtons = (muted) => {
      const icon = muted ? "🔇" : "🔊";
      const btnDesktop = document.querySelector("#btn-sound-toggle .sound-icon");
      const btnMobile = document.getElementById("btn-sound-mobile");
      if (btnDesktop) btnDesktop.textContent = icon;
      if (btnMobile) btnMobile.textContent = icon;
    };

    const handleSoundToggle = () => {
      if (!this.sound) return;
      const muted = this.sound.toggleMute();
      updateSoundButtons(muted);
    };

    document.getElementById("btn-sound-toggle")?.addEventListener("click", handleSoundToggle);
    document.getElementById("btn-sound-mobile")?.addEventListener("click", handleSoundToggle);

    // Mobile/Tablet Fit vs Pan-Explore Switcher
    const fitBtn = document.getElementById("btn-mobile-fit");
    const fitLabel = document.getElementById("mobile-fit-label");
    if (fitBtn && this.viewport) {
      fitBtn.addEventListener("click", () => {
        this.isFitMode = !this.isFitMode;
        this.viewport.classList.toggle("fit-mode", this.isFitMode);
        if (fitLabel) {
          fitLabel.textContent = this.isFitMode ? "🔍 Perbesar Sketsa" : "🖼️ Lihat Utuh";
        }
        if (!this.isFitMode) {
          this._centerMobileStageOnLoad();
        }
      });
    }

    // Close Modal on Backdrop Click & Escape Key
    const backdrop = document.getElementById("overlay-backdrop");
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) this.closeOverlay(true);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeOverlay) {
        this.closeOverlay(true);
      }
    });
  }

  _hideLoadingScreen() {
    setTimeout(() => {
      const loader = document.getElementById("loading-screen");
      if (loader) loader.classList.add("hidden");
    }, 420);
  }

  // --------------------------------------------------------------------------
  // 5. OPEN / CLOSE OVERLAY MODAL & OBJECT ZOOM TRANSITION
  // --------------------------------------------------------------------------
  openSection(sectionId) {
    if (this.modalOpenTimer) clearTimeout(this.modalOpenTimer);

    document.querySelectorAll(".portrait-sketch-card").forEach((c) => {
      c.classList.toggle("active", c.dataset.menuTarget === sectionId);
    });

    if (sectionId === "contact") {
      this._triggerPhoneSketchAnimation();
      if (this.sound) {
        this.sound.playTelephoneRingSequence((status) => {
          this._updatePhoneVisualizerUI(status);
        });
      }
    } else if (this.sound) {
      this.sound.playPaperZoom();
    }

    this.zoomSketchToObject(sectionId);
    this.activeOverlay = sectionId;
    this._renderOverlayContent(sectionId);

    this.modalOpenTimer = setTimeout(() => {
      const backdrop = document.getElementById("overlay-backdrop");
      if (backdrop && this.activeOverlay === sectionId) {
        backdrop.classList.add("open");
      }
    }, 320);
  }

  closeOverlay(resetZoom = true) {
    if (this.modalOpenTimer) clearTimeout(this.modalOpenTimer);
    this.activeOverlay = null;
    this.selectedProjectId = null;
    if (this.sound) this.sound.stopPhoneRing();

    const phoneBox = document.getElementById("sketch-phone-object");
    phoneBox?.classList.remove("phone-ringing-anim");

    document.querySelectorAll(".portrait-sketch-card").forEach((c) => {
      c.classList.remove("active");
    });

    const backdrop = document.getElementById("overlay-backdrop");
    backdrop?.classList.remove("open");

    if (resetZoom) {
      this.resetSketchZoom();
    }
  }

  // --------------------------------------------------------------------------
  // 6. SINKRONISASI LIVE GITHUB REST API (@garislab)
  // --------------------------------------------------------------------------
  async _prefetchGitHubRepos() {
    try {
      const cached = sessionStorage.getItem(this.githubCacheKey);
      if (cached) {
        this.githubRepos = JSON.parse(cached);
        this.githubStatus = "cached";
        return;
      }

      const apiUrl =
        this.data.lab?.githubApiUrl ||
        "https://api.github.com/users/garislab/repos?sort=updated&per_page=20";
      const res = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
      const repos = await res.json();
      if (Array.isArray(repos)) {
        this.githubRepos = repos;
        this.githubStatus = "live";
        sessionStorage.setItem(this.githubCacheKey, JSON.stringify(repos));
        if (this.activeOverlay === "lab") {
          const win = document.getElementById("sketch-window");
          if (win) this._renderLabWindow(win);
        }
      }
    } catch (err) {
      this.githubStatus = "offline";
      console.info("GitHub API menggunakan katalog lokal GarisLab:", err.message);
    }
  }

  _findLiveRepoMeta(repoName) {
    if (!Array.isArray(this.githubRepos) || !repoName) return null;
    return this.githubRepos.find(
      (r) => r.name.toLowerCase() === repoName.toLowerCase()
    );
  }

  // --------------------------------------------------------------------------
  // 7. ROUTER RENDER KONTEN MODAL STUDIO
  // --------------------------------------------------------------------------
  _renderOverlayContent(sectionId) {
    const win = document.getElementById("sketch-window");
    if (!win) return;

    switch (sectionId) {
      case "portfolio":
        this._renderPortfolioWindow(win);
        break;
      case "lab":
        this._renderLabWindow(win);
        break;
      case "about":
        this._renderAboutWindow(win);
        break;
      case "archive":
        this._renderArchiveWindow(win);
        break;
      case "contact":
        this._renderContactWindow(win);
        break;
      default:
        break;
    }
  }

  // ==========================================================================
  // A. PAPAN TULIS -> PORTFOLIO DESAIN PERUSAHAAN (22 PROYEK PDF + CURATED)
  // ==========================================================================
  _renderPortfolioWindow(win) {
    if (this.selectedProjectId) {
      const proj = this.data.portfolio.find((p) => p.id === this.selectedProjectId);
      if (proj) {
        this._renderProjectDetailView(win, proj);
        return;
      }
    }

    const filtered = this.data.portfolio.filter((p) => {
      const matchCat =
        this.portfolioFilter === "all" || p.category.includes(this.portfolioFilter);
      const q = this.portfolioSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.program.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">PAPAN TULIS · PORTFOLIO</span>
          <div>
            <h2 class="window-title">Karya Desain &amp; Masterplan — PT Garis Cerita Karya (${this.data.portfolio.length} Proyek)</h2>
            <div class="window-subtitle">Semua Proyek · Arsitektur · Perkotaan · Interior · Lanskap · Lainnya</div>
          </div>
        </div>
        <div class="window-header-actions">
          <button class="back-studio-btn" id="btn-back-studio">← Kembali ke Sketsa Studio</button>
          <button class="window-close-btn" id="btn-close-win" aria-label="Tutup">×</button>
        </div>
      </div>

      <div class="window-tabs-bar">
        <div class="tab-pills">
          ${this.data.portfolioCategories
            .map(
              (cat) => `
            <button class="tab-pill ${this.portfolioFilter === cat.id ? "active" : ""}" data-port-cat="${cat.id}">
              ${cat.label}
            </button>
          `
            )
            .join("")}
        </div>
        <input
          type="search"
          id="portfolio-search"
          class="portfolio-search-input"
          placeholder="Cari proyek, kota, atau klien..."
          value="${this.portfolioSearch}"
        />
      </div>

      <div class="window-body">
        <div class="portfolio-grid">
          ${filtered
            .map(
              (item) => `
            <article class="project-card" data-project-id="${item.id}">
              <div class="project-thumb-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <span class="project-year-tag">${item.year}</span>
                <span class="project-cat-tag">${item.categoryLabel}</span>
              </div>
              <div class="project-card-body">
                <h3 class="project-card-title">${item.title}</h3>
                <div class="project-card-loc">📍 ${item.location} · ${item.client}</div>
                <p class="project-card-desc">${item.summary}</p>
                <div class="project-meta-row">
                  <span>Lahan: <strong>${item.siteArea}</strong></span>
                  <span>Bangunan: <strong>${item.builtArea}</strong></span>
                </div>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    this._bindWindowHeaderClose(win);

    win.querySelectorAll("[data-port-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.portfolioFilter = btn.dataset.portCat;
        this._renderPortfolioWindow(win);
      });
    });

    const searchInput = win.querySelector("#portfolio-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.portfolioSearch = e.target.value;
        this._renderPortfolioWindow(win);
        const refocused = win.querySelector("#portfolio-search");
        if (refocused) {
          refocused.focus();
          refocused.setSelectionRange(refocused.value.length, refocused.value.length);
        }
      });
    }

    win.querySelectorAll("[data-project-id]").forEach((card) => {
      card.addEventListener("click", () => {
        this.selectedProjectId = card.dataset.projectId;
        if (this.sound) this.sound.playPaperZoom();
        this._renderPortfolioWindow(win);
      });
    });
  }

  _renderProjectDetailView(win, proj) {
    const idx = this.data.portfolio.findIndex((p) => p.id === proj.id);
    const prevProj =
      this.data.portfolio[(idx - 1 + this.data.portfolio.length) % this.data.portfolio.length];
    const nextProj = this.data.portfolio[(idx + 1) % this.data.portfolio.length];

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">LEMBAR DETAIL ARSITEKTUR</span>
          <div>
            <h2 class="window-title">${proj.title}</h2>
            <div class="window-subtitle">${proj.subtitle}</div>
          </div>
        </div>
        <div class="window-header-actions">
          <button class="back-studio-btn" id="btn-back-grid">← Kembali ke Daftar Portofolio</button>
          <button class="window-close-btn" id="btn-close-win">×</button>
        </div>
      </div>

      <div class="window-body">
        <div class="project-detail-sheet">
          <div class="detail-gallery">
            <img src="${proj.image}" alt="${proj.title}" />
            <img src="${proj.secondaryImage || proj.image}" alt="Visualisasi ${proj.title}" />
          </div>

          <div class="detail-specs-grid">
            <div class="spec-box">
              <div class="spec-label">Lokasi &amp; Tahun</div>
              <div class="spec-val">${proj.location} (${proj.year})</div>
            </div>
            <div class="spec-box">
              <div class="spec-label">Klien / Mitra</div>
              <div class="spec-val">${proj.client}</div>
            </div>
            <div class="spec-box">
              <div class="spec-label">Luas Tapak (Site Area)</div>
              <div class="spec-val">${proj.siteArea}</div>
            </div>
            <div class="spec-box">
              <div class="spec-label">Luas Bangunan (GFA)</div>
              <div class="spec-val">${proj.builtArea}</div>
            </div>
            <div class="spec-box">
              <div class="spec-label">Program Ruang</div>
              <div class="spec-val">${proj.program}</div>
            </div>
            <div class="spec-box">
              <div class="spec-label">Lingkup Pekerjaan GCK</div>
              <div class="spec-val">${proj.scope}</div>
            </div>
          </div>

          <h3 style="font-family:var(--font-display);margin-bottom:8px;">Narasi &amp; Konsep Perancangan</h3>
          <p style="color:var(--ink-secondary);line-height:1.65;margin-bottom:14px;">${proj.summary}</p>
          <ul style="padding-left:20px;color:var(--ink-secondary);line-height:1.65;margin-bottom:20px;">
            ${(proj.conceptDetails || []).map((c) => `<li style="margin-bottom:6px;">${c}</li>`).join("")}
          </ul>

          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-top:2px dashed rgba(38,33,29,0.2);padding-top:16px;">
            <button class="btn-sketch-secondary" id="btn-prev-proj">← ${prevProj.title}</button>
            <button class="btn-sketch-primary" id="btn-consult-proj">📞 Diskusikan Proyek Serupa</button>
            <button class="btn-sketch-secondary" id="btn-next-proj">${nextProj.title} →</button>
          </div>
        </div>
      </div>
    `;

    this._bindWindowHeaderClose(win);
    win.querySelector("#btn-back-grid").addEventListener("click", () => {
      this.selectedProjectId = null;
      this._renderPortfolioWindow(win);
    });
    win.querySelector("#btn-prev-proj").addEventListener("click", () => {
      this.selectedProjectId = prevProj.id;
      this._renderPortfolioWindow(win);
    });
    win.querySelector("#btn-next-proj").addEventListener("click", () => {
      this.selectedProjectId = nextProj.id;
      this._renderPortfolioWindow(win);
    });
    win.querySelector("#btn-consult-proj").addEventListener("click", () => {
      this.openSection("contact");
    });
  }

  // ==========================================================================
  // B. KOMPUTER -> RESEARCH & LAB STUDI (FEASIBILITY STUDY, BIM & GITHUB)
  // ==========================================================================
  _renderLabWindow(win) {
    const items = this.data.lab.items.filter(
      (item) => this.labFilter === "all" || item.category === this.labFilter
    );

    const knownRepoNames = new Set(
      this.data.lab.items
        .map((i) => (i.repoName || "").toLowerCase())
        .concat(["home"])
    );

    const extraRepos = Array.isArray(this.githubRepos)
      ? this.githubRepos.filter(
          (r) => !knownRepoNames.has((r.name || "").toLowerCase()) && !r.fork
        )
      : [];

    const syncBadge =
      this.githubStatus === "live" || this.githubStatus === "cached"
        ? `<span class="github-live-pill"><span class="github-live-dot"></span>GitHub Live Sync: ${this.githubRepos?.length || 9} repo @garislab</span>`
        : `<span class="github-live-pill"><span class="github-live-dot"></span>Terverifikasi: 8 Repo Aktif @garislab</span>`;

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">KOMPUTER STUDIO · RESEARCH &amp; LAB</span>
          <div>
            <h2 class="window-title">Garis Cerita Lab (@garislab) — Katalog Riset &amp; Repositori</h2>
            <div class="window-subtitle">Feasibility Study Dashboard · Urban Study &amp; Data · Design Lab (Parametric / BIM)</div>
          </div>
        </div>
        <div class="window-header-actions">
          <a href="${this.data.lab.githubOrgUrl}?tab=repositories" target="_blank" rel="noopener noreferrer" class="btn-sketch-secondary" style="padding:6px 12px;">
            🐙 GitHub @garislab ↗
          </a>
          <button class="back-studio-btn" id="btn-back-studio">← Kembali ke Sketsa Studio</button>
          <button class="window-close-btn" id="btn-close-win">×</button>
        </div>
      </div>

      <div class="window-tabs-bar">
        <div class="tab-pills">
          ${this.data.lab.categories
            .map(
              (c) => `
            <button class="tab-pill ${this.labFilter === c.id ? "active" : ""}" data-lab-cat="${c.id}">
              <span>${c.label}</span>
              ${c.badge ? `<span class="pill-badge">${c.badge}</span>` : `<span class="pill-badge">${c.count}</span>`}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="window-body">
        <!-- Dark Dashboard Board Matching User's Sketch Concept -->
        <div class="concept-lab-dark-board">
          <div class="concept-lab-dark-head">
            <strong>RESEARCH &amp; LAB — MONITOR STUDIO</strong>
            <a href="${this.data.lab.githubOrgUrl}?tab=repositories" target="_blank" rel="noopener noreferrer" class="concept-github-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.39-3.87-1.39-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <div class="concept-lab-tiles-grid">
            <button type="button" class="concept-lab-tile ${this.labFilter === "feasibility" ? "active" : ""}" data-lab-cat="feasibility">
              <span class="concept-tile-icon">📊</span>
              <span class="concept-tile-text">
                <strong>Feasibility Study Dashboard</strong>
                <small>PSA_Mblock &amp; PSA_LB Live Web App</small>
              </span>
            </button>
            <button type="button" class="concept-lab-tile" data-embed-url="https://garislab.github.io/PSA_LB/" data-embed-title="Urban Study &amp; Data — PSA_LB Lebak Bulus">
              <span class="concept-tile-icon">📍</span>
              <span class="concept-tile-text">
                <strong>Urban Study &amp; Data</strong>
                <small>GIS, TOD Lebak Bulus &amp; Kawasan</small>
              </span>
            </button>
            <button type="button" class="concept-lab-tile ${this.labFilter === "bim" ? "active" : ""}" data-lab-cat="bim">
              <span class="concept-tile-icon">🧊</span>
              <span class="concept-tile-text">
                <strong>Design Lab (Parametric / BIM)</strong>
                <small>5D Dashboard &amp; BIM Simulation</small>
              </span>
            </button>
            <button type="button" class="concept-lab-tile ${this.labFilter === "tools" ? "active" : ""}" data-lab-cat="tools">
              <span class="concept-tile-icon">⋯</span>
              <span class="concept-tile-text">
                <strong>Lainnya... (Plugin &amp; Tools)</strong>
                <small>Revit, SketchUp &amp; Automation</small>
              </span>
            </button>
          </div>
        </div>

        <div class="live-repo-banner">
          <div>
            <strong>Akun GitHub Resmi: <code>github.com/garislab</code> (Garis Cerita Lab)</strong>
            <span style="color:var(--ink-secondary);"> — Menampilkan daftar repositori asli beserta tangkapan layar (screenshot) halaman live &amp; repo.</span>
          </div>
          ${syncBadge}
        </div>

        <!-- Lightbox Preview Screenshot Halaman -->
        <div id="lab-ss-lightbox" class="sketch-panel lab-ss-lightbox" style="display:none;">
          <div class="lab-ss-lightbox-head">
            <strong id="lab-ss-lightbox-title" style="font-family:var(--font-mono);font-size:0.82rem;">📸 Screenshot Halaman</strong>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <a id="lab-ss-lightbox-link" href="https://github.com/garislab" target="_blank" rel="noopener noreferrer" class="btn-sketch-primary" style="padding:5px 10px;font-size:0.74rem;">Buka Halaman Asli ↗</a>
              <button id="btn-close-ss-lightbox" class="btn-sketch-secondary" style="padding:5px 10px;font-size:0.74rem;">Tutup Screenshot ×</button>
            </div>
          </div>
          <img id="lab-ss-lightbox-img" src="" alt="Preview Screenshot" />
        </div>

        <!-- Embedded Live Preview Container untuk Web App GitHub Pages -->
        <div id="lab-iframe-container" style="display:none;margin-bottom:20px;" class="sketch-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <strong id="lab-iframe-title" style="font-family:var(--font-mono);font-size:0.82rem;">🖥️ LIVE MONITOR PREVIEW: https://garislab.github.io/PSA_Mblock/</strong>
            <div style="display:flex;gap:8px;">
              <a id="lab-iframe-ext" href="https://garislab.github.io/PSA_Mblock/" target="_blank" rel="noopener noreferrer" class="btn-sketch-primary" style="padding:5px 10px;font-size:0.74rem;">Buka Layar Penuh ↗</a>
              <button id="btn-close-iframe" class="btn-sketch-secondary" style="padding:5px 10px;font-size:0.74rem;">Tutup Preview</button>
            </div>
          </div>
          <iframe
            id="lab-live-iframe"
            src=""
            title="GarisLab Live Web App Preview"
            style="width:100%;height:480px;border:2px solid var(--border-ink);border-radius:8px;background:#141a1d;"
          ></iframe>
        </div>

        <div class="lab-cards-grid">
          ${items
            .map((item) => {
              const liveMeta = this._findLiveRepoMeta(item.repoName);
              const liveInfo = liveMeta
                ? ` · ★ ${liveMeta.stargazers_count} · ${liveMeta.language || item.language || "Web"}`
                : item.language
                ? ` · ${item.language}`
                : "";
              const displayUrl = (item.hasLivePages ? item.liveUrl : item.repoUrl).replace(/^https?:\/\//, "");

              return `
                <article class="lab-card ${item.featured ? "featured-lab" : ""}">
                  <div class="lab-card-top">
                    <span class="lab-code-pill">${item.code}</span>
                    <span class="lab-status-pill">${item.status} · ${item.year}${liveInfo}</span>
                  </div>

                  <h3 class="lab-card-title">${item.title}</h3>

                  ${
                    item.screenshot
                      ? `
                    <div class="lab-ss-frame" data-ss-src="${item.screenshot}" data-ss-title="${item.title} — ${item.screenshotCaption || displayUrl}" data-ss-url="${item.hasLivePages ? item.liveUrl : item.repoUrl}">
                      <div class="lab-ss-browser-bar">
                        <span class="lab-ss-dots"><i></i><i></i><i></i></span>
                        <span class="lab-ss-url">${displayUrl}</span>
                        <span class="lab-ss-mode-badge ${item.hasLivePages ? "live" : "repo"}">${item.hasLivePages ? "LIVE PAGE" : "GITHUB REPO"}</span>
                      </div>
                      <div class="lab-ss-img-wrap">
                        <img src="${item.screenshot}" alt="Screenshot ${item.title}" loading="lazy" />
                        <span class="lab-ss-zoom-pill">🔍 Perbesar Screenshot</span>
                      </div>
                      ${
                        item.screenshotCaption
                          ? `<div class="lab-ss-caption">${item.screenshotCaption}</div>`
                          : ""
                      }
                    </div>
                  `
                      : ""
                  }

                  <p class="lab-card-desc">${item.description}</p>

                  <div class="lab-visual-preview">
                    ${item.metrics
                      .map(
                        (m) => `
                      <div class="lab-metric-item">
                        <div class="lab-metric-label">${m.label}</div>
                        <div class="lab-metric-val">${m.value}</div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>

                  <div class="lab-tags-row">
                    ${item.tags.map((t) => `<span class="lab-tag">#${t}</span>`).join("")}
                  </div>

                  <div class="lab-actions-row">
                    ${
                      item.hasLivePages
                        ? `
                      <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-sketch-primary">
                        🌐 Buka Web App (${item.repoName}) ↗
                      </a>
                      <button class="btn-sketch-secondary" data-embed-url="${item.liveUrl}" data-embed-title="${item.title}">
                        🖥️ Preview Live di Sini
                      </button>
                      <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-sketch-secondary">
                        🐙 GitHub Repo ↗
                      </a>
                    `
                        : `
                      <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-sketch-primary">
                        🐙 Buka Repository (${item.repoName}) ↗
                      </a>
                      ${
                        item.screenshot
                          ? `<button class="btn-sketch-secondary" data-ss-src="${item.screenshot}" data-ss-title="${item.title}" data-ss-url="${item.repoUrl}">
                        📸 Lihat Screenshot Penuh
                      </button>`
                          : ""
                      }
                    `
                    }
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>

        ${
          extraRepos.length > 0 && this.labFilter === "all"
            ? `
          <div class="sketch-panel" style="margin-top:20px;">
            <span class="lab-code-pill">LIVE REPO BARU LAINNYA DARI @GARISLAB</span>
            <div class="connections-grid" style="margin-top:12px;">
              ${extraRepos
                .slice(0, 6)
                .map(
                  (repo) => `
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="connection-card" style="text-decoration:none;color:inherit;">
                  <span class="connection-badge vendor">${repo.language || "Repository"}</span>
                  <h4>${repo.name}</h4>
                  <p>${repo.description || "Modul riset internal GarisLab — PT Garis Cerita Karya."}</p>
                  <div class="connection-scope">★ ${repo.stargazers_count} · Buka di GitHub ↗</div>
                </a>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Interactive Mini Feasibility & KDB/KLB Calculator Widget -->
        <div class="calculator-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <span class="lab-code-pill">INTERACTIVE LAB WIDGET</span>
              <h4 style="font-family:var(--font-display);font-size:1.02rem;margin-top:6px;">
                Simulasi Cepat Kapasitas Tapak &amp; Feasibility (KDB · KLB · GFA · Estimasi NLA)
              </h4>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--ink-secondary);">
              Sampel Instrumen GarisLab (PSA_LB / PSA_Mblock)
            </span>
          </div>

          <div class="calc-grid">
            <div class="calc-input-group">
              <label for="calc-site">Luas Lahan / Site Area (m²)</label>
              <input type="number" id="calc-site" value="5000" min="100" step="100" />
            </div>
            <div class="calc-input-group">
              <label for="calc-kdb">Batas KDB (%)</label>
              <input type="number" id="calc-kdb" value="60" min="10" max="90" />
            </div>
            <div class="calc-input-group">
              <label for="calc-klb">Koefisien Lantai Bangunan (KLB)</label>
              <input type="number" id="calc-klb" value="3.5" min="0.5" max="15" step="0.1" />
            </div>
            <div class="calc-input-group">
              <label for="calc-eff">Efisiensi Saleable/Leasable (%)</label>
              <input type="number" id="calc-eff" value="78" min="50" max="95" />
            </div>
          </div>

          <div class="calc-results" id="calc-results-box"></div>
        </div>
      </div>
    `;

    this._bindWindowHeaderClose(win);

    win.querySelectorAll("[data-lab-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.labFilter = btn.dataset.labCat;
        this._renderLabWindow(win);
      });
    });

    win.querySelectorAll("[data-embed-url]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const box = win.querySelector("#lab-iframe-container");
        const iframe = win.querySelector("#lab-live-iframe");
        const titleEl = win.querySelector("#lab-iframe-title");
        const extLink = win.querySelector("#lab-iframe-ext");
        if (box && iframe) {
          iframe.src = btn.dataset.embedUrl;
          if (titleEl) {
            titleEl.textContent = `🖥️ LIVE MONITOR PREVIEW: ${btn.dataset.embedTitle || btn.dataset.embedUrl}`;
          }
          if (extLink) {
            extLink.href = btn.dataset.embedUrl;
          }
          box.style.display = "block";
          box.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    win.querySelector("#btn-close-iframe")?.addEventListener("click", () => {
      const box = win.querySelector("#lab-iframe-container");
      const iframe = win.querySelector("#lab-live-iframe");
      if (box && iframe) {
        iframe.src = "";
        box.style.display = "none";
      }
    });

    win.querySelectorAll("[data-ss-src]").forEach((el) => {
      el.addEventListener("click", () => {
        const lb = win.querySelector("#lab-ss-lightbox");
        const img = win.querySelector("#lab-ss-lightbox-img");
        const title = win.querySelector("#lab-ss-lightbox-title");
        const link = win.querySelector("#lab-ss-lightbox-link");
        if (lb && img) {
          img.src = el.dataset.ssSrc;
          if (title) title.textContent = `📸 ${el.dataset.ssTitle || "Screenshot Halaman"}`;
          if (link && el.dataset.ssUrl) link.href = el.dataset.ssUrl;
          lb.style.display = "block";
          lb.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    win.querySelector("#btn-close-ss-lightbox")?.addEventListener("click", () => {
      const lb = win.querySelector("#lab-ss-lightbox");
      if (lb) lb.style.display = "none";
    });

    const updateCalc = () => {
      const site = parseFloat(win.querySelector("#calc-site")?.value) || 0;
      const kdb = parseFloat(win.querySelector("#calc-kdb")?.value) || 0;
      const klb = parseFloat(win.querySelector("#calc-klb")?.value) || 0;
      const eff = parseFloat(win.querySelector("#calc-eff")?.value) || 0;

      const footprint = site * (kdb / 100);
      const maxGfa = site * klb;
      const estFloors = footprint > 0 ? Math.ceil(maxGfa / footprint) : 0;
      const nla = maxGfa * (eff / 100);

      const resBox = win.querySelector("#calc-results-box");
      if (resBox) {
        resBox.innerHTML = `
          <div class="spec-box">
            <div class="spec-label">Tapak Dasar Maks (KDB)</div>
            <div class="spec-val">${footprint.toLocaleString("id-ID")} m²</div>
          </div>
          <div class="spec-box">
            <div class="spec-label">Total GFA Maksimum (KLB)</div>
            <div class="spec-val">${maxGfa.toLocaleString("id-ID")} m²</div>
          </div>
          <div class="spec-box">
            <div class="spec-label">Estimasi Tinggi Lantai</div>
            <div class="spec-val">± ${estFloors} Lantai</div>
          </div>
          <div class="spec-box">
            <div class="spec-label">Net Leasable Area (NLA)</div>
            <div class="spec-val" style="color:var(--accent-orange-deep);">${Math.round(nla).toLocaleString("id-ID")} m²</div>
          </div>
        `;
      }
    };
    ["#calc-site", "#calc-kdb", "#calc-klb", "#calc-eff"].forEach((sel) => {
      win.querySelector(sel)?.addEventListener("input", updateCalc);
    });
    updateCalc();
  }

  // ==========================================================================
  // C. FOTO DINDING -> ABOUT STUDIO (PROFIL, TIM, LAYANAN & KONEKSI/VENDOR)
  // ==========================================================================
  _renderAboutWindow(win) {
    const p = this.data.profile;

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">BINGKAI FOTO · ABOUT STUDIO</span>
          <div>
            <h2 class="window-title">${p.officialName} (${p.studioName} / ${p.shortName})</h2>
            <div class="window-subtitle">Profil Studio · Visi &amp; Misi · Tim · Nilai &amp; Pendekatan</div>
          </div>
        </div>
        <div class="window-header-actions">
          <button class="back-studio-btn" id="btn-back-studio">← Kembali ke Sketsa Studio</button>
          <button class="window-close-btn" id="btn-close-win">×</button>
        </div>
      </div>

      <div class="window-tabs-bar">
        <div class="tab-pills">
          <button class="tab-pill ${this.aboutTab === "philosophy" ? "active" : ""}" data-about-tab="philosophy">Profil, Visi &amp; Misi</button>
          <button class="tab-pill ${this.aboutTab === "team" ? "active" : ""}" data-about-tab="team">Tim (${this.data.team.length})</button>
          <button class="tab-pill ${this.aboutTab === "services" ? "active" : ""}" data-about-tab="services">Nilai &amp; Pendekatan</button>
          <button class="tab-pill ${this.aboutTab === "connections" ? "active" : ""}" data-about-tab="connections">Koneksi, Klien &amp; Vendor</button>
        </div>
      </div>

      <div class="window-body">
        ${this._getAboutTabHTML(p)}
      </div>
    `;

    this._bindWindowHeaderClose(win);

    win.querySelectorAll("[data-about-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.aboutTab = btn.dataset.aboutTab;
        this._renderAboutWindow(win);
      });
    });

    win.querySelectorAll("[data-team-div]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.teamFilter = btn.dataset.teamDiv;
        this._renderAboutWindow(win);
      });
    });
  }

  _getAboutTabHTML(p) {
    if (this.aboutTab === "team") {
      const divisions = [
        "all",
        "Leadership & Principal",
        "Planning & Design",
        "Engineering",
        "Interior & Graphic",
        "Production & Supervision"
      ];
      const filteredTeam = this.data.team.filter(
        (m) => this.teamFilter === "all" || m.division === this.teamFilter
      );
      return `
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
          ${divisions
            .map(
              (d) => `
            <button class="viewpoint-btn ${this.teamFilter === d ? "active" : ""}" data-team-div="${d}">
              ${d === "all" ? `Semua Divisi (${this.data.team.length})` : d}
            </button>
          `
            )
            .join("")}
        </div>
        <div class="team-grid">
          ${filteredTeam
            .map(
              (member) => `
            <div class="team-card">
              <div class="team-photo-wrap">
                <img src="${member.photo}" alt="${member.name}" loading="lazy" />
                <span class="team-div-badge">${member.division}</span>
              </div>
              <div class="team-info">
                <div class="team-name">${member.name}</div>
                <div class="team-role">${member.role}</div>
                <div class="team-meta">
                  <strong>${member.certs}</strong><br/>
                  <span>${member.education}</span><br/>
                  <span style="display:block;margin-top:4px;">${member.highlight}</span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (this.aboutTab === "services") {
      return `
        <div class="portfolio-grid" style="margin-bottom:24px;">
          ${p.services
            .map(
              (srv) => `
            <div class="sketch-panel">
              <span class="lab-code-pill">${srv.title.toUpperCase()}</span>
              <p style="font-size:0.84rem;color:var(--ink-secondary);margin:10px 0 12px;line-height:1.5;">${srv.desc}</p>
              <ul style="padding-left:18px;font-size:0.83rem;line-height:1.6;">
                ${srv.items.map((i) => `<li><strong>${i}</strong></li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="sketch-panel">
          <h3 style="font-family:var(--font-display);margin-bottom:14px;">Tahapan Metodologi Kerja (How We Work)</h3>
          <div class="detail-specs-grid">
            ${p.workflow
              .map(
                (w) => `
              <div class="spec-box">
                <div class="spec-label">TAHAP ${w.step}</div>
                <div class="spec-val" style="color:var(--accent-orange-deep);margin-bottom:4px;">${w.name}</div>
                <p style="font-size:0.76rem;color:var(--ink-secondary);line-height:1.45;">${w.desc}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (this.aboutTab === "connections") {
      const partners = p.connections?.partners || [];
      const vendors = p.connections?.vendors || [];
      return `
        <div class="sketch-panel" style="margin-bottom:18px;">
          <span class="lab-code-pill">EKOSISTEM KOLABORASI &amp; JARINGAN STRATEGIS</span>
          <h3 style="font-family:var(--font-display);margin:8px 0 6px;">Mitra Konsultan, Asosiasi Profesi &amp; KSO Strategis</h3>
          <p style="font-size:0.85rem;color:var(--ink-secondary);">
            PT Garis Cerita Karya berkolaborasi aktif dengan konsultan nasional, engineering specialist, asosiasi arsitek/konsultan, serta ekosistem perangkat lunak BIM &amp; teknologi web terbuka.
          </p>
          <div class="connections-grid" style="margin-top:14px;">
            ${partners
              .map(
                (pt) => `
              <div class="connection-card">
                <span class="connection-badge partner">${pt.type}</span>
                <h4>${pt.name}</h4>
                <p>${pt.desc}</p>
                <div class="connection-scope">${pt.scope || ""}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="sketch-panel" style="margin-bottom:18px;">
          <span class="lab-code-pill">VENDOR TEKNOLOGI, BIM &amp; COMPUTATIONAL STACK</span>
          <h3 style="font-family:var(--font-display);margin:8px 0 6px;">Vendor &amp; Ekosistem Software Studio GCK + GarisLab</h3>
          <div class="connections-grid" style="margin-top:14px;">
            ${vendors
              .map(
                (v) => `
              <div class="connection-card">
                <span class="connection-badge vendor">${v.category}</span>
                <h4>${v.name}</h4>
                <p>${v.desc}</p>
                <div class="connection-scope">${v.tools || ""}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="sketch-panel">
          <span class="lab-code-pill">INSTANSI PEMERINTAH &amp; KLIEN KORPORASI</span>
          <h3 style="font-family:var(--font-display);margin:8px 0 12px;">Klien yang Mempercayai Garis Cerita</h3>
          <div class="detail-specs-grid">
            ${p.clients
              .map(
                (c) => `
              <div class="spec-box" style="text-align:center;padding:14px 10px;">
                <div class="spec-label">${c.category}</div>
                <div class="spec-val" style="font-size:0.94rem;margin-top:5px;">${c.name}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    return `
      <div class="stats-row">
        ${p.stats
          .map(
            (s) => `
          <div class="stat-card">
            <div class="stat-value">${s.value}</div>
            <div class="stat-label">${s.label}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="about-hero-grid">
        <div class="sketch-panel">
          <span class="lab-code-pill">IDENTITAS RESMI STUDIO</span>
          <h3 style="font-family:var(--font-display);font-size:1.22rem;margin:10px 0 8px;">
            ${p.officialName} (${p.studioName} — ${p.shortName})
          </h3>
          <p style="font-size:0.9rem;color:var(--ink-secondary);line-height:1.62;margin-bottom:14px;">
            ${p.description}
          </p>
          <div style="border-left:4px solid var(--accent-orange);padding-left:14px;margin:16px 0;font-style:italic;color:var(--ink-primary);">
            "${p.philosophyQuote}"
          </div>
          <p style="font-size:0.84rem;color:var(--ink-secondary);line-height:1.6;">
            ${p.philosophyBody}
          </p>
        </div>

        <div class="sketch-panel">
          <span class="lab-code-pill">VISI &amp; MISI GARIS CERITA</span>
          <h4 style="font-family:var(--font-display);margin:10px 0 6px;">Visi Studio</h4>
          <p style="font-size:0.84rem;color:var(--ink-secondary);line-height:1.55;margin-bottom:14px;">
            ${p.vision}
          </p>
          <h4 style="font-family:var(--font-display);margin-bottom:6px;">Misi &amp; Komitmen</h4>
          <ul style="padding-left:18px;font-size:0.82rem;color:var(--ink-secondary);line-height:1.55;">
            ${p.missions.map((m) => `<li style="margin-bottom:6px;">${m}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // D. RAK BUKU -> ARCHIVE / HISTORY (SEJARAH, SAYEMBARA & LEGALITAS)
  // ==========================================================================
  _renderArchiveWindow(win) {
    const ar = this.data.archive;

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">RAK DOKUMEN · ARCHIVE &amp; HISTORY</span>
          <div>
            <h2 class="window-title">Arsip Sejarah, Penghargaan Sayembara &amp; Legalitas GCK</h2>
            <div class="window-subtitle">Sejarah Studio · Publikasi &amp; Artikel · Dokumen &amp; Arsip · Penghargaan · Milestone</div>
          </div>
        </div>
        <div class="window-header-actions">
          <a href="${ar.portfolioPdfPath}" target="_blank" class="btn-sketch-primary" style="padding:6px 12px;">
            📄 Buka PDF Portofolio Resmi ↗
          </a>
          <button class="back-studio-btn" id="btn-back-studio">← Kembali ke Sketsa Studio</button>
          <button class="window-close-btn" id="btn-close-win">×</button>
        </div>
      </div>

      <div class="window-tabs-bar">
        <div class="tab-pills">
          <button class="tab-pill ${this.archiveTab === "history" ? "active" : ""}" data-arch-tab="history">📁 Sejarah &amp; Milestone</button>
          <button class="tab-pill ${this.archiveTab === "awards" ? "active" : ""}" data-arch-tab="awards">🏆 Penghargaan (${ar.awards.length})</button>
          <button class="tab-pill ${this.archiveTab === "legal" ? "active" : ""}" data-arch-tab="legal">📜 Dokumen &amp; Arsip SBU</button>
        </div>
      </div>

      <div class="window-body">
        <div class="bookshelf-illustration" title="Klik punggung binder di rak untuk berpindah arsip">
          ${[
            { label: "2012-2018 · INKUBASI", tab: "history" },
            { label: "2019 · AKTA PT GCK", tab: "legal" },
            { label: "SAYEMBARA · 1ST WINNER", tab: "awards" },
            { label: "SBU ARSITEKTUR AR001", tab: "legal" },
            { label: "SBU INTERIOR AR003", tab: "legal" },
            { label: "KTA PENUH PERKINDO", tab: "legal" },
            { label: "2022 · ISTANA IKN", tab: "history" },
            { label: "2024 · KOTA INTAN", tab: "awards" },
            { label: "2026 · GARISLAB R&D", tab: "history" }
          ]
            .map(
              (b) => `
            <div class="book-spine ${this.archiveTab === b.tab ? "active" : ""}" data-arch-tab="${b.tab}">
              ${b.label}
            </div>
          `
            )
            .join("")}
        </div>

        ${this._getArchiveTabHTML(ar)}
      </div>
    `;

    this._bindWindowHeaderClose(win);

    win.querySelectorAll("[data-arch-tab]").forEach((el) => {
      el.addEventListener("click", () => {
        this.archiveTab = el.dataset.archTab;
        if (this.sound) this.sound.playPaperZoom();
        this._renderArchiveWindow(win);
      });
    });
  }

  _getArchiveTabHTML(ar) {
    if (this.archiveTab === "awards") {
      return `
        <div class="portfolio-grid">
          ${ar.awards
            .map(
              (a) => `
            <div class="sketch-panel">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="lab-code-pill">${a.year}</span>
                <span class="lab-status-pill">🏆 ${a.rank}</span>
              </div>
              <h4 style="font-family:var(--font-display);font-size:1.02rem;margin-bottom:4px;">${a.event}</h4>
              <div style="font-family:var(--font-mono);font-size:0.74rem;color:var(--ink-secondary);">📍 ${a.location}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (this.archiveTab === "legal") {
      return `
        <div class="portfolio-grid">
          ${ar.legalDocs
            .map(
              (doc) => `
            <div class="sketch-panel">
              <span class="lab-code-pill">${doc.code}</span>
              <h4 style="font-family:var(--font-display);font-size:1.02rem;margin:8px 0 4px;">${doc.title}</h4>
              <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-orange-deep);font-weight:700;margin-bottom:6px;">
                ${doc.number}
              </div>
              <div style="font-size:0.75rem;font-weight:700;color:var(--ink-primary);margin-bottom:6px;">
                Penerbit: ${doc.issuer}
              </div>
              <p style="font-size:0.8rem;color:var(--ink-secondary);line-height:1.5;">${doc.detail}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    return `
      <div class="sketch-panel" style="margin-bottom:18px;">
        <h3 style="font-family:var(--font-display);margin-bottom:6px;">Sejarah Studio Garis Cerita</h3>
        <p style="font-size:0.86rem;color:var(--ink-secondary);line-height:1.62;">
          ${ar.historyNarrative}
        </p>
      </div>
      <div class="timeline-list">
        ${ar.milestones
          .map(
            (m) => `
          <div class="timeline-item">
            <div class="timeline-year">${m.year}</div>
            <div>
              <h4 style="font-family:var(--font-display);font-size:1rem;margin-bottom:4px;">${m.title}</h4>
              <p style="font-size:0.84rem;color:var(--ink-secondary);line-height:1.55;">${m.desc}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  // ==========================================================================
  // E. TELEPON MEJA -> CONTACT & EFEK SUARA TELEPON
  // ==========================================================================
  _renderContactWindow(win) {
    const c = this.data.contact;
    const isRinging = this.sound ? this.sound.isRinging : false;

    win.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <span class="window-badge">TELEPON MEJA · CONTACT</span>
          <div>
            <h2 class="window-title">Hubungi Kami — ${c.companyName}</h2>
            <div class="window-subtitle">Konsultasi Proyek Urban, Masterplan, Arsitektur, Interior, &amp; Riset Feasibility</div>
          </div>
        </div>
        <div class="window-header-actions">
          <button class="back-studio-btn" id="btn-back-studio">← Kembali ke Sketsa Studio</button>
          <button class="window-close-btn" id="btn-close-win">×</button>
        </div>
      </div>

      <div class="window-body">
        <div class="phone-visualizer-bar">
          <div class="phone-wave-wrap">
            <button class="phone-ring-btn ${isRinging ? "ringing" : ""}" id="btn-replay-phone" title="Bunyikan Efek Telepon Studio">
              📞
            </button>
            <div>
              <div style="font-family:var(--font-mono);font-size:0.72rem;font-weight:700;color:var(--accent-orange-deep);" id="phone-status-label">
                ${isRinging ? "🔔 TELEPON STUDIO SEDANG BERDERING..." : "🔊 SALURAN TELEPON STUDIO SIAP — KLIK UNTUK MEMBUNYIKAN"}
              </div>
              <div style="font-family:var(--font-display);font-size:0.95rem;font-weight:800;">
                ${c.phoneOffice} · WhatsApp: ${c.phoneMobile}
              </div>
            </div>
          </div>

          <div class="waveform-bars ${isRinging ? "active" : ""}" id="phone-waveform">
            ${Array.from({ length: 20 })
              .map(() => `<span class="waveform-bar"></span>`)
              .join("")}
          </div>

          <button class="btn-sketch-secondary" id="btn-ring-again">
            🔔 Bunyikan Telepon
          </button>
        </div>

        <div class="contact-layout">
          <div class="sketch-panel">
            <span class="lab-code-pill">HUBUNGI KAMI</span>
            <h3 style="font-family:var(--font-display);margin:10px 0 14px;">Studio Jakarta Selatan</h3>

            <div class="contact-info-list">
              <div class="contact-item">
                <span>✉️</span>
                <div>
                  <strong style="font-size:0.84rem;">Email Studio</strong>
                  <p style="font-size:0.82rem;color:var(--ink-secondary);">
                    <a href="mailto:${c.email}" style="color:inherit;">${c.email}</a>
                  </p>
                </div>
              </div>

              <div class="contact-item">
                <span>📞</span>
                <div>
                  <strong style="font-size:0.84rem;">Telepon &amp; WhatsApp</strong>
                  <p style="font-size:0.82rem;color:var(--ink-secondary);">
                    ${c.phoneMobile} · Kantor: ${c.phoneOffice}
                  </p>
                </div>
              </div>

              <div class="contact-item">
                <span>📍</span>
                <div>
                  <strong style="font-size:0.84rem;">Alamat Studio (Jakarta, Indonesia)</strong>
                  <p style="font-size:0.8rem;color:var(--ink-secondary);line-height:1.45;margin-top:2px;">
                    ${c.addressLine1}<br/>${c.addressLine2}<br/>${c.cityPostal}
                  </p>
                  <a href="${c.googleMapsQuery}" target="_blank" rel="noopener noreferrer" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--accent-orange-deep);font-weight:700;display:inline-block;margin-top:4px;">
                    Buka di Google Maps ↗
                  </a>
                </div>
              </div>

              <div class="contact-item">
                <span>🌐</span>
                <div>
                  <strong style="font-size:0.84rem;">Saluran Digital &amp; Lab</strong>
                  <p style="font-size:0.8rem;color:var(--ink-secondary);margin-top:2px;">
                    Instagram: <a href="${c.instagramUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-orange-deep);font-weight:700;">${c.instagram}</a> ·
                    GitHub Lab: <a href="${c.githubUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-orange-deep);font-weight:700;">@garislab</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="sketch-panel">
            <span class="lab-code-pill">FORMULIR DISKUSI PROYEK</span>
            <h3 style="font-family:var(--font-display);margin:10px 0 14px;">Kirim Pesan ke Tim GCK</h3>

            <form id="contact-form">
              <div class="form-field">
                <label for="f-name">Nama Anda / Instansi</label>
                <input type="text" id="f-name" required placeholder="Contoh: Budi Santoso — PT ... / Dinas ..." />
              </div>
              <div class="form-field">
                <label for="f-type">Kategori Kebutuhan Proyek</label>
                <select id="f-type">
                  <option value="Arsitektur & Engineering">Arsitektur &amp; Engineering (Struktur/MEP)</option>
                  <option value="Urban Design & Masterplan">Urban Design &amp; Masterplan Kawasan</option>
                  <option value="Desain Interior & Komersial">Desain Interior &amp; Komersial</option>
                  <option value="Feasibility Study & BIM Lab">Feasibility Study &amp; Konsultasi BIM</option>
                  <option value="Proyek Pemerintah / Sayembara">Proyek Pemerintah / Tender</option>
                </select>
              </div>
              <div class="form-field">
                <label for="f-msg">Deskripsi Singkat Proyek / Lokasi Lahan</label>
                <textarea id="f-msg" rows="3" required placeholder="Ceritakan lokasi tapak, luas lahan, atau rencana program ruang Anda..."></textarea>
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
                <button type="submit" class="btn-sketch-primary">
                  💬 Kirim via WhatsApp Studio ↗
                </button>
                <button type="button" id="btn-send-email" class="btn-sketch-secondary">
                  ✉️ Kirim via Email Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    this._bindWindowHeaderClose(win);

    const triggerRing = () => {
      this._triggerPhoneSketchAnimation();
      if (this.sound) {
        this.sound.playTelephoneRingSequence((status) => {
          this._updatePhoneVisualizerUI(status);
        });
      }
    };

    win.querySelector("#btn-replay-phone")?.addEventListener("click", triggerRing);
    win.querySelector("#btn-ring-again")?.addEventListener("click", triggerRing);

    const form = win.querySelector("#contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = win.querySelector("#f-name").value.trim();
        const type = win.querySelector("#f-type").value;
        const msg = win.querySelector("#f-msg").value.trim();
        const text = encodeURIComponent(
          `Halo Studio Garis Cerita (PT Garis Cerita Karya),\n\nSaya *${name}* ingin berdiskusi mengenai proyek *${type}*.\n\nDetail: ${msg}`
        );
        window.open(`https://wa.me/${c.phoneMobileRaw}?text=${text}`, "_blank");
      });
    }

    win.querySelector("#btn-send-email")?.addEventListener("click", () => {
      const name = win.querySelector("#f-name").value.trim() || "Klien";
      const type = win.querySelector("#f-type").value;
      const msg = win.querySelector("#f-msg").value.trim();
      const subj = encodeURIComponent(`[Inquiry Proyek ${type}] — ${name}`);
      const body = encodeURIComponent(
        `Halo PT Garis Cerita Karya,\n\nNama: ${name}\nKategori: ${type}\n\nPesan:\n${msg}`
      );
      window.location.href = `mailto:${c.email}?subject=${subj}&body=${body}`;
    });
  }

  _updatePhoneVisualizerUI(status) {
    const btn = document.getElementById("btn-replay-phone");
    const wave = document.getElementById("phone-waveform");
    const label = document.getElementById("phone-status-label");
    if (!btn || !wave || !label) return;

    if (status === "ringing-1" || status === "ringing-2") {
      btn.classList.add("ringing");
      wave.classList.add("active");
      label.textContent = "🔔 KRIIING... TELEPON STUDIO SEDANG BERDERING!";
    } else if (status === "connected") {
      btn.classList.remove("ringing");
      wave.classList.add("active");
      label.textContent = "📞 KLIK! GAGANG DIANGKAT — HALO GARIS CERITA STUDIO!";
    } else if (status === "muted") {
      btn.classList.remove("ringing");
      wave.classList.remove("active");
      label.textContent = "🔇 MODE SENYAP AKTIF (KLIK TOMBOL SUARA DI SKETSA)";
    } else {
      btn.classList.remove("ringing");
      wave.classList.remove("active");
      label.textContent = "✅ TERHUBUNG KE KONTAK PT GARIS CERITA KARYA";
    }
  }

  _bindWindowHeaderClose(win) {
    win.querySelector("#btn-close-win")?.addEventListener("click", () => this.closeOverlay(true));
    win.querySelector("#btn-back-studio")?.addEventListener("click", () => this.closeOverlay(true));
  }
}

function bootStudioApp() {
  if (!window.gckApp) {
    window.gckApp = new GarisCeritaApp();
  }
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", bootStudioApp);
} else {
  bootStudioApp();
}
