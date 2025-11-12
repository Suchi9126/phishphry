// Game configuration
// Import scenes
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scene: [Login,AvatarSelect] // We'll add scenes here one by one
};

// Create the game instance
const game = new Phaser.Game(config);

console.log('✓ PhishPhry game engine loaded!');
