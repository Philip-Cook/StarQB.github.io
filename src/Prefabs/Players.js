  
// Player prefab
class Players extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene, displayList, updateList
        // store pointValue
        this.points = pointValue;
    }

    update() {
        // move player left
        this.x -= game.settings.spaceshipSpeed;
        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}