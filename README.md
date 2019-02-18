# checkCollision-egret
白鹭碰撞检测：矩形碰撞，像素碰撞
对非旋转图片，矩形 有效

#### 操作
1、把collision文件拷贝到egret项目中的libs/ 目录下 ，注意不要拷贝到modules里
2、修改egretProperties.json，新增
```json
   {
     "name": "collision", 
     "path": "./libs/collision" 
   }
```
#### 使用
矩形碰撞
```javascript
//矩形碰撞
collision.checkCollision(bitmap1, bitmap2)

//像素碰撞
collision.checkCollision(bitmap1, bitmap2，true)

/*返回 boolean*/
```
