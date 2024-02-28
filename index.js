// TREE DESICION --------------------------------------------------
class Node {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }
}

class DecisionTree {
  constructor(root) {
    this.root = root;
  }

  insertNode(value, parentValue) {

    //console.log('VALORRR: ', value)
    //console.log('VALORRRPARENTT: ', parentValue)

    const newNode = new Node(value);
    //console.log('NUEVO: ', newNode)

    const parentNode = this.findNode(parentValue);
    

    parentNode.children.push(newNode);

    //console.log('PADRE: ', parentNode)
    
  }

  findNode(value) {
    let currentNode = this.root;
    while (currentNode.value !== value) {
      //console.log('ANALIZA: ',currentNode.value)
      currentNode = currentNode.children.find((child) => child.value===value );
    }
    //console.log('SALIO: ', currentNode);
    return currentNode;
  }

  evaluateTree(input) {

    // elimina espacios
    input = input.trim();
    
    let currentNode = this.root;

    // console.log(typeof input)
    // console.log(typeof input)

    // console.log(input)
    // console.log(currentNode.children[0].value)
    // console.log(currentNode.children[0].value===input)
    
    //console.log(currentNode)
    //console.log(currentNode.children.length)
    const child = currentNode.children.find((child) => child.value==input );
    //console.log('child:', child)
    
    if (child) {
      
      currentNode = child;
    
    } else {
      console.log("No hay una decisión para la entrada: " + input)
      return null;
    }

    return currentNode;
  }
}

// Ejemplo de uso
const tree = new DecisionTree(new Node("¿Es un animal peludo?"));

tree.insertNode("si", "¿Es un animal peludo?");
tree.insertNode("no", "¿Es un animal peludo?");
tree.insertNode("Es un gato", "si");
tree.insertNode("Es una gallina", "no");


// FRONTEND ------------------------------------------------

// QUESTIONS
const questions = [
  {
    question: '¿Te gustan salir con tus amigos de fiesta?',
    answer1: 'Sí, me gusta salir de fiesta.',
    answer2: 'No, prefiero una reunión tranquila.'
  },
  {
    question: '¿En qué área te consideras mejor?',
    answer1: 'Matemáticas.',
    answer2: 'Inglés.'
  },
  {
    question: '¿Eres bueno con la tecnología?',
    answer1: 'Sí, soy bueno con la tecnología.',
    answer2: 'No me llama la atención.'
  },
  {
    question: '¿Te gustan las manualidades?',
    answer1: 'Sí, me gustan las manualidades.',
    answer2: 'No me gustan las manualidades.'
  },
  {
    question: '¿Te gustan contruir cosas?',
    answer1: 'Sí, me gusta usar mi creatividad.',
    answer2: 'No me llama la atención.'
  }
]

// {
//   question: '¿Las personas suelen contarte sus problemas?',
//   answer1: 'Sí, soy bueno escuchando.',
//   answer2: 'No, tengo pocos amigos.'
// },

//const preguntas = ['Que dia es hoy?','Que hora es?'];

// const respuestas = [
//   {
//     res1: 'res1',
//     res2: 'res2'
//   },
//   {
//     res1: 'res3',
//     res2: 'res4'
//   },
// ];

let i = 0

// SELECTION
const app = document.querySelector('.app');

const container = document.querySelector('.container');

const content = document.querySelector('.content');

const quest = document.querySelector('.quest');

const options = document.querySelector('.options');

const btnSend = document.querySelector('button');


const createQuest = (quest, res1, res2) => {

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
const nextQuestion = () => {
  
  const content = document.querySelector('.content');
  const radios = document.getElementsByName('option');
  const option1 = document.querySelector('#answer-1');
  const option2 = document.querySelector('#answer-2');

  // VERIFY SELECTION
  if(!radios[0].checked && !radios[1].checked){
    const error = document.querySelector('.error');
    error.innerText = 'Debe seleccionar una opcion';
    return;
  }

  // PRINT OPTION SELECTED
  if (radios[0].checked) console.log(option1.innerText);
  if (radios[1].checked) console.log(option2.innerText);

  // console.log(option1.innerText,radios[0].checked);
  // console.log(option2.innerText,radios[1].checked);

  // AMOUNT COUNTER
  i += 1;

  // IF THERE ARE MORE QUESTIONS
  if (i<questions.length) {
    
    const div = document.createElement('div');
    div.innerHTML = createQuest(questions[i].question, questions[i].answer1, questions[i].answer2);
    div.classList.add('content');
    container.removeChild(content);
    container.appendChild(div);
  
  } else {

    // FINISH TEST
    const btnSend = document.querySelector('button');
    const div = document.createElement('div');
    const btnResert = document.createElement('button');
    
    div.innerHTML = '<h3>Felicidades ya termino!</h3>';
    btnResert.innerText = 'Volver'

    div.classList.add('content');
    container.removeChild(content);
    app.removeChild(btnSend);
    container.appendChild(div);
    app.appendChild(btnResert);

    btnResert.addEventListener("click", ()=> {
      testReset();
    });
  }

}

// RESERT TEST
const testReset = () => {

  const content = document.querySelector('.content');
  const btnResert = document.querySelector('button');

  const div = document.createElement('div');
  const btnSend = document.createElement('button');

  div.classList.add('content');
  btnSend.innerText = 'Responder';

  btnSend.addEventListener("click",()=> {
    nextQuestion();
  });

  i=0;

  app.removeChild(btnResert);
  container.removeChild(content);

  // primera pregunta
  div.innerHTML = createQuest(questions[i].question, questions[i].answer1, questions[i].answer2);
  // inserta pregunta
  container.appendChild(div);
  // inserta button
  app.appendChild(btnSend);

}

btnSend.addEventListener("click",()=> {
  nextQuestion();
});

// crea primera pregunta --------------------------------------------------
const div = document.createElement('div');
div.classList.add('content');
div.innerHTML = createQuest(questions[i].question, questions[i].answer1, questions[i].answer2);
container.appendChild(div);

//console.log(tree.root.value);

// let res = process.openStdin();

// res.addListener("data", data => {

//   //console.log("respuesta: ", data.toString()); 
//   res = tree.evaluateTree(data.toString());
//   console.log(res.children[0].value);
  

// });

// let decision = '';

// while(decision!==null){

//   decision = tree.evaluateTree("no");
//   console.log(decision); // Salida: "Perro"

// }