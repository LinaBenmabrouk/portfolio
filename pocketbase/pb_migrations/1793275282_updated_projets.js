/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select2181241943",
    "maxSelect": 1,
    "name": "categorie",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "dev",
      "design",
      "animation"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select2181241943",
    "maxSelect": 1,
    "name": "categorie",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "dev",
      "design"
    ]
  }))

  return app.save(collection)
})
