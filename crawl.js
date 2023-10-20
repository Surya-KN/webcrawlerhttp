const { JSDOM } = require('jsdom')

async function crawlPage(baseurl, currenturl, page){

	const baseurlobj = new URL(baseurl)
	const currenturlobj = new URL(currenturl)

	if(baseurlobj.hostname !== currenturlobj.hostname) {
		return page
	}
   
	const normalizedcurrenturl = normalizeUrl(currenturl)


	if(page[normalizedcurrenturl] > 0){
		page[normalizedcurrenturl]++
		return page
	}

	page[normalizedcurrenturl] = 1

	console.log(`crawling ${currenturl}`)
  let htmlbody = ''
	try {
		const htmlobj = await fetch(currenturl)
		if(htmlobj.status > 399){
			console.log(`error in fetch ${htmlobj.status} on ${currenturl}`)
			return page
		}

		const type= htmlobj.headers.get("content-type")
		if(!type.includes("text/html")){
			console.log(`error in fetch ${type} on ${currenturl}`)
			return page
		}
		htmlbody = await htmlobj.text()
		

	}catch(err){
		console.log(`invalid error`)
	}
	const urllist = getURLfromHTML(htmlbody, baseurl)
		for(const next of urllist){
			page = await crawlPage(baseurl, next, page)
		}
	return page
}

function getURLfromHTML(htmlBody,baseURL) {
	const url = []
	const dom = new JSDOM(htmlBody)
	const linkele = dom.window.document.querySelectorAll('a')
	for(const l of linkele){
		if(l.href.slice(0,1) === '/'){
			try{
			const urlObj = new URL(`${baseURL}${l.href}`)
			url.push(urlObj.href)
			}catch(err){
				console.log("invalid")
			}
		}else{
			try{
			const urlObj = new URL(l.href)
			url.push(urlObj.href)
			}catch(err){
					console.log("invalid")
			}
		}
	}
	return url
}


function normalizeUrl(urlString){
	const urlObject = new URL(urlString)
	const hostpath = `${urlObject.hostname}${urlObject.pathname}`
	// hostpath = hostpath.toLowerCase
	// console.log(hostpath.toLocaleLowerCase)
	if(hostpath.slice(-1) === '/') return hostpath.slice(0,-1)
	return hostpath
}


module.exports = {  
  normalizeUrl,
  getURLfromHTML,
  crawlPage
}
