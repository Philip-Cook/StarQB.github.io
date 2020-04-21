class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/game_select.wav');
        this.load.audio('sfx_crowd', './assets/crowd_yelling.wav');
        this.load.audio('sfx_throw', './assets/throw.wav');
        this.load.image('stadium', './assets/stadium.png');
        this.load.image('menuScreen', './assets/menu_screen.png');
    }

    create() {
        // menu display

        this.add.tileSprite(0, 0, 640, 480, 'stadium').setOrigin(0, 0);
        this.add.tileSprite(125, 50, 400, 400, 'menuScreen').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }
        this.easyMode = true
        this.modeSet = this.add.text(320, 290, '  Mode: Easy & Single Player  ', menuConfig).setOrigin(0.5);
        game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
        }
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            this.easyMode = true
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            if(game.singleMode){
                this.modeSet = this.add.text(320, 290, '  Mode: Easy & Single Player  ', menuConfig).setOrigin(0.5);
            }else{
                this.modeSet = this.add.text(320, 290, '  Mode: Easy & Two Player  ', menuConfig).setOrigin(0.5);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            this.easyMode = false;
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            } 
            if(game.singleMode){
                this.modeSet = this.add.text(320, 290, '  Mode: Hard & Single Player  ', menuConfig).setOrigin(0.5);
            }else{
                this.modeSet = this.add.text(320, 290, '  Mode: Hard & Two Player  ', menuConfig).setOrigin(0.5);
            }   
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            game.singleMode = true;
            if(this.easyMode){
                this.modeSet = this.add.text(320, 290, '  Mode: Easy & Single Player  ', menuConfig).setOrigin(0.5);
            }else{
                this.modeSet = this.add.text(320, 290, '  Mode: Hard & Single Player  ', menuConfig).setOrigin(0.5);
            }   
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            game.singleMode = false;
            if(this.easyMode){
                this.modeSet = this.add.text(320, 290, '  Mode: Easy & Two Player  ', menuConfig).setOrigin(0.5);
            }else{
                this.modeSet = this.add.text(320, 290, '  Mode: Hard & Two Player  ', menuConfig).setOrigin(0.5);
            }   
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}