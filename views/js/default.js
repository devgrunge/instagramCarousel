let userAccessToken = 'USER_ACCESS_TOKEN_HERE';

/* if condition to render this script only in the needed pages */
if(location.pathname === '/pt/' || location.pathname === '/en/'){
const token = "TOKEN_HERE";
		
function refreshAccessToken() {
  const APP_ID = 'APP_ID_HERE';
  const APP_SECRET = 'APP_SECRE_HERE';

  // Get app access token
  fetch(`https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`)
    .then(response => response.json())
    .then(data => {
      const appAccessToken = data.access_token;

      // Get user access token
      fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${userAccessToken}`)
        .then(response => response.json())
        .then(data => {
          userAccessToken = data.access_token;
          const expirationTime = data.expires_in;

         /* console.log(`New access token: ${userAccessToken}`); */

          // Schedule next refresh
          setTimeout(refreshAccessToken, expirationTime * 1000);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}		
		
const instagramApi = () => {

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const posts = data.data.slice(0, 12);
      const carouselContainer = document.querySelector(".carousel-container");

      posts.forEach((post) => {
        const instaPost = document.createElement("div");
        instaPost.classList.add("instagram-post");
        instaPost.innerHTML = `
          <a href="${post.permalink}" target="_blank">
            <img src="${post.media_url}" alt="${post.caption}">
          </a>
        `;
        carouselContainer.appendChild(instaPost);
      });

      const prevBtn = document.querySelector(".prev-btn");
      const nextBtn = document.querySelector(".next-btn");

      prevBtn.addEventListener("click", () => {
        carouselContainer.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      });

      nextBtn.addEventListener("click", () => {
        carouselContainer.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      });
    })
    .catch((e) => console.error(e));
};
refreshAccessToken();
instagramApi();
	}
