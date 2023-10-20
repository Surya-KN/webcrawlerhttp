const { crawlPage} = require('./crawl.js')

async function main(){
    if(process.argv.length != 3) {
        console.log("invalid args")
        process.exit(1)
    }
    const baseurl = process.argv[2]
    console.log(`crawling ${baseurl}`)
    await crawlPage(baseurl)

}

main()