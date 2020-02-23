import {describe, it} from "mocha"
import * as fs from "fs"
import * as sqlite3 from "sqlite3"

describe("Preview Test", () => {
  it(".clipのテーブル確認", () => {
    const path = "C:\\Users\\hide1\\FirebaseProjects\\IllustHub\\functions\\sample_asset\\illust3"
    const clipPath = path + ".clip"
    const clipBuffer = fs.readFileSync(clipPath)
    console.log("clipBuffer : " + clipBuffer + "\n")

    const searchText: string = "SQLite format 3"
    const uint8Array = new Uint8Array(Buffer.from(searchText))
    console.log("SQLite format 3 as : " + uint8Array.join('') + "\n")

    const findIndex = clipBuffer.indexOf(uint8Array)
    console.log("findIndex : " + findIndex + "\n")

    const resultBuf = clipBuffer.slice(findIndex, clipBuffer.length)
    console.log("resultBuf : " + resultBuf + "\n")

    const dbPath = path + ".sqlite"
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
          const binaryPath = path + ".png"
          fs.writeFileSync(binaryPath, row[0].ImageData)
        }
      })
      
      db.close()
    })
  })
})

