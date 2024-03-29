const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//Show new Quote
function newQuote(){
    loading();
    //Pick a rand quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace w 'Unknown'
    if(!quote.author){
        author.textContent = "Unknown";
    } else{
        authorText.textContent= quote.author;
    }
    //check quote length to determine styling

    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent= quote.text;
    complete();
}
//Get Quotes from API
async function getQuotes() {
    loading();
    //There is an alternative option for this project that does not require an API key - https://zenquotes.io/
    const apiUrl= 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response =await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        // Catch Error 
    }
}

//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=
    ${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();