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
import { AdminDashboard } from 'src/app/data/models/common/adminDashboard';
import { TicketContent } from 'src/app/data/models/ticketContent';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminDashboard: AdminDashboard;
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
  //#region TotalBlog
  TotalBlogChartType: ChartType = 'Line';
  TotalBlogChartData: IChartistData;

  TotalBlogChartOptions: ILineChartOptions = {
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

  TotalBlogChartEvents: ChartEvent = {
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
  //#region  ApprovedBlog
  ApprovedBlogChartType: ChartType = 'Line';
  ApprovedBlogChartData: IChartistData;

  ApprovedBlogChartOptions: ILineChartOptions = {
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

  ApprovedBlogChartEvents: ChartEvent = {
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
  //#region UnApprovedBlog
  UnApprovedBlogChartType: ChartType = 'Line';
  UnApprovedBlogChartData: IChartistData;

  UnApprovedBlogChartOptions: ILineChartOptions = {
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

  UnApprovedBlogChartEvents: ChartEvent = {
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

  //#region BlogSummary
  BlogSummaryChartType: ChartType = 'Pie';
  BlogSummaryChartData: IChartistData

  BlogSummaryChartOptions: IPieChartOptions = {
    donut: true,
    startAngle: 310,
    donutSolid: true,
    donutWidth: 30,
    showLabel: false

  };

  BlogSummaryChartEvents: ChartEvent = {
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

  //#region UserBlogsChart
  UserBlogsChartType: ChartType = 'Line';
  UserBlogsChartData: IChartistData

  UserBlogsChartOptions: ILineChartOptions = {
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

  UserBlogsChartEvents: ChartEvent = {
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

  //#region nventoryChart
  InventoryChartType: ChartType = 'Line';
  InventoryChartData: IChartistData;

  InventoryChartOptions: ILineChartOptions = {

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

  InventoryChartEvents: ChartEvent = {
    created: (data) => {
      var defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'Wlinear',
        x1: 1,
        y1: 0,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(250,81,61, 0.8)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(250,55,79, 0.8)'
      });
    },
    draw: (data) => {
      var circleRadius = 7;
      if (data.type === 'point') {
        var circle = new Chartist.Svg('circle', {
          cx: data.x,
          cy: data.y,
          r: circleRadius,
          class: data.value.y === 3 || data.value.y === 45 ? 'ct-point-circle-transperent' : 'ct-point-circle'
        });
        data.element.replace(circle);
      }
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
      var defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'Wlinear2',
        x1: 1,
        y1: 0,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(255, 0, 204, 0.5)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(51, 51, 153, 1)'
      });
    },
    draw: (data) => {
      var circleRadius = 7;
      if (data.type === 'point') {
        var circle = new Chartist.Svg('circle', {
          cx: data.x,
          cy: data.y,
          r: circleRadius,
          class: data.value.y === 3 || data.value.y === 45 ? 'ct-point-circle-transperent' : 'ct-point-circle'
        });
        data.element.replace(circle);
      }
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
      var defs = data.svg.elem('defs');
      defs.elem('linearGradient', {
        id: 'Wlinear3',
        x1: 1,
        y1: 0,
        x2: 0,
        y2: 0
      }).elem('stop', {
        offset: 0,
        'stop-color': 'rgba(56, 184, 242, 1)'
      }).parent().elem('stop', {
        offset: 1,
        'stop-color': 'rgba(132, 60, 247, 1)'
      });
    },
    draw: (data) => {
      var circleRadius = 7;
      if (data.type === 'point') {
        var circle = new Chartist.Svg('circle', {
          cx: data.x,
          cy: data.y,
          r: circleRadius,
          class: data.value.y === 3 || data.value.y === 45 ? 'ct-point-circle-transperent' : 'ct-point-circle'
        });
        data.element.replace(circle);
      }
    }
  };
  //#endregion


  constructor(private route: ActivatedRoute,
    private persianCalendarService: PersianCalendarService) { }

  ngOnInit() {
    this.loadadminDashboard();
    this.loadEntry5DaysChart();
    this.loadFactor5DaysChart();
    this.loadEntryFactorChart();
    this.loadCardGateWalletChart();

    this.loadTotalBlogChart();
    this.loadApprovedBlogChart();
    this.loadUnApprovedBlogChart();
    this.loadBlogSummary();
    this.loadUserBlogsChart()

    this.loadInventoryChart();
    this.loadInretMoneyChart();
    this.loadExitMoneyChart();
  }
  loadadminDashboard() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.adminDashboard = data.adminDashboard;
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
        this.adminDashboard.entry5Days.day5,
        this.adminDashboard.entry5Days.day4,
        this.adminDashboard.entry5Days.day3,
        this.adminDashboard.entry5Days.day2,
        this.adminDashboard.totalSuccessEntryPrice
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
        this.adminDashboard.factor5Days.day5,
        this.adminDashboard.factor5Days.day4,
        this.adminDashboard.factor5Days.day3,
        this.adminDashboard.factor5Days.day2,
        this.adminDashboard.totalSuccessFactorPrice
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
          this.adminDashboard.factor12Months.day12,
          this.adminDashboard.factor12Months.day11,
          this.adminDashboard.factor12Months.day10,
          this.adminDashboard.factor12Months.day9,
          this.adminDashboard.factor12Months.day8,
          this.adminDashboard.factor12Months.day7,
          this.adminDashboard.factor12Months.day6,
          this.adminDashboard.factor12Months.day5,
          this.adminDashboard.factor12Months.day4,
          this.adminDashboard.factor12Months.day3,
          this.adminDashboard.factor12Months.day2,
          this.adminDashboard.factor12Months.day1
        ],
        [
          this.adminDashboard.entry12Months.day12,
          this.adminDashboard.entry12Months.day11,
          this.adminDashboard.entry12Months.day10,
          this.adminDashboard.entry12Months.day9,
          this.adminDashboard.entry12Months.day8,
          this.adminDashboard.entry12Months.day7,
          this.adminDashboard.entry12Months.day6,
          this.adminDashboard.entry12Months.day5,
          this.adminDashboard.entry12Months.day4,
          this.adminDashboard.entry12Months.day3,
          this.adminDashboard.entry12Months.day2,
          this.adminDashboard.entry12Months.day1,
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
        this.adminDashboard.wallet12Months.day12,
        this.adminDashboard.wallet12Months.day11,
        this.adminDashboard.wallet12Months.day10,
        this.adminDashboard.wallet12Months.day9,
        this.adminDashboard.wallet12Months.day8,
        this.adminDashboard.wallet12Months.day7,
        this.adminDashboard.wallet12Months.day6,
        this.adminDashboard.wallet12Months.day5,
        this.adminDashboard.wallet12Months.day4,
        this.adminDashboard.wallet12Months.day3,
        this.adminDashboard.wallet12Months.day2,
        this.adminDashboard.wallet12Months.day1
      ],
      [
        this.adminDashboard.bankCard12Months.day12,
        this.adminDashboard.bankCard12Months.day11,
        this.adminDashboard.bankCard12Months.day10,
        this.adminDashboard.bankCard12Months.day9,
        this.adminDashboard.bankCard12Months.day8,
        this.adminDashboard.bankCard12Months.day7,
        this.adminDashboard.bankCard12Months.day6,
        this.adminDashboard.bankCard12Months.day5,
        this.adminDashboard.bankCard12Months.day4,
        this.adminDashboard.bankCard12Months.day3,
        this.adminDashboard.bankCard12Months.day2,
        this.adminDashboard.bankCard12Months.day1,
      ]
        ,
      [
        this.adminDashboard.gate12Months.day12,
        this.adminDashboard.gate12Months.day11,
        this.adminDashboard.gate12Months.day10,
        this.adminDashboard.gate12Months.day9,
        this.adminDashboard.gate12Months.day8,
        this.adminDashboard.gate12Months.day7,
        this.adminDashboard.gate12Months.day6,
        this.adminDashboard.gate12Months.day5,
        this.adminDashboard.gate12Months.day4,
        this.adminDashboard.gate12Months.day3,
        this.adminDashboard.gate12Months.day2,
        this.adminDashboard.gate12Months.day1,
      ]
      ]
    };
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
        this.adminDashboard.inventory5Days.day5,
        this.adminDashboard.inventory5Days.day4,
        this.adminDashboard.inventory5Days.day3,
        this.adminDashboard.inventory5Days.day2,
        this.adminDashboard.totalInventory
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
        this.adminDashboard.interMoney5Days.day5,
        this.adminDashboard.interMoney5Days.day4,
        this.adminDashboard.interMoney5Days.day3,
        this.adminDashboard.interMoney5Days.day2,
        this.adminDashboard.totalInterMoney
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
        this.adminDashboard.exitMoney5Days.day5,
        this.adminDashboard.exitMoney5Days.day4,
        this.adminDashboard.exitMoney5Days.day3,
        this.adminDashboard.exitMoney5Days.day2,
        this.adminDashboard.totalExitMoney
      ]]
    };
  }

  loadTotalBlogChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.TotalBlogChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.adminDashboard.totalBlog5Days.day5,
        this.adminDashboard.totalBlog5Days.day4,
        this.adminDashboard.totalBlog5Days.day3,
        this.adminDashboard.totalBlog5Days.day2,
        this.adminDashboard.totalBlogCount
      ]]
    };
  }
  loadApprovedBlogChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.ApprovedBlogChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.adminDashboard.approvedBlog5Days.day5,
        this.adminDashboard.approvedBlog5Days.day4,
        this.adminDashboard.approvedBlog5Days.day3,
        this.adminDashboard.approvedBlog5Days.day2,
        this.adminDashboard.approvedBlogCount
      ]]
    };
  }
  loadUnApprovedBlogChart() {
    const dt1 = new Date();
    const dt2 = new Date();
    const dt3 = new Date();
    const dt4 = new Date();
    const dt5 = new Date();
    dt2.setDate(dt2.getDate() - 1);
    dt3.setDate(dt3.getDate() - 2);
    dt4.setDate(dt4.getDate() - 3);
    dt5.setDate(dt5.getDate() - 4);
    this.UnApprovedBlogChartData = {
      labels: [
        this.persianCalendarService.PersianCalendarVerySmall(dt5),
        this.persianCalendarService.PersianCalendarVerySmall(dt4),
        this.persianCalendarService.PersianCalendarVerySmall(dt3),
        this.persianCalendarService.PersianCalendarVerySmall(dt2),
        '*'
      ],
      series: [[
        this.adminDashboard.unApprovedBlog5Days.day5,
        this.adminDashboard.unApprovedBlog5Days.day4,
        this.adminDashboard.unApprovedBlog5Days.day3,
        this.adminDashboard.unApprovedBlog5Days.day2,
        this.adminDashboard.unApprovedBlogCount
      ]]
    };
  }
  loadBlogSummary() {
    this.BlogSummaryChartData = {
      series: [
        {
          name: 'تایید شده',
          className: 'ct-progress',
          value: this.getPersentBlog(this.adminDashboard.approvedBlogCount)
        },
        {
          name: 'تایید نشده',
          className: 'ct-done',
          value: this.getPersentBlog(this.adminDashboard.unApprovedBlogCount)
        }
      ]
    };
  }
  loadUserBlogsChart() {
    this.UserBlogsChartData = {
      labels: [
        this.adminDashboard.last12UserBlogInfo[11] ? this.adminDashboard.last12UserBlogInfo[11].name : '-',
        this.adminDashboard.last12UserBlogInfo[10] ? this.adminDashboard.last12UserBlogInfo[10].name : '-',
        this.adminDashboard.last12UserBlogInfo[9] ? this.adminDashboard.last12UserBlogInfo[9].name : '-',
        this.adminDashboard.last12UserBlogInfo[8] ? this.adminDashboard.last12UserBlogInfo[8].name : '-',
        this.adminDashboard.last12UserBlogInfo[7] ? this.adminDashboard.last12UserBlogInfo[7].name : '-',
        this.adminDashboard.last12UserBlogInfo[6] ? this.adminDashboard.last12UserBlogInfo[6].name : '-',
        this.adminDashboard.last12UserBlogInfo[5] ? this.adminDashboard.last12UserBlogInfo[5].name : '-',
        this.adminDashboard.last12UserBlogInfo[4] ? this.adminDashboard.last12UserBlogInfo[4].name : '-',
        this.adminDashboard.last12UserBlogInfo[3] ? this.adminDashboard.last12UserBlogInfo[3].name : '-',
        this.adminDashboard.last12UserBlogInfo[2] ? this.adminDashboard.last12UserBlogInfo[2].name : '-',
        this.adminDashboard.last12UserBlogInfo[1] ? this.adminDashboard.last12UserBlogInfo[1].name : '-',
        this.adminDashboard.last12UserBlogInfo[0] ? this.adminDashboard.last12UserBlogInfo[0].name : '-'
      ],
      series: [[
        this.adminDashboard.last12UserBlogInfo[11] ? this.adminDashboard.last12UserBlogInfo[11].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[10] ? this.adminDashboard.last12UserBlogInfo[10].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[9] ? this.adminDashboard.last12UserBlogInfo[9].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[8] ? this.adminDashboard.last12UserBlogInfo[8].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[7] ? this.adminDashboard.last12UserBlogInfo[7].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[6] ? this.adminDashboard.last12UserBlogInfo[6].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[5] ? this.adminDashboard.last12UserBlogInfo[5].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[4] ? this.adminDashboard.last12UserBlogInfo[4].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[3] ? this.adminDashboard.last12UserBlogInfo[3].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[2] ? this.adminDashboard.last12UserBlogInfo[2].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[1] ? this.adminDashboard.last12UserBlogInfo[1].totalBlog : 0,
        this.adminDashboard.last12UserBlogInfo[0] ? this.adminDashboard.last12UserBlogInfo[0].totalBlog : 0
      ],
      [
        this.adminDashboard.last12UserBlogInfo[11] ? this.adminDashboard.last12UserBlogInfo[11].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[10] ? this.adminDashboard.last12UserBlogInfo[10].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[9] ? this.adminDashboard.last12UserBlogInfo[9].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[8] ? this.adminDashboard.last12UserBlogInfo[8].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[7] ? this.adminDashboard.last12UserBlogInfo[7].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[6] ? this.adminDashboard.last12UserBlogInfo[6].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[5] ? this.adminDashboard.last12UserBlogInfo[5].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[4] ? this.adminDashboard.last12UserBlogInfo[4].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[3] ? this.adminDashboard.last12UserBlogInfo[3].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[2] ? this.adminDashboard.last12UserBlogInfo[2].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[1] ? this.adminDashboard.last12UserBlogInfo[1].approvedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[0] ? this.adminDashboard.last12UserBlogInfo[0].approvedBlog : 0
      ],
      [
        this.adminDashboard.last12UserBlogInfo[11] ? this.adminDashboard.last12UserBlogInfo[11].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[10] ? this.adminDashboard.last12UserBlogInfo[10].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[9] ? this.adminDashboard.last12UserBlogInfo[9].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[8] ? this.adminDashboard.last12UserBlogInfo[8].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[7] ? this.adminDashboard.last12UserBlogInfo[7].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[6] ? this.adminDashboard.last12UserBlogInfo[6].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[5] ? this.adminDashboard.last12UserBlogInfo[5].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[4] ? this.adminDashboard.last12UserBlogInfo[4].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[3] ? this.adminDashboard.last12UserBlogInfo[3].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[2] ? this.adminDashboard.last12UserBlogInfo[2].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[1] ? this.adminDashboard.last12UserBlogInfo[1].unApprovedBlog : 0,
        this.adminDashboard.last12UserBlogInfo[0] ? this.adminDashboard.last12UserBlogInfo[0].unApprovedBlog : 0
      ]
      ]
    };
  }


  getPersentBlog(number: number) {
    return Math.floor((100 * number) / this.adminDashboard.totalBlogCount);
  }
  sortTicketContent(tc: TicketContent[]) {
    return tc.sort((a, b) => {
      return <any>new Date(b.dateCreated) - <any>new Date(a.dateCreated);
    });
  }
  getPersentAcc(number: number) {
    const sum = this.adminDashboard.totalInventory + this.adminDashboard.totalInterMoney + this.adminDashboard.totalExitMoney;
    return Math.floor((100 * number) / sum);
  }

}
