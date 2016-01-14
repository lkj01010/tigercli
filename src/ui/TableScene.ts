module game {
	/**
	 *
	 * @author 
	 *
	 */
	class TableSceneConst {
        public static cardh: number = 90;
        public static cardw: number = 20;
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
        
        
        
        
        
        private onEnterFrame(e: egret.Event){
            var time: number = egret.getTimer();
            egret.log("" + time);
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
        }
        private cb_xuanzhuan(e: egret.TouchEvent) {
            egret.log("cb_sub");
        }
        private cb_quanya(e: egret.TouchEvent) {
            egret.log("cb_sub");
        }
    }
}
