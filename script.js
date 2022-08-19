//                                                            Created by Rafael Gasparetto.
//            div class Begin (nick , intervalo , button, nick_erro)
let nick = document.querySelector('#nick');
let intervalo = document.querySelector('#intervalo');
let botao_comecar = document.querySelector('#btn_comecar');
let nick_erro = document.querySelector('#nick_erro');



//            div class start (Span_Nick , Numero (do Input), botao_jogar, resultado_final, span_tentativa)
let span_nick = document.querySelector('#b_nick');
let numero = document.querySelector('#number');
let botao_jogar = document.querySelector('#inside_botao');
var resultado_final = document.querySelector('#resposta_p');
var tentativa = document.querySelector('#tentativa');

//              Variaveis globais
var numero_secreto; // guardar numero secreto.
var intervalo_result; // guardar resultado do select.
var chances= 3; // numeros de tentativas.
var dica; // dica de menor ou maior.

// ---------------------------------------------------------------------------------------------------------
//                                        Função para cadastro de jogador e dificuldade do Game.

const ComecarJogo = () => {
    
    if(nick.value == ""){               // Validação de Nick
        nick_erro.innerHTML = (`Nick esta vazio! digite seu Nick!`);
    }else{
        span_nick.innerHTML = (`${nick.value}`);
        nick_erro.innerHTML = (``); // tirando a mensagem de erro da tela se caso colocar o nick.
    }
    // Pegando valor do intervalo (opção 1, opção 2 ou opção 3)
    intervalo_result = intervalo.value;

    //chamando função gerar numero aleatorio inteiro.
    GerarNumeroAleatorio(numero_secreto);
}
//---------------------------------------------------------------------------------------------------------
//      Botao para Validar nick / Receber o valor das opçoes / Gerar numero aleatorio inteiro!

botao_comecar.addEventListener('click', ComecarJogo);

//---------------------------------------------------------------------------------------------------------
//   Função para Mostrar dica no desktop ou mobile / Validar tentativas (chances) / Validação dos numeros.

const AdvinharNumero = () =>{
    
    // Para saber a dica (se é Maior ou menor) que o numero digitado.
    if(numero_secreto > numero.value){
        dica = ("MAIOR que o seu número");
    }else{
        dica = ("MENOR que o seu número");
    }

    // chamando função para saber se o usuario ainda tem tentativas (chances) disponiveis.
    ValidarChances();

    //chamando função para validação de numeros do input.
    ValidarNumeros(); 
}
//---------------------------------------------------------------------------------------------------------
//  Botao para ativar função de validação / Comparaçoes!

botao_jogar.addEventListener('click', AdvinharNumero);

//---------------------------------------------------------------------------------------------------------
//                               Função para Validar Tentativas.

const ValidarChances = () => {

   if(chances > 0){ 
        if(numero_secreto == numero.value && chances > 0){
            resultado_final.innerHTML = ("Parabéns, Você conseguiu advinhar!");     //Mostra na tela se caso o usuario acertar o número.
            tentativa.innerHTML = (``);
            FecharGame();                                               // função que desabilita o botao do game assim que acertar o numero.
        }else{
            chances--;                                                  // perde uma chance por nao ter acertado o numero.
            resultado_final.innerHTML = (`O numero é ${dica}`);         // mostra na tela se o numero é maior ou menor que o escolhido.
            tentativa.innerHTML = (`Voce ainda tem: ${chances} chances.`)
        }
        if(chances <= 0 ){
            resultado_final.innerHTML = (`O numero era ${numero_secreto}`); // mostra o Numero secreto para o usuario assim que perder todas as tentativas.
            tentativa.innerHTML = (`Não foi desta vez :( de um refresh na pagina para tentar novamente`); // mostra a mensagem assim que o usuario perdeu todas as tentativas.
            FecharGame(); //Game Over.
        }
   }
}
//---------------------------------------------------------------------------------------------------------
//            Função para validar números (números invalidos não são contados como tentativas perdidas)

const ValidarNumeros = () => {

    //                                              Validando a opção 3 (Intervalo de 1 a 200).
    if(intervalo_result == 'hard'){
        if(numero.value > 200 || numero.value <= 0){
            resultado_final.innerHTML = (`numero invalido`);              //Mensagem de numero invalido no Game.
            tentativa.innerHTML = ('');
            chances++;    // Caso o usuario digitar um numero fora do intervalo não perderá tentativas.
        }
    }

    //                                              Validando a opção 2 (Intervalo de 1 a 100).
    if(intervalo_result == 'medium'){
        if(numero.value > 100 || numero.value <= 0){
            resultado_final.innerHTML = (`numero invalido`);
            tentativa.innerHTML = ('');
            chances++;
        }
    }

    //                                              Validando a opção 1 (Intervalo de 1 a 10).
    if(intervalo_result == 'easy'){
        if(numero.value > 10 || numero.value <= 0){
            resultado_final.innerHTML = (`numero invalido`);
            tentativa.innerHTML = ('');
            chances++;
        }
    }
    //                                              Validando String, NaN, Undefined. 
    if(intervalo_result == "" || intervalo_result == NaN || intervalo_result == undefined){
        resultado_final.innerHTML = (`Calma, não tenha pressa, coloque o nick e o intervalo primeiro :D`); // Caso o usuario nao entrar com nick e intervalo (opções).
        tentativa.innerHTML = ('');
        chances++;
    }
}
//---------------------------------------------------------------------------------------------------------
//                                 Função para gerar número aleatorio (numero_secreto).

const GerarNumeroAleatorio = () =>{

    if(intervalo_result == 'easy'){
        numero_secreto = GerarNumerosInteiros(1,10); // chamando a função GerarNumerosInteiros gera um valor  entre (min, max).
    }

    if(intervalo_result == 'medium'){
        numero_secreto = GerarNumerosInteiros(1,100);
    }

    if(intervalo_result == 'hard'){
        numero_secreto = GerarNumerosInteiros(1,200);
    }
}
//---------------------------------------------------------------------------------------------------------
//                                  Função gerar numero aleatorio (inteiros).

function GerarNumerosInteiros(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
//  Desafio extra com a função /\ Math.random 

//---------------------------------------------------------------------------------------------------------
//  Função que desabilita o Botão jogar

const FecharGame = () =>{
    botao_jogar.disabled = true;
}
