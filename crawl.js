const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
  const currentURLObject = new URL(currentURL);
  const baseURLObject = new URL(baseURL);
  if(currentURLObject.hostname !== baseURLObject.hostname){
    return pages
  }

  const normalizedURL = normalizeURL(currentURL)
  
  if(pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }
  pages[normalizedURL] = 1
  console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
    } catch (err){
        console.log(err.message)
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    for (const nextURL of nextURLs){
      pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

const getURLsFromHTML = (html, baseURL) => {
    const urls = []
    const dom = new JSDOM(html)
    const links = dom.window.document.querySelectorAll('a')
    for (const link of links){
        if (link.href.slice(0,1) === '/'){
            try {
              urls.push(new URL(link.href, baseURL).href)
            } catch (err){
              console.log(`${err.message}: ${link.href}`)
            }
          } else {
            try {
              urls.push(new URL(link.href).href)
            } catch (err){
              console.log(`${err.message}: ${link.href}`)
            }
          }
    }
    return urls
}

const normalizeURL = url => {
    const URLObject = new URL(url);
    let normalizedURL = `${URLObject.host}${URLObject.pathname}`
    if (normalizedURL.length > 0 && normalizedURL.slice(-1) === '/'){
        normalizedURL = normalizedURL.slice(0, -1)
      }
    return normalizedURL
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }