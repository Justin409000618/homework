// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]

// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[0, 0], [-1,-3], [0, -3],[3,-4],[6,-3],[6,-9],[8,-9],[8,-6],[8,-2],[6,-3],[-4,-5],[-5,-2],[-8,1],[-11,0],[-13,1],[-12,1], [-10,2], [-11, 5],[-10,7],[-8,8],[-5,9],[-2,9], [3,7],[6,8],[9,7],[10,6],[12,4],[12,0],[11,-3],[11,-9],[9,-9],[9,-4],[8,-2],[8,1],[9,4],[-1,-3],[-2,-7],[-2,-9],[-4,-9],[-4,-5],[-5,0],[-13,1],[-14,3],[-14,8],[-13,5],[-12,6],[-11,6]]; //list資料，(犀牛)

var fill_colors = "22577a-38a3a5-57cc99-80ed99-c7f9cc".split("-").map(a=>"#"+a)
var line_colors = "e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)



//---------------設定畫point所有點的物件變數----------
var ball //目前要處理的物件，暫時放在 ball 變數內
var balls = [] // 把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//---------------設定飛彈物件的定義-----------
var bullet //目前要處理的物件，暫時放在 bullet 變數內
var bullets = []

var score =0

//---------------設定怪物物件的定義-----------
var monster //目前要處理的物件，暫時放在 monster 變數內
var monsters = [] 


function preload(){
	rhino_sound = loadSound("sound/rhino.wav");
  bullet_sound =  loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i=0;i<15;i=i+1){// 
     ball= new Obj({}) // 產生一個新的obj class 元件
     balls.push(ball) //把ball的物件放入到陣列內
  }
  for(var i=0;i<15;i=i+1){// 
    monster= new Monster({}) // 產生一個新的monster class 元件
    monsters.push(monster) //把monster的物件放入到陣列內
 }
}

function draw() {
  background("#66B3FF");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball=balls[j]
  //   ball.draw()
  //   ball.update()
  // }
 
  //大象顯示
  for(let ball of balls)//只要是陣列的方式，都可以利用此方式處理
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
          balls.splice(balls.indexOf(ball),1)
          bullets.splice(bullets.indexOf(bullet),1)
          score = score+1
          rhino_sound.play()
        
        }
    }
  }

  //飛彈顯示
  for(let bullet of bullets)//只要是陣列的方式，都可以利用此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物顯示
  for(let monster of monsters)//只要是陣列的方式，都可以利用此方式處理
  {
    monster.draw()
    monster.update()
  }

  textSize(50)
  text(score,50,50) //在座標為(50,50)上，顯示score分數內容
  push()
    let dx = mouseX - width/2 //設定中心隨滑鼠轉動
    let dy = mouseY - height/2 //設定中心隨滑鼠轉動
    let angle = atan2(dy,dx) //設定中心隨滑鼠轉動
    translate(width/2,height/2) //設定中心隨滑鼠轉動
    fill("#9a8c98")
    noStroke()
    rotate(angle) //設定中心隨滑鼠轉動
    triangle(-25,25,-25,-25,50,0)
    fill("#00A600")
    ellipse(0,0,30)
  pop()
}

//------------------------加入滑鼠按下增加新物件
function mousePressed(){
  // ball= new Obj({
  //   p:{x:mouseX,y:mouseY}
  // }) // 在滑鼠按下的地方，產生一個新的obj class 元件
  // balls.push(ball) //把ball的物件放入到陣列內(丟到倉庫)

  //在物件上按下滑鼠，物件消失不見，分數加1
  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallInRanger()){
  //     balls.splice(balls.indexOf(ball),1) //<將物件資料刪除>從倉庫balls取出背滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
  //     score=score+1
  //   }
  // }
//---------------按一下產生一個飛彈----------------------------
bullet = new Bullet({
  r:20,
  color:"#6F00D2",
}) //在滑鼠按下的地方，產生一個新的 Bullet class元件(產生一個飛彈)
bullets.push(bullet) //把bullet的物件放入到bullets陣列內(丟到倉庫)
bullet_sound.play()
}
