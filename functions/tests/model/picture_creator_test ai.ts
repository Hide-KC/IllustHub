import {describe, it} from "mocha"
// import * as fs from "fs"
import * as path from "path"

describe("Preview Test", () => {
  it(".aiのPreview出力", async () => {
    const baseName = path.join(path.resolve('sample_files'), 'meishi_yoko')
    console.log("baseName : " + baseName + "\n")
    const aiPath = baseName + ".ai"
    const resPath = baseName + ".png"
    // const buffer = fs.readFileSync(aiPath)
    // const binary = Buffer.from(buffer)


    const gm = require('gm').subClass({imageMagick: true});

    gm(aiPath)
      .write(resPath, (err: any) => {
        if (err) console.log(err)
      })
    
    
    
    
    // const converted = (args: any): any => {
    //   new Promise<{err: Error, result: any}>((resolve) => 
    //     magick.convert(args, (err, result) => {
    //       resolve({err, result})
    //     }))
    //   }

    // const res = await converted(buffer)
        
    // if (res.err) {
    //   console.log(res.err)
    // } else {
    //   console.log(res.result)
    // }
    // fs.writeFileSync(path.join(baseName, ".png"), res)
  })
})

