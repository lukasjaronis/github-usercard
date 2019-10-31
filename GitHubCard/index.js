/* Step 1: using axios, send a GET request to the following URL 
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// entry point
const entryPoint = document.querySelector(".cards");

function GitHubCard(object) { // passing in the object 

  const create = e => document.createElement(e);


  // setting up new elements
  let newCard = create('div');
  let cardImg = create('img');
  let cardInfo = create('div');
  let cardName = create('h3');
  let cardUserName = create('p');
  let cardUserLocation = create('p');
  let cardProfile = create('p');
  let cardProfileLink = create('a'); // append this to cardProfile
  let cardFollowers = create('p');
  let cardFollowings = create('p');
  let cardBio = create('p');


  // appending elements

  newCard.appendChild(cardImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUserName);
  cardInfo.appendChild(cardUserLocation);
  cardInfo.appendChild(cardProfile);
  cardProfile.appendChild(cardProfileLink);
  cardProfile.appendChild(cardFollowers);
  cardProfile.appendChild(cardFollowings);
  cardProfile.appendChild(cardBio);


  // setting up class elements

  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUserName.classList.add('username');

  // set text content

  cardImg.src = object.data.avatar_url;
  cardName.textContent = `${object.data.name}`;
  cardUserName.textContent = `Username: ${object.data.login}`;
  cardUserLocation.textContent = `Location: ${object.data.location}`;
  cardProfileLink.href = object.data.html_url;
  cardProfileLink.textContent = object.data.html_url;
  cardFollowers.textContent = `Followers: ${object.data.followers}`;
  cardFollowings.textContent = `Following: ${object.data.following}`;
  cardBio.textContent = `Bio: ${object.data.bio}`;


  return newCard;
}




axios
  .get("https://api.github.com/users/lukasjaronis")
  .then(response => {

    const newHandle = GitHubCard(response); // creating a new variable to later attach it to the entry point in HTML. GitHubCard(response): the response we get from git API pretty much attachs its objects to our function, connects it all as it goes down, and boom.
    entryPoint.appendChild(newHandle);


  });

axios
  .get("https://api.github.com/users/lukasjaronis/followers")
  .then(response => {
    response.data.forEach(element => { // so we get the response from my followers, then we itterate through every response, we get the elements (in this case the github url of the follower) and essentially run it like the above axios for only 1 user. So we're just getting the urls of the followers. 
      axios.get(element.url)
        .then(response => {
          //console.log(response);
          const newHandle = GitHubCard(response); // same with this one, but it uses the response of my followers.
          entryPoint.appendChild(newHandle);
        })
    })


  });



const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/