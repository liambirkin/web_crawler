const printReport = (pages) => {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages){
      const url = sortedPage[0]
      const count = sortedPage[1]
      console.log(`Found ${count} internal links to ${url}`)
    }}

function sortPages(pages){
    // 2D array where the
    // inner array: [ url, count ]
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
      return pageB[1] - pageA[1]
    })
    return pagesArr
  }

module.exports = {
    printReport
}