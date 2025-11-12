class AvatarSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'AvatarSelect' });
    }

    create() {
        const player = getStore('player');
        
        // Title
        this.add.text(400, 80, `Welcome, ${player.name}!`, {
            fontSize: '32px',
            color: '#00ffff'
        }).setOrigin(0.5);

        this.add.text(400, 130, 'Choose Your Agent Avatar:', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Three avatar options
        const avatars = [
            { x: 200, color: 0x00ff00, name: 'Stealth', id: 'agent1' },
            { x: 400, color: 0xff0000, name: 'Tactical', id: 'agent2' },
            { x: 600, color: 0x0000ff, name: 'Tech', id: 'agent3' }
        ];

        let selectedAvatar = null;

        avatars.forEach(avatar => {
            // Draw avatar (simple circle for now)
            const circle = this.add.circle(avatar.x, 300, 60, avatar.color)
                .setInteractive({ useHandCursor: true });
            
            const label = this.add.text(avatar.x, 400, avatar.name, {
                fontSize: '20px',
                color: '#ffffff'
            }).setOrigin(0.5);

            // Selection handler
            circle.on('pointerdown', () => {
                selectedAvatar = avatar;
                // Highlight selected
                avatars.forEach(a => {
                    const c = this.children.list.find(child => 
                        child.x === a.x && child.y === 300 && child.type === 'Arc'
                    );
                    if (c) c.setStrokeStyle(a === avatar ? 4 : 0, 0xffffff);
                });
            });
        });

        // Confirm button
        const confirmBtn = this.add.rectangle(400, 500, 200, 50, 0x00ff00)
            .setInteractive({ useHandCursor: true });
        
        this.add.text(400, 500, 'Confirm', {
            fontSize: '24px',
            color: '#000'
        }).setOrigin(0.5);

        confirmBtn.on('pointerdown', () => {
            if (selectedAvatar) {
                setStore('avatar', {
                    id: selectedAvatar.id,
                    color: selectedAvatar.color,
                    name: selectedAvatar.name
                });
                setStore('upgrades', []);
                setStore('progress', { level: 1, score: 0, completed: [] });
                this.scene.start('Level1');
            } else {
                alert('Please select an avatar!');
            }
        });
    }
}
