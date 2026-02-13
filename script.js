let currentQuestion = 0;
let score = 0;

async function loadQuestion() {
  const res = await fetch(`/api/questions/${currentQuestion}`);
  const data = await res.json();

  document.getElementById("question").innerText = data.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  data.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index, data.correctIndex);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) score++;
  currentQuestion++;
  loadQuestion();
}

document.getElementById("next-btn").addEventListener("click", loadQuestion);

loadQuestion();
