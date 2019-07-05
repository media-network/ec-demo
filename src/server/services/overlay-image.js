import gm from 'gm'
import promise from 'bluebird'

const imageMagick = gm.subClass({ imageMagick: true })

promise.promisifyAll(gm.prototype)

const overlay = async (filePath, watermarkPath, onputFilePath, gravity) => {
  await imageMagick(filePath)
    .autoOrient()
    // .resize(600, 800)
    .gravity(gravity)
    .draw("image Over 10,10 200,200 "+`'${ watermarkPath }'`)
    .writeAsync(onputFilePath)

  // await gm('./input.png')
  //   .autoOrient()
  //   .resize(600, 800)
  //   .draw("image Over 50,30 100, 30 './logo.png'")
  //   .writeAsync('./output.png')
}

export default overlay
