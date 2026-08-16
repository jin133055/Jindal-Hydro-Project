import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
    const resetMobileNavigationState = () => {
      if (!navLinks) return;

      navLinks.querySelectorAll('.open, .is-active, .active').forEach((item) => {
        item.classList.remove('open', 'is-active', 'active');
      });
      navLinks.querySelectorAll('details[open]').forEach((item) => {
        item.removeAttribute('open');
      });
      navLinks.querySelectorAll('[aria-expanded="true"]').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });
    };
    const setMenuOpen = (isOpen) => {
      navToggle?.classList.toggle('open', isOpen);
      navLinks?.classList.toggle('open', isOpen);
      navToggle?.setAttribute('aria-expanded', String(isOpen));
      navToggle?.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-menu-open', isOpen);
      if (!isOpen) resetMobileNavigationState();
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
          const dropdown = link.closest('.has-dropdown');
          const shouldOpen = !dropdown?.classList.contains('open');
          resetMobileNavigationState();
          dropdown?.classList.toggle('open', shouldOpen);
        }
      };
      link.addEventListener('click', handler);
      return [link, handler];
    });

    const navItemLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const navItemHandlers = navItemLinks.map((link) => {
      const handler = () => {
        if (window.innerWidth <= 900 && link.classList.contains('product-category-toggle')) return;
        if (window.innerWidth <= 900 && !link.closest('.has-dropdown > a')) {
          setMenuOpen(false);
        }
      };
      link.addEventListener('click', handler);
      return [link, handler];
    });

    const productCategoryButtons = Array.from(document.querySelectorAll('.product-category-toggle'));
    const setActiveProductCategory = (button) => {
      const category = button.closest('.product-category');
      const shouldOpen = !category?.classList.contains('is-active');
      const siblings = Array.from(category?.parentElement?.querySelectorAll('.product-category') || []);
      siblings.forEach((item) => {
        if (item !== category) item.classList.remove('is-active');
      });
      category?.classList.toggle('is-active', shouldOpen);
    };
    const productCategoryHandlers = productCategoryButtons.map((button) => {
      const clickHandler = (event) => {
        if (window.innerWidth <= 900) {
          event.preventDefault();
          setActiveProductCategory(button);
          return;
        }
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
        if (window.innerWidth > 900) setActiveProductCategory(button);
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
  const balerViewer = document.getElementById('balerViewer');
  if (balerViewer) return setupBalerGlbModel(balerViewer);

  return setupCssBalerModel();
}

function setupBalerGlbModel(viewer) {
  const stage = document.getElementById('balerStage');
  if (!stage) return undefined;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotationX = -10;
  let rotationY = -30;
  let startRotationX = rotationX;
  let startRotationY = rotationY;
  let lastFrameTime = performance.now();
  let animationId = 0;
  let modelGroup;
  let disposed = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 1.1, 6.8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  viewer.appendChild(renderer.domElement);

  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x26351f, 2.4);
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(3, 5, 5);
  const fillLight = new THREE.DirectionalLight(0xffcc0c, 1.2);
  fillLight.position.set(-4, 1.6, -2);
  scene.add(ambientLight, keyLight, fillLight);

  const resizeRenderer = () => {
    const { width, height } = viewer.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };

  const updateModelRotation = () => {
    if (!modelGroup) return;
    modelGroup.rotation.x = THREE.MathUtils.degToRad(rotationX);
    modelGroup.rotation.y = THREE.MathUtils.degToRad(rotationY);
  };

  const frame = (time) => {
    const elapsed = time - lastFrameTime;
    lastFrameTime = time;

    if (!isDragging && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rotationY += elapsed * 0.012;
      updateModelRotation();
    }

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(frame);
  };

  const loader = new GLTFLoader();
  loader.load('/models/industrial machine 3d model.glb', (gltf) => {
    if (disposed) return;

    modelGroup = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(modelGroup);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    modelGroup.position.sub(center);
    modelGroup.scale.setScalar(4.4 / maxDimension);
    modelGroup.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
    });
    updateModelRotation();
    scene.add(modelGroup);
  });

  const handlePointerDown = (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startRotationX = rotationX;
    startRotationY = rotationY;
    stage.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    rotationY = startRotationY + deltaX * 0.45;
    rotationX = Math.max(-48, Math.min(28, startRotationX - deltaY * 0.35));
    updateModelRotation();
  };

  const stopDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 12 : 6;
    if (event.key === 'ArrowLeft') rotationY -= step;
    else if (event.key === 'ArrowRight') rotationY += step;
    else if (event.key === 'ArrowUp') rotationX = Math.max(-48, rotationX - step);
    else if (event.key === 'ArrowDown') rotationX = Math.min(28, rotationX + step);
    else return;

    event.preventDefault();
    updateModelRotation();
  };

  const resizeObserver = new ResizeObserver(resizeRenderer);
  resizeRenderer();
  resizeObserver.observe(viewer);
  animationId = requestAnimationFrame(frame);
  stage.addEventListener('pointerdown', handlePointerDown);
  stage.addEventListener('pointermove', handlePointerMove);
  stage.addEventListener('pointerup', stopDrag);
  stage.addEventListener('pointercancel', stopDrag);
  stage.addEventListener('keydown', handleKeyDown);

  return () => {
    disposed = true;
    cancelAnimationFrame(animationId);
    resizeObserver.disconnect();
    stage.removeEventListener('pointerdown', handlePointerDown);
    stage.removeEventListener('pointermove', handlePointerMove);
    stage.removeEventListener('pointerup', stopDrag);
    stage.removeEventListener('pointercancel', stopDrag);
    stage.removeEventListener('keydown', handleKeyDown);
    renderer.dispose();
    viewer.replaceChildren();
  };
}

function setupCssBalerModel() {
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
