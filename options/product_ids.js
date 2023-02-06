module.exports = {
  alias: 'eid',
  type: 'string',
  describe: 'Product identifiers',
  question: {
    type: 'checkbox',
    name: 'product_ids',
    message: 'Select the list of products to attach',
    getChoices: async (sdk, projectId ) => {
      const { data } = await sdk.listProducts({limit: '20', project_id: projectId })

      return data.items.map(o => { return { 
        value: o.id, 
        name: `${o.store_identifier} (${o.app})`
      } })
    }
  } 
}