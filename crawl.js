function normalizeUrl(urlString){
	const urlObject = new URL(urlString)
	const hostpath = `${urlObject.hostname}${urlObject.pathname}`
	// hostpath = hostpath.toLowerCase
	console.log(hostpath.toLocaleLowerCase)
	if(hostpath.slice(-1) === '/') return hostpath.slice(0,-1)
	return hostpath
}


module.exports = {  
  normalizeUrl
}
