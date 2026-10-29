/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2549169134")

  // remove field
  collection.fields.removeById("text4079335651")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2549169134")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text4079335651",
    "max": 0,
    "min": 0,
    "name": "exemple",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
