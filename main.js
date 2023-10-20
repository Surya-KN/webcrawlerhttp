const { crawlPage} = require('./crawl.js')

async function main(){
    if(process.argv.length != 3) {
        console.log("invalid args")
        process.exit(1)
    }
    const baseurl = process.argv[2]
    const pages = await crawlPage(baseurl,baseurl,{})
    
   for(const p of Object.entries(pages)){
    console.log(p)
   }
}

main()