import { Component, OnInit } from '@angular/core';
import { GaspriceService } from '../services/gasprice.service';

@Component({
  selector: 'app-gasprice',
  templateUrl: './gasprice.component.html',
  styleUrls: ['./gasprice.component.css']
})
export class GaspriceComponent implements OnInit {

  constructor(private gasPrice:GaspriceService) { }
  stations:Station[]=[]

  ngOnInit(): void {
    this.updateData()
    setInterval(()=>{
      this.updateData()
    },1000*60*10)
  }

  updateData():void{
    this.gasPrice.getGasPrice().then((price:any)=>{
      console.log(price)
      this.stations = price.stations
      this.stations.sort((a,b)=>a.price-b.price)
    })
  }
}
class Station{
  name=""
  id=""
  brand=""
  dist=0
  houseNumber=""
  isOpen=false
  lat=1
  lng=0
  place=""
  postcode=1
  price=1
  street=""
}
