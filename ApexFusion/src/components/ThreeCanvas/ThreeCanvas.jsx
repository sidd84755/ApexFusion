import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@mui/material/styles';

const ThreeCanvas = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef(null);
  const scrollParticlesRef = useRef(null);
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create main particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50 - 15; // Push particles back
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: theme.palette.primary.main,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Create scroll-reactive particles
    const scrollParticleGeometry = new THREE.BufferGeometry();
    const scrollParticleCount = 300;
    const scrollParticlePositions = new Float32Array(scrollParticleCount * 3);
    const scrollParticleSizes = new Float32Array(scrollParticleCount);

    for (let i = 0; i < scrollParticleCount * 3; i += 3) {
      scrollParticlePositions[i] = (Math.random() - 0.5) * 80;
      scrollParticlePositions[i + 1] = (Math.random() - 0.5) * 80;
      scrollParticlePositions[i + 2] = (Math.random() - 0.5) * 80 - 40;
      
      // Random sizes for variation
      scrollParticleSizes[i/3] = Math.random() * 0.2 + 0.05;
    }

    scrollParticleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(scrollParticlePositions, 3)
    );
    
    scrollParticleGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(scrollParticleSizes, 1)
    );

    const scrollParticleMaterial = new THREE.PointsMaterial({
      color: theme.palette.secondary.main,
      size: 0.15,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const scrollParticles = new THREE.Points(scrollParticleGeometry, scrollParticleMaterial);
    scrollParticlesRef.current = scrollParticles;
    scene.add(scrollParticles);
    
    // Create a dynamic background gradient that changes with scroll
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 2;
    gradientCanvas.height = 2;
    
    const updateGradient = (scrollY) => {
      const ctx = gradientCanvas.getContext('2d');
      const scrollFactor = Math.min(scrollY / 1000, 1);
      
      // Create a subtle gradient that shifts with scroll
      const gradient = ctx.createLinearGradient(0, 0, 2, 2);
      gradient.addColorStop(0, `rgba(25, 118, 210, ${0.05 + scrollFactor * 0.05})`); // Primary color
      gradient.addColorStop(1, `rgba(245, 0, 87, ${0.05 + scrollFactor * 0.05})`); // Secondary color
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 2, 2);
      
      return new THREE.CanvasTexture(gradientCanvas);
    };
    
    // Create a spherical background
    const sphereGeometry = new THREE.SphereGeometry(60, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: updateGradient(0),
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.2,
    });
    
    const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(backgroundSphere);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }
      
      if (scrollParticlesRef.current) {
        // Adjust particles based on scroll position
        const currentScrollY = window.scrollY;
        scrollParticlesRef.current.rotation.y += 0.0005;
        scrollParticlesRef.current.rotation.z = currentScrollY * 0.0001;
        
        // Move the particles based on scroll
        const scrollFactor = currentScrollY * 0.0005;
        scrollParticlesRef.current.position.y = -scrollFactor * 5;
        
        // Update opacity based on scroll
        scrollParticleMaterial.opacity = Math.max(0.1, 0.4 - scrollFactor * 0.2);
      }
      
      // Update background based on scroll
      if (backgroundSphere) {
        backgroundSphere.material.map = updateGradient(window.scrollY);
        backgroundSphere.material.map.needsUpdate = true;
        backgroundSphere.rotation.y += 0.0001;
        backgroundSphere.rotation.x = window.scrollY * 0.0001;
      }
      
      // Adjust camera position slightly based on scroll for parallax
      if (cameraRef.current) {
        const targetZ = 20 + window.scrollY * 0.01; // Move camera back as user scrolls
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (particleGeometry) {
        particleGeometry.dispose();
      }
      
      if (particleMaterial) {
        particleMaterial.dispose();
      }
      
      if (scrollParticleGeometry) {
        scrollParticleGeometry.dispose();
      }
      
      if (scrollParticleMaterial) {
        scrollParticleMaterial.dispose();
      }
      
      if (sphereGeometry) {
        sphereGeometry.dispose();
      }
      
      if (sphereMaterial) {
        sphereMaterial.dispose();
      }
    };
  }, [theme.palette.primary.main, theme.palette.secondary.main]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeCanvas; 