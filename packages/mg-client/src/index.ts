mg.showUI(__html__, {
  width: 375,
  height: 667,
})
mg.on('selectionchange', (e: any) => {
  console.log('💡', e)
})
