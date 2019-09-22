import { Component, OnInit } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  WidgetLineChartType: ChartType = 'Line';
  WidgetLineChartData: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6],
    series: [[0, 13, 6, 30, 18, 28]]
  };

   WidgetLineChartOptions: ILineChartOptions = {
     low: 0,
     fullWidth: true,
     showArea: true,
    //  onlyInteger: true,
    //   targetLine: {
    //     value: 18,
    //     class: 'ct-target-line'
    //   },
     axisY: {
       showGrid: true,
       low: 0,
       scaleMinSpace: 10,
       showLabel: true
     },
     axisX: {
       showGrid: true,
       showLabel: true
     },
     lineSmooth: Chartist.Interpolation.simple({
       divisor: 2
     })
   };

   WidgetLineChartEvents: ChartEvent = {
      // draw: (data) => {
      //   const circleRadius = 10;
      //   if (data.type === 'point') {
      //     const circle = new Chartist.Svg('circle', {
      //       cx: data.x,
      //       cy: data.y,
      //       r: circleRadius,
      //       class:
      //         data.value.y === 30 ? 'ct-point-circle' : 'ct-point-circle-transperent'
      //     });
      //     data.element.replace(circle);
      //   }
      // },
     created: (data) => {
       const defs = data.svg.elem('defs');
       defs.elem('linearGradient', {
           id: 'wGradient',
           x1: 0,
           y1: 1,
           x2: 0,
           y2: 0
         }).elem('stop', {
           offset: 0,
           'stop-color': 'rgba(130,73,232, 1)'
         }).parent().elem('stop', {
           offset: 1,
           'stop-color': 'rgba(41,123,249, 1)'
         });
       const targetLineX =
         data.chartRect.x1 +
         (data.chartRect.width() - data.chartRect.width() / data.bounds.step);
       data.svg.elem(
         'line',
         {
           x1: targetLineX,
           x2: targetLineX,
           y1: data.chartRect.y1,
           y2: data.chartRect.y2
         },
         data.options.targetLine.class
       );
     }
   };
  constructor() {}

  ngOnInit() {
  }

}
