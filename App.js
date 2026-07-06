/* ================================================================
   APP LOGIC — wires up CAREERS / ROADMAPS / QUIZ / SCHOLARSHIPS / MENTORS
   ================================================================ */
   const loggedUser = JSON.parse(localStorage.getItem("user"));

if (!loggedUser) {

    alert("Please Login First");

    window.location.href = "login.html";

}
if(localStorage.getItem("loggedIn") != "true"){

    window.location.href="login.html";

}

let currentStream = 'science';
let currentRoadmap = 'science';

/* ---------- PAGE NAV ---------- */
function showPage(page) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('show'));
  document.getElementById('page-' + page).classList.add('show');

  document.querySelectorAll('.navbtn').forEach(b => b.classList.remove('act'));
  const idx = ['careers', 'roadmap', 'quiz', 'scholarships', 'mentorship'].indexOf(page);
  document.querySelectorAll('.navbtn')[idx].classList.add('act');

  if (page === 'scholarships') renderScholarships();
  if (page === 'mentorship') renderMentors();
}

/* ---------- CAREERS PAGE ---------- */
function selectStream(stream) {
  currentStream = stream;
  document.querySelectorAll('#page-careers .stab').forEach(t => t.classList.remove('act'));
  document.getElementById('stab-' + stream).classList.add('act');
  renderCareers();
}

function renderCareers() {
    const careers = CAREERS[currentStream].careers;
    
    document.getElementById("careerHeading").textContent = 
      "Career Paths — " + currentStream.charAt(0).toUpperCase() + currentStream.slice(1);

    const list = document.getElementById("careerList");

    list.innerHTML = careers.map((c, i) => `
        <div class="ccard" id="ccard-${i}" onclick="toggleCard(${i})">
            <div class="crow">
                <div class="cicn">${c.icon}</div>
                <div class="ctitle">${c.title}</div>
                <div class="cbadge">${c.salary}</div>
                <div class="carr">›</div>
            </div>
            <div class="cdetail">
                <div class="csub">${c.sub}</div>
                <div class="scopebar">
                    <div class="sbrow">
                        <span>Career Scope</span>
                        <strong>High</strong>
                    </div>
                    <div class="bar">
                        <div class="bf" style="width:85%"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function toggleCard(index) {
  const card = document.getElementById('ccard-' + index);
  document.querySelectorAll('#page-careers .ccard').forEach(c => c.classList.remove('open'));
  card.classList.add('open');
}

/* ---------- ROADMAP PAGE ---------- */
function selectRoadmap(stream) {
  currentRoadmap = stream;
  document.querySelectorAll('#page-roadmap .stab').forEach(t => t.classList.remove('act'));
  document.getElementById('rtab-' + stream).classList.add('act');
  renderRoadmap();
}

function renderRoadmap() {
  const roadmap = ROADMAPS[currentRoadmap];
  
  document.getElementById("rmHeading").textContent = roadmap.heading;
  
  const list = document.getElementById("rmList");
  list.innerHTML = roadmap.steps.map(step => `
    <div class="rmstep">
      <div class="ryear">${step.year}</div>
      <div class="rtitle">${step.title}</div>
      <div class="rdesc">${step.desc}</div>
    </div>
  `).join("");
}

/* ---------- QUIZ PAGE ---------- */
let qIndex = 0;
let qAnswers = [];
let qSelected = null;

function renderQuiz() {
  document.getElementById('qresult').style.display = 'none';
  document.getElementById('qnext').style.display = 'inline-block';
  document.querySelector('.qwrap > .qpbar').style.display = '';
  document.getElementById('qnum').style.display = '';
  document.getElementById('qtext').style.display = '';
  document.getElementById('qopts').style.display = '';

  const item = QUIZ[qIndex];
  document.getElementById('qprog').style.width = ((qIndex) / QUIZ.length * 100) + '%';
  document.getElementById('qnum').textContent = `Question ${qIndex + 1} of ${QUIZ.length}`;
  document.getElementById('qtext').textContent = item.q;

  qSelected = null;
  document.getElementById('qopts').innerHTML = item.opts.map((o, i) => `
    <button class="qopt" id="qopt-${i}" onclick="selectOpt(${i})">${o.t}</button>
  `).join('');

  const nextBtn = document.getElementById('qnext');
  nextBtn.disabled = true;
  nextBtn.textContent = (qIndex === QUIZ.length - 1) ? 'See Result →' : 'Next →';
}

function selectOpt(i) {
  qSelected = i;
  document.querySelectorAll('#qopts .qopt').forEach(o => o.classList.remove('sel'));
  document.getElementById('qopt-' + i).classList.add('sel');
  document.getElementById('qnext').disabled = false;
}

function nextQ() {
  if (qSelected === null) return;
  qAnswers.push(QUIZ[qIndex].opts[qSelected].s);

  if (qIndex < QUIZ.length - 1) {
    qIndex++;
    renderQuiz();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById('qprog').style.width = '100%';
  document.getElementById('qnum').style.display = 'none';
  document.getElementById('qtext').style.display = 'none';
  document.getElementById('qopts').style.display = 'none';
  document.getElementById('qnext').style.display = 'none';

  const counts = {};
  qAnswers.forEach(s => counts[s] = (counts[s] || 0) + 1);
  let winner = qAnswers[0];
  Object.keys(counts).forEach(s => { if (counts[s] > counts[winner]) winner = s; });

  const r = QUIZ_RESULTS[winner];
  const result = document.getElementById('qresult');
  result.style.display = 'block';
  result.innerHTML = `
    <div class="big">${r.emoji}</div>
    <div class="rtitle">${r.title}</div>
    <div class="rsub">${r.desc}</div>
    <button class="retake" onclick="retakeQuiz()">Retake Quiz</button>
  `;
}

function retakeQuiz() {
  qIndex = 0;
  qAnswers = [];
  qSelected = null;
  renderQuiz();
}

/* ---------- SCHOLARSHIPS PAGE ---------- */
function renderScholarships() {
  const list = document.getElementById('schList');
  if (list.dataset.rendered) return;
  list.dataset.rendered = 'true';
  list.innerHTML = SCHOLARSHIPS.map(s => `
    <div class="schcard">
      <div class="schhead">
        <div class="schtitle">${s.title}</div>
        <div class="schamt">${s.amt}</div>
      </div>
      <div class="schdesc">${s.desc}</div>
      <div class="scheli"><strong>Eligibility:</strong> ${s.eli}</div>
    </div>
  `).join('');
}

/* ---------- MENTORSHIP PAGE ---------- */
function renderMentors() {
  const list = document.getElementById('mentList');
  if (list.dataset.rendered) return;
  list.dataset.rendered = 'true';
  list.innerHTML = MENTORS.map(m => `
    <div class="mentcard">
      <div class="mavatar" style="background:${m.color}">${m.initials}</div>
      <div>
        <div class="mname">${m.name}</div>
        <div class="mrole">${m.role}</div>
        <div class="mqoute">${m.quote}</div>
        <div class="mtopic">${m.topic}</div>
      </div>
    </div>
  `).join('');
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCareers();
  renderRoadmap();
  renderQuiz();
});

async function registerStudent() {

    const registration = {

        studentName:
        document.getElementById("studentName").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/registrations",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(registration)
            }
        );

        if(response.ok){

            alert("Registration Successful");

            document.getElementById("studentName").value="";
            document.getElementById("email").value="";
            document.getElementById("phone").value="";

        } else {

            alert("Registration Failed");
        }

    } catch(error){

        console.error(error);

        alert("Server Error");
    }
}
function logout(){

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("email");

    window.location.href="login.html";

}
