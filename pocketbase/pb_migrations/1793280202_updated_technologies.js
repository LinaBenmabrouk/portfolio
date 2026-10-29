/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1364302558")

  // update field
  collection.fields.addAt(2, new Field({
    "help": "",
    "hidden": false,
    "id": "select3706679309",
    "maxSelect": 1,
    "name": "niveau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Débutant",
      "Intermédiaire",
      "Avancé",
      "Expérimenté"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1364302558")

  // update field
  collection.fields.addAt(2, new Field({
    "help": "",
    "hidden": false,
    "id": "select3706679309",
    "maxSelect": 1,
    "name": "niveau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Débutant",
      "Intermédiaire",
      "Avancé"
    ]
  }))

  return app.save(collection)
})
