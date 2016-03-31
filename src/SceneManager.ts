/**
 * 场景跳转器
 */ 
class SceneManager {
    public constructor(main: eui.UILayer) {
        this.main = main;  
        this.main.addEventListener(fl.Event.changeScene_table, this.onChangeScene, this);
    }

    private main: eui.UILayer;
    private curScene: eui.Component;
  
    private onChangeScene(e: Event) {
        
        //移除所有子对象
        this.main.removeChildren();
        
        //判断事件，接下来添加哪个场景在舞台展现
        switch (e.type) {
            case fl.Event.changeScene_table:
                this.curScene = new fl.TableScene();
                this.main.addChild(this.curScene);
                break;
            default: break;
        }
        
        
    }
}

