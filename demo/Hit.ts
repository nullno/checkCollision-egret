class Hit extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })


    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }


    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
    private _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
    private msgText: egret.TextField; //碰撞提示

    private _aciveShape: egret.Shape;
    private _timg: egret.Bitmap;
    private _head: egret.Bitmap;




    // 创建场景
    private createGameScene() {
        this.drawMsg()
        let shpA: egret.Shape = new egret.Shape();
        shpA.graphics.beginFill(0x0000FF)
        shpA.graphics.drawCircle(100, 100, 50);
        shpA.graphics.endFill();
        // shpA.width = 50;
        // shpA.height = 50;
        shpA.x = 100;
        shpA.y = 100;
        shpA.touchEnabled = true;
        // this.addChild(shpA);


        let shpT: egret.Sprite = new egret.Sprite();
        shpT.graphics.beginFill(0xff0000)
        shpT.graphics.drawRect(0, 0, 150, 150)
        shpT.graphics.endFill();
        shpT.width = 150;
        shpT.height = 150;
        shpT.x = 60;
        shpT.y = 200;
        shpT.touchEnabled = true;
        // this.addChild(shpT);

        // this ._aciveShape = shpA;


        let head = this.createBitmapByName("egret_icon_png");
        head.x = 350;
        head.y = 50;
        head.touchEnabled = true;
        this.addChild(head);
        this._head = head

        let timg = this.createBitmapByName("timg_png");
        timg.x = 35;
        timg.y = 30;
        timg.touchEnabled = true;
        this.addChild(timg);
        this._timg = timg


        head.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pressDown, this);
        head.addEventListener(egret.TouchEvent.TOUCH_END, this.pressUp, this);

        timg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pressDown, this);
        timg.addEventListener(egret.TouchEvent.TOUCH_END, this.pressUp, this);



    }

    private drawMsg() {
        this.msgText = new egret.TextField();
        this.msgText.text = "准备检测";
        this.msgText.textColor = 0x00FF00;
        this.msgText.verticalAlign = 'middle';
        this.msgText.textAlign = 'center';
        this.msgText.width = this.stage.stageWidth;
        this.msgText.height = this.stage.stageHeight;
        this.addChild(this.msgText)
    }




    // 拖动操作

    private pressDown(evt: egret.TouchEvent) {
        // console.log("Mouse Down.");
        this._aciveShape = evt.target
        this._touchStatus = true;
        this._distance.x = evt.stageX - this._aciveShape.x;
        this._distance.y = evt.stageY - this._aciveShape.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.pressMove, this);
    }

    private pressMove(evt: egret.TouchEvent) {
        if (this._touchStatus) {
            // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            this._aciveShape.x = evt.stageX - this._distance.x;
            this._aciveShape.y = evt.stageY - this._distance.y;

            let isHit: boolean = collision.checkCollision(this._head, this._timg, true);

            if (isHit) {
                if (this._aciveShape.hashCode === this._head.hashCode) {
                    let tw = egret.Tween.get(this._timg);
                    tw.to({ "x": this._timg.x - 150 }, 100);
                    //   this._timg.x-=20

                } else {
                    let tw = egret.Tween.get(this._head);
                    tw.to({ "x": this._head.x + 150 }, 100);

                    //   this._head.x+=50

                }
            }
            this.msgText.text = `怒晴鸡大战小白鹭 ${isHit}`;
        }
    }

    private pressUp(evt: egret.TouchEvent) {
        // console.log("Mouse Up.");
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.pressMove, this);
    }



    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }





}