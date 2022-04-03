// Dom
let optionsColor = document.querySelectorAll(".option__color");
let selectColor = document.querySelector(".color");
let volume = document.querySelector(".volume__on");
let mute = document.querySelector(".volume__off")


// Variables

const colors = ["blanco", "amarillo", "rosa", "rojo", "naranja", "verde", "azul", "violeta", "marron", "negro"];

let randomNumbers = [];
let randomColors = [];

let counter = 0;
let result;


// Eventos

volume.addEventListener("click", () => {
    (volume.classList.contains("--active")) ? enableMute() : enableSound();
})

mute.addEventListener("click", () => {
   (mute.classList.contains("--active")) ? enableSound() : enableMute();
})




// Generar cuatro opciones de colores en la pantalla

const generateColors = () => {


    // Cuatro números aleatorias

    while (randomNumbers.length < 4) {

        let opt = Math.floor(Math.random() * 10);

        
        // Si el número no está repetido se guarda en el array
        if(!randomNumbers.includes(opt)){

            randomNumbers.push(opt)


            // Seleccionamos los cuatro colores mediante el array de número aleatorios
            colors.forEach((color, index) => {
                
                if (index === opt){
                   randomColors.push(color);
                } 

            })

        }
        
    }

  
}
generateColors();



// Eliminar color si es acertado

const deleteColor = () => {


    // Eliminarlo de los array de cololores y números seleccionados aleatoriamente
    randomColors = randomColors.filter(color => color !== `${selectColor.textContent}`);

    colors.forEach((color, index) => {
        if(color === selectColor.textContent){
            randomNumbers = randomNumbers.filter(num => num !== index);
        }
    })


    if (randomNumbers.length < 4){
        generateColors();
    }
 

   
    // Limpiar div

    optionsColor.forEach((option, index) => {

        if (option.dataset.color === selectColor.textContent){

            option.dataset.color = "";
            option.style.backgroundColor = "#a4a9ad";
        }
    
    })


    // Regenear input con nuevo color a buscar

    selectColor.textContent = "";
    
    if (!selectColor.textContent){
        generateSearchColor();
        printColors();
    }
}



// Generar el color que hay que buscar

const generateSearchColor = () => {

    let opts = Math.floor(Math.random() * 4);

    randomColors.forEach((color, index) => {
       if (index === opts){
            selectColor.textContent = `${color}`;
       }
    })

}

generateSearchColor();




// Pintar las cards con las opciones

const printColors = () => {

    optionsColor.forEach((option, index) => {

        option.dataset.color = `${randomColors[index]}`;

        
        switch(option.dataset.color){
        
            case colors[0]:
                option.style.backgroundColor = "white";
                break;

            case colors[1]:
                option.style.backgroundColor = "yellow";
                break;

            case colors[2]:
                option.style.backgroundColor = "#ff477e";
                break;
            case colors[3]:
                option.style.backgroundColor = "#dd1c1a";
                break;
            case colors[4]:
                option.style.backgroundColor = "#f26419";
                break;
            case colors[5]:
                option.style.backgroundColor = "#208b3a";
                break;
            case colors[6]:
                option.style.backgroundColor = "#0077b6";
                break;
            case colors[7]:
                option.style.backgroundColor = "#7209b7";
                break;
            case colors[8]:
                option.style.backgroundColor = "#99582a";
                break;
            case colors[9]:
                option.style.backgroundColor = "black";
                break;

        }
    
    })
        
}
printColors();



// Pintar el mensaje en la card

const printMessage = () => {


    switch(counter) {
        case 1:
            result = `¡¡Bien!!`;
            break;
        case 2:
            result = `¡Muy bien!`;
            break;
        case 3:
            result = `¡Genial!`;
            break;
        case 4:
            result = `¡Sigue así!`;
            break;

        default:
            result = `¡Has acertado!`
            break;

    }

}




// Comprobar si la opción seleccionada es correcta o incorrecta

const checkColor = () => {

    optionsColor.forEach(option => {

        option.addEventListener("click", (e) => {


           // Pintar la respuesta si has elegido correctamente

            const flipCard = option.parentElement.parentElement;

            if (option.dataset.color === selectColor.textContent){

                counter++;
                printMessage();

                if (volume.classList.contains("--active")){
                
                    let sound = new Audio("../assets/sounds/correct.mp3");
                    sound.play();

                }

                const card = option.parentElement;

                const fragment = document.createDocumentFragment();
                const div = document.createElement("div");
                const paragraph = document.createElement("p");

                flipCard.classList.add("--ok");                      
                div.classList.add("option__color__result")
                paragraph.classList.add("option__text");
                            
                paragraph.textContent = `${result}`;                
                
                if ((option.style.backgroundColor === "white") || (option.style.backgroundColor === "yellow")){
                    paragraph.style.color = "black";

                } else {
                    paragraph.style.color = "white";
                }

                div.appendChild(paragraph);
                fragment.appendChild(div);
                card.appendChild(fragment);


                setTimeout(() => {
                    flipCard.classList.remove("--ok");
                    card.removeChild(div)   
                }, 2000);


                setTimeout(() => deleteColor(), 3000);
                
                
            
            } else {

                counter = 0;

                flipCard.classList.add("--error");

                if (volume.classList.contains("--active")){
                
                    let sound = new Audio("../assets/sounds/incorrect.mp3");
                    sound.play();
                    sound.volume = 0.5;

                }

                setTimeout(() => {
                    flipCard.classList.remove("--error");
                }, 1000);
            }

        })
    })
}
checkColor();




// Volumen

if (window){
    mute.classList.add("--active");
}


// Enabled volume

const enableSound = () => {
   mute.classList.remove("--active");
   volume.classList.add("--active");
}

// Enabled mute 

const enableMute = () => {
    volume.classList.remove("--active");
    mute.classList.add("--active");
}


// Utilizar el teclado en lugar del ratón

if (window) {

    optionsColor.forEach((option, index) => {
        
        if (index === 0){
            option.classList.add("--select");

            if (option.classList.contains("--select")) {

                option.addEventListener("keypress", (e) => {
    
                    console.log(key)
                    console.log(keyChar);
                    
                    let key = e.keyCode || e.which;
                    let keyChar = String.fromCharCode(key);


                    if (keyChar == '37'){
                        console.log("Has pulsado enter")
                    }
    
                })
            }
        }

       
    })
}