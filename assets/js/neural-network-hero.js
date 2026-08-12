/**
 * Neural Network hero animation (three.js).
 * Drop a <canvas id="neural-network-canvas"> into the hero section (e.g. right
 * above the "Thomas Bordes" <h1>, sized to taste — e.g. width:100%; height:220px)
 * then load this script after three.js:
 *
 *   <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
 *   <script src="/assets/js/neural-network-hero.js"></script>
 *
 * Colors match the site palette: orange #FF5A36 accent, #1A1A1A dark nodes.
 */
(function () {
  const ORANGE = 0xFF5A36;
  const DARK = 0x1A1A1A;
  const NODE_COUNT = 34;
  const CONNECT_DIST = 1.15;
  const SPHERE_RADIUS = 1.6;

  function init(canvas) {
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.2;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    // Nodes distributed on a sphere (fibonacci sphere for even spacing)
    const pts = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(new THREE.Vector3(
        SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta),
        SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta),
        SPHERE_RADIUS * Math.cos(phi)
      ));
    }

    const nodeMat = new THREE.MeshBasicMaterial({ color: DARK });
    const nodes = pts.map((p) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), nodeMat);
      m.position.copy(p);
      group.add(m);
      return m;
    });

    // Connect nearby nodes to form the "network" lines
    const lineVerts = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.55 }));
    group.add(lines);

    function resize() {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);

    // Guaranteed first paint even if the tab is backgrounded on load
    renderer.render(scene, camera);

    function animate(t) {
      group.rotation.y = t * 0.00028;
      group.rotation.x = Math.sin(t * 0.00018) * 0.25;
      nodes.forEach((n, i) => {
        n.scale.setScalar(1 + Math.sin(t * 0.003 + i) * 0.25);
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', () => {
    init(document.getElementById('neural-network-canvas'));
  });
})();
