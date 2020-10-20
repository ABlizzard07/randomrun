class Form{
    constructor(){
        this.title = createElement('h2');
        this.input = createInput("Name");
        this.button = createButton('Play');   
    }
    display(){
     this.title.html("STAR SURVIVAL");
     this.title.position(windowWidth/3.5,10);
     this.title.style('font-size', '70px');
     this.title.style('color', 'lime');
     this.input.position(windowWidth/3,500);
     this.input.style('width', '200px');
     this.input.style('height', '20px');
     this.input.style('background', 'orange');
     this.button.position(windowWidth/3,600);
     this.button.style('width', '200px');
     this.button.style('height', '100px');
     this.button.style('background', 'orange');

     this.button.mousePressed(() => {
        this.title.hide();
        this.input.hide();
        this.button.hide();
        playerName = this.input.value();
        stage = 1;
     })
    }
    
}