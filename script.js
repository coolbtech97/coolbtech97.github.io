// scripts.js
// Replace YOUR_GOOGLE_CLIENT_ID in index.html with your actual client ID.
// This script handles Google sign-in, storing user profile & projects in localStorage,
// and provides UI functions: create profile, post projects, search, like, edit, delete.

const LOCAL_PREFIX = 'skillfolio_v1_';

// DOM refs
const googleButtonRoot = document.getElementById('googleButton');
const signedInUI = document.getElementById('signedInUI');
const userPic = document.getElementById('userPic');
const userName = document.getElementById('userName');
const signOutBtn = document.getElementById('signOutBtn');

const createProfileBtn = document.getElementById('createProfileBtn');
const openProjectForm = document.getElementById('openProjectForm');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

const profileForm = document.getElementById('profileForm');
const projectForm = document.getElementById('projectForm');
const showProfileFormBtn = document.getElementById('showProfileForm');

const profileName = document.getElementById('profileName');
const profileBio = document.getElementById('profileBio');
const profileSkills = document.getElementById('profileSkills');
const saveProfile = document.getElementById('saveProfile');

const projectTitle = document.getElementById('projectTitle');
const projectDesc = document.getElementById('projectDesc');
const projectImage = document.getElementById('projectImage');
const projectTags = document.getElementById('projectTags');
const saveProject = document.getElementById('saveProject');

const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');

let currentUser = null; // {id, name, email, picture}
let currentEditingProjectId = null;

// ---------- Google Identity init ----------
// This function is called by Google's onload via data-callback in HTML
function handleCredentialResponse(response) {
  // response.credential is a JWT containing user info — we'll decode small part
  const jwt = parseJwt(response.credential);
  const user = {
    id: jwt.sub,
    name: jwt.name,
    email: jwt.email,
    picture: jwt.picture
  };
  signInUser(user);
}
window.handleCredentialResponse = handleCredentialResponse;

// Parse JWT (small util for google id token)
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// Render button after GAS loads
window.onload = () => {
  // Render Google Sign-in button (requires global google object)
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.renderButton(
      googleButtonRoot,
      { theme: "outline", size: "medium", type: "standard" }
    );
    // optionally disable auto prompt
    google.accounts.id.prompt();
  } else {
    console.warn('Google Identity Services not available.');
  }

  // Try load last signed in user (if any saved)
  const saved = localStorage.getItem(LOCAL_PREFIX + 'lastUser');
  if (saved) {
    currentUser = JSON.parse(saved);
    showSignedInUI();
    renderProjects();
  }
}

// ---------- Auth UI ----------
function signInUser(user) {
  currentUser = user;
  // Save last user for demo local persistence
  localStorage.setItem(LOCAL_PREFIX + 'lastUser', JSON.stringify(user));
  // ensure profile object exists
  const profileKey = getProfileKey();
  if (!localStorage.getItem(profileKey)) {
    const profile = { name: user.name, bio: '', skills: [] };
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }
  showSignedInUI();
  closeModalIfOpen();
  renderProjects();
}

signOutBtn?.addEventListener('click', () => {
  // clear local current user only for demo
  localStorage.removeItem(LOCAL_PREFIX + 'lastUser');
  currentUser = null;
  signedInUI.classList.add('hidden');
  googleButtonRoot.classList.remove('hidden');
  projectsGrid.innerHTML = '';
});

// show signed in UI
function showSignedInUI(){
  if (!currentUser) return;
  googleButtonRoot.classList.add('hidden');
  signedInUI.classList.remove('hidden');
  userPic.src = currentUser.picture || '';
  userName.textContent = currentUser.name || currentUser.email;
}

// ---------- Local storage helpers ----------
function getProfileKey(){
  if (!currentUser) return null;
  return LOCAL_PREFIX + 'profile_' + currentUser.email;
}
function getProjectsKey(){
  if (!currentUser) return null;
  return LOCAL_PREFIX + 'projects_' + currentUser.email;
}

// ---------- Modal / forms ----------
createProfileBtn.addEventListener('click', () => {
  ensureSignedIn();
  showProfileForm();
  openModal();
});
openProjectForm.addEventListener('click', () => {
  ensureSignedIn();
  showProjectForm();
  openModal();
});

closeModal.addEventListener('click', closeModalIfOpen);
modal.addEventListener('click', (e) => { if(e.target === modal) closeModalIfOpen() });

function openModal(){ modal.classList.remove('hidden') }
function closeModalIfOpen(){ modal.classList.add('hidden') }

function showProfileForm(){
  profileForm.classList.remove('hidden');
  projectForm.classList.add('hidden');

  // load profile if exists
  const pk = getProfileKey();
  if (pk){
    const profile = JSON.parse(localStorage.getItem(pk) || '{}');
    profileName.value = profile.name || currentUser.name || '';
    profileBio.value = profile.bio || '';
    profileSkills.value = (profile.skills || []).join(', ');
  }
}
function showProjectForm(){
  profileForm.classList.add('hidden');
  projectForm.classList.remove('hidden');

  // clear project fields for a new one
  projectTitle.value = '';
  projectDesc.value = '';
  projectImage.value = '';
  projectTags.value = '';
  currentEditingProjectId = null;
}

// toggle from project form to profile form
showProfileFormBtn.addEventListener('click', showProfileForm);

// Profile save
saveProfile.addEventListener('click', () => {
  if (!ensureSignedIn()) return;
  const pk = getProfileKey();
  const profile = {
    name: profileName.value.trim() || currentUser.name,
    bio: profileBio.value.trim(),
    skills: profileSkills.value.split(',').map(s => s.trim()).filter(Boolean)
  };
  localStorage.setItem(pk, JSON.stringify(profile));
  alert('Profile saved locally for demo.');
  closeModalIfOpen();
  renderProjects();
});

// Project save
saveProject.addEventListener('click', () => {
  if (!ensureSignedIn()) return;
  const title = projectTitle.value.trim();
  const desc = projectDesc.value.trim();
  if (!title || !desc) { alert('Please provide title and description'); return; }

  const pk = getProjectsKey();
  const list = JSON.parse(localStorage.getItem(pk) || '[]');

  if (currentEditingProjectId) {
    // update existing
    const idx = list.findIndex(p => p.id === currentEditingProjectId);
    if (idx !== -1) {
      list[idx].title = title;
      list[idx].desc = desc;
      list[idx].image = projectImage.value.trim();
      list[idx].tags = projectTags.value.split(',').map(s => s.trim()).filter(Boolean);
      list[idx].updatedAt = Date.now();
    }
  } else {
    const project = {
      id: 'p_' + Math.random().toString(36).slice(2,9),
      title, desc,
      image: projectImage.value.trim(),
      tags: projectTags.value.split(',').map(s => s.trim()).filter(Boolean),
      createdAt: Date.now(),
      likes: 0
    };
    list.unshift(project);
  }

  localStorage.setItem(pk, JSON.stringify(list));
  currentEditingProjectId = null;
  alert('Project saved locally for demo.');
  closeModalIfOpen();
  renderProjects();
});

// ---------- Projects rendering ----------
function renderProjects(filter=''){
  projectsGrid.innerHTML = '';
  if (!currentUser) {
    projectsGrid.innerHTML = `<div class="card">Sign in to view and post projects.</div>`;
    return;
  }
  const pk = getProjectsKey();
  const list = JSON.parse(localStorage.getItem(pk) || '[]');

  const q = (filter || '').toLowerCase();
  const filtered = list.filter(p => {
    if (!q) return true;
    const text = (p.title + ' ' + p.desc + ' ' + (p.tags||[]).join(' ')).toLowerCase();
    return text.includes(q);
  });

  if (!filtered.length){
    projectsGrid.innerHTML = `<div class="card">No projects yet. Be the first to post!</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = p.image ? `<img src="${escapeHtml(p.image)}" alt="">` : '';
    const tagsHtml = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ');
    card.innerHTML = `
      ${img}
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <div style="margin-bottom:12px">${tagsHtml}</div>
      <div style="display:flex;gap:8px;align-items:center;justify-content:space-between">
        <div>
          <button class="btn small like-btn" data-id="${p.id}">❤️ <span class="like-count">${p.likes}</span></button>
          <button class="btn small edit-btn" data-id="${p.id}">Edit</button>
          <button class="btn small" data-id="${p.id}" onclick="deleteProjectPrompt('${p.id}')">Delete</button>
        </div>
        <small style="color:var(--muted)">${new Date(p.createdAt).toLocaleDateString()}</small>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  // attach event handlers
  document.querySelectorAll('.like-btn').forEach(b => {
    b.addEventListener('click', (ev) => {
      const id = ev.currentTarget.dataset.id;
      toggleLike(id);
    });
  });
  document.querySelectorAll('.edit-btn').forEach(b => {
    b.addEventListener('click', (ev) => {
      const id = ev.currentTarget.dataset.id;
      startEditProject(id);
    });
  });
}

function toggleLike(id){
  const pk = getProjectsKey();
  const list = JSON.parse(localStorage.getItem(pk) || '[]');
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return;
  list[idx].likes = (list[idx].likes || 0) + 1;
  localStorage.setItem(pk, JSON.stringify(list));
  renderProjects(searchInput.value || '');
}

function startEditProject(id){
  const pk = getProjectsKey();
  const list = JSON.parse(localStorage.getItem(pk) || '[]');
  const p = list.find(x => x.id === id);
  if (!p) return;
  currentEditingProjectId = id;
  projectTitle.value = p.title;
  projectDesc.value = p.desc;
  projectImage.value = p.image || '';
  projectTags.value = (p.tags || []).join(', ');
  showProjectForm();
  openModal();
}

window.deleteProjectPrompt = function(id){
  if (!confirm('Delete this project?')) return;
  const pk = getProjectsKey();
  let list = JSON.parse(localStorage.getItem(pk) || '[]');
  list = list.filter(p => p.id !== id);
  localStorage.setItem(pk, JSON.stringify(list));
  renderProjects();
}

// ---------- Utilities ----------
function ensureSignedIn(){
  if (!currentUser){
    alert('Please sign in with Google to continue (demo).');
    return false;
  }
  return true;
}

function escapeHtml(text){
  if (!text) return '';
  return String(text).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}

// search input
searchInput.addEventListener('input', (e) => {
  renderProjects(e.target.value);
});
