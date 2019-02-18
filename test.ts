class Hit extends egret.DisplayObjectContainer {
// 碰撞检测
public checkCollision(bitmap1, bitmap2, isPixel?:boolean) {
   var bitmap2CenterX = bitmap2.x + bitmap2.width/2,
       bitmap2CenterY = bitmap2.y + bitmap2.height/2,
       bitmap1CenterX = bitmap1.x + bitmap1.width/2,
       bitmap1CenterY = bitmap1.y + bitmap1.height/2;
    if((Math.abs(bitmap2CenterX - bitmap1CenterX) < bitmap1.width / 2 + bitmap2.width / 2) &&
        Math.abs(bitmap2CenterY - bitmap1CenterY) < bitmap1.height / 2 + bitmap2.height / 2) {
        return isPixel?handleEgdeCollisions(getIntersectionRect(bitmap1, bitmap2)) : true;  
    } else {
      return false
    }


function getIntersectionRect(bitmap1, bitmap2) {
  var bitmap1Right = bitmap1.x + bitmap1.width,
      bitmap1Bottom = bitmap1.y + bitmap1.height,
      bitmap2Right = bitmap2.x + bitmap2.width,
      bitmap2Bottom = bitmap2.y + bitmap2.height;

  var rect3x = Math.max(bitmap1.x, bitmap2.x),
      rect3y = Math.max(bitmap1.y, bitmap2.y),
      rect3Right = Math.min(bitmap1Right, bitmap2Right),
      rect3Bottom = Math.min(bitmap1Bottom, bitmap2Bottom);
  return {
      x: rect3x,
      y: rect3y,
      width: rect3Right - rect3x,
      height: rect3Bottom - rect3y
  }
}


//重叠区域
function handleEgdeCollisions(rect) {
  console.log('已开启像素检测')
  var renderTextureA:egret.RenderTexture = new egret.RenderTexture();
  var renderTextureB:egret.RenderTexture = new egret.RenderTexture();
      renderTextureA.drawToTexture(bitmap1,new egret.Rectangle(rect.x-bitmap1.x, rect.y-bitmap1.y, rect.width, rect.height))
      renderTextureB.drawToTexture(bitmap2,new egret.Rectangle(rect.x-bitmap2.x, rect.y-bitmap2.y, rect.width, rect.height))
   
  var imgData1Data:Array<number> = renderTextureA.getPixels(0, 0, rect.width, rect.height);
// var imgData2Data:Array<number> = renderTextureB.getPixels(0, 0, rect.width, rect.height);

  var result = imgData1Data.some(val=>{return val>0}) 

      if(result){
           console.log('重叠区域：')
           console.log(renderTextureA.toDataURL("image/png"))
           console.log(renderTextureB.toDataURL("image/png"))
       }
     return result

}

}



// 矩形碰撞
            public checkRectCollision(bitmap1, bitmap2) {
                if(bitmap1.x < bitmap2.x + bitmap2.width &&
                bitmap1.x + bitmap1.width > bitmap2.x &&
                bitmap1.y < bitmap2.y + bitmap2.height &&
                bitmap1.height + bitmap1.y > bitmap2.y) {
                    return true
                } else {
                    return false
                }
            }


// 矩形中心旋转与圆碰撞
       public checkRcCollision(rect, circle) {

           function distance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
           }
            var cx, cy
            var angleOfRad = -rect.rotation* Math.PI / 180;
            var rectCenterX = rect.x + rect.width / 2
            var rectCenterY = rect.y + rect.height / 2
    
            
            var rotateCircleX = Math.cos(angleOfRad) * (circle.x - rectCenterX) - Math.sin(angleOfRad) * (circle.y - rectCenterY) + rectCenterX
            var rotateCircleY = Math.sin(angleOfRad) * (circle.x - rectCenterX) + Math.cos(angleOfRad) * (circle.y - rectCenterY) + rectCenterY

            if (rotateCircleX < rect.x) {
                cx = rect.x
            } else if (rotateCircleX > rect.x + rect.width) {
                cx = rect.x + rect.width
            } else {
                cx = rotateCircleX
            }

            if (rotateCircleY < rect.y) {
                cy = rect.y
            } else if (rotateCircleY > rect.y + rect.height) {
                cy = rect.y + rect.height
            } else {
                cy = rotateCircleY
            }

 
            if (distance(rotateCircleX, rotateCircleY, cx, cy) < circle.width/2) {
                return true
            }

            return false

        }

}   