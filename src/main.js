//I did both S tier Mods 50 + 50 = 100
//UI redesign and complete game sound and images remake.
//Simultaneous players.

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play  ],
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
}

game.singleMode = true;

let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyW, keyA, keyD;
