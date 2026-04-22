// ============================================================
// EXERCISES LOADER v2.3 — Muscle Grid + Detail Pages + Menu Fix
// ============================================================

const EXERCISES_API = 'https://api.selfigym.com/api/exercises';

let EXERCISES_CACHE = null;

const MUSCLE_GROUPS = [
  { key: 'Chest',       label: 'CHEST',       sub: 'Build a powerful chest' },
  { key: 'Back',        label: 'BACK',        sub: 'Develop a strong back' },
  { key: 'Shoulders',   label: 'SHOULDERS',   sub: 'Boulder shoulders' },
  { key: 'Arms',        label: 'ARMS',        sub: 'Biceps & Triceps' },
  { key: 'Legs',        label: 'LEGS',        sub: 'Complete leg development' },
  { key: 'Glutes',      label: 'GLUTES',      sub: 'Build & shape glutes' },
  { key: 'Core',        label: 'CORE',        sub: 'Rock-solid midsection' },
  { key: 'Cardio',      label: 'CARDIO',      sub: 'Burn fat, build endurance' },
  { key: 'Full Body',   label: 'FULL BODY',   sub: 'Total conditioning' },
  { key: 'Flexibility', label: 'FLEXIBILITY', sub: 'Mobility & recovery' }
];

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

function muscleCardSVG(label) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#1c1c1c"/>
        </linearGradient>
      </defs>
      <rect width="500" height="350" fill="url(#bg)"/>
      <text x="250" y="180" text-anchor="middle" fill="#c9a84c" opacity="0.15" font-family="Montserrat,sans-serif" font-size="60" font-weight="900" letter-spacing="4">${label}</text>
    </svg>`
  );
}

async function loadAllExercises() {
  if (EXERCISES_CACHE) return EXERCISES_CACHE;
  try {
    const res = await fetch(EXERCISES_API);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    EXERCISES_CACHE = data.exercises || [];
    return EXERCISES_CACHE;
  } catch (err) {
    console.error('Failed to load exercises:', err);
    return [];
  }
}

function getExercisesByMuscle(exercises, muscleKey) {
  return exercises.filter(ex => 
    (ex.primary_muscle || 'Full Body') === muscleKey
  );
}

function renderMuscleGrid(exercises) {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  const cards = MUSCLE_GROUPS.map(group => {
    const count = getExercisesByMuscle(exercises, group.key).length;
    return `
      <div class="card muscle-card" onclick="showMuscleDetail('${group.key}')" style="cursor:pointer">
        <img src="${muscleCardSVG(group.label)}" alt="${group.label}" class="card-img">
        <div class="card-body">
          <div class="card-label">${count} Exercise${count !== 1 ? 's' : ''}</div>
          <h3>${group.label}</h3>
          <p>${group.sub}</p>
          <div class="card-tags">
            <span class="card-tag">Tap to view →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="card-grid">${cards}</div>`;
}

function renderMuscleDetail(muscleKey, exercises) {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  const group = MUSCLE_GROUPS.find(g => g.key === muscleKey);
  const filtered = getExercisesByMuscle(exercises, muscleKey);

  if (!filtered.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--lg)">
        <a href="#" onclick="showMuscleGrid();return false" class="ip-back" style="display:inline-block;margin-bottom:1.5rem">← Back to Muscle Groups</a>
        <h2 style="color:var(--gold);margin-bottom:1rem">${group?.label || muscleKey}</h2>
        <p>No exercises available yet.</p>
      </div>
    `;
    return;
  }

  const cards = filtered.map(ex => {
    const equipment = (ex.equipment && ex.equipment.length) ? ex.equipment[0] : 'Bodyweight';
    const difficulty = ex.difficulty || 'Beginner';
    const setsReps = `${ex.default_sets || 3}×${ex.default_reps || '10-12'}`;
    return `
      <div class="card" data-exercise-id="${ex.id}">
        <img src="${ex.image_url || PLACEHOLDER_IMG}" alt="${ex.name}" class="card-img" data-exercise-image="${ex.slug}">
        <div class="card-body">
          <div class="card-label">${muscleKey}</div>
          <h3>${ex.name.toUpperCase()}</h3>
          <p>${ex.name} — proper form, full instructions, and safety notes.</p>
          <div class="card-tags">
            <span class="card-tag">${equipment}</span>
            <span class="card-tag">${difficulty}</span>
            <span class="card-tag">${setsReps}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="margin-bottom:2rem">
      <a href="#" onclick="showMuscleGrid();return false" class="ip-back" style="display:inline-block">← Back to Muscle Groups</a>
    </div>
    <div class="ip-section">
      <h2>${group?.label || muscleKey.toUpperCase()} <span>EXERCISES</span></h2>
      <p>${group?.sub || ''} — ${filtered.length} exercise${filtered.length !== 1 ? 's' : ''}</p>
    </div>
    <div class="card-grid">${cards}</div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function showMuscleGrid() {
  const exercises = await loadAllExercises();
  renderMuscleGrid(exercises);
  history.replaceState(null, '', '#exercises');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function showMuscleDetail(muscleKey) {
  const exercises = await loadAllExercises();
  renderMuscleDetail(muscleKey, exercises);
  const slug = muscleKey.toLowerCase().replace(/\s+/g, '-');
  history.replaceState(null, '', `#exercises/${slug}`);
}

async function initExercises() {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  container.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--lg)"><p>Loading exercises...</p></div>`;

  const exercises = await loadAllExercises();

  if (!exercises.length) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--lg)"><p>Unable to load exercises right now.</p></div>`;
    return;
  }

  const hash = window.location.hash;
  const match = hash.match(/^#exercises\/(.+)$/);
  if (match) {
    const slug = match[1];
    const group = MUSCLE_GROUPS.find(g => g.key.toLowerCase().replace(/\s+/g, '-') === slug);
    if (group) {
      renderMuscleDetail(group.key, exercises);
      return;
    }
  }

  renderMuscleGrid(exercises);
}

document.addEventListener('DOMContentLoaded', initExercises);

window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash === '#exercises' || hash === '#exercises/') {
    initExercises();
  } else if (hash.startsWith('#exercises/')) {
    const slug = hash.replace('#exercises/', '');
    const group = MUSCLE_GROUPS.find(g => g.key.toLowerCase().replace(/\s+/g, '-') === slug);
    if (group && EXERCISES_CACHE) {
      renderMuscleDetail(group.key, EXERCISES_CACHE);
    }
  }
});

// ============================================================
// MENU FIX: Hook site's sp() navigation to reset muscle grid
// ============================================================
(function() {
  const hookSp = () => {
    if (typeof window.sp !== 'function') {
      setTimeout(hookSp, 100);
      return;
    }
    const _originalSp = window.sp;
    window.sp = function(page) {
      _originalSp.call(this, page);
      if (page === 'exercises') {
        setTimeout(() => showMuscleGrid(), 50);
      }
    };
  };
  hookSp();
})();

// Updated: 2026-04-22 — Fixed API response format
