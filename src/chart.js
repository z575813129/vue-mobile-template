/**
 * Created by zack on 2016/12/14.
 */
// import 'chart.js/dist/Chart.min'
if (typeof window.Chart === 'undefined') {
  throw new Error('Chart is undefined !')
}
let Chart = window.Chart

Chart.defaults.global.legend.onClick = function () {
}
Chart.plugins.register({
  beforeUpdate: function (chartInstance) {
    chartInstance.data.datasets.forEach(function (dataset, i) {
      let meta = chartInstance.getDatasetMeta(i)
      if (!meta.hidden && (meta.type === 'line' || meta.type === 'bar')) {
        meta.data.forEach(function (element, index) {
          // Draw the text in black, with the specified font
          element._chart.config.options.title = {
            display: true,
            fontSize: 16,
            padding: 10,
            fontColor: '#000',
            position: 'top',
            text: ''
          }
        })
      }
    })
  },
  afterDatasetsDraw: function (chartInstance, easing) {
    // To only draw at the end of animation, check for easing === 1
    let ctx = chartInstance.chart.ctx
    chartInstance.data.datasets.forEach(function (dataset, i) {
      let meta = chartInstance.getDatasetMeta(i)
      if (!meta.hidden && (meta.type === 'line' || meta.type === 'bar')) {
        meta.data.forEach(function (element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = '#323232'
          let fontSize = 14
          let fontStyle = 'normal'
          let fontFamily = 'Helvetica Neue'
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
          // Just naively convert to string for now
          let dataString = dataset.data[index].toString()
          // Make sure alignment settings are correct
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          let padding = 8
          let position = element.tooltipPosition()
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
        })
      }
    })
  }
})

export default Chart
