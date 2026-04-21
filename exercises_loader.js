// ============================================================
// EXERCISES LOADER — Fetches from api.selfigym.com and renders
// Add to index.html before </body>
// ============================================================

const EXERCISES_API = 'https://api.selfigym.com/api/exercises';

// Muscle group order + display names
const MUSCLE_GROUPS = [
  { key: 'Chest',       label: 'CHEST <span>EXERCISES</span>',       desc: 'Build a powerful, well-rounded chest.' },
  { key: 'Back',        label: 'BACK <span>EXERCISES</span>',        desc: 'Develop a strong, V-tapered back.' },
  { key: 'Shoulders',   label: 'SHOULDER <span>EXERCISES</span>',    desc: 'Build boulder shoulders and presence.' },
  { key: 'Arms',        label: 'ARM <span>EXERCISES</span>',         desc: 'Sleeve-busting biceps and triceps.' },
  { key: 'Legs',        label: 'LEG <span>EXERCISES</span>',         desc: 'Complete lower body development.' },
  { key: 'Glutes',      label: 'GLUTE <span>EXERCISES</span>',       desc: 'Build and shape your glutes.' },
  { key: 'Core',        label: 'CORE <span>EXERCISES</span>',        desc: 'Build a rock-solid midsection.' },
  { key: 'Cardio',      label: 'CARDIO <span>EXERCISES</span>',      desc: 'Burn fat and build endurance.' },
  { key: 'Full Body',   label: 'FULL BODY <span>EXERCISES</span>',   desc: 'Total body conditioning.' },
  { key: 'Flexibility', label: 'FLEXIBILITY <span>& MOBILITY</span>', desc: 'Improve range of motion and recovery.' }
];

// Placeholder image (gold gradient SVG - matches theme)
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1c1c"/>
        <stop offset="50%" stop-color="#2a2a2a"/>
        <stop offset="100%" stop-color="#1c1c1c"/>
      </linearGradient>
    </defs>
    <rect width="500" height="300" fill="url(#g)"/>
    <g fill="#c9a84c" opacity="0.3">
      <circle cx="250" cy="130" r="30" fill="none" stroke="#c9a84c" stroke-width="2"/>
      <rect x="230" y="170" width="40" height="8" rx="2"/>
      <rect x="210" y="185" width="80" height="4" rx="2"/>
    </g>
    <text x="250" y="240" text-anchor="middle" fill="#c9a84c" font-family="Montserrat,sans-serif" font-size="14" font-weight="700" letter-spacing="3">SELFIEGYM</text>
  </svg>`
);

// Build a single exercise card HTML
function buildCard(ex) {
  const equipment = (ex.equipment && ex.equipment.length) ? ex.equipment[0] : 'Bodyweight';
  const difficulty = ex.difficulty || 'Beginner';
  const setsReps = `${ex.default_sets || 3}×${ex.default_reps || '10-12'}`;
  const muscle = ex.primary_muscle || 'Full Body';

  return `
    <div class="card rv" data-exercise-id="${ex.id}">
      <img src="${PLACEHOLDER_IMG}" alt="${ex.name}" class="card-img" data-exercise-image="${ex.slug}">
      <div class="card-body">
        <div class="card-label">${muscle}</div>
        <h3>${ex.name.toUpperCase()}</h3>
        <p>${ex.name} — tap to view full instructions, form cues, and safety notes.</p>
        <div class="card-tags">
          <span class="card-tag">${equipment}</span>
          <span class="card-tag">${difficulty}</span>
          <span class="card-tag">${setsReps}</span>
        </div>
      </div>
    </div>
  `;
}

// Build a muscle-group section HTML
function buildSection(group, exercises) {
  if (!exercises.length) return '';
  const cards = exercises.map(buildCard).join('');
  return `
    <div class="ip-section"><h2>${group.label}</h2><p>${group.desc}</p></div>
    <div class="card-grid">${cards}</div>
  `;
}

// Group exercises by primary_muscle
function groupExercises(exercises) {
  const grouped = {};
  for (const ex of exercises) {
    const key = ex.primary_muscle || 'Full Body';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ex);
  }
  return grouped;
}

// Main loader
async function loadExercises() {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  try {
    const res = await fetch(EXERCISES_API);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const exercises = data.exercises || [];

    if (!exercises.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--lg);padding:3rem">No exercises available yet.</p>';
      return;
    }

    const grouped = groupExercises(exercises);
    let html = '';

    // Render in preferred order
    for (const group of MUSCLE_GROUPS) {
      const inGroup = grouped[group.key] || [];
      if (inGroup.length) {
        html += buildSection(group, inGroup);
        delete grouped[group.key];
      }
    }

    // Any remaining groups (unexpected)
    for (const key in grouped) {
      html += buildSection(
        { label: `${key.toUpperCase()} <span>EXERCISES</span>`, desc: '' },
        grouped[key]
      );
    }

    container.innerHTML = html;

    // Re-trigger reveal animation if your site uses IntersectionObserver
    if (typeof observeReveal === 'function') {
      container.querySelectorAll('.rv').forEach(el => observeReveal(el));
    }

  } catch (err) {
    console.error('Failed to load exercises:', err);
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--lg)">
        <p>Unable to load exercises right now.</p>
        <p style="font-size:.85rem;margin-top:.5rem">Please try again later.</p>
      </div>
    `;
  }
}

// Load on page ready + when exercises page is shown
document.addEventListener('DOMContentLoaded', loadExercises);
