import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  loopCounter=0;
  counter = -1;
  show = false;
  allEvents: any = [];
  Events: any = [];

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("assets/session-events.json").subscribe(data =>{
      console.log(data);
      this.allEvents = data;
      for (let i = 0 ;i< this.allEvents.length;i++){
        if (this.allEvents[i].type == 4){

          let duration = this.allEvents[i+1].timestamp - this.allEvents[i].timestamp;
          let date = new Date(this.allEvents[i].timestamp *1000);

          var hours = date.getHours();

          var minutes = "0" + date.getMinutes();

          var seconds = "0" + date.getSeconds();

          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          
  
          this.Events[this.loopCounter]=({"description":"visit Page Event","time" : formattedTime,"type":4,"index":this.loopCounter,"duration":duration});
          this.loopCounter = this.loopCounter + 1;
        }
        if (this.allEvents[i].type == 3){
          if(this.allEvents[i].data.source == 2){
            if(this.allEvents[i].data.type == 2){
              let duration = this.allEvents[i+1].timestamp - this.allEvents[i].timestamp;
              let date = new Date(this.allEvents[i].timestamp *1000);
              var hours = date.getHours();

              var minutes = "0" + date.getMinutes();

              var seconds = "0" + date.getSeconds();

              var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
              this.Events[this.loopCounter]=({"description":"Click Event","time" : formattedTime,"type":3,"index":this.loopCounter,"duration":duration});
              this.loopCounter = this.loopCounter + 1;
            }
          }
        }
        
      }
      console.log(this.Events[0].description);
    })
    
    
 
  }


  Play(){
    
    this.show = true;
    setInterval(() => {
      this.counter = this.counter +1; 
      document.getElementById("container")?.scrollBy(0,25);
      if (this.counter > this.loopCounter){
        return;
      }
      }, 1000);
          
  }  



}
