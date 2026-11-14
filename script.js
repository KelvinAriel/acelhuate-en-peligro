const quiz=[
{question:"¿Qué indica que se hayan registrado 2,110 descargas ordinarias?",options:["Que son automáticamente las más peligrosas","Que fueron la categoría más frecuente en el área inventariada","Que todas tienen la misma composición"],answer:1,explanation:"La frecuencia no determina por sí sola la carga contaminante. Se necesitan datos de caudal, composición y concentración."},
{question:"¿Por qué una fotografía no basta para determinar la calidad del agua?",options:["Porque la apariencia no revela microorganismos ni todas las sustancias químicas","Porque las fotografías nunca sirven como evidencia","Porque solamente importa el color del agua"],answer:0,explanation:"Una imagen ayuda a observar, pero la composición del agua requiere muestreo y análisis técnico."},
{question:"¿Cuál acción corresponde a una recuperación integral?",options:["Retirar basura una sola vez","Ocultar visualmente los drenajes","Combinar prevención, tratamiento, control, restauración y educación"],answer:2,explanation:"La recuperación exige medidas conectadas y sostenidas, no únicamente una limpieza superficial."},
{question:"¿Cómo deben presentarse los estudios del SNET de 2005 y del MARN de 2011?",options:["Como mediciones actuales de 2026","Como antecedentes con su fecha y metodología","Sin mencionar cuándo fueron elaborados"],answer:1,explanation:"Los datos históricos son valiosos si se respeta su contexto temporal y metodológico."},
{question:"¿Qué significa analizar el Acelhuate desde una perspectiva de cuenca?",options:["Estudiar solamente el punto más contaminado","Considerar conexiones, afluentes y efectos aguas arriba y abajo","Ignorar las actividades urbanas cercanas"],answer:1,explanation:"Una cuenca conecta territorios, afluentes, actividades humanas y procesos ecológicos."},
{question:"¿Qué dato ayuda a estimar la carga contaminante de una descarga?",options:["Solo su color","Caudal y concentración de las sustancias","Únicamente su ubicación en una fotografía"],answer:1,explanation:"La carga se relaciona con la cantidad de agua y la concentración del material presente, entre otros factores."},
{question:"¿Qué puede ocurrir cuando entra demasiada materia orgánica al agua?",options:["Puede disminuir el oxígeno durante su descomposición","El agua se vuelve automáticamente potable","Desaparecen todos los sedimentos"],answer:0,explanation:"Los microorganismos que descomponen materia orgánica consumen oxígeno, lo que puede afectar procesos ecológicos."},
{question:"¿Qué significa que el inventario corresponda a un área específica?",options:["Que describe toda la subcuenca para cualquier año","Que sus resultados tienen límites territoriales y temporales","Que no se necesita explicar la metodología"],answer:1,explanation:"Un inventario debe interpretarse dentro del tramo, periodo y método utilizados para elaborarlo."},
{question:"¿Cuál es una función de los centros educativos en la recuperación?",options:["Sustituir a las instituciones reguladoras","Relacionar ciencia, ciudadanía y territorio mediante proyectos","Autorizar descargas de aguas residuales"],answer:1,explanation:"La educación ambiental fortalece conocimientos, participación responsable y comunicación basada en evidencia."},
{question:"¿Por qué el anuncio de un plan no demuestra que todas las obras estén terminadas?",options:["Porque los planes nunca se ejecutan","Porque los avances deben comprobarse con indicadores y resultados públicos","Porque no es necesario evaluar las obras"],answer:1,explanation:"La ejecución debe verificarse mediante información pública sobre obras, funcionamiento, calidad del agua y reducción de aportes."}
];

const questionsContainer=document.querySelector("#questions");
const quizForm=document.querySelector("#quizForm");
const quizScore=document.querySelector("#quizScore strong");
const quizPercent=document.querySelector("#quizPercent");
const quizMessage=document.querySelector("#quizMessage");
const quizProgress=document.querySelector("#quizProgress");
const resetQuiz=document.querySelector("#resetQuiz");

function renderQuiz(){
  if(!questionsContainer)return;
  questionsContainer.innerHTML=quiz.map((item,index)=>`<fieldset class="question" data-question="${index}"><legend class="sr-only">Pregunta ${index+1}</legend><h3>${index+1}. ${item.question}</h3>${item.options.map((option,optionIndex)=>`<label class="option"><input type="radio" name="question-${index}" value="${optionIndex}"><span>${option}</span></label>`).join("")}<p class="question-feedback">${item.explanation}</p></fieldset>`).join("");
}
function evaluateQuiz(event){
  event.preventDefault();let score=0,answered=0;
  quiz.forEach((item,index)=>{const block=quizForm.querySelector(`[data-question="${index}"]`);const selected=quizForm.querySelector(`input[name="question-${index}"]:checked`);block.classList.remove("correct","incorrect");if(!selected)return;answered++;const correct=Number(selected.value)===item.answer;block.classList.add(correct?"correct":"incorrect");if(correct)score++;});
  const percent=Math.round(score/quiz.length*100);quizScore.textContent=`${score} / ${quiz.length}`;quizPercent.textContent=answered<quiz.length?`${answered} de ${quiz.length} respondidas`:`${percent}% de logro`;quizProgress.style.width=`${answered/quiz.length*100}%`;
  quizMessage.textContent=answered<quiz.length?`Aún faltan ${quiz.length-answered} preguntas. Completa todas para obtener el resultado final.`:percent>=80?"¡Excelente! Comprendiste las ideas principales del portal.":percent>=60?"Buen avance. Revisa las explicaciones para fortalecer lo aprendido.":"Conviene repasar las páginas del portal y volver a intentarlo.";
  quizMessage.scrollIntoView({behavior:"smooth",block:"center"});
}
function resetEvaluation(){quizForm.reset();quizForm.querySelectorAll(".question").forEach(item=>item.classList.remove("correct","incorrect"));quizScore.textContent="— / 10";quizPercent.textContent="Sin completar";quizProgress.style.width="0";quizMessage.textContent="";}
if(quizForm){renderQuiz();quizForm.addEventListener("submit",evaluateQuiz);resetQuiz.addEventListener("click",resetEvaluation);}

const header=document.querySelector(".site-header");const progressBar=document.querySelector("#progressBar");const backTop=document.querySelector("#backTop");const menuToggle=document.querySelector(".menu-toggle");const navLinks=document.querySelector("#navLinks");
function updateScrollUI(){const top=window.scrollY;const scrollable=document.documentElement.scrollHeight-window.innerHeight;if(header)header.classList.toggle("scrolled",top>20);if(backTop)backTop.classList.toggle("visible",top>700);if(progressBar)progressBar.style.width=`${scrollable>0?top/scrollable*100:0}%`;}
if(menuToggle&&navLinks){menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});navLinks.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));}
if(backTop)backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));window.addEventListener("scroll",updateScrollUI,{passive:true});updateScrollUI();
const currentPage=document.body.dataset.page;document.querySelectorAll("[data-nav]").forEach(link=>{if(link.dataset.nav===currentPage){link.classList.add("active");link.setAttribute("aria-current","page");}});
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll(".reveal").forEach(element=>observer.observe(element));}else{document.querySelectorAll(".reveal").forEach(element=>element.classList.add("visible"));}
