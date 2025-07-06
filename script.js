// Interactive background using canvas (neural network/particle effect)
window.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('interactive-bg');
  const canvas = document.createElement('canvas');
  bg.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;

  const ctx = canvas.getContext('2d');
  let nodes = [];
  const NODE_COUNT = 24;
  const LINE_DIST = 180;

  function randomNode() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7
    };
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(randomNode());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) {
          ctx.strokeStyle = 'rgba(0,255,231,' + (1 - dist / LINE_DIST) + ')';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw nodes
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#00ffe7';
      ctx.shadowColor = '#00ffe7';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function update() {
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initNodes();
  }

  window.addEventListener('resize', resize);
  initNodes();
  animate();

  // Smooth scroll for nav links
  document.querySelectorAll('nav#navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Placeholder for future interactivity (expand/collapse, etc.)

  // Project tab switching
  const tabs = [
    { btn: 'tab-ml', content: 'projects-ml' },
    { btn: 'tab-quant', content: 'projects-quant' },
    { btn: 'tab-dev', content: 'projects-dev' }
  ];
  tabs.forEach(({ btn, content }, idx) => {
    document.getElementById(btn)?.addEventListener('click', () => {
      tabs.forEach(({ btn: b, content: c }) => {
        document.getElementById(b).style.opacity = b === btn ? '1' : '0.7';
        document.getElementById(c).style.display = c === content ? '' : 'none';
      });
    });
  });
  // Default to ML tab
  document.getElementById('tab-ml')?.click();
}); 