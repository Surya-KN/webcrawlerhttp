const { JSDOM } = require('jsdom')

async function crawlPage(currenturl){
	let htmlobj = null
	let urllist = null
	try {
		htmlobj = await fetch(currenturl)
		if(htmlobj.status > 399){
			console.log(`error in fetch ${htmlobj.status} on ${currenturl}`)
			return
		}

		const type= htmlobj.headers.get("content-type")
		if(!type.includes("text/html")){
			console.log(`error in fetch ${type} on ${currenturl}`)
			return
		}
	}catch(err){
		console.log(`invalid error`)
	}
	urllist = getURLfromHTML(htmlobj, currenturl)
	// console.log(await htmlobj.text())
	console.log(urllist)
	const ans = []
	for (const c in urllist){
		console.log(`================`)
		console.log(c)
		console.log(normalizeUrl(c))
		ans.push(normalizeUrl(c))
		
	}
}

function getURLfromHTML(htmlBody,baseURL) {
	const url = []
	const dom = new JSDOM(htmlBody)
	const linkele = dom.window.document.querySelectorAll('a')
	// console.log(linkele)
	for(const l of linkele){
		console.log(l)
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
			console.log(urlObj)
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
