import { Component, OnInit } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions,
  IPieChartOptions,
  IBarChartOptions
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';
import { UserDashboard } from 'src/app/data/models/common/userDashboard';
import { TicketContent } from 'src/app/data/models/ticketContent';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userDashboard: UserDashboard;
  subManager = new Subscription();
  //#region nventoryChart
  InventoryChartType: ChartType = 'Line';
  InventoryChartData: IChartistData;

  InventoryChartOptions: ILineChartOptions = {
    
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

  InventoryChartEvents: ChartEvent = {
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
  //#region InterMoneyChart
  InterMoneyChartType: ChartType = 'Line';
  InterMoneyChartData: IChartistData;

  InterMoneyChartOptions: ILineChartOptions = {
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

  InterMoneyChartEvents: ChartEvent = {
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
  //#region ExitMoneyChart
  ExitMoneyChartType: ChartType = 'Line';
  ExitMoneyChartData: IChartistData;

  ExitMoneyChartOptions: ILineChartOptions = {
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

  ExitMoneyChartEvents: ChartEvent = {
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

  //#region FactorChart
  FactorChartType: ChartType = 'Line';
 FactorChartData: IChartistData 

 FactorChartOptions: ILineChartOptions = {
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

  FactorChartEvents: ChartEvent = {
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
            }, 'ct-slice-bar'
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

  constructor(private route: ActivatedRoute, private persianCalendarService: PersianCalendarService) { }

  ngOnInit() {
    this.loadUserDashboard();
    this.loadInventoryChart();
    this.loadInretMoneyChart();
    this.loadExitMoneyChart();
    this.loadFactorChart();
  }
  loadUserDashboard() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.userDashboard = data.userDashboard;
      })
    )
  }
  loadInventoryChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.InventoryChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.userDashboard.inventory5Days.day5,
        this.userDashboard.inventory5Days.day4,
        this.userDashboard.inventory5Days.day3,
        this.userDashboard.inventory5Days.day2,
        this.userDashboard.totalInventory
      ]]
    };
  }
  loadInretMoneyChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.InterMoneyChartData = {
      labels: [
      this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.userDashboard.interMoney5Days.day5,
        this.userDashboard.interMoney5Days.day4,
        this.userDashboard.interMoney5Days.day3,
        this.userDashboard.interMoney5Days.day2,
        this.userDashboard.totalInterMoney
      ]]
    };
  }
  loadExitMoneyChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.ExitMoneyChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.userDashboard.exitMoney5Days.day5,
        this.userDashboard.exitMoney5Days.day4,
        this.userDashboard.exitMoney5Days.day3,
        this.userDashboard.exitMoney5Days.day2,
        this.userDashboard.totalExitMoney
      ]]
    };
  }
  loadFactorChart() {
    const dt1 = new Date();
    const  dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    const dt6 = new Date();
    const dt7 = new Date();
    const dt8 = new Date();
    dt2.setMonth(dt2.getMonth() - 1);
    dt3.setMonth(dt3.getMonth() - 2);
    dt4.setMonth(dt4.getMonth() - 3);
    dt5.setMonth(dt5.getMonth() - 4);
    dt6.setMonth(dt5.getMonth() - 4);
    dt7.setMonth(dt5.getMonth() - 4);
    dt8.setMonth(dt5.getMonth() - 4);
    this.FactorChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarMonth(dt8),
        this.persianCalendarService.PersianCalendarMonth(dt7),
        this.persianCalendarService.PersianCalendarMonth(dt6),
        this.persianCalendarService.PersianCalendarMonth(dt5),
        this.persianCalendarService.PersianCalendarMonth(dt4),
        this.persianCalendarService.PersianCalendarMonth(dt3),
        this.persianCalendarService.PersianCalendarMonth(dt2),
        this.persianCalendarService.PersianCalendarMonth(dt1)
      ],
      series: [[
        this.userDashboard.factor8Months.day8,
        this.userDashboard.factor8Months.day7,
        this.userDashboard.factor8Months.day6,
        this.userDashboard.factor8Months.day5,
        this.userDashboard.factor8Months.day4,
        this.userDashboard.factor8Months.day3,
        this.userDashboard.factor8Months.day2,
        this.userDashboard.factor8Months.day1
      ]]
    };
  }

   sortTicketContent(tc: TicketContent[]) {
    return tc.sort((a, b) => {
      return <any>new Date(b.dateCreated) - <any>new Date(a.dateCreated);
    });
}

}
