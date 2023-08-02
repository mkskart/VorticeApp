import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeJS = ({ width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height, // Adjust the aspect ratio based on the new width and height
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height); // Set the new width and height for the canvas
    renderer.setClearColor(0xffffff);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up the component
      renderer.dispose();
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, [width, height]);

  return <div ref={canvasRef} />;
};

export default ThreeJS;
