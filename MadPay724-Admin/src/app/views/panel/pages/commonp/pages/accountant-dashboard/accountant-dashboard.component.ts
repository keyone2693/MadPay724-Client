import { Component, OnInit } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions,
  IPieChartOptions,
  IBarChartOptions
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

import 'src/app/shared/extentions/number.extentions';
import 'src/app/shared/extentions/bool.extentions';
import { AccountantDashboard } from 'src/app/data/models/common/accountantDashboard';

@Component({
  selector: 'app-accountant-dashboard',
  templateUrl: './accountant-dashboard.component.html',
  styleUrls: ['./accountant-dashboard.component.css']
})
export class AccountantDashboardComponent implements OnInit {

  accountantDashboard: AccountantDashboard;
  subManager = new Subscription();
  //#region Entry5Days
  Entry5DaysChartType: ChartType = 'Line';
  Entry5DaysChartData: IChartistData;

  Entry5DaysChartOptions: ILineChartOptions = {
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

  Entry5DaysChartEvents: ChartEvent = {
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
  //#region  Factor5Days
  Factor5DaysChartType: ChartType = 'Line';
  Factor5DaysChartData: IChartistData;

  Factor5DaysChartOptions: ILineChartOptions = {
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

  Factor5DaysChartEvents: ChartEvent = {
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

  //#region EntryFactor
  EntryFactorChartType: ChartType = 'Line';
  EntryFactorChartData: IChartistData;

  EntryFactorChartOptions: ILineChartOptions = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisY: {
      low: 0,
      scaleMinSpace: 50,
    },
    axisX: {
      showGrid: false
    }
  };

  EntryFactorChartEvents: ChartEvent = {
    created: (data) => {
      var defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'laGradient',
        x1: 0,
        y1: 1,
        x2: 1,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(0, 201, 255, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(146, 254, 157, 1)'
      });

      defs.elem('linearGradient', {
        id: 'laGradient1',
        x1: 0,
        y1: 1,
        x2: 1,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(132, 60, 247, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(56, 184, 242, 1)'
      });
    },
    draw: (data) => {
      var circleRadius = 6;
      if (data.type === 'point') {
        var circle = new Chartist.Svg('circle', {
          cx: data.x,
          cy: data.y,
          r: circleRadius,
          class: data.value.y === 0 ? 'ct-point-circle-transperent' : 'ct-point-circle'
        });
        data.element.replace(circle);
      }
    }
  };
  //#endregion
  //#region CardGateWallet
CardGateWalletChartType: ChartType = 'Line';
  CardGateWalletChartData: IChartistData

  CardGateWalletChartOptions: ILineChartOptions = {
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

  CardGateWalletChartEvents: ChartEvent = {
    created: (data) => {
      const defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'linear1',
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(185,168,231, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(118,74,233, 1)'
      });
      defs.elem('linearGradient', {
        id: 'linear2',
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(32,201,151, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(40,167,69, 1)'
      });
      defs.elem('linearGradient', {
        id: 'linear3',
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(247,140,153, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(255,73,97, 1)'
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

  constructor(private route: ActivatedRoute,
    private persianCalendarService: PersianCalendarService) { }

  ngOnInit() {
    this.loadaccountantDashboard();
    this.loadEntry5DaysChart();
    this.loadFactor5DaysChart();
    this.loadEntryFactorChart();
    this.loadCardGateWalletChart();
  }
  loadaccountantDashboard() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.accountantDashboard = data.accountantDashboard;
      })
    )
  }
  loadEntry5DaysChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.Entry5DaysChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.accountantDashboard.entry5Days.day5,
        this.accountantDashboard.entry5Days.day4,
        this.accountantDashboard.entry5Days.day3,
        this.accountantDashboard.entry5Days.day2,
        this.accountantDashboard.totalSuccessEntryPrice
      ]]
    };
  }
  loadFactor5DaysChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.Factor5DaysChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.accountantDashboard.factor5Days.day5,
        this.accountantDashboard.factor5Days.day4,
        this.accountantDashboard.factor5Days.day3,
        this.accountantDashboard.factor5Days.day2,
        this.accountantDashboard.totalSuccessFactorPrice
      ]]
    };
  }

  loadEntryFactorChart() {
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
    dt10.setMonth(dt10.getMonth() - 9);
    dt11.setMonth(dt11.getMonth() - 10);
    dt12.setMonth(dt12.getMonth() - 11);
    this.EntryFactorChartData = {
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
      series: [
        [
          this.accountantDashboard.factor12Months.day12,
          this.accountantDashboard.factor12Months.day11,
          this.accountantDashboard.factor12Months.day10,
          this.accountantDashboard.factor12Months.day9,
          this.accountantDashboard.factor12Months.day8,
          this.accountantDashboard.factor12Months.day7,
          this.accountantDashboard.factor12Months.day6,
          this.accountantDashboard.factor12Months.day5,
          this.accountantDashboard.factor12Months.day4,
          this.accountantDashboard.factor12Months.day3,
          this.accountantDashboard.factor12Months.day2,
          this.accountantDashboard.factor12Months.day1
        ],
        [
          this.accountantDashboard.entry12Months.day12,
          this.accountantDashboard.entry12Months.day11,
          this.accountantDashboard.entry12Months.day10,
          this.accountantDashboard.entry12Months.day9,
          this.accountantDashboard.entry12Months.day8,
          this.accountantDashboard.entry12Months.day7,
          this.accountantDashboard.entry12Months.day6,
          this.accountantDashboard.entry12Months.day5,
          this.accountantDashboard.entry12Months.day4,
          this.accountantDashboard.entry12Months.day3,
          this.accountantDashboard.entry12Months.day2,
          this.accountantDashboard.entry12Months.day1,
        ]     
      ]
    };
  }
 
  loadCardGateWalletChart() {
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
    dt10.setMonth(dt10.getMonth() - 9);
    dt11.setMonth(dt11.getMonth() - 10);
    dt12.setMonth(dt12.getMonth() - 11);
    this.CardGateWalletChartData = {
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
        this.accountantDashboard.wallet12Months.day12,
        this.accountantDashboard.wallet12Months.day11,
        this.accountantDashboard.wallet12Months.day10,
        this.accountantDashboard.wallet12Months.day9,
        this.accountantDashboard.wallet12Months.day8,
        this.accountantDashboard.wallet12Months.day7,
        this.accountantDashboard.wallet12Months.day6,
        this.accountantDashboard.wallet12Months.day5,
        this.accountantDashboard.wallet12Months.day4,
        this.accountantDashboard.wallet12Months.day3,
        this.accountantDashboard.wallet12Months.day2,
        this.accountantDashboard.wallet12Months.day1
      ],
      [
        this.accountantDashboard.bankCard12Months.day12,
        this.accountantDashboard.bankCard12Months.day11,
        this.accountantDashboard.bankCard12Months.day10,
        this.accountantDashboard.bankCard12Months.day9,
        this.accountantDashboard.bankCard12Months.day8,
        this.accountantDashboard.bankCard12Months.day7,
        this.accountantDashboard.bankCard12Months.day6,
        this.accountantDashboard.bankCard12Months.day5,
        this.accountantDashboard.bankCard12Months.day4,
        this.accountantDashboard.bankCard12Months.day3,
        this.accountantDashboard.bankCard12Months.day2,
        this.accountantDashboard.bankCard12Months.day1,
      ]
        ,
        [
          this.accountantDashboard.gate12Months.day12,
          this.accountantDashboard.gate12Months.day11,
          this.accountantDashboard.gate12Months.day10,
          this.accountantDashboard.gate12Months.day9,
          this.accountantDashboard.gate12Months.day8,
          this.accountantDashboard.gate12Months.day7,
          this.accountantDashboard.gate12Months.day6,
          this.accountantDashboard.gate12Months.day5,
          this.accountantDashboard.gate12Months.day4,
          this.accountantDashboard.gate12Months.day3,
          this.accountantDashboard.gate12Months.day2,
          this.accountantDashboard.gate12Months.day1,
        ]
      ]
    };
  }


}
