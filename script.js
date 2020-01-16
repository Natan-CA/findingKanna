
var vitoria = false;

var kannaX;
var kannaY;

var audio;

var mouseClick = 0;

// função que  executa o audio e conta o número de clicks
function playSound(){
    if(!vitoria){
        audio.load();
        audio.play();
        mouseClick++;
    }
    // mensagem de vitória
    else{
        document.getElementById("vicText").classList.remove("hide");
        document.getElementById("vicText").innerHTML = `Você achou Kanna com ${mouseClick} clicks!
            Para jogar novamente atualiza a página.` 
    }             
}

function changeVolume(mouseX, mouseY ,kannaX, kannaY){

    // calculando distancia entre 2 pontos. Mouse e centroide da imagem
    distX = Math.pow(kannaX - mouseX, 2);
    distY = Math.pow(kannaY - mouseY, 2);
    distTotal = Math.round(Math.sqrt(distX + distY));

    if(distTotal <= 50) {
        audio.volume = 1.0;
        document.getElementById("kanna").classList.remove("hide");
        playSound();
        vitoria = true;
    }
    else {
        //calculando o valor de volume com base na dist entr os pontos
        vol = (100 * 60)/distTotal;
        vol = vol / 100;
        if (vol > 1) vol = 1;
        audio.volume = vol < 0.09  ? 0.1 : vol ;                      
    }
}

function getCoords(e) {
    //pegando coordenadas do mouse
    var x = event.clientX;
    var y = event.clientY;

    //pegando a coordenada X do centroide da imagem da kanna
    var centroidKannaX = document.getElementById("centroid").style.left;
    centroidKannaX = parseInt(centroidKannaX.replace("px", ""));

    //pegando a coordenada Y do centroide da imagem da kanna
    var centroidKannaY = document.getElementById("centroid").style.top;
    centroidKannaY = parseInt(centroidKannaY.replace("px", ""));
    
    changeVolume(x, y, centroidKannaX, centroidKannaY);
}

// gerando posição X aleatória
function genX(){
    var x = Math.floor(Math.random() * 1100);
    return x;
}

// gerando posição Y aleatória
function genY(){
    var y = Math.floor(Math.random() * 620);
    return y;        
}

/* injeta valores aleatórios para X & Y da imagem da kanna */
function createKanna(){

    document.getElementById("kanna").style.marginTop = genY()+"px";
    document.getElementById("kanna").style.marginLeft = genX()+"px";

    // Calculando as coordenadas do centroide da imagem na pos X
    kannaX = document.getElementById("kanna").style.marginLeft;
    kannaX = parseInt(kannaX.replace("px", ""));
    kannaX = kannaX + 48;
    
    // Calculando as coordenadas do centroide da imagem na pos Y
    kannaY = document.getElementById("kanna").style.marginTop;
    kannaY = parseInt(kannaY.replace("px", ""));
    kannaY = kannaY + 40;

    // injetando os novos valores
    document.getElementById("centroid").style.top = `${kannaY}px`;
    document.getElementById("centroid").style.left = `${kannaX}px`;

    //  atribuindo audio do html para a variavel
    audio = document.getElementById("kannaSound");
}
