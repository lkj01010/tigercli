module fl {
	/**
	 *
	 * @author 
	 *
	 */
	class TableSceneConst {
        public static cardh: number = 90;
        public static cardw: number = 20;
        public static cardnum: number = 8;
        
        public static totalTime: number = 8*1000;
        public static cardsCross: number = 50;
	}
	
    export class TableScene extends eui.Component {
        public bet_sub: eui.Button;
        public bet_add: eui.Button;

        public yayi: eui.Button;
        public xuanzhuan: eui.Button;
        public quanya: eui.Button;

        private betAdjust: eui.BitmapLabel;
        private card_grp1: eui.Group;
        
        private card_cache1: Array<eui.Image> = [];
        
        private card_indexs: Array<number> = [];
        
        //motion
        private startTime: number = 0;
        private isRun: boolean = false;
        
        
        public constructor() {
            super();
            this.skinName = "TableBg";
        }
        
        protected createChildren(): void {
            super.createChildren();
            this.bet_sub.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cb_sub,this);
            this.bet_sub.parent.getChildAt(1).touchEnabled = false;
            this.bet_add.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cb_add,this);
            this.bet_add.parent.getChildAt(1).touchEnabled = false;
            
            this.yayi.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cb_yayi,this);
            this.yayi.parent.getChildAt(1).touchEnabled = false;
            this.xuanzhuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cb_xuanzhuan,this);
            this.xuanzhuan.parent.getChildAt(1).touchEnabled = false;
            this.quanya.addEventListener(egret.TouchEvent.TOUCH_TAP,this.cb_quanya,this);
            this.quanya.parent.getChildAt(1).touchEnabled = false;
            
            this.createCards();
            this.genCardIndex();
            
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            // runtime:
            this.betAdjust.text = "$" + TableData.betAdjust;
            
        }
        
        
        private createCards(){
            var h: number = this.card_grp1.height;
            
            //method 1:
//            var square: eui.Rect = new eui.Rect(this.card_grp1.width,this.card_grp1.height);
//            this.card_grp1.addChild(square)
            // method 2:
//            var square: egret.Shape = new egret.Shape();
//            square.graphics.beginFill(0xff0000);
//            square.graphics.drawRect(0,0,this.card_grp1.width,this.card_grp1.height);
//            square.graphics.endFill();
//            this.card_grp1.addChild(square);
            
            egret.log("height=" + h);
            var cardh: number = h / 2;
            for(var i = 0; i < 3; i++){
                var img: eui.Image = new eui.Image("1_png");
                img.y = -cardh / 2 + i * cardh;
                this.card_grp1.addChild(img);
                
                // add mask
                var square: eui.Rect = new eui.Rect(this.card_grp1.width,this.card_grp1.height);
                this.card_grp1.addChild(square)
                img.mask = square;
                this.card_cache1.push(img);
            }
            
        }
        
        
        private genCardIndex(){
            this.card_indexs = [7,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,
                1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3]; //比cross大2
            
        }
        
        
        private onEnterFrame(e: egret.Event){
            var time: number = egret.getTimer();
            
            
            if(this.isRun){
                var runTime = time - this.startTime;
                var outerCross;
                if(runTime < TableSceneConst.totalTime){
                    
                    var cross;
                    var aveSpeed = TableSceneConst.cardsCross / TableSceneConst.totalTime;
                    var maxSpeed = aveSpeed * 2;
                    var acc = maxSpeed / (TableSceneConst.totalTime * 0.5);

                    if(runTime < TableSceneConst.totalTime/2) {
                        cross = (acc * runTime) * runTime / 2;
                    }
                    else {
                        var afterHalfTime = (runTime - TableSceneConst.totalTime / 2);
                        cross = TableSceneConst.cardsCross / 2 +
                            (maxSpeed + maxSpeed - acc * afterHalfTime) * 0.5 * afterHalfTime;
                    }
                    
                    // 初始跨过半张牌就变牌
                    cross += 0.5;
                    var innerCross = cross - Math.floor(cross);
                    
                    outerCross = Math.floor(cross);
                    var crossDist = TableSceneConst.cardh * innerCross;
                   
                    {
                        this.card_cache1[0].y = crossDist - TableSceneConst.cardh/2;
                        this.card_cache1[1].y = crossDist - TableSceneConst.cardh / 2+ TableSceneConst.cardh;
                        this.card_cache1[2].y = crossDist - TableSceneConst.cardh / 2+ TableSceneConst.cardh * 2;
                        
                        
                    }
                    
                }
                else{
                    this.isRun = false;
                    outerCross = TableSceneConst.cardsCross;
                }
                
                
                this.card_cache1[0].source = "" + this.card_indexs[outerCross + 1] + "_png";
                this.card_cache1[1].source = "" + this.card_indexs[outerCross] + "_png";
                this.card_cache1[2].source = "" + this.card_indexs[outerCross - 1] + "_png";
            }
        }
        
        
	
        private cb_sub(e: egret.TouchEvent){
            egret.log("cb_sub");
            TableData.betAdjust -= 0.5;
            this.betAdjust.text = "$" + TableData.betAdjust;
        }
        private cb_add(e: egret.TouchEvent) {
            egret.log("cb_add");
            TableData.betAdjust += 0.5;
            this.betAdjust.text = "$" + TableData.betAdjust;
        }
        private cb_yayi(e: egret.TouchEvent) {
            egret.log("cb_sub");
            
            egret.Tween.get(this.card_cache1[0]).to({}, 2000).to({ alpha: 0 },300).to({ alpha: 1 }, 300).call(
                ()=>{
//                    egret.Tween.get(this.card_cache1[1],{ loop: true }).to({ alpha: 0, x: 100 },300).to({ alpha: 1 , x: 200},300);
                }
            );
        }
        private cb_xuanzhuan(e: egret.TouchEvent) {
            egret.log("cb_sub");
            
            this.startTime = egret.getTimer();
            this.isRun = true;
        }
        private cb_quanya(e: egret.TouchEvent) {
            egret.log("cb_sub");
        }
    }
}
