module.exports = {
  alias: 'oid',
  type: 'string',
  describe: 'Offering ID',
  question: {
    type: 'list',
    name: 'offering_id',
    message: 'What\'s the RC Offerings?',
    getChoices: async (sdk, projectId ) => {
      const { data} = await sdk.listOfferings({limit: '20', project_id: projectId })
      return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
    }
  }
}