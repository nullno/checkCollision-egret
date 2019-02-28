# checkCollision-egret
白鹭碰撞检测：矩形碰撞，像素碰撞

对非旋转图片、矩形 有效

#### 操作
1、把collision文件拷贝到egret项目中的libs/ 目录下 ，注意不要拷贝到modules里

2、修改egretProperties.json，modules下新增
```json
   {
     "name": "collision", 
     "path": "./libs/collision" 
   }
```
#### 使用
```javascript
//矩形碰撞
collision.checkCollision(bitmap1, bitmap2)

//像素碰撞
collision.checkCollision(bitmap1, bitmap2，true)

/*返回 boolean*/
```

#### 在微信小游戏中使用
在 scripts/wxgame/wxgame.ts 添加 
```javascript
//如果是eui项目会有
if (filename == "libs/modules/eui/eui.js" || filename == 'libs/modules/eui/eui.min.js') {
                    content += ";window.eui = eui;"
                }
这是我们添加的               
 if (filename == "libs/collision/collision.js" || filename == 'libs/collision/collision.min.js') {
                    content += ";window.collision = collision;"
 }

```
