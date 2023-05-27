var monster_colors ="e7ecef-274c77-6096ba-a3cef1-8b8c89".split("-").map(a=>"#"+a)
class Monster{//宣告一個怪物類別，名稱為Monster
    constructor(args){//預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
        this.r = args.r || random(45,80) //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1))//移動的速度，如果沒有傳參數args參數，就會利用亂數(-1~1之間)抽出X，Y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
    }
    draw(){//畫出元件
        push()//重新設定圓點位置
             translate(this.p.x,this.p.y)//將原點座標移動到物件中心
             fill(this.color)
             noStroke()
             ellipse(0,0,this.r)
            
             if(this.mode=="happy"){
                 fill(255)
                 ellipse(0,0,this.r/2)
                 fill(0)//黑色
                 ellipse(0,0,this.r/3)
             }else{
                 fill(255)
                 arc(0,0,this.r/2,this.r/2,0,PI)
                 fill(0)
                 arc(0,0,this.r/3,this.r/3,0,PI)
             }
                 stroke(this.color)
                 strokeWeight(3)
                 noFill()
                //  line(this.r/2,0,this.r,0)
                
                for(var j=0;j<8;j++){//怪物8隻腳
                    rotate(PI/3) //旋轉60度 180/3
                    beginShape()
                    for(var i=0;i<(this.r/2);i++){
                        vertex(this.r/2+i,sin(i/4+frameCount/10)*10)
                    }
                    endShape()
                }
               
                        

        pop()//原點恢復到視窗左上角
    }

    update(){//計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){ // X軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x //把速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //Y軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y //把速度方向改變
          }

    }
}