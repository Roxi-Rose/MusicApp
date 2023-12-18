const apiKey = 'bd5a55bc2014f64597ce1ebf890c71af';
const musicDiv = document.getElementById('music');
const searchButton = document.getElementById('button');
const artistInput = document.getElementById('artistInput');
const postClickButton = document.getElementById("send")

function searchArtist() {
    let searchTerm = artistInput.value;
    if (searchTerm.trim() !== '') {
        const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(searchTerm)}&api_key=bd5a55bc2014f64597ce1ebf890c71af&format=json`;

      


fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        musicDiv.innerHTML = '';
        const albums = data.results.albummatches.album;

        if (albums.length > 0) {
            for (let i = 0; i < albums.length; i++) {
                const album = albums[i];

                // Create elements for album details
                const albumContainer = document.createElement('div');//acting as a wrapper for the following child elements
                const albumName = document.createElement('h2');
                const artistName = document.createElement('p');
                const albumImage = document.createElement('img');
                const albumLink = document.createElement('a'); 
                
            
                // Set attr. n anchor for the link
                albumLink.href = album.url;
                albumLink.target = '_blank'; //dis opens link of a song in new tab

        
                albumName.textContent = album.name;
                artistName.textContent = `Artist: ${album.artist}`;
                albumImage.src = album.image[2]['#text'];
                
        
                  albumContainer.classList.add('album-container');
                  albumLink.classList.add('albumLink');
                  albumName.classList.add('album-name');
                  artistName.classList.add('artist-name');
                  albumImage.classList.add('album-image');
                 

            
                albumLink.appendChild(albumName);
                albumContainer.appendChild(albumLink);
                albumContainer.appendChild(artistName);
                albumContainer.appendChild(albumImage);
                

                // Append container to musicDiv
                musicDiv.appendChild(albumContainer);
            }
   
        }})
        .catch (error => console.log(error))
        } else {
        musicDiv.innerHTML = '<em>Please enter an album name!!!.</em>';
        
    }

}
searchButton.addEventListener('click', searchArtist);


function postButton() {

    event.preventDefault();
    
     // Values from input fields
    const NInput = document.getElementById("username").value;
    const MInput = document.getElementById("message").value;
    
   
    fetch('https://6555594d84b36e3a431db80b.mockapi.io/lastFM', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
                 "name": NInput,
                 "message": MInput,
              }),
    
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    }

postClickButton.addEventListener('click', postButton);
    