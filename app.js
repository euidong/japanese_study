const FIELD_LABELS = { dict: "기본형", masu: "마스형", meaning: "뜻" };
const FEEDBACK_DELAY_MS = 900;

const state = {
  mode: "masu",
  questions: [],
  index: 0,
  score: 0,
  wrong: [],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(arr, n) {
  return shuffle(arr).slice(0, n);
}

// Per-mode question spec.
// hidden: which field is the answer
// hintFields: which non-hidden text fields show as on-screen hints
// imageMode: 'always' = image visible from start, 'on-demand' = behind a button
function modeSpec(mode) {
  if (mode === "meaning") {
    return { hidden: "meaning", hintFields: ["dict", "masu"], imageMode: "on-demand" };
  }
  if (mode === "ja") {
    const hidden = Math.random() < 0.5 ? "dict" : "masu";
    return { hidden, hintFields: ["meaning"], imageMode: "always" };
  }
  // default: masu
  return { hidden: "masu", hintFields: ["dict", "meaning"], imageMode: "always" };
}

function buildQuestions(n, mode) {
  const verbs = pickN(window.VERBS, n);
  return verbs.map(v => {
    const spec = modeSpec(mode);
    const { hidden, hintFields, imageMode } = spec;
    const correct = v[hidden];

    const pool = window.VERBS.filter(o => o.num !== v.num && o[hidden] !== correct);
    const sameGroup = pool.filter(o => o.group === v.group);

    let distractors;
    if (sameGroup.length >= 3) {
      distractors = pickN(sameGroup, 3);
    } else {
      const others = pool.filter(o => o.group !== v.group);
      distractors = sameGroup.concat(pickN(others, 3 - sameGroup.length));
    }

    const options = shuffle([correct, ...distractors.map(d => d[hidden])]);
    return { verb: v, hidden, hintFields, imageMode, options };
  });
}

function showScreen(id) {
  document.querySelectorAll("main > section").forEach(s => {
    s.hidden = s.id !== id;
  });
}

function startQuiz(mode, count) {
  state.mode = mode;
  state.questions = buildQuestions(count, mode);
  state.index = 0;
  state.score = 0;
  state.wrong = [];
  document.getElementById("qTotal").textContent = count;
  showScreen("screen-quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.index];
  const v = q.verb;
  document.getElementById("qNum").textContent = state.index + 1;
  document.getElementById("qScore").textContent = state.score;
  document.getElementById("progressFill").style.width =
    `${(state.index / state.questions.length) * 100}%`;

  const img = document.getElementById("qImage");
  const revealBtn = document.getElementById("revealImageBtn");
  img.src = v.image;
  img.alt = v.dict;
  if (q.imageMode === "on-demand") {
    img.hidden = true;
    revealBtn.hidden = false;
  } else {
    img.hidden = false;
    revealBtn.hidden = true;
  }

  const hintsEl = document.getElementById("hints");
  hintsEl.innerHTML = "";
  q.hintFields.forEach(f => {
    const hint = document.createElement("div");
    hint.className = "hint";
    renderHint(hint, f, v[f]);
    hintsEl.appendChild(hint);
  });

  document.getElementById("qLabel").textContent =
    `${FIELD_LABELS[q.hidden]}을(를) 고르세요`;

  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.textContent = opt;
    btn.addEventListener("click", () => onAnswer(opt, btn));
    choicesEl.appendChild(btn);
  });
}

function renderHint(el, field, value) {
  el.innerHTML = "";
  const label = document.createElement("span");
  label.className = "hint-label";
  label.textContent = FIELD_LABELS[field];
  const val = document.createElement("span");
  val.className = "hint-value";
  val.textContent = value;
  el.appendChild(label);
  el.appendChild(val);
}

function onAnswer(picked, btn) {
  const q = state.questions[state.index];
  const correct = q.verb[q.hidden];
  const buttons = document.querySelectorAll("#choices .choice");
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add("correct");
    if (b === btn && picked !== correct) b.classList.add("wrong");
  });

  if (picked === correct) {
    state.score++;
  } else {
    state.wrong.push({ verb: q.verb, hidden: q.hidden, picked, correct });
  }

  setTimeout(() => {
    state.index++;
    if (state.index >= state.questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }, FEEDBACK_DELAY_MS);
}

function showResult() {
  showScreen("screen-result");
  const total = state.questions.length;
  document.getElementById("rScore").textContent = state.score;
  document.getElementById("rTotal").textContent = total;
  document.getElementById("rPercent").textContent =
    Math.round((state.score / total) * 100);

  const wrongHeader = document.getElementById("wrongHeader");
  const wrongList = document.getElementById("wrongList");
  wrongList.innerHTML = "";

  if (state.wrong.length === 0) {
    wrongHeader.hidden = true;
    return;
  }

  wrongHeader.hidden = false;
  state.wrong.forEach(w => {
    const item = document.createElement("div");
    item.className = "wrong-item";

    const img = document.createElement("img");
    img.src = w.verb.image;
    img.alt = w.verb.dict;

    const detail = document.createElement("div");
    detail.className = "wrong-detail";

    const summary = document.createElement("div");
    const summaryBold = document.createElement("b");
    summaryBold.textContent = w.verb.dict;
    summary.appendChild(summaryBold);
    summary.append(` / ${w.verb.masu} / ${w.verb.meaning}`);

    const picked = document.createElement("div");
    picked.className = "picked";
    picked.textContent = `고른 답: ${w.picked}`;

    const correct = document.createElement("div");
    correct.className = "correct-ans";
    correct.textContent = `정답: ${w.correct} (${FIELD_LABELS[w.hidden]})`;

    detail.appendChild(summary);
    detail.appendChild(picked);
    detail.appendChild(correct);

    item.appendChild(img);
    item.appendChild(detail);
    wrongList.appendChild(item);
  });
}

document.getElementById("start-form").addEventListener("submit", e => {
  e.preventDefault();
  const mode = document.querySelector('input[name=mode]:checked').value;
  const count = parseInt(
    document.querySelector('input[name=count]:checked').value, 10
  );
  startQuiz(mode, count);
});

document.getElementById("restart").addEventListener("click", () => {
  showScreen("screen-start");
});

document.getElementById("stopBtn").addEventListener("click", () => {
  if (confirm("퀴즈를 그만두시겠습니까? 진행 내용은 사라집니다.")) {
    showScreen("screen-start");
  }
});

document.getElementById("revealImageBtn").addEventListener("click", () => {
  document.getElementById("qImage").hidden = false;
  document.getElementById("revealImageBtn").hidden = true;
});
