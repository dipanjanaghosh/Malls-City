import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { paramData } from "./models/mall.model";

@Component({
  selector:"mall-list",
  templateUrl: "./mall-list.component.html"
})

export class MallListComponent{

  selectedCity = '';
  constructor(private acRoute:ActivatedRoute){}

  ngOnInit(){
    // this.acRoute.queryParams.subscribe((data:paramData)=>{
    //   console.log(data);
    //   this.selectedCity = data['city'] ;
    // })

    // this.selectedCity = this.acRoute.snapshot.queryParams["city"];
    // console.log("selecetd :",this.selectedCity);

    this.acRoute.queryParams.subscribe((data)=>{
      this.selectedCity = data['city'] ;
      console.log(this.selectedCity);
    })
  }



}
