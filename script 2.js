// ============ DATA ============
const ROLE_META = {
  writer:   { th:"Writer",   en:"Writer",   color:"var(--writer)"   },
  director: { th:"Director", en:"Director", color:"var(--director)" },
  actor:    { th:"Actor",    en:"Actor",    color:"var(--actor)"    },
  producer: { th:"Producer", en:"Producer", color:"var(--producer)" }
};

const ROLE_DESC = {
  writer: {
    th:"คุณโดดเด่นด้านการมองหาแก่นของเรื่อง สร้างไอเดีย และเรียบเรียงอารมณ์ให้กลายเป็นเรื่องเล่าที่มีพลัง",
    en:"You excel at finding the heart of a story, generating ideas, and shaping emotion into a powerful narrative."
  },
  director: {
    th:"คุณมองเห็นภาพรวมทางภาพและอารมณ์ชัดเจน พร้อมตัดสินใจทิศทางเพื่อเปลี่ยนแนวคิดให้เป็นภาพที่น่าจดจำ",
    en:"You have a clear vision of the visual and emotional big picture, and set the direction that transforms ideas into unforgettable visuals."
  },
  actor: {
    th:"คุณเข้าใจอารมณ์ กล้าแสดงออก และถ่ายทอดความรู้สึก ให้ผู้ชมเชื่อและเชื่อมโยงกับเรื่องราวได้",
    en:"You understand emotions, aren't afraid to express it, and communicate it in a way that lets the audience live in and connect with the story."
  },
  producer: {
    th:"คุณเก่งการประสานคน เงิน และทรัพยากร ทำให้ไอเดียเดินหน้าอย่างเป็นระบบและเกิดขึ้นได้จริง",
    en:"You're great at managing people, budgets, and resources turning ideas into something real while keeping everything on track."
  }
};

// A = writer(red), B = director(blue), C = actor(gold), D = producer(green)
const LETTER_ROLE = { A:"writer", B:"director", C:"actor", D:"producer" };
const LETTER_COLOR = { A:"var(--writer)", B:"var(--director)", C:"var(--actor)", D:"var(--producer)" };

// Weight per question (index 0-6) — how much each question counts toward
// the final result. Higher weight = more diagnostic / relevant question.
// Q1 Instinct=2, Q2 Feedback=2, Q3 Superpower=1, Q4 Team Mode=3,
// Q5 Strength=3, Q6 Spotlight=2, Q7 Emotion=2  → total weight = 15
const QUESTION_WEIGHTS = [2, 2, 1, 3, 3, 2, 2];

const ROLE_ORDER = ["writer","director","actor","producer"];
const ROLE_COLOR_HEX = { writer:"#e14d68", director:"#3e79e8", actor:"#e0a838", producer:"#2fc48d" };

const QUESTIONS = [
  {
    scene:{th:"SCENE 01 · INSTINCT", en:"SCENE 01 · INSTINCT"},
    q:{th:"ระหว่างเดินกลับบ้าน คุณเห็นแมวจ้องอะไรบางอย่างในตรอก สิ่งแรกที่คุณคิดคือ...",
       en:"Walking home, you see a cat staring at something in an alley. The first thing you think is..."},
    options:[
      {th:"มันจะเกิดอะไรขึ้นนะ", en:"I wonder what's about to happen"},
      {th:"ช็อตนี้ถ้าถ่ายรูปน่าจะออกมาได้ mood ดี", en:"This shot would be perfect on camera"},
      {th:"ถ้าเราเป็นแมว เราจะเดินเข้าไปดู", en:"If I were the cat, I'd walk right in and look"},
      {th:"ถ่ายลง TikTok น่าจะแมส", en:"This would go viral on TikTok"}
    ]
  },
  {
    scene:{th:"SCENE 02 · FEEDBACK", en:"SCENE 02 · FEEDBACK"},
    q:{th:"ถ้าเพื่อนบอกว่า “ไอเดียนี้ไม่น่าสนใจ” คุณจะ...",
       en:"If a friend says \"this idea isn't interesting,\" you..."},
    options:[
      {th:"ลองคิดใหม่ให้เริ่ดกว่าเดิม", en:"Rethink it to make it even better"},
      {th:"อธิบายภาพในหัวให้เห็น", en:"Visualize the picture in your head so they can see it"},
      {th:"ลองทำให้ดูเลย", en:"Just show them by doing it"},
      {th:"ถามทุกคนว่าคิดยังไง แล้วหาทางออก", en:"Ask everyone what they think, then find a way forward"}
    ]
  },
  {
    scene:{th:"SCENE 03 · SUPERPOWER", en:"SCENE 03 · SUPERPOWER"},
    q:{th:"ถ้าเลือกพลังวิเศษได้หนึ่งอย่าง คุณจะเลือกอะไร",
       en:"If you could pick one superpower, what would it be?"},
    options:[
      {th:"อ่านใจคน", en:"Mind reading"},
      {th:"หยุดเวลา", en:"Time stopping"},
      {th:"เปลี่ยนรูปลักษณ์ตัวเองได้", en:"Shape shifting"},
      {th:"ทำให้ทุกคนเชื่อในสิ่งที่คุณเล่า", en:"Making everyone believe what you say"}
    ]
  },
  {
    scene:{th:"SCENE 04 · TEAM MODE", en:"SCENE 04 · TEAM MODE"},
    q:{th:"ตอนทำงานกลุ่ม คุณมักถูกขอให้เป็นคนที่...",
       en:"In group work, you're usually asked to be the one who..."},
    options:[
      {th:"คิดไอเดียตั้งต้น", en:"Comes up with the first idea"},
      {th:"ตัดสินใจว่าสุดท้ายงานจะออกมาทิศทางไหน", en:"Decides the final direction of the work"},
      {th:"นำเสนอ หรือเป็นตัวแทนกลุ่ม", en:"Presents or represents the group"},
      {th:"ดูแลภาพรวมให้ทุกอย่างเดินตามแผนและตรงเวลา", en:"Keeps everything on plan and on time"}
    ]
  },
  {
    scene:{th:"SCENE 05 · STRENGTH", en:"SCENE 05 · STRENGTH"},
    q:{th:"คุณคิดว่าจุดแข็งของคุณคืออะไร",
       en:"What do you think your strength is?"},
    options:[
      {th:"มีจินตนาการสูง แต่ยังมีความสมเหตุสมผล", en:"Very imaginative, yet still grounded"},
      {th:"มีวิสัยทัศน์ มองเห็นภาพรวมของงานตั้งแต่ต้น", en:"Visionary — sees the whole picture from the start"},
      {th:"ควบคุมอารมณ์ได้ และถ่ายทอดความรู้สึกได้ดี", en:"Good emotional control and expression"},
      {th:"จัดการคน เงิน และเวลาได้อย่างเป็นระบบ", en:"Systematic at managing people, money, and time"}
    ]
  },
  {
    scene:{th:"SCENE 06 · SPOTLIGHT", en:"SCENE 06 · SPOTLIGHT"},
    q:{th:"ถ้ามีเวลา 1 นาทีบนเวทีต่อหน้าคนพันคน คุณจะ...",
       en:"With 1 minute on stage in front of a thousand people, you'd..."},
    options:[
      {th:"เล่าเรื่องหนึ่งเรื่อง", en:"Tell a story"},
      {th:"ทำอะไรก็ได้ที่จะสร้างภาพจำให้ทุกคนไม่มีวันลืม", en:"Do something unforgettable"},
      {th:"แสดงความสามารถอะไรสักอย่าง", en:"Show off a talent"},
      {th:"ชวนทุกคนมาร่วมทำบางอย่างด้วยกัน", en:"Get everyone to do something together"}
    ]
  },
  {
    scene:{th:"FINAL SCENE · EMOTION", en:"FINAL SCENE · EMOTION"},
    q:{th:"ถ้าคุณต้องทำหนังให้คนร้องไห้ คุณจะให้ความสำคัญกับ...",
       en:"To make a film that moves people to tears, you'd focus on..."},
    options:[
      {th:"บทพูดที่ซึ้งกินใจ", en:"Touching dialogue"},
      {th:"สี แสง และดนตรี", en:"Color, light, and music"},
      {th:"สีหน้าของนักแสดง", en:"The actor's expression"},
      {th:"ช่วงเวลาที่ปล่อยเรื่องราวออกมา", en:"Narrative pacing"}
    ]
  }
];

// ============ STATE ============
let lang = "th";
let current = 0;
const answers = []; // letters chosen

// ============ ELEMENTS ============
const screenIntro = document.getElementById("screen-intro");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");
const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
const qCurrentEl = document.getElementById("q-current");
const qTotalEl = document.getElementById("q-total");
const progressFill = document.getElementById("progress-fill");
const sceneTagText = document.getElementById("scene-tag-text");
const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options-wrap");
const resultRole = document.getElementById("result-role");
const resultDesc = document.getElementById("result-desc");
const donutEl = document.getElementById("donut");
const donutPct = document.getElementById("donut-pct");
const donutRole = document.getElementById("donut-role");
const legendEl = document.getElementById("legend");

qTotalEl.textContent = QUESTIONS.length;

// ============ LANGUAGE ============
document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    lang = btn.dataset.lang;
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.toggle("active", b===btn));
    applyStaticTranslations();
    if(!screenQuiz.hidden) renderQuestion();
    if(!screenResult.hidden) renderResult();
  });
});

function applyStaticTranslations(){
  document.querySelectorAll("[data-th]").forEach(el=>{
    const val = el.dataset[lang];
    if(val !== undefined) el.textContent = val;
  });
}

// ============ NAVIGATION ============
btnStart.addEventListener("click", ()=>{
  current = 0;
  answers.length = 0;
  screenIntro.hidden = true;
  screenQuiz.hidden = false;
  renderQuestion();
});

btnRestart.addEventListener("click", ()=>{
  current = 0;
  answers.length = 0;
  screenResult.hidden = true;
  screenIntro.hidden = false;
});

// ============ QUIZ RENDER ============
function renderQuestion(){
  const item = QUESTIONS[current];
  qCurrentEl.textContent = current + 1;
  progressFill.style.width = (((current+1)/QUESTIONS.length)*100) + "%";
  sceneTagText.textContent = item.scene[lang];
  questionText.textContent = item.q[lang];

  optionsWrap.innerHTML = "";
  const letters = ["A","B","C","D"];
  item.options.forEach((opt, i)=>{
    const letter = letters[i];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.style.setProperty("--opt-color", LETTER_COLOR[letter]);
    btn.innerHTML = `<span class="opt-letter">${letter}</span><span class="opt-text">${opt[lang]}</span>`;
    btn.addEventListener("click", ()=> selectAnswer(letter));
    optionsWrap.appendChild(btn);
  });
}

function selectAnswer(letter){
  answers[current] = letter;
  current++;
  if(current < QUESTIONS.length){
    renderQuestion();
  } else {
    showResult();
  }
}

// ============ RESULT ============
function computeScores(){
  // weighted score per role
  const scores = { writer:0, director:0, actor:0, producer:0 };
  // unweighted raw count, used only as a tiebreaker
  const rawCounts = { writer:0, director:0, actor:0, producer:0 };

  answers.forEach((letter, i)=>{
    const role = LETTER_ROLE[letter];
    if(!role) return;
    const weight = QUESTION_WEIGHTS[i] ?? 1;
    scores[role] += weight;
    rawCounts[role]++;
  });

  const totalWeight = QUESTION_WEIGHTS.reduce((a,b)=>a+b, 0);

  return { scores, rawCounts, totalWeight };
}

function pickWinner(scores, rawCounts){
  let best = ROLE_ORDER[0];
  ROLE_ORDER.forEach(role=>{
    if(scores[role] > scores[best]) best = role;
    else if(scores[role] === scores[best] && rawCounts[role] > rawCounts[best]) best = role;
  });
  return best;
}

function showResult(){
  screenQuiz.hidden = true;
  screenResult.hidden = false;
  renderResult();
}

function renderResult(){
  const { scores, rawCounts, totalWeight } = computeScores();
  const winner = pickWinner(scores, rawCounts);

  // percentages (rounded, last one absorbs rounding remainder so it sums to 100)
  const pct = {};
  let runningTotal = 0;
  ROLE_ORDER.forEach((role, i)=>{
    if(i === ROLE_ORDER.length - 1){
      pct[role] = 100 - runningTotal;
    } else {
      pct[role] = Math.round((scores[role] / totalWeight) * 100);
      runningTotal += pct[role];
    }
  });

  resultRole.textContent = ROLE_META[winner][lang];
  resultDesc.textContent = ROLE_DESC[winner][lang];

  // donut center label
  donutPct.textContent = pct[winner] + "%";
  donutRole.textContent = ROLE_META[winner][lang];

  // conic-gradient donut built from role percentages in fixed order
  let acc = 0;
  const stops = ROLE_ORDER.map(role=>{
    const start = acc;
    acc += pct[role];
    return `${ROLE_COLOR_HEX[role]} ${start}% ${acc}%`;
  }).join(", ");
  donutEl.style.background = `conic-gradient(${stops})`;

  // legend
  legendEl.querySelectorAll(".legend-item").forEach(item=>{
    const role = item.dataset.role;
    item.querySelector(".legend-pct").textContent = pct[role] + "%";
    item.classList.toggle("winner", role === winner);
  });
}

// init
applyStaticTranslations();
