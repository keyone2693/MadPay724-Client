import { Component, OnInit } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions,
  IPieChartOptions,
  IBarChartOptions
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';
import { TicketContent } from 'src/app/data/models/ticketContent';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

import 'src/app/shared/extentions/bool.extentions';
import { BlogDashboard } from 'src/app/data/models/common/blogDashboard';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  blogDashboard: BlogDashboard;
  subManager = new Subscription();
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
    this.loadblogDashboard();
    this.loadTotalBlogChart();
    this.loadApprovedBlogChart();
    this.loadUnApprovedBlogChart();
    this.loadBlogSummary();
    this.loadDarmadSummary();
  }
  loadblogDashboard() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.blogDashboard = data.blogDashboard;
      })
    )
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
        this.blogDashboard.totalBlog5Days.day5,
        this.blogDashboard.totalBlog5Days.day4,
        this.blogDashboard.totalBlog5Days.day3,
        this.blogDashboard.totalBlog5Days.day2,
        this.blogDashboard.totalBlog5Days.day1
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
        this.blogDashboard.approvedBlog5Days.day5,
        this.blogDashboard.approvedBlog5Days.day4,
        this.blogDashboard.approvedBlog5Days.day3,
        this.blogDashboard.approvedBlog5Days.day2,
        this.blogDashboard.approvedBlog5Days.day1
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
        this.blogDashboard.unApprovedBlog5Days.day5,
        this.blogDashboard.unApprovedBlog5Days.day4,
        this.blogDashboard.unApprovedBlog5Days.day3,
        this.blogDashboard.unApprovedBlog5Days.day2,
        this.blogDashboard.unApprovedBlog5Days.day1
      ]]
    };
  }
  loadBlogSummary() {
    this.BlogSummaryChartData = {
      series: [
        {
          name: 'همه',
          className: 'ct-progress',
          value: this.getPersent(this.blogDashboard.totalBlogCount)
        },
        {
          name: 'تایید شده',
          className: 'ct-outstanding',
          value: this.getPersent(this.blogDashboard.approvedBlogCount)
        },
        {
          name: 'تایید نشده',
          className: 'ct-done',
          value: this.getPersent(this.blogDashboard.unApprovedBlogCount)
        }
      ]
    };
  }
  loadDarmadSummary() {
    this.DarmadSummaryChartData = {
      labels: ['افزایش موجودی', 'حمایتی', 'ایزی پی', 'فاکتور ', 'کل'],
      series: [
        [
          this.getDaramdPersent(this.blogDashboard.totalIncInventoryDaramad),
          this.getDaramdPersent(this.blogDashboard.totalSupportDaramad),
          this.getDaramdPersent(this.blogDashboard.totalEasyPayDaramad),
          this.getDaramdPersent(this.blogDashboard.totalFactorDaramad),
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
    return Math.floor((100 * number) / this.blogDashboard.totalBlogCount);
  }


}
