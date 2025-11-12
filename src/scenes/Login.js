class Login extends Phaser.Scene {
    constructor() {
        super({ key: 'Login' });
    }

    create() {
        // Check if player already logged in
        const existingPlayer = getStore('player');
        
        if (existingPlayer) {
            console.log('Welcome back:', existingPlayer.name);
            this.scene.start('AvatarSelect');
            return;
        }

        // Title
        this.add.text(400, 150, 'PhishPhry', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#00ffff',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 220, 'Cyber Security Training Game', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(400, 300, 'Enter Your Agent Name:', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Create HTML input for name
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Agent Name...';
        inputBox.style.position = 'absolute';
        inputBox.style.left = '300px';
        inputBox.style.top = '350px';
        inputBox.style.width = '200px';
        inputBox.style.padding = '10px';
        inputBox.style.fontSize = '18px';
        document.body.appendChild(inputBox);
        this.inputBox = inputBox;

        // Continue button
        const continueBtn = this.add.rectangle(400, 450, 200, 50, 0x00ff00)
            .setInteractive({ useHandCursor: true });
        
        this.add.text(400, 450, 'Continue', {
            fontSize: '24px',
            color: '#000'
        }).setOrigin(0.5);

        continueBtn.on('pointerover', () => continueBtn.setFillStyle(0x00cc00));
        continueBtn.on('pointerout', () => continueBtn.setFillStyle(0x00ff00));
        
        continueBtn.on('pointerdown', () => {
            const name = inputBox.value.trim();
            if (name.length > 0) {
                setStore('player', { name, loginDate: Date.now() });
                document.body.removeChild(inputBox);
                this.scene.start('AvatarSelect');
            } else {
                alert('Please enter a name!');
            }
        });
    }
}
