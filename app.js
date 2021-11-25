const URL = "//apichavo.herokuapp.com/character/";

const main_card = document.querySelector('#main-card');
const template_card = document.querySelector('#template-card').content;
const fragment = document.createDocumentFragment();
const select = document.querySelector('#sel-characters');

select.addEventListener('change', SelectCharacter);


function AddCharacter() {
  fetch(URL)
  .then(response=>response.json())
  .then(data=>{
    data.map(character => {
      const option = document.createElement('option');
      option.value = character.name;
      option.textContent = character.name;
      fragment.appendChild(option);
    });
    select.appendChild(fragment);
  });
}
AddCharacter();

function SelectCharacter(event) {
  event.preventDefault();
  current_select = event.target.value;
  if (current_select === "everybody" ) {
    main_card.innerHTML='';
    renderCard();
  }else {
    main_card.innerHTML='';
    fetch(URL)
    .then(response=>response.json())
    .then(data =>{       
      data.map(character=>{
        if (character.name === select.value) {
          CreateCard(character)
        }
      });
    });
  }
}

function CreateCard(character) {
    let clone_template = document.importNode(template_card,true);
        clone_template.querySelector(".name-card").textContent = character.name;
        clone_template.querySelector(".img-card").setAttribute('src',character.URL);
        clone_template.querySelector(".category-card").textContent = `Category: ${character.category}`;
        clone_template.querySelector(".img-card").setAttribute('alt',character.name);
        clone_template.querySelector(".quote-card").textContent = `Quote: ${character.quote}`;;
        fragment.appendChild(clone_template); 
        main_card.appendChild(fragment);
}

  function renderCard() {
    fetch(URL)
    .then(response=>response.json())
    .then(data=>{
      data.map(character => {
        CreateCard(character);        
    });
  });
}
