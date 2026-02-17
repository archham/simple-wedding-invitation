/**
 * Wedding Invitation - Main JavaScript
 * Modern ES6+ implementation
 */

'use strict';

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const navbarBurgers = document.querySelectorAll('.navbar-burger');
  
  navbarBurgers.forEach((burger) => {
    burger.addEventListener('click', () => {
      const targetId = burger.dataset.target;
      const target = document.getElementById(targetId);
      
      burger.classList.toggle('is-active');
      target?.classList.toggle('is-active');
    });
  });
});

// Smooth Anchor Scrolling (using native smooth scroll with fallback)
document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  
  event.preventDefault();
  const targetId = anchor.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});

// Scroll to Top Button
const handleScroll = () => {
  const toTopButton = document.getElementById('toTop');
  if (!toTopButton) return;
  
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  toTopButton.style.display = scrollTop > 20 ? 'block' : 'none';
};

window.addEventListener('scroll', handleScroll, { passive: true });

// Preloader
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader-wrapper');
  
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.classList.remove('preloader-site');
    }, 500);
  }
});

// Add preloader class on page load
window.addEventListener('load', () => {
  document.body.classList.add('preloader-site');
});
