class Career {
  
  constructor(name, value=0){
    this.name = name;
    this.value = value;
  }

  increase(){
    this.value += 1;
  }

  getName(){
    return this.name;
  }

  getValue(){
    return this.value;
  }

}

class Question {
  
  constructor(question,answer1,answer2,careers_true=null, careers_false=null){
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.careers_true = careers_true;
    this.careers_false = careers_false;
  }

  getQuestion(){
    return this.question;
  }

  getAnswer1(){
    return this.answer1;
  }

  getAnswer2(){
    return this.answer2;
  }

  getCareersTrue(){
    return this.careers_true;
  }

  getCareersFalse(){
    return this.careers_false;
  }

}

class HandlerDOM {
  
  constructor(careers, questions){

    this.careers = careers;
    this.questions = questions;
    this.i = 0;

  }

  getCareers(){
    return this.careers;
  }

  getQuestions(){
    return this.questions;
  }

  initTest(){
    
    const container = document.querySelector('.container');
    let question = this.questions[this.i];
    console.log(question);

    const div = document.createElement('div');
    div.classList.add('content');
    div.innerHTML = this.createContainer(this.questions[this.i].question, this.questions[this.i].answer1, this.questions[this.i].answer2);
    container.appendChild(div);
  }

  resetCareers(){
    this.careers = [
      new Career('Informatica'),
      new Career('Arquitectura'),
      new Career('Psicologia'),
      new Career('Pedagogia'),
      new Career('Derecho')
    ];
  }

  createContainer(quest, res1, res2){

    const div =
    `
      <h5 class="error"></h5>
      <h3 class="quest">${quest}</h3>
      <div class="options">
        <div class="option">
          <input type="radio" name="option" id="option1"><p id="answer-1">${res1}</p>
        </div>
        <div class="option">
          <input type="radio" name="option" id="option2"><p id="answer-2">${res2}</p>
        </div>
      </div>
    `;
    
    return div;
  
  }

  // NEXT QUESTION
  nextQuestion(){
    
    const container = document.querySelector('.container');
    const content = document.querySelector('.content');
    const radios = document.getElementsByName('option');
    let question = this.questions[this.i];

    // VERIFY SELECTION
    if(!radios[0].checked && !radios[1].checked){
      const error = document.querySelector('.error');
      error.innerText = 'Debe seleccionar una opcion';
      return;
    }

    // PRINT OPTION SELECTED
    if (radios[0].checked) {

      if(question.careers_true) question.careers_true.forEach(item=>{
        console.log(this.careers[item].getName());
        this.careers[item].increase();
      });

    }

    if (radios[1].checked){
      if(question.careers_false) question.careers_false.forEach(item=>{
        console.log(this.careers[item].getName());
        this.careers[item].increase();
      });

    }

    console.log(this.careers);

    // INCREASE COUNTER
    this.i += 1;

    // IF THERE ARE MORE QUESTIONS
    if (this.i<this.questions.length) {

      question = this.questions[this.i];
      console.log(question);
      
      const div = document.createElement('div');
      div.innerHTML = this.createContainer(this.questions[this.i].getQuestion(), this.questions[this.i].getAnswer1(), this.questions[this.i].getAnswer2());
      div.classList.add('content');
      container.removeChild(content);
      container.appendChild(div);
    
    } else {

      // FINISH TEST
      const app = document.querySelector('.app');
      const btnSend = document.querySelector('button');
      const div = document.createElement('div');
      const btnReset = document.createElement('button');

      console.log("Resultado final:");
      console.log(this.careers);

      // las ordena de forma descendente
      this.careers.sort(function(a, b){
        return b.getValue() - a.getValue();
      });

      console.log(this.careers);
      
      div.innerHTML = 
      `
      <h2 class="message">Felicidades ya terminó!</h2>
      <div class="results">
        <h2>Resultado:</h2>
        <p class="result">1. ${this.careers[0].name} con un total de ${this.careers[0].value} puntos</p>
        <p class="result">2. ${this.careers[1].name} con un total de ${this.careers[1].value} puntos</p>
      <div>
      `;
      btnReset.innerText = 'Volver'

      div.classList.add('content');
      container.removeChild(content);
      app.removeChild(btnSend);
      container.appendChild(div);
      app.appendChild(btnReset);

      btnReset.addEventListener("click", ()=> {
        this.testReset();
      });

    }

  }

  // RESET TEST
  testReset(){

    const app = document.querySelector('.app');
    const container = document.querySelector('.container');
    const content = document.querySelector('.content');
    const btnReset = document.querySelector('button');

    const div = document.createElement('div');
    const btnSend = document.createElement('button');

    div.classList.add('content');
    btnSend.innerText = 'Responder';

    btnSend.addEventListener("click",()=> {
      this.nextQuestion();
    });

    this.i=0;

    this.careers = [
      new Career('Informatica'),
      new Career('Arquitectura'),
      new Career('Psicologia'),
      new Career('Pedagogia'),
      new Career('Derecho')
    ];

    app.removeChild(btnReset);
    container.removeChild(content);

    // primera pregunta
    let question = this.questions[this.i];
    console.log(question);

    div.innerHTML = this.createContainer(questions[this.i].getQuestion(), questions[this.i].getAnswer1(), questions[this.i].getAnswer2());
    // inserta pregunta
    container.appendChild(div);
    // inserta button
    app.appendChild(btnSend);

  }

}

// CAREERS
let careers = [
  new Career('Informatica'),
  new Career('Arquitectura'),
  new Career('Psicologia'),
  new Career('Pedagogia'),
  new Career('Derecho')
];

// QUESTIONS
// 0 -> Informatica
// 1 -> Arquitectura
// 2 -> Psicologia
// 3 -> Pedagogia
// 4 -> Derecho
const questions = [
  new Question(
    '¿Te gustan salir con tus amigos de fiesta?',
    'Sí, me gusta salir de fiesta.',
    'No, prefiero una reunión tranquila.',
    [1,2,3,4], // arq, psico, pedago, derecho
    [0] // infor
  ),
  new Question(
    '¿Eres bueno con la tecnología?',
    'Sí, soy bueno con la tecnología.',
    'No me llama la atención.',
    [0], // infor
    [1,2,3,4] // arq, psico, pedago, derecho
  ),
  new Question(
    '¿Te gustan las manualidades?',
    'Sí, me gustan las manualidades.',
    'No me gustan las manualidades.',
    [1,3], // arq, pedago
    [0,2,4] // infor, psico, derecho
  ),
  new Question(
    '¿Tiene capacidad de diseño y creatividad?',
    'Sí, me gusta usar mi creatividad.',
    'No me considero una persona creativa.',
    [0,1] // arq, pedago
  ),
  new Question(
    '¿En qué área te consideras mejor?',
    'Matemáticas.',
    'Inglés.',
    [0,1], // infor, arq
    [2,3,4] // psico, pedago, derecho
  ),
  new Question(
    '¿Te consideras una persona paciente?',
    'Sí, soy muy paciente.',
    'No soy nada paciente.',
    [2], // pedago
  ),
  new Question(
    '¿Te gustan mantener todo en orden?',
    'Sí, soy una persona muy ordenada.',
    'Me es indiferente.',
    [4], // derecho
  ),
  new Question(
    '¿Las personas suelen contarte sus problemas?',
    'Sí, mis amigos siempre me cuentas sus problemas.',
    'No me pasa muy seguido.',
    [2], // pedago
  ),
  new Question(
    '¿Eres bueno explicando cosas?',
    'Sí, me considero bueno explicando temas.',
    'No soy muy bueno hablando.',
    [3,4], // pedago, derech
  ),
  new Question(
    '¿Te gusta defender a los que no pueden defenderse?',
    'Sí, siempre que puedo lo hago.',
    'No suelo tomar la iniciativa.',
    [4], // dere
    [0] // infor
  ),
  new Question(
    '¿Te llama la atencion el desarrollo de aplicaciones?',
    'Sí, es bastante interesante.',
    'No me llama la atencion.',
    [0], // infor
  ),
];

const btnSend = document.querySelector('button');

btnSend.addEventListener("click",()=> {
  test.nextQuestion();
});

const test = new HandlerDOM(careers,questions);
test.initTest();