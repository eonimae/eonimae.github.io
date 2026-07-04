(function () {
  const STORAGE_KEY = "eonimae_theme";
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const viewLinks = document.querySelectorAll("[data-view-link]");
  const viewPanels = document.querySelectorAll("[data-view]");
  const detailButtons = document.querySelectorAll(".detail-toggle");
  const analyticalFilterButtons = document.querySelectorAll("[data-analytical-filter]");
  const analyticalCards = document.querySelectorAll("[data-analytical-platform]");
  const navDropdownItems = document.querySelectorAll(".has-dropdown");
  const workshopToggles = document.querySelectorAll("[data-workshop-toggle]");
  const focusCards = document.querySelectorAll(".focus-card");
  const visitCount = document.querySelector("[data-visit-count]");
  const defaultView = "home";

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-mode", dark);
    if (themeToggle) {
      themeToggle.textContent = dark ? "Light" : "Dark";
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function getInitialTheme() {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getViewFromHash() {
    const hash = window.location.hash.replace("#", "");
    const hasPanel = Array.prototype.some.call(viewPanels, function (panel) {
      return panel.getAttribute("data-view") === hash;
    });

    return hasPanel ? hash : defaultView;
  }

  function showView(viewName, updateHash) {
    viewPanels.forEach(function (panel) {
      const active = panel.getAttribute("data-view") === viewName;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });

    viewLinks.forEach(function (link) {
      const active = link.getAttribute("data-view-link") === viewName;
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash) {
      window.history.pushState(null, "", "#" + viewName);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function filterAnalyticalPieces(platform) {
    analyticalCards.forEach(function (card) {
      const cardPlatform = card.getAttribute("data-analytical-platform");
      card.hidden = platform !== "all" && cardPlatform !== platform;
    });

    clearFocusGroup(document.querySelector("#analytical-pieces .card-focus-group"));

    analyticalFilterButtons.forEach(function (button) {
      const active = button.getAttribute("data-analytical-filter") === platform;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function selectFocusCard(selectedCard) {
    const cardGroup = selectedCard.closest(".card-focus-group");
    if (!cardGroup) return;

    cardGroup.classList.add("has-selected");
    cardGroup.querySelectorAll(".focus-card").forEach(function (card) {
      card.classList.toggle("is-selected", card === selectedCard);
    });
  }

  function clearFocusGroup(cardGroup) {
    if (!cardGroup) return;

    cardGroup.classList.remove("has-selected");
    cardGroup.querySelectorAll(".focus-card").forEach(function (card) {
      card.classList.remove("is-selected");
    });
  }

  function loadVisitCount() {
    if (!visitCount || !window.fetch) return;

    const controller = window.AbortController ? new AbortController() : null;
    const timeout = controller ? window.setTimeout(function () {
      controller.abort();
    }, 3000) : null;

    fetch("https://eonimae.goatcounter.com/counter/TOTAL.json", {
      signal: controller ? controller.signal : undefined,
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Visit counter unavailable");
        return response.json();
      })
      .then(function (data) {
        if (data && data.count) {
          visitCount.textContent = data.count;
        }
      })
      .catch(function () {
        visitCount.textContent = "—";
      })
      .finally(function () {
        if (timeout) {
          window.clearTimeout(timeout);
        }
      });
  }

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  viewLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showView(link.getAttribute("data-view-link"), true);
    });
  });

  window.addEventListener("hashchange", function () {
    showView(getViewFromHash(), false);
  });

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const detailId = button.getAttribute("aria-controls");
      const detail = document.getElementById(detailId);
      if (!detail) return;

      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "View detail" : "Close detail";
      detail.hidden = expanded;
    });
  });

  analyticalFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterAnalyticalPieces(button.getAttribute("data-analytical-filter"));
    });
  });

  navDropdownItems.forEach(function (item) {
    const parent = item.querySelector(".nav-parent");
    if (!parent) return;
    let closeTimer = null;
    let pointerActivated = false;
    let pointerFocus = false;
    let suppressNextFocusOpen = false;

    function setExpanded(expanded) {
      parent.setAttribute("aria-expanded", String(expanded));
    }

    function cancelClose() {
      if (!closeTimer) return;
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    function closeDropdown() {
      cancelClose();
      setExpanded(false);
    }

    function schedulePointerClose() {
      cancelClose();
      closeTimer = window.setTimeout(function () {
        if (!item.matches(":hover") && (!item.contains(document.activeElement) || pointerFocus)) {
          setExpanded(false);
        }
        closeTimer = null;
      }, 1000);
    }

    item.addEventListener("mouseenter", function () {
      cancelClose();
      setExpanded(true);
    });

    item.addEventListener("mouseleave", function () {
      schedulePointerClose();
    });

    item.addEventListener("focusin", function () {
      if (suppressNextFocusOpen) {
        suppressNextFocusOpen = false;
        return;
      }
      cancelClose();
      setExpanded(true);
    });

    item.addEventListener("focusout", function (event) {
      if (!item.contains(event.relatedTarget)) {
        closeDropdown();
      }
    });

    item.addEventListener("pointerdown", function (event) {
      pointerFocus = true;
      pointerActivated = Boolean(event.target.closest("[data-view-link]"));
    });

    item.addEventListener("click", function (event) {
      if (!pointerActivated || !event.target.closest("[data-view-link]")) return;
      pointerActivated = false;
      if (document.activeElement && item.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      closeDropdown();
    });

    item.addEventListener("keydown", function (event) {
      pointerFocus = false;
      if (event.key === "Escape") {
        closeDropdown();
        suppressNextFocusOpen = true;
        parent.focus();
      }
    });
  });

  workshopToggles.forEach(function (button) {
    button.addEventListener("click", function () {
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const willOpen = button.getAttribute("aria-expanded") !== "true";

      workshopToggles.forEach(function (otherButton) {
        const otherPanel = document.getElementById(otherButton.getAttribute("aria-controls"));
        otherButton.setAttribute("aria-expanded", "false");
        if (otherPanel) {
          otherPanel.hidden = true;
        }
      });

      button.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
    });
  });

  focusCards.forEach(function (card) {
    card.addEventListener("click", function () {
      selectFocusCard(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.target.closest("a")) return;
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      selectFocusCard(card);
    });
  });

  loadVisitCount();
  showView(getViewFromHash(), false);
})();
