// Cảnh 3D trang trí cho prototype (không ảnh hưởng logic): nền hình khối trôi + cái cân "trung lập" ở header.
// Build: esbuild scene.src.js --bundle --minify --format=iife --outfile=scene.bundle.js
import {
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, Group, Mesh,
  IcosahedronGeometry, OctahedronGeometry, CylinderGeometry, BoxGeometry, SphereGeometry,
  MeshStandardMaterial, Color
} from 'three';

const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const loops = [];

function makeRenderer(canvas) {
  const r = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  return r;
}
function fit(renderer, camera, canvas, w, h) {
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

/* ---------- 1) Nền: hình khối low-poly trôi chậm ---------- */
function initBackground(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 14;
  scene.add(new AmbientLight(0xffffff, 1.1));
  const dl = new DirectionalLight(0xffffff, 1.6);
  dl.position.set(4, 6, 8);
  scene.add(dl);

  const palette = [0xfb923c, 0xfdba74, 0x93c5fd, 0xc4b5fd, 0xfcd34d, 0x86efac];
  const shapes = [];
  for (let i = 0; i < 26; i++) {
    const geo = i % 3 === 0 ? new OctahedronGeometry(0.6 + Math.random() * 0.6)
      : new IcosahedronGeometry(0.5 + Math.random() * 0.7, 0);
    const mat = new MeshStandardMaterial({
      color: palette[i % palette.length], flatShading: true, transparent: true,
      opacity: 0.45, roughness: 0.55, metalness: 0.05
    });
    const m = new Mesh(geo, mat);
    m.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 8 - 2);
    m.userData = {
      rx: (Math.random() - 0.5) * 0.004, ry: (Math.random() - 0.5) * 0.006,
      f: 0.3 + Math.random() * 0.5, p: Math.random() * 6.28, y0: m.position.y
    };
    scene.add(m);
    shapes.push(m);
  }
  let mx = 0, my = 0;
  window.addEventListener('pointermove', e => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  });
  const resize = () => fit(renderer, camera, canvas, window.innerWidth, window.innerHeight);
  resize();
  window.addEventListener('resize', resize);

  loops.push(t => {
    shapes.forEach(s => {
      s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry;
      s.position.y = s.userData.y0 + Math.sin(t * s.userData.f + s.userData.p) * 0.5;
    });
    camera.position.x += (mx * 2 - camera.position.x) * 0.02;
    camera.position.y += (-my * 1.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  });
}

/* ---------- 2) Cái cân trung lập ở header ---------- */
function initScale(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0.2, 5.4);
  scene.add(new AmbientLight(0xffffff, 1.2));
  const dl = new DirectionalLight(0xffffff, 1.8);
  dl.position.set(3, 5, 6);
  scene.add(dl);

  const white = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.2 });
  const gold = new MeshStandardMaterial({ color: 0xfde68a, roughness: 0.3, metalness: 0.5 });
  const root = new Group();
  scene.add(root);

  const base = new Mesh(new CylinderGeometry(0.7, 0.9, 0.18, 24), white);
  base.position.y = -1.6;
  const post = new Mesh(new CylinderGeometry(0.07, 0.09, 2.6, 16), white);
  post.position.y = -0.35;
  const knob = new Mesh(new SphereGeometry(0.16, 16, 16), gold);
  knob.position.y = 1.0;
  root.add(base, post, knob);

  const beam = new Group();
  beam.position.y = 0.95;
  const bar = new Mesh(new BoxGeometry(3.2, 0.1, 0.1), white);
  beam.add(bar);
  const pans = [];
  [-1.5, 1.5].forEach(x => {
    const g = new Group();
    g.position.x = x;
    const string = new Mesh(new CylinderGeometry(0.015, 0.015, 1.1, 6), white);
    string.position.y = -0.55;
    const pan = new Mesh(new CylinderGeometry(0.55, 0.45, 0.08, 24), gold);
    pan.position.y = -1.1;
    g.add(string, pan);
    beam.add(g);
    pans.push(g);
  });
  root.add(beam);
  root.rotation.y = -0.35;

  fit(renderer, camera, canvas, canvas.clientWidth || 150, canvas.clientHeight || 90);
  window.addEventListener('resize', () => fit(renderer, camera, canvas, canvas.clientWidth || 150, canvas.clientHeight || 90));

  loops.push(t => {
    const tilt = Math.sin(t * 0.9) * 0.07; // nghiêng nhẹ rồi về cân bằng
    beam.rotation.z = tilt;
    pans.forEach(p => { p.rotation.z = -tilt; }); // đĩa luôn thẳng
    root.rotation.y = -0.35 + Math.sin(t * 0.35) * 0.25;
    renderer.render(scene, camera);
  });
}

/* ---------- chạy ---------- */
try {
  const bg = document.getElementById('bg3d');
  const sc = document.getElementById('scale3d');
  if (bg) initBackground(bg);
  if (sc) initScale(sc);
  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; });
  const t0 = performance.now();
  const frame = now => {
    if (running) loops.forEach(fn => fn((now - t0) / 1000));
    if (!reduce) requestAnimationFrame(frame);
  };
  if (reduce) loops.forEach(fn => fn(0)); else requestAnimationFrame(frame);
  document.documentElement.classList.add('has3d');
} catch (err) {
  // Không có WebGL thì bỏ qua: giao diện vẫn dùng bình thường.
  console.warn('3D tắt:', err && err.message);
}
