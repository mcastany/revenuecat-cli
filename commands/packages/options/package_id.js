let selected_offerings

module.exports = {
  alias: 'eid',
  type: 'string',
  describe: 'Package identifier',
  questions: [{
    type: 'list',
    name: 'offering_id',
    message: 'What\'s the offering of the package?',
    getChoices: async (sdk, projectId ) => {
      const { data } = await sdk.listOfferings({limit: '20', project_id: projectId })
      return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
    }
  }, {
    type: 'list',
    name: 'package_id',
    message: 'What\'s the Package ID?',
    when: (answers) => {
      selected_offerings = answers.offering_id
      return !!answers.offering_id
    },
    getChoices: async (sdk, projectId ) => {
      return async () => {
        const { data } = await sdk.listPackages({limit: '20', project_id: projectId, offering_id: selected_offerings })
        return data.items.map(o => { return { 
          value: o.id, 
          name: `${o.lookup_key} (${o.id})`
        }})
      }
    }
  }] 
}