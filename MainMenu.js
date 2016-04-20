MyGame.MainMenu = function(game) {

};
MyGame.MainMenu.prototype = {
    create: function() {
    	
        game.stage.backgroundColor = '#d4d8d3';
       
    	GameUI.Game_element();
    	
    	this.GameTitle = this.add.text(this.world.centerX, 250, '��������',{font: "80px Microsoft YaHei", fill: '#808080',align:'center'});
        this.GameTitle.anchor.set(0.5);
        
        
    	//�����Ļ�м��Բ
    	this.circle = game.add.sprite(game.world.centerX, game.world.centerY, game.circleGraphics.generateTexture());
    	this.circle.anchor.set(0.5);
    	
    	this.depictText = this.add.text(this.world.centerX, 710, '�����Ļ��Ծ',{font: "30px Microsoft YaHei", fill: '#fc3463',align:'center'});
        this.depictText.anchor.set(0.5);
        
        this.version = this.add.text(this.world.width-50, 1050, '�汾��0.0.1',{font: "30px Microsoft YaHei", fill: '#808080',align:'center'});
        this.version.anchor.set(1,0);
    	

        //������¾���
		this.rectTop = game.add.sprite(0, 0, game.rectGraphics.generateTexture());
		this.rectBottom = game.add.sprite(0, game.world.height - 80, game.rectGraphics.generateTexture());
        
    	//���С��
    	this.bird = this.add.sprite(game.world.centerX,game.world.centerY,'bird');
    	this.bird.anchor.set(0.5);
    	
    	
    	
    	
		game.input.onDown.addOnce(function(){
			game.state.start('Game')
		}, this);
    	
    	
    	
    	//���� ͼ��
    	game.circleGraphics.destroy();
    	game.NailGraphics.destroy();
    	game.rectGraphics.destroy();
    	
    }
};

