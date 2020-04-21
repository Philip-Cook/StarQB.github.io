//P2 Football Prefab
class P2Football extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); // add to existing scene, displayList, updateList
        this.sfxThrow = scene.sound.add('sfx_throw'); // add throw sfx
        this.isFiring = false; // track firing status
    }

    update() {
        // left/right movement
        if (!this.isFiring) {
            if (keyA.isDown && this.x >= 47) {
                this.x -= 2;
            } else if (keyD.isDown && this.x <= 578) {
                this.x += 2;
            }
        }
        // throw button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            this.sfxThrow.play(); // play sfx
        }
        // if thrown, move up
        if (this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        // reset on miss
        if (this.y <= 108) {
            this.reset();
        }
    }
    // reset football to "ground"
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}