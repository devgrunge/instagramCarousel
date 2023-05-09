const instagramApi = () => {
  const token = "YOUR_TOKEN_HERE";
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

instagramApi();
