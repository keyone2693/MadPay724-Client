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

import 'src/app/shared/extentions/number.extentions';
import 'src/app/shared/extentions/bool.extentions';

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
        return value 
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

  //#region FinancialSummary
  FinancialSummaryChartType: ChartType = 'Pie';
  FinancialSummaryChartData: IChartistData

  FinancialSummaryChartOptions: IPieChartOptions = {
    donut: true,
    startAngle: 310,
    donutSolid: true,
    donutWidth: 30,
    showLabel: false

  };

  FinancialSummaryChartEvents: ChartEvent = {
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

  //#region Bar-Chart
  DarmadSummaryChartType: ChartType = 'Bar';
  DarmadSummaryChartData: IChartistData;

  DarmadSummaryChartOptions: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    },
    low: 0,
    high: 100
  };

  DarmadSummaryChartEvents: ChartEvent = {
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

 
  constructor(private route: ActivatedRoute,
    private persianCalendarService: PersianCalendarService) { }

  ngOnInit() {
    this.loadUserDashboard();
    this.loadInventoryChart();
    this.loadInretMoneyChart();
    this.loadExitMoneyChart();
    this.loadFactorChart();
    this.loadFinancialSummary();
    this.loadDarmadSummary();
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
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    const dt6 = new Date();
    const dt7 = new Date();
    const dt8 = new Date();
    const dt9 = new Date();
    const dt10 = new Date();
    const dt11 = new Date();
    const dt12 = new Date();
    dt2.setMonth(dt2.getMonth() - 1);
    dt3.setMonth(dt3.getMonth() - 2);
    dt4.setMonth(dt4.getMonth() - 3);
    dt5.setMonth(dt5.getMonth() - 4);
    dt6.setMonth(dt6.getMonth() - 5);
    dt7.setMonth(dt7.getMonth() - 6);
    dt8.setMonth(dt8.getMonth() - 7);
    dt9.setMonth(dt9.getMonth() - 8);
    dt10.setMonth(dt10.getMonth() -9);
    dt11.setMonth(dt11.getMonth() - 10);
    dt12.setMonth(dt12.getMonth() - 11);
    this.FactorChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarMonth(dt12),
        this.persianCalendarService.PersianCalendarMonth(dt11),
        this.persianCalendarService.PersianCalendarMonth(dt10),
        this.persianCalendarService.PersianCalendarMonth(dt9),
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
        this.userDashboard.factor12Months.day12,
        this.userDashboard.factor12Months.day11,
        this.userDashboard.factor12Months.day10,
        this.userDashboard.factor12Months.day9,
        this.userDashboard.factor12Months.day8,
        this.userDashboard.factor12Months.day7,
        this.userDashboard.factor12Months.day6,
        this.userDashboard.factor12Months.day5,
        this.userDashboard.factor12Months.day4,
        this.userDashboard.factor12Months.day3,
        this.userDashboard.factor12Months.day2,
        this.userDashboard.factor12Months.day1
      ]]
    };
  }
  loadFinancialSummary() {
    this.FinancialSummaryChartData  = {
      series: [
        {
          name: 'موجودی',
          className: 'ct-progress',
          value: this.getPersent(this.userDashboard.totalInventory)
        },
        {
          name: 'درآمد',
          className: 'ct-outstanding',
          value: this.getPersent(this.userDashboard.totalInterMoney)
        },
        {
          name: 'واریزی',
          className: 'ct-done',
          value: this.getPersent(this.userDashboard.totalExitMoney)
        }
      ]
    };
  }
  loadDarmadSummary() {
    this.DarmadSummaryChartData  = {
      labels: ['افزایش موجودی', 'حمایتی', 'ایزی پی', 'فاکتور ', 'کل'],
      series: [
        [
          this.getDaramdPersent(this.userDashboard.totalIncInventoryDaramad),
          this.getDaramdPersent(this.userDashboard.totalSupportDaramad),
          this.getDaramdPersent(this.userDashboard.totalEasyPayDaramad),
          this.getDaramdPersent(this.userDashboard.totalFactorDaramad),
          100
        ]
      ]
    };
  }

   sortTicketContent(tc: TicketContent[]) {
    return tc.sort((a, b) => {
      return <any>new Date(b.dateCreated) - <any>new Date(a.dateCreated);
    });
   }

  getPersent(number: number) {
    const sum = this.userDashboard.totalInventory + this.userDashboard.totalInterMoney + this.userDashboard.totalExitMoney;
    return Math.floor((100 * number) / sum) ;
  }

  getDaramdPersent(number: number) {
    return Math.floor((100 * number) / this.userDashboard.totalSuccessFactor);
  }
  
}
