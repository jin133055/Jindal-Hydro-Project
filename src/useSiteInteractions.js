import { useEffect } from 'react';

export function useSiteInteractions(page) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const setMenuOpen = (isOpen) => {
      navToggle?.classList.toggle('open', isOpen);
      navLinks?.classList.toggle('open', isOpen);
      navToggle?.setAttribute('aria-expanded', String(isOpen));
      navToggle?.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-menu-open', isOpen);
    };
    const handleNavToggle = () => {
      setMenuOpen(!navLinks?.classList.contains('open'));
    };
    navToggle?.addEventListener('click', handleNavToggle);

    const dropdownLinks = Array.from(document.querySelectorAll('.has-dropdown > a'));
    const dropdownHandlers = dropdownLinks.map((link) => {
      const handler = (event) => {
        if (window.innerWidth <= 900) {
          event.preventDefault();
          link.closest('.has-dropdown')?.classList.toggle('open');
        }
      };
      link.addEventListener('click', handler);
      return [link, handler];
    });

    const navItemLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const navItemHandlers = navItemLinks.map((link) => {
      const handler = () => {
        if (window.innerWidth <= 900 && !link.closest('.has-dropdown > a')) {
          setMenuOpen(false);
          document.querySelectorAll('.has-dropdown.open').forEach((item) => item.classList.remove('open'));
        }
      };
      link.addEventListener('click', handler);
      return [link, handler];
    });

    const productCategoryButtons = Array.from(document.querySelectorAll('.product-category-toggle'));
    const setActiveProductCategory = (button) => {
      const category = button.closest('.product-category');
      const siblings = Array.from(category?.parentElement?.querySelectorAll('.product-category') || []);
      siblings.forEach((item) => {
        if (item !== category) item.classList.remove('is-active');
      });
      category?.classList.add('is-active');
    };
    const productCategoryHandlers = productCategoryButtons.map((button) => {
      const clickHandler = (event) => {
        if (button.tagName.toLowerCase() === 'a') {
          setMenuOpen(false);
          button.closest('.has-dropdown')?.classList.remove('open');
          return;
        }
        event.preventDefault();
        setActiveProductCategory(button);
      };
      const mouseHandler = () => {
        if (window.innerWidth > 900) setActiveProductCategory(button);
      };
      const focusHandler = () => {
        setActiveProductCategory(button);
      };
      button.addEventListener('click', clickHandler);
      button.addEventListener('mouseenter', mouseHandler);
      button.addEventListener('focus', focusHandler);
      return [button, clickHandler, mouseHandler, focusHandler];
    });

    const scrollButtons = Array.from(document.querySelectorAll('[data-scroll-target]'));
    const scrollHandlers = scrollButtons.map((button) => {
      const handler = () => {
        const target = document.querySelector(button.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: 'smooth' });
      };
      button.addEventListener('click', handler);
      return [button, handler];
    });

    const accordionItems = Array.from(document.querySelectorAll('details[data-accordion-group]'));
    const accordionHandlers = accordionItems.map((item) => {
      const handler = () => {
        if (!item.open) return;
        accordionItems.forEach((sibling) => {
          if (
            sibling !== item
            && sibling.dataset.accordionGroup === item.dataset.accordionGroup
          ) {
            sibling.removeAttribute('open');
          }
        });
      };
      item.addEventListener('toggle', handler);
      return [item, handler];
    });

    const cleanupBaler = setupBalerModel();

    return () => {
      observer.disconnect();
      navToggle?.removeEventListener('click', handleNavToggle);
      dropdownHandlers.forEach(([link, handler]) => link.removeEventListener('click', handler));
      navItemHandlers.forEach(([link, handler]) => link.removeEventListener('click', handler));
      productCategoryHandlers.forEach(([button, clickHandler, mouseHandler, focusHandler]) => {
        button.removeEventListener('click', clickHandler);
        button.removeEventListener('mouseenter', mouseHandler);
        button.removeEventListener('focus', focusHandler);
      });
      scrollHandlers.forEach(([button, handler]) => button.removeEventListener('click', handler));
      accordionHandlers.forEach(([item, handler]) => item.removeEventListener('toggle', handler));
      cleanupBaler?.();
    };
  }, [page]);
}

function setupBalerModel() {
  const balerStage = document.getElementById('balerStage');
  const balerModel = document.getElementById('balerModel');
  if (!balerStage || !balerModel) return undefined;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotationX = -18;
  let rotationY = -28;
  let startRotationX = rotationX;
  let startRotationY = rotationY;
  let lastFrameTime = performance.now();
  let animationId = 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateBalerRotation = () => {
    balerModel.style.setProperty('--rotate-x', `${rotationX}deg`);
    balerModel.style.setProperty('--rotate-y', `${rotationY}deg`);
  };

  const rotateBalerAutomatically = (time) => {
    const elapsed = time - lastFrameTime;
    lastFrameTime = time;

    if (!isDragging && !prefersReducedMotion.matches) {
      rotationY += elapsed * 0.012;
      updateBalerRotation();
    }

    animationId = requestAnimationFrame(rotateBalerAutomatically);
  };

  const handlePointerDown = (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startRotationX = rotationX;
    startRotationY = rotationY;
    balerStage.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    rotationY = startRotationY + deltaX * 0.45;
    rotationX = Math.max(-58, Math.min(18, startRotationX - deltaY * 0.35));
    updateBalerRotation();
  };

  const stopBalerDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    if (balerStage.hasPointerCapture(event.pointerId)) {
      balerStage.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 12 : 6;
    if (event.key === 'ArrowLeft') rotationY -= step;
    else if (event.key === 'ArrowRight') rotationY += step;
    else if (event.key === 'ArrowUp') rotationX = Math.max(-58, rotationX - step);
    else if (event.key === 'ArrowDown') rotationX = Math.min(18, rotationX + step);
    else return;

    event.preventDefault();
    updateBalerRotation();
  };

  updateBalerRotation();
  animationId = requestAnimationFrame(rotateBalerAutomatically);
  balerStage.addEventListener('pointerdown', handlePointerDown);
  balerStage.addEventListener('pointermove', handlePointerMove);
  balerStage.addEventListener('pointerup', stopBalerDrag);
  balerStage.addEventListener('pointercancel', stopBalerDrag);
  balerStage.addEventListener('keydown', handleKeyDown);

  return () => {
    cancelAnimationFrame(animationId);
    balerStage.removeEventListener('pointerdown', handlePointerDown);
    balerStage.removeEventListener('pointermove', handlePointerMove);
    balerStage.removeEventListener('pointerup', stopBalerDrag);
    balerStage.removeEventListener('pointercancel', stopBalerDrag);
    balerStage.removeEventListener('keydown', handleKeyDown);
  };
}
