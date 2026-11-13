/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1425674375")

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": [],
    "help": "",
    "hidden": false,
    "id": "url4101391790",
    "name": "url",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1425674375")

  // remove field
  collection.fields.removeById("url4101391790")

  return app.save(collection)
})
