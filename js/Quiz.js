class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){    
    question.hide()
    
    background("lightblue");
    
    textSize(30)
    fill("black")
    text("The Result of the Quiz",250,50)
    
    Contestant.getPlayerInfo()

    if(allContestants !== undefined){
      fill("black")
      textSize(20)
      text("The Contestant with the correct answer is highlighted in green colour",140,230)

      var displayPos = 250

      for(var plr in allContestants){
        var correctAns = "2"

        if(correctAns === allContestants[plr].answer){
          fill("green")
        }
        else{
          fill("red")
        }

        displayPos = displayPos + 30
        textSize(20)
        text(allContestants[plr].name + ":" + allContestants[plr].answer,140,displayPos)
      }
    }
    
  }

}
