const { JSDOM } = require('jsdom')

function getURLfromHTML(htmlBody,baseURL) {
	const url = []
	const dom = new JSDOM(htmlBody)
	const linkele = dom.window.document.querySelectorAll('a')
	// console.log(linkele.)
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
  getURLfromHTML
}
