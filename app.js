
document.addEventListener('DOMContentLoaded', () => {

    function start(){
        var vezJogador1 = true;
        const jogador = document.querySelector("#jogador");
        const squares = document.querySelectorAll("div.square");
        const result = document.querySelector("#result");
        jogador.textContent = "";
        var body = document.getElementsByTagName("body")[0];
        var button = document.createElement("button");
        
        
   


    // Win conditions = something >=3

    let row1Circle = 0;
    let row2Circle = 0;
    let row3Circle = 0;
    let col1Circle = 0;
    let col2Circle = 0;
    let col3Circle = 0;

    let row1Cross = 0;
    let row2Cross = 0;
    let row3Cross = 0;
    let col1Cross = 0;
    let col2Cross = 0;
    let col3Cross = 0;
    let diag1Circle = 0;
    let diag2Circle = 0;
    let diag1Cross = 0;
    let diag2Cross = 0;



    squares.forEach((e) => {
        e.addEventListener('click', draw);
    })

    function draw(){
        if(vezJogador1){
            handleChecks(this.classList);
            this.childNodes[5].classList.add('radius');
            vezJogador1 = false;
            this.removeEventListener('click', draw);
            
           
        }else{
            handleChecks(this.classList);
            this.childNodes[1].classList.add('cross1');
            this.childNodes[3].classList.add('cross2');
            this.removeEventListener('click', draw);
            vezJogador1 = true;
            
        }
    }

    function checkWin(){
        if(row1Circle >= 3 || row2Circle >=3 || row3Circle >=3 || col1Circle >=3 || col2Circle >=3 || col3Circle >= 3 || diag1Circle >=3 || diag2Circle >=3){
            result.textContent = "Jogador1 Ganhou!"
            clearInterval(playerTry);
            clearInterval(checkTheWin);
            jogador.textContent = "";
            squares.forEach((e) => {
                e.removeEventListener("click", draw);
            })

            body.appendChild(button);
            button.innerText = "RESTART";
            let restart = button.addEventListener("click", restartButton);
        }

        if(row1Cross >= 3 || row2Cross >=3 || row3Cross >=3 || col1Cross >=3 ||
             col2Cross >=3 || col3Cross >= 3 || diag1Cross >=3 || diag2Cross >=3){
            result.textContent = "Jogador2 Ganhou!";
            clearInterval(playerTry);
            clearInterval(checkTheWin);
            jogador.textContent = "";
            squares.forEach((e) => {
                e.removeEventListener("click", draw);
            })
            body.appendChild(button);
            button.innerText = "RESTART"; 
            let restart = button.addEventListener("click", restartButton);
        }

        let sum = row1Circle+ row2Circle +row3Circle+col1Circle +col2Circle +col3Circle +
        row1Cross +row2Cross +row3Cross +col1Cross +col2Cross + col3Cross;

        if(sum >= 18){
            result.textContent = "Deu velha!";
            clearInterval(playerTry);
            clearInterval(checkTheWin);
            jogador.textContent = "";
            squares.forEach((e) => {
                e.removeEventListener("click", draw);
            })
            body.appendChild(button);
            button.innerText = "RESTART";
            let restart = button.addEventListener("click", restartButton);
        }

        
        
    }

    function restartButton(){
        // preciso restaurar a classlist antiga de todas as squares. So assim poderei inicializar a funçao novamente.
        
            squares.forEach((e) => {
                e.childNodes.forEach((a)=>{
                    if(a.classList !== undefined){
                        if(a.classList.contains("cross1")){
                            a.classList.remove("cross1");
                        }
                    }

                    if(a.classList !== undefined){
                        if(a.classList.contains("cross2")){
                            a.classList.remove("cross2");
                        }
                    }

                    if(a.classList !== undefined){
                        if(a.classList.contains("radius")){
                            a.classList.remove("radius");
                        }
                    }
                    
                })
             

            })
            console.log(body);
            result.textContent = "";
            body.removeChild(button);
         
       



        start();
    }


    function handleChecks(classlist){
        if(classlist.contains("row1") && vezJogador1){
            row1Circle++;
        }

        if(classlist.contains("row2") && vezJogador1){
            row2Circle++;
        }

        if(classlist.contains("row3") && vezJogador1){
            row3Circle++;
        }

        if(classlist.contains("col1") && vezJogador1){
            col1Circle++;
        }

        if(classlist.contains("col2") && vezJogador1){
            col2Circle++;
        }

        if(classlist.contains("col3") && vezJogador1){
            col3Circle++;
        }

        if(classlist.contains("row1") && !vezJogador1){
            row1Cross++;
        }

        if(classlist.contains("row2") && !vezJogador1){
            row2Cross++;
        }

        if(classlist.contains("row3") && !vezJogador1){
            row3Cross++;
        }

        if(classlist.contains("col1") && !vezJogador1){
            col1Cross++;
        }

        if(classlist.contains("col2") && !vezJogador1){
            col2Cross++;
        }

        if(classlist.contains("col3") && !vezJogador1){
            col3Cross++;
        }

        if(((classlist.contains("col1") && classlist.contains("row1")) || (classlist.contains("col2") && classlist.contains("row2"))
         || (classlist.contains("col3") && classlist.contains("row3"))) && vezJogador1){
            diag1Circle++;
        }

        if(((classlist.contains("col3") && classlist.contains("row1")) || (classlist.contains("col2") && classlist.contains("row2"))
         || (classlist.contains("col1") && classlist.contains("row3"))) && vezJogador1){
            diag2Circle++;
        }

        if(((classlist.contains("col1") && classlist.contains("row1")) || (classlist.contains("col2") && classlist.contains("row2"))
         || (classlist.contains("col3") && classlist.contains("row3"))) && !vezJogador1){
            diag1Cross++;
        }

        if(((classlist.contains("col3") && classlist.contains("row1")) || (classlist.contains("col2") && classlist.contains("row2"))
         || (classlist.contains("col1") && classlist.contains("row3"))) && !vezJogador1){
            diag2Cross++;
        }


    }

    let playerTry = setInterval(()=>{
        if(vezJogador1){
           jogador.textContent = "Vez do Jogador1";
          
        }else{
            jogador.textContent = "Vez do Jogador2";
        }
    }, 1000);

    let checkTheWin = setInterval(checkWin, 500);

    }

    start();
    


})
