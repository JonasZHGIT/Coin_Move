// 通用方法（应从外部模块引入）
// 加载图片
const getImageFromPath = path => {
  let image = new Image();
  image.src = path;
  return image;
}

// 生成图片
const drawObj = (obj, ele, context) => {
  context.clearRect(0, 0, ele.width, ele.height);
  context.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
}

// 运动事件注册（不完美）
const registerMoveActions = (obj, paramsPair, movement) => {
  Object.keys(paramsPair).forEach(v => {
    document.addEventListener(v, event => {
      switch (event.key) {
        case movement.up:
          obj.up = paramsPair[v];
          break;
        case movement.down:
          obj.down = paramsPair[v];
          break;
        case movement.left:
          obj.left = paramsPair[v];
          break;
        case movement.right:
          obj.right = paramsPair[v];
          break;
        default:
          return false;
      }
    });
  });
}

// 全局变量
const canvas = document.querySelector(".container");
const context = canvas.getContext("2d");

// 平板类
class Paddle {
  constructor(width, height, x, y, speed, url) {
    // 引入平板
    this.image = getImageFromPath(url);
    // 上下左右运动标识
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    // 宽度和高度
    this.width = width;
    this.height = height;
    // 坐标
    this.x = x;
    this.y = y;
    // 运行速度
    this.speed = speed;
    // 刷新率
    this.fps = 1000/60;
  }
  updateMoving() {
    setInterval(() => {
      if (this.up) {
        this.y -= this.speed;
      }
      if (this.down) {
        this.y += this.speed;
      }
      if (this.left) {
        this.x -= this.speed;
      }
      if (this.right) {
        this.x += this.speed;
      }
      drawObj(this, canvas, context);
    }, this.fps);
  }
}

// 控制器类
class Control {
  constructor(up, down, left, right) {
    // 控制器方向
    this.direction = {
      up,
      down,
      left,
      right,
    };
  }
}

// 入口程序
let main = () => {
  let init = {
    keydown: true,
    keyup: false,
  }
  let paddle = new Paddle(100, 100, 250, 250, 5, "coin.png");
  let controller = new Control("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight");
  let dir = controller.direction;

  registerMoveActions(paddle, init, dir);
  paddle.updateMoving();
}

main();
