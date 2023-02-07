const { withContext } = require('../../utils')

exports.command = 'overview'
exports.desc = 'Get Overview Metrics'
exports.builder = {}

exports.handler = withContext([], {}, async function({ sdk, projectId, log}) {
  const { data } = await sdk.getOverviewMetrics({project_id: projectId})
  log(data.metrics.map(m => {
    return {
      metric: `${m.name} (${m.description})`,
      value: `${m.unit} ${m.value}`
    }
  }))
})