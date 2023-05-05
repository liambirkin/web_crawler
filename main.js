const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main(){
    if (process.argv.length < 3){
        console.log('no website provided')
        return
    }
    if (process.argv.length > 3){
        console.log('too many arguments provided')
        return
    }
    const baseURL = process.argv[2]
    console.log(`Starting crawl at ${baseURL}`)
    pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)
}

main()