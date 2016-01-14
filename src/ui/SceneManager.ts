module game {
	/**
	 *
	 * @author mid
	 */
    export class SceneManager {
        public constructor(main: eui.UILayer) {
            this._main = main;  
            this._main.addEventListener(GameEvent.changeScene_table, this.onChangeScene, this);
        }

        private _main: eui.UILayer;
        private curScene: eui.Component;
      
        private onChangeScene(e: Event) {
            
            //移除所有子对象
            this._main.removeChildren();
            
            //判断事件，接下来添加哪个场景在舞台展现
            switch (e.type) {
                case GameEvent.changeScene_table:
                    this.curScene = new TableScene();
                    this._main.addChild(this.curScene);
                    break;
                default: break;
            }
        }
    }
}
