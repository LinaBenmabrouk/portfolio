/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // add field
  collection.fields.addAt(27, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2111082927",
    "max": 0,
    "min": 0,
    "name": "contexte_fiche",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // remove field
  collection.fields.removeById("text2111082927")

  return app.save(collection)
})
