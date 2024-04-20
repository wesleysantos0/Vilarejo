let xp = 0;
let health = 100; //Vida
let gold = 50; //Dinherio

let currentWeapon = 0; // arma atual [Posição = 0]
let fighting;

let monsterHealth; //Saude do monstro
let inventory = ["bastão"]; // "bastao" , "dano", "espada"

// Declarando  botões;
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText")
const xpText = document.querySelector("#xpText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth ");


//Armas 
const weapons = [
    {
        name: "bastão", //madeira.
        power: 5, //dano
    },
    {
        name: "punhal",//punhal.
        power: 30,
    },
    {
        name: "martelo de garra",//martelo de garra.
        power: 50,
    },
    {
        name: "espada", //espada.
        power: 100,
    }
];


// Monstros 
const monsters = [
    { name: "slime", level: 2, health: 15 },
    { name: "dente de sabre", level: 8, health: 60 },
    { name: "dragão", level: 20, health: 300 },
]

// localização/cenário
const locations = [
    {
        name: "town square", //  praça da cidade
        "button text": ["Ir para a loja", "Ir para a gruta", "Lutar contra o dragão"],
        "button functions": [goStore, goCave, fightDragon],
        text: "Você está na praça da cidade.Você vê uma placa que diz \"loja\".."
    },
    {
        name: "store", // Loja
        "button text": ["Comprar 10 saúde (10 ouro)", "Comprar arma (30 ouro)", "Ir para a praça da cidade"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Entrou na loja." + "Oque você deseja fazer ?",
    },
    {
        name: "cave", // caverna
        "button text": ["Combater slime", "Lutar contra o animal com presas", "Ir para a praça da cidade"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "Você entra na caverna. Você vê aguns monstros."
    },
    {
        name: "fight", // lutar
        "button text": ["Ataque", "Esquiva", "Correr"],
        "button functions": [attack, dodge, goTown],
        text: "Você está lutando contra monstros."
    },

    {
        name: "kill monster", // monstro morto
        "button text": ["Ir para a praça da cidade", "Ir para a praça da cidade", "Ir para a praça da cidade"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'O monstro grita "Arg!" quando morre. Ganhou pontos de experiência e encontrou ouro.',
    },

    {
        name: "lose", // perdeu
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "Se fudeu!. &#x2620;"
    },

    {
        name: "win", // vitória
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "Derrotou o dragão! GANHOU O JOGO! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Voce ncontra um jogo secreto. Escolhe um número acima. Serão escolhidos aleatoriamente dez números entre 0 e 10. Se o número que escolheres corresponder a um dos números aleatórios, ganhas!"
    }
];


// Botões de inicialização.

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Intrução para cada botão se localizar..
function update(location) {
    monsterStats.style.display = 'none';
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];;
    button2.onclick = location["button functions"][1];;
    button3.onclick = location["button functions"][2];;
    text.innerHTML = location.text; // atualizará o emoticon
}


function goTown() {
    update(locations[0]) //Chamando a função localização 
}

function goStore() {
    update(locations[1])
}

function goCave() {
    update(locations[2])
}


// Função para comprar vida...
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "Não tem ouro suficiente para comprar saúde.";
    }
}


// Fução para compra de Armamento...
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++; // adicionanamos nossa arma atual
            goldText.innerText = gold; // imprimindo nosso gold"dinheiro";
            let newWeapon = weapons[currentWeapon].name + '( ' + weapons[currentWeapon].power + ' )'; // Atribuido a nossa nova arma, ao arma atual;
            text.innerText = "Agora você tem " + newWeapon + ".";
            inventory.push(newWeapon); // Adicionando a nossa arma em nosso inventario..
            text.innerText += " No seu inventário tem: " + inventory; // mostrando inevntario
        } else {
            text.innerText = "Você não tem ouro suficiente para comprar ouro.";
        }
    } else {
        text.innerText = "Você já tem a arma mais poderosa!";
        button2.innerText = "Vender a arma por 15 ouro";
        button2.onclick = sellWeapon;
    }

}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();//
        text.innerText = "Você vendeu" + currentWeapon + ".";
        text.innerText += " Em seu inventario você tem: " + inventory;
    } else {
        text.innerText = "Não venda sua UNICA arma!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block'; // Adicionando o display 'block';
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

// Criando o ataque..
function attack() {
    text.innerText = "O " + monsters[fighting].name + " ataca.";
    text.innerText += " Você ataca com seu(sua) " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackvalue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " Você falhou!";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " O seu " + inventory.pop() + " quebrou.";
        currentWeapon--;
    }
}

function getMonsterAttackvalue(level) { // pegando o level do monstro.. 
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

// Função pra desviar do ataque dos inimigos.. 
function dodge() {
    text.innerText = "Desviou do ataque do " + monsters[fighting].name;
}

// Função derrotarMonstro 
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
};

// Função de perca ...
function lose() {
    update(locations[5])
};

// função Vitótia..

function winGame() {
    update(locations[6]);
};

// Resetar jogo
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];

    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;

    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2)
}
function pickEight() {
    pick(8)
}
function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11))
    }
    text.innerText = "Você escolheu " + guess + ".  Aqui estão os números aleatórios:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        //Verificando se a estimativa(guess), está na matriz de numbers
        text.innerText += "Certo! Você ganhou 20 de ouro!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Errado! Você perdeu 10 pontos de vida!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}


// Aguarde que o documento esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Oculta a tela de carregamento e exibe o conteúdo da página após um breve atraso (simulando carregamento)
    setTimeout(function () {
        document.getElementById("loader-container").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2000); // Ajuste o tempo conforme necessário
});
