MyGame.Game = function(game) {
	game.direction = 1;
	this.nailNumber = 1;
	this.score = 0;
	this.hitWall = false;
	game.isRun = false;
};
MyGame.Game.prototype = {
    create: function() {
    	
        game.stage.backgroundColor = '#d4d8d3';
       
        GameUI.Game_element()

    	//�����Ļ�м��Բ
    	this.circle = game.add.sprite(game.world.centerX, game.world.centerY, game.circleGraphics.generateTexture());
    	this.circle.anchor.set(0.5);
    	
    	this.scoreText = this.add.text(this.world.centerX, this.world.centerY+20, '0',{font: "bold 238px Microsoft YaHei", fill: '#d4d8d3',align:'center'});
        this.scoreText.anchor.set(0.5);
        
        //������¾���
		this.rectTop = game.add.sprite(0, 0, game.rectGraphics.generateTexture());
		this.rectBottom = game.add.sprite(0, game.world.height - 80, game.rectGraphics.generateTexture());
        
    	//���С��
    	this.bird = this.add.sprite(game.world.centerX,game.world.centerY,'bird');
    	this.bird.anchor.set(0.5);
    	//������������
    	game.physics.enable([this.bird],Phaser.Physics.ARCADE);
    	//������ı߽���ײ��ϵ�� 0.8
    	this.bird.body.collideWorldBounds = true;
    	this.bird.body.bounce.set(0.8)
    	
    	
    	//������¶�����(����������)
    	this.upbottomNailGroup = game.add.physicsGroup();
    	//������Ҷ�����(����������)
    	this.leftrigthNailGroup = game.add.physicsGroup();

    	//ѭ����� ���¶��ӣ������뵽���¶���������
    	for(var i = 0 ;i<16;i++)
    	{
    		if(i<8)
    		{
    			this.Nail = game.add.sprite(96*i, 80+20, game.NailGraphics.generateTexture());
    			this.upbottomNailGroup.add(this.Nail);
    		}
    		else
    		{
    			this.Nail = game.add.sprite(96*i - game.world.width - 19, game.world.height - 80 - 20, game.NailGraphics.generateTexture());
    			this.Nail.scale.y = -1
    			this.upbottomNailGroup.add(this.Nail);
    		}
    	}
    	
    	//�����¶�����̶�����
    	this.upbottomNailGroup.forEach(function(i){
    		i.anchor.set(0,0.5);
    		i.body.immovable = true;
    	})
    	
    	//�����Զ���createNail������������
    	this.createNail(2)
    	
    	
    	this.GameStart();
    	
    	//�����Ļ����¼�
    	game.input.onTap.add(this.birdJump, this);
    	
    	
    	//���� ͼ��
    	game.circleGraphics.destroy();
    	game.NailGraphics.destroy();
    	game.rectGraphics.destroy();
    	
    },
    GameStart : function(){
    	game.isRun = true;
        this.bird.body.gravity.y = 1000;
        this.bird.body.velocity.y = -350;
    	this.bird.body.velocity.x = 200
    },
    GameOver : function(){
    	game.isRun = false;
    	this.bird.body.velocity.x = 2000;
        this.bird.body.velocity.y = 2000;
        
        this.add.tween(this.bird).to( { alpha: 0 }, 1000, "Linear", true).onComplete.add(function(){
            this.bird.kill();
        }, this);
    },
    birdJump : function(){
    	if(game.isRun)
    	{
    		this.bird.body.velocity.y = -350;
    		this.bird.body.velocity.x = 200 * game.direction;
    	}
    },
    createNail : function(num){
    	for(var i=0;i<num;i++)
        {
        	var nailSpace = 120 + 60 * this.RandomNum(0,15)        	
        	this.NailA = game.add.sprite(game.world.width - 15, nailSpace , game.NailGraphicsA.generateTexture());
    		this.NailA .anchor.set(0.5,0);
    		this.leftrigthNailGroup.add(this.NailA);
    		this.NailA.body.immovable = true;
        }
    },
    RandomNum : function(Min,Max){
    	var Range = Max - Min;
		var Rand = Math.random();   
		var num = Min + Math.round(Rand * Range);
		return num;
    },
    update: function() {
    	if(!game.isRun) return;
    	
    	game.physics.arcade.collide(this.upbottomNailGroup, this.bird,this.GameOver, null, this);
    	game.physics.arcade.collide(this.leftrigthNailGroup, this.bird,this.GameOver, null, this);
    	
    	if(this.bird.x>=game.world.width - this.bird.width/2)
    	{
    		game.direction = this.bird.scale.x =  -1;
    		this.hitWall = true;
    	}
    	else if(this.bird.x<=0 - this.bird.width/2){
    		game.direction = this.bird.scale.x =  1;
    		this.hitWall = true;
    	}
    	
    	if(this.hitWall)
    	{
    		this.score++;
    		this.scoreText.setText(this.score);
    		
    		if(this.score % 10 == 0)
    		{
    			this.createNail(1)
    		}

    		this.leftrigthNailGroup.forEach(function(i){
    			i.body.immovable = true;
    			if(game.direction == -1)
    			{
    				i.x = 0 + 15;
    				i.scale.x = -1;
    			}
    			else
    			{
    				i.x = game.world.width - 15;
    				i.scale.x = 1
    			}
				i.y = 162 + 100 * game.rnd.integerInRange(0,8)
    		});
    		this.hitWall = false;
    	}
    },
    render : function() {
		/*game.debug.body(this.bird);
	    this.leftrigthNailGroup.forEach(function(i){
	    		game.debug.body(i);
	    })*/
	
	}
};

