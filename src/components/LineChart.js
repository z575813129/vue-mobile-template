/**
 * Created by Administrator on 2016/12/5.
 */
import Vue from 'vue'
import Chart from '../chart'

export default Vue.extend({
  template: `
    <div>
      <canvas :id="chartId" :width="width" :height="height" ref="canvas"></canvas>
    </div>
  `,
  props: {
    chartId: {
      default: 'line-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 250,
      type: Number
    },
    data: Object
  },
  data () {
    return {
      options: {
        legend: {
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let color = ['#F29534', '#445483']
      for (let i in this.data.datasets) {
        this.data.datasets[i].fill = false
        this.data.datasets[i].backgroundColor = color[i]
        this.data.datasets[i].borderColor = color[i]
        this.data.datasets[i].lineTension = 0
        this.data.datasets[i].pointRadius = 6
        this.data.datasets[i].pointHoverRadius = 8
        // 将列表数据四舍五入
        for (let item of this.data.datasets[i].data) {
          item = Math.ceil(item)
        }
      }
      this.render(this.data, this.options)
    })
  },
  methods: {
    render (data, options) {
      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'line',
          data: data,
          options: options
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
