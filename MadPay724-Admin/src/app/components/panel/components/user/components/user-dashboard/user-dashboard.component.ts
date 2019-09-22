import { Component, OnInit } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions,
  IPieChartOptions,
  IBarChartOptions
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  //#region Widget-line-chart
  WidgetLineChartType: ChartType = 'Line';
  WidgetLineChartData: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6],
    series: [[0, 5, 16, 24, 12, 28]]
  };

  WidgetLineChartOptions: ILineChartOptions = {
    low: 0,
    fullWidth: true,
    showArea: true,
      // onlyInteger: true,
      //  targetLine: {
      //    value: 0,
      //    class: 'ct-target-line'
      //  },
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
    //         data.value.y === 0 || data.value.y === 6800
    //           ? 'ct-circle-transperent'
    //           : 'ct-circle'
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
      // const targetLineX =
      //   data.chartRect.x1 +
      //   (data.chartRect.width() - data.chartRect.width() / data.bounds.step);
      // data.svg.elem(
      //   'line',
      //   {
      //     x1: targetLineX,
      //     x2: targetLineX,
      //     y1: data.chartRect.y1,
      //     y2: data.chartRect.y2
      //   },
      //   data.options.targetLine.class
      // );
    }
  };
  //#endregion

  //#region Widget-line-chart1
  WidgetLineChart1Type: ChartType = 'Line';
  WidgetLineChart1Data: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6],
    series: [[0, 17, 2, 30, 35, 48]]
  };

  WidgetLineChart1Options: ILineChartOptions = {
    low: 0,
    fullWidth: true,
    showArea: true,
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

  WidgetLineChart1Events: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
          id: 'wGradient1',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(252,157,48, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(250,91,76, 1)'
        });
    }
  };
  //#endregion


  //#region Widget-line-chart2
  WidgetLineChart2Type: ChartType = 'Line';
  WidgetLineChart2Data: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6],
    series: [[0, 13, 6, 30, 18, 28]]
  };

  WidgetLineChart2Options: ILineChartOptions = {
    low: 0,
    fullWidth: true,
    showArea: true,
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

  WidgetLineChart2Events: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
          id: 'wGradient2',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(120, 204, 55, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(0, 75, 145, 1)'
        });
    }
  };
  //#endregion

  //#region line-chart
  LineChartType: ChartType = 'Line';
  LineChartData: IChartistData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    series: [[0, 4500, 2600, 6100, 2600, 6500, 3200, 6800]]
  };

  LineChartOptions: ILineChartOptions = {
    low: 0,
    fullWidth: true,
    chartPadding: {
      right: 20
    },
    axisY: {
      low: 0,
      scaleMinSpace: 60,
      labelInterpolationFnc: function labelInterpolationFnc(value) {
        return value / 1000 + 'K';
      }
    },
    axisX: {
      showGrid: false
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 2
    })
  };

  LineChartEvents: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
          id: 'linear1',
          x1: 1,
          y1: 0,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(185,168,231, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(118,74,233, 1)'
        });
    },
   draw: (data) => {
     const circleRadius = 10;
     if (data.type === 'point') {
       const circle = new Chartist.Svg('circle', {
         cx: data.x,
         cy: data.y,
         r: circleRadius,
         class:
           data.value.y === 0 || data.value.y === 6800
             ? 'ct-circle-transperent'
             : 'ct-circle'
       });
       data.element.replace(circle);
     }
     }
  };
  //#endregion


  //#region Stack-Bar-Chart
  StackBarChartType: ChartType = 'Bar';
  StackBarChartData: IChartistData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [[7, 4, 2, -2, -4, -7, -7, -4, -2, 2, 4, 7]]
  };

  StackBarChartOptions: Chartist.IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    axisY: {
      showGrid: true,
      showLabel: false,
      offset: 0
    }
  };

  StackBarChartEvents: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
          id: 'StackbarGradient',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(17,228,183, 1)'
        });
    },
     draw: (data) => {
       if (data.type === 'bar') {
         data.element.attr({
           style: 'stroke-width: 5px',
           x1: data.x1 + 0.001
         });

         data.group.append(
           new Chartist.Svg(
             'circle',
             {
               cx: data.x2,
               cy: data.y2,
               r: 5
             },
             'ct-slice-bar'
           )
         );
       } else if (data.type === 'label') {
         data.element.attr({
           y: 270
         });
       }
     }
  };
  //#endregion

  //#region Bar-Chart
  BarChartType: ChartType = 'Bar';
  BarChartData: IChartistData = {
    labels: ['ورزشی', 'موزیک', 'مسافرت', 'اخبار', 'وبلاگ'],
    series: [[35, 20, 30, 45, 55]]
  };

  BarChartOptions: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    },
    low: 0,
    high: 60
  };

  BarChartEvents: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
          id: 'gradient4',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(238, 9, 121,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 106, 0, 1)'
        });
      defs.elem('linearGradient', {
          id: 'gradient5',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 75, 145,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(120, 204, 55, 1)'
        });

      defs.elem('linearGradient', {
          id: 'gradient6',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      defs.elem('linearGradient', {
          id: 'gradient7',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(155, 60, 183,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 57, 111, 1)'
        });
      defs.elem('linearGradient', {
          id: 'gradient8',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(17,228,183, 1)'
        });
    },
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.attr({
          y1: 195,
          x1: data.x1 + 0.001
        });
        data.group.append(
          new Chartist.Svg(
            'circle',
            {
              cx: data.x2,
              cy: data.y2,
              r: 12
            },'ct-slice-bar'
          )
        );
      }
    }
  };
  //#endregion

   //#region Dashboard-Chart
  DashboardChartType: ChartType = 'Pie';
  DashboardChartData: IChartistData = {
    series: [
      {
        name: 'done',
        className: 'ct-done',
        value: 35
      },
      {
        name: 'progress',
        className: 'ct-progress',
        value: 14
      },
      {
        name: 'outstanding',
        className: 'ct-outstanding',
        value: 23
      }
    ]
  };

  DashboardChartOptions: IPieChartOptions = {
    donut: true,
    startAngle: 310,
    donutSolid: true,
    donutWidth: 30,
    showLabel: false

  };

  DashboardChartEvents: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'donutGradient1',
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(155, 60, 183,1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(255, 57, 111, 1)'
      });
      defs.elem('linearGradient', {
        id: 'donutGradient2',
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(0, 75, 145,0.8)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(120, 204, 55, 0.8)'
      });
      defs.elem('linearGradient', {
        id: 'donutGradient3',
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(132, 60, 247,1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(56, 184, 242, 1)'
      });
    }
  };
  //#endregion

  constructor() { }

  ngOnInit() {
  }

}
