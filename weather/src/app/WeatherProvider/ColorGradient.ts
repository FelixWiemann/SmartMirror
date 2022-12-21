export class GradientUtils{
  static getColorForValue(gradients:Gradient[], val:number):string{
    for (let element of gradients){
      if (element.start<=val&&element.end>=val) return element.getGradientColor(val)
    }
    // return black default
    return '#000000';
  }
}


export class Gradient {
    constructor(public start:number, public end:number, public start_color:string, public end_color:string){}
  
    getPercentage(value:number):number{
      let tmpDiff = this.end-this.start
      let p = (value-this.start)/tmpDiff
      return p
    }
    /**
     * color gradient based on https://stackoverflow.com/questions/3080421/javascript-color-gradient
     * 
     * @param value of the way between start and end color (0=> start, 1=>end, 0.5 halfway inbetween)
     * @returns mixed color
     */
     getGradientColor(value:number) {
      let percent=this.getPercentage(value)
      if (percent>=1) return this.end_color;
      if (percent<=0) return this.start_color;
      // strip the leading # if it's there
      this.start_color = this.start_color.replace(/^\s*#|\s*$/g, '');
      this.end_color = this.end_color.replace(/^\s*#|\s*$/g, '');
   
      // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
      if(this.start_color.length == 3){
        this.start_color = this.start_color.replace(/(.)/g, '$1$1');
      }
   
      if(this.end_color.length == 3){
        this.end_color = this.end_color.replace(/(.)/g, '$1$1');
      }
   
      // get colors
      var start_red = parseInt(this.start_color.substr(0, 2), 16),
          start_green = parseInt(this.start_color.substr(2, 2), 16),
          start_blue = parseInt(this.start_color.substr(4, 2), 16);
   
      var end_red = parseInt(this.end_color.substr(0, 2), 16),
          end_green = parseInt(this.end_color.substr(2, 2), 16),
          end_blue = parseInt(this.end_color.substr(4, 2), 16);
   
      // calculate new color
      var diff_red = end_red - start_red;
      var diff_green = end_green - start_green;
      var diff_blue = end_blue - start_blue;
   
      var diff_red_s = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
      var diff_green_s = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
      var diff_blue_s = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
   
      // ensure 2 digits by color
      if( diff_red_s.length == 1 ) diff_red_s = '0' + diff_red_s
      if( diff_green_s.length == 1 ) diff_green_s = '0' + diff_green_s
      if( diff_blue_s.length == 1 ) diff_blue_s = '0' + diff_blue_s
   
      return '#' + diff_red_s + diff_green_s + diff_blue_s;
    };
  }