class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        if(!game.singleMode)
        {
            this.load.image('footballP1', './assets/footballP1.png');
            this.load.image('footballP2', './assets/footballP2.png');
        }else{
            this.load.image('football', './assets/football.png');
        }
        this.load.image('player', './assets/playerRunning.png');
        this.load.image('stadium', './assets/stadium.png');
        // load spritesheet
        this.load.spritesheet('caught', './assets/playerCaught.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
    }

    create() {
        // place tile sprite
        this.stadiumField = this.add.tileSprite(0, 0, 640, 480, 'stadium').setOrigin(0, 0);

        // black UI background
        this.add.rectangle(0, 430, 640, 64, 0x000000).setOrigin(0, 0);

        // add football (p1)
        if(game.singleMode){
            this.p1Football = new P1Football(this, 320, 431, 'football').setScale(0.5, 0.5).setOrigin(0, 0);
        }else{
            this.p1Football = new P1Football(this, 300, 431, 'footballP1').setScale(0.5, 0.5).setOrigin(0, 0);
            this.p2Football = new P2Football(this, 340, 431, 'footballP2').setScale(0.5, 0.5).setOrigin(0, 0);
        }

        // add Player (x3)
        this.player01 = new Players(this, Math.floor(Math.random() * 833), 132, 'player', 0, 30).setOrigin(0,0);
        this.player02 = new Players(this, Math.floor(Math.random() * 833), 196, 'player', 0, 20).setOrigin(0,0);
        this.player03 = new Players(this, Math.floor(Math.random() * 833), 260, 'player', 0, 10).setOrigin(0,0);

        // p1 keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // p2 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'ballCaught',
            frames: this.anims.generateFrameNumbers('caught', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        // player 1 score
        this.p1Score = 0;
        this.p2Score = 0;
        // score display
        let p1ScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let p2ScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(50, 50, this.p1Score, p1ScoreConfig);
        if(!game.singleMode){
        this.scoreRight = this.add.text(490, 50, this.p2Score, p2ScoreConfig);
        }

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        p1ScoreConfig.fixedWidth = 0;
        p2ScoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', p1ScoreConfig, p2ScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or ← for Menu', p1ScoreConfig, p2ScoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.stadiumField.tilePositionX -= 4; // scroll tile sprite
        if (!this.gameOver) {               
            this.p1Football.update(); // update player sprite
            if(!game.singleMode){
            this.p2Football.update();
            }
            this.player01.update();// update players (x3)
            this.player02.update();
            this.player03.update();
        }             
        // check collisions
        if(this.checkCollision(this.p1Football, this.player03)) {
            this.p1Football.reset();
            this.p1CaughtBall(this.player03);   
        } else if (this.checkCollision(this.p1Football, this.player02)) {
            this.p1Football.reset();
            this.p1CaughtBall(this.player02);
        } else if (this.checkCollision(this.p1Football, this.player01)) {
            this.p1Football.reset();
            this.p1CaughtBall(this.player01);
        }

        if(!game.singleMode)   
        {
            if(this.checkCollision(this.p2Football, this.player03)) {
                this.p2Football.reset();
                this.p2CaughtBall(this.player03);   
            } else if (this.checkCollision(this.p2Football, this.player02)) {
                this.p2Football.reset();
                this.p2CaughtBall(this.player02);
            } else if (this.checkCollision(this.p2Football, this.player01)) {
                this.p2Football.reset();
                this.p2CaughtBall(this.player01);
            }
        }
    }

    checkCollision(ball, player) {
        // simple AABB checking
        if (ball.x < player.x + player.width && 
            ball.x + ball.width > player.x && 
            ball.y < player.y + player.height &&
            ball.height + ball.y > player. y) {
                return true;
        } else {
            return false;
        }
    }

    p1CaughtBall(player) {
        player.alpha = 0; // temporarily hide player
        // create catch sprite at player's position
        let catchBall = this.add.sprite(player.x, player.y, 'ballCaught').setOrigin(0, 0);
        catchBall.anims.play('ballCaught'); // play explode animation
        catchBall.on('animationcomplete', () => { // callback after animation completes
            player.reset(); // reset player position
            player.alpha = 1; // make player visible again
            catchBall.destroy(); // remove catch sprite
        });
        // score increment and repaint
        this.p1Score += player.points;
        this.scoreLeft.text = this.p1Score;     
        // play sound
        this.sound.play('sfx_crowd');  
    }

    p2CaughtBall(player) {
        player.alpha = 0; // temporarily hide player
        // create catch sprite at player's position
        let catchBall = this.add.sprite(player.x, player.y, 'caught').setOrigin(0, 0);
        catchBall.anims.play('ballCaught'); // play explode animation
        catchBall.on('animationcomplete', () => { // callback after animation completes
            player.reset(); // reset player position
            player.alpha = 1; // make player visible again
            catchBall.destroy(); // remove catch sprite
        });
        // score increment and repaint
        this.p2Score += player.points;
        this.scoreRight.text = this.p2Score;     
        // play sound
        this.sound.play('sfx_crowd');  
    }
}