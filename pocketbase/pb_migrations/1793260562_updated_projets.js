/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // update field
  collection.fields.addAt(26, new Field({
    "help": "",
    "hidden": false,
    "id": "file1854001193",
    "maxSelect": 10,
    "maxSize": 10485760,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml"
    ],
    "name": "mise_en_situation",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "800x0",
      "1600x0"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3746317213")

  // update field
  collection.fields.addAt(26, new Field({
    "help": "",
    "hidden": false,
    "id": "file1854001193",
    "maxSelect": 1,
    "maxSize": 10485760,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml"
    ],
    "name": "mise_en_situation",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "800x0",
      "1600x0"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
