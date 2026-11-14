const quiz = [
  {
    question: "¿Qué indica que se hayan registrado 2,110 descargas ordinarias?",
    options: [
      "Que son automáticamente las más peligrosas",
      "Que fueron la categoría más frecuente en el área inventariada",
      "Que todas tienen la misma composición"
    ],
    answer: 1,
    explanation: "La frecuencia no determina por sí sola la carga contaminante. Se necesitan datos de caudal, composición y concentración."
  },
  {
    question: "¿Por qué una fotografía no basta para determinar la calidad del agua?",
    options: [
      "Porque la apariencia no revela microorganismos ni todas las sustancias químicas",
      "Porque las fotografías nunca sirven como evidencia",
      "Porque solamente importa el color del agua"
    ],
    answer: 0,
    explanation: "Una imagen ayuda a observar, pero la composición del agua requiere muestreo y análisis técnico."
  },
  {
    question: "¿Cuál de estas acciones corresponde a una recuperación integral?",
    options: [
      "Retirar basura una sola vez",
      "Ocultar visualmente los drenajes",
      "Combinar prevención, tratamiento, restauración, control y educación"
    ],
    answer: 2,
    explanation: "La recuperación exige medidas conectadas y sostenidas, no únicamente una limpieza superficial."
  },
  {
    question: "¿Cómo deben presentarse los estudios del SNET de 2002 y del MARN de 2011?",
    options: [
      "Como mediciones actuales de 2026",
      "Como antecedentes con su fecha y metodología",
      "Sin mencionar cuándo fueron elaborados"
    ],
    answer: 1,
    explanation: "Los datos históricos son valiosos si se respeta su contexto temporal y metodológico."
  },
  {
    question: "¿Qué significa analizar el Acelhuate desde una perspectiva de cuenca?",
    options: [
      "Estudiar solamente el punto más contaminado",
      "Considerar conexiones, afluentes y efectos aguas arriba y abajo",
      "Ignorar las actividades urbanas cercanas"
    ],
    answer: 1,
    explanation: "Una cuenca conecta territorios, afluentes, actividades humanas y procesos ecológicos."
  }
];

const questionsContainer = document.querySelector("#questions");
const quizForm = document.querySelector("#quizForm");
const quizScore = document.querySelector("#quizScore strong");
const quizMessage = document.querySelector("#quizMessage");
const resetQuiz = document.querySelector("#resetQuiz");

function renderQuiz() {
  questionsContainer.innerHTML = quiz.map((item, index) => `
    <fieldset class="question" data-question="${index}">
      <legend class="sr-only">Pregunta ${index + 1}</legend>
      <h3>${index + 1}. ${item.question}</h3>
      ${item.options.map((option, optionIndex) => `
        <label class="option">
          <input type="radio" name="question-${index}" value="${optionIndex}">
          <span>${option}</span>
        </label>
      `).join("")}
      <p class="question-feedback">${item.explanation}</p>
    </fieldset>
  `).join("");
}

quizForm.addEventListener("submit", event => {
  event.preventDefault();
  let score = 0;
  let answered = 0;
  quiz.forEach((item, index) => {
    const questionElement = quizForm.querySelector(`[data-question="${index}"]`);
    const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);
    questionElement.classList.remove("correct", "incorrect");
    if (!selected) return;
    answered += 1;
    const isCorrect = Number(selected.value) === item.answer;
    questionElement.classList.add(isCorrect ? "correct" : "incorrect");
    if (isCorrect) score += 1;
  });
  quizScore.textContent = `${score} / ${quiz.length}`;
  quizMessage.textContent = answered < quiz.length
    ? `Respondiste ${answered} de ${quiz.length} preguntas. Completa las restantes para obtener tu resultado final.`
    : score === quiz.length
      ? "¡Excelente! Comprendiste las ideas principales del portal."
      : "Revisa las explicaciones y vuelve a intentarlo. Aprender también es comparar y corregir.";
});

resetQuiz.addEventListener("click", () => {
  quizForm.reset();
  quizForm.querySelectorAll(".question").forEach(item => item.classList.remove("correct", "incorrect"));
  quizScore.textContent = "— / 5";
  quizMessage.textContent = "";
});

const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#progressBar");
const backTop = document.querySelector("#backTop");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle("scrolled", scrollTop > 20);
  backTop.classList.toggle("visible", scrollTop > 700);
  progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

renderQuiz();
