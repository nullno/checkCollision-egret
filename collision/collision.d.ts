// Type definitions for collision.js
// Project: [CheckCollision-egret] 
// Definitions by: [laowei] <https://github.com/nullno/checkCollision-egret> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace collision{
	// collision.checkCollision.!0
	
	/**
	 * 
	 */
	interface CheckCollision0 {
				
		/**
		 * 
		 */
		x : number;
				
		/**
		 * 
		 */
		y : number;
				
		/**
		 * 
		 */
		width : number;
				
		/**
		 * 
		 */
		height : number;
	}
}

/**
 * 
 */
declare namespace collision{
		
	/**
	 * 碰撞检测
	 * @param bitmap1 
	 * @param bitmap2 
	 * @param isPixel 
	 * @return  
	 */
	function checkCollision(bitmap1 : collision.CheckCollision0, bitmap2 : collision.CheckCollision0, isPixel? : Boolean): boolean;
}
