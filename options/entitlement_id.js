module.exports = {
  alias: 'eid',
  type: 'string',
  describe: 'Entitlement identifier',
  question: {
    type: 'list',
    name: 'entitlement_id',
    message: 'What\'s the Entitlement ID?',
    getChoices: async (sdk, projectId ) => {
      const { data} = await sdk.listEntitlements({limit: '20', project_id: projectId })
      return data.items.map(o => { return { 
        value: o.id, 
        name: `${o.lookup_key} (${o.id})`
      } })
    }
  } 
}