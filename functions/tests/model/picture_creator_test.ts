import {describe, it} from "mocha"
import * as fs from "fs"
import * as sqlite3 from "sqlite3"
import * as path from "path"

describe("Preview Test", () => {
  it(".clipのテーブル確認", () => {
    const baseName = path.join(path.resolve('sample_files'), 'illust1')
    console.log("baseName : " + baseName + "\n")
    const clipPath = baseName + ".clip"
    const clipBuffer = fs.readFileSync(clipPath)
    console.log("clipBuffer : " + clipBuffer + "\n")

    const searchText: string = "SQLite format 3"
    const buffer = Buffer.from(searchText)
    console.log("SQLite format 3 as : " + buffer.join('') + "\n")

    const findIndex = clipBuffer.indexOf(buffer)
    console.log("findIndex : " + findIndex + "\n")

    const resultBuf = clipBuffer.slice(findIndex, clipBuffer.length)
    console.log("resultBuf : " + resultBuf + "\n")

    const dbPath = baseName + ".sqlite"
    // いったんsqliteファイルに書き出し
    fs.writeFileSync(dbPath, resultBuf)

    const db = new sqlite3.Database(dbPath)
    db.serialize(() => {
      db.all("select ImageData from CanvasPreview", (err, row) => {
        if (err) {
          console.log(err)
          return
        }

        row.forEach((item, index) => {
          console.log(item)
        })

        if (row.length > 0) {
          const binaryPath = baseName + ".png"
          fs.writeFileSync(binaryPath, row[0].ImageData)
        }
      })
      
      db.close()
    })
  })
})

