class MouseLight {
  constructor() {
    this.particles = [];
    this.maxParticles = 100; // Giảm số lượng hạt tối đa để vệt sáng mỏng hơn
    this.init();
  }

  init() {
    window.addEventListener("mousemove", (event) => {
      const mousePosition = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      // Convert screen coordinates to 3D space
      mousePosition.unproject(camera);
      this.addParticle(mousePosition);
    });
  }

  addParticle(position) {
    const particle = this.createParticle(position);
    this.particles.push(particle);
    scene.add(particle);

    // Xóa hạt cũ nếu số lượng vượt quá giới hạn
    if (this.particles.length > this.maxParticles) {
      const oldParticle = this.particles.shift();
      scene.remove(oldParticle);
    }
  }

  createParticle(position) {
    const geometry = new THREE.SphereGeometry(0.01, 8, 8); // Giảm kích thước hạt
    const material = new THREE.MeshBasicMaterial({
      color: 0xffd700, // Màu vàng (gold)
      transparent: true,
      opacity: 1,
    });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(position);
    return particle;
  }
}

// Khởi tạo scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Khởi tạo đối tượng MouseLight
const mouseLight = new MouseLight();

// Vòng lặp render
function animate() {
  requestAnimationFrame(animate);

  // Làm mờ dần các hạt để tạo hiệu ứng fading
  mouseLight.particles.forEach((particle, index) => {
    particle.material.opacity -= 0.02; // Giảm độ mờ dần
    particle.scale.multiplyScalar(0.98); // Giảm kích thước dần

    if (particle.material.opacity <= 0) {
      scene.remove(particle);
      mouseLight.particles.splice(index, 1); // Xóa hạt khi nó hoàn toàn biến mất
    }
  });

  renderer.render(scene, camera);
}

animate();
