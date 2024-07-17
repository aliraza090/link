const scrapeForm = document.getElementById('scrape-form');
const resultsDiv = document.getElementById('results');
const downloadBtn = document.getElementById('download-btn');
const showParagraphsBtn = document.getElementById('show-paragraphs-btn');
const showLinksBtn = document.getElementById('show-links-btn');
const showImagesBtn = document.getElementById('show-images-btn');
////////////////show paragraph Btn//////
showParagraphsBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    try {
        const results = await scrapeParagraph(url);
        displayResults(results);
    } catch (error) {
        console.error(error);
        displayError();
    }
});
//////end///////
///// Links btn//
showLinksBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    try {
        const results = await scrapeLinks(url);
        displayResults(results);
    } catch (error) {
        console.error(error);
        displayError();
    }
});
//////end///////
///////// images Btn/////////

showImagesBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    try {
        const results = await scrapeImages(url);
        displayResults(results);
    } catch (error) {
        console.error(error);
        displayError();
    }
});
//////end///////

/////////// scrape links functiom////////
async function scrapeLinks(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch page');
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        
        const links = Array.from(doc.querySelectorAll('a')).map((link) => link.href);
        
        // Prepare the results text with paragraphs separated by double newlines
        const results = `**Links:**\n\n${links.join('\n\n')}`;
        
        return results;
    } catch (error) {
        console.error('Error scraping website:', error);
        throw error; // Propagate the error for handling in the calling function
    }
}
/////// End//////
/////////// scrape  imagess functiom////////
async function scrapeImages(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch page');
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        
        const images = Array.from(doc.querySelectorAll('img')).map((img) => img.src);
        
        // Prepare the results text with paragraphs separated by double newlines
        const results = `**ImagesLinks:**\n\n${images.join('\n\n')}`;
        
        return results;
    } catch (error) {
        console.error('Error scraping website:', error);
        throw error; // Propagate the error for handling in the calling function
    }
}
/////// End//////
/////////// scrape paragraph functiom////////
async function scrapeParagraph(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch page');
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        
        const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent.trim());
        
        // Prepare the results text with paragraphs separated by double newlines
        const results = `**Paragraphs:**\n\n${paragraphs.join('\n\n')}`;
        
        return results;
    } catch (error) {
        console.error('Error scraping website:', error);
        throw error; // Propagate the error for handling in the calling function
    }
}
/////// End//////
/////////////////////////////////
function displayResults(results) {
    resultsDiv.innerHTML = results;
    
    downloadBtn.style.display = 'inline-block'; // Show download button
}

function displayError() {
    resultsDiv.innerText = 'Error scraping website';
    downloadBtn.style.display = 'none'; // Hide download button on error
}
////////////////////
/////// download BtN fuction//////
downloadBtn.addEventListener('click', () => {
    const results = resultsDiv.innerText;
    const websiteName = document.querySelector('h1').innerText.trim().replace(/\s+/g, '_');
    const filename = `${websiteName}_results.txt`;
    download(filename, results);
});



/////// download BtN fuction End//////


/////// Download Function//////
function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
//////download function End//////