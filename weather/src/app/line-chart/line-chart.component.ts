import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {

  constructor() { }
  public chart?: Chart;
  @Input("data") dataset: DataSet[]=[]

  ngOnInit(): void {
    this.createChart();
    let o = new Observable()
  }

  ngOnChanges():void{
    this.dataset.forEach(data => {
      this.addData(data.label, data.data)
    });
    this.chart?.update()
  }

  public addData(label:string, data:any){
    this.chart?.data?.labels?.push(label);
    this.chart?.data?.datasets?.forEach((element:any) => {
      element.data.push(data)
    });
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [this.dataset.map(row => row.label) ], 
	      datasets: [{
           label: "*C",
           data:this.dataset.map(row=>row.data)
        }],
        
      },
      options: {
        aspectRatio:2.5,
        datasets:{
          line:{
            tension:0.5
          }
        }
      }
      
    });
  }
  public _reload = true;

}

export class DataSet{
  label:string="";
  data:number=0
}