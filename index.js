const apiKey = "kSKFJRm1oQyKlvLhETSmThg6zQVDeYpGjcwJDoJd";
const searchURL="https://api.nps.gov/api/v1/parks";

function submitForm(){
    $('#parkForm').submit((e)=>{
      e.preventDefault();
      const userInput = $('#state-name-input').val();
      const numResults = $('#max-results-input').val();
      getParkResults(userInput, numResults);
    });
}

function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParkResults(query, maxResults=10){
  const params = {
      key: apiKey,
      stateCode: query,      
      maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString
    
  fetch(url)
    .then(response =>{
        if (response.ok){
            return response.json();
        }        
    })
    .then(response => renderParkResults(response.message))
    .catch(err =>alert(err));    
}

function renderParkResults(parkList){
    $('#results-list').html("");
    $('#results').text("Check your search result below:");
    parkList.forEach(item =>{$('#results-list').append(`<li><h3>${item.fullName}</h3>
    <p>${item.description}</p><img src=${item.url}</li>`)
    });
}

function init(){
    submitForm();
}

$(init);