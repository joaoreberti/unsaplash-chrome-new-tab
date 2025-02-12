// https://unsplash.com/documentation to get access key
const accessKey = "{YOUR_ACCESS_KEY}";

const imgElement = document.createElement("img");

imgElement.src = chrome.runtime.getURL("images/placeholder.png");

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    `https://api.unsplash.com/photos/random?topic=bo8jQKTaE0Y&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.urls && data.urls.regular) {
        imgElement.src = data.urls.regular;
        imgElement.alt = data.alt_description || "Random Unsplash Image";

        document.getElementById(
          "author"
        ).textContent = `Photo by ${data.user.name}`;
        document.getElementById("location").textContent =
          data.user.location || "Location not specified";
        document.getElementById("unsplash-link").href = data.links.html;
        document.getElementById("description").textContent =
          data.alt_description ||
          data.description ||
          "No description available";
      } else {
        console.error("Invalid Unsplash API response:", data);
        imgElement.src = chrome.runtime.getURL("images/error.png");
        imgElement.alt = "Error loading image";
      }
    })
    .catch((error) => {
      console.error("Error fetching Unsplash data:", error);
      imgElement.src = chrome.runtime.getURL("images/error.png");
      imgElement.alt = "Error loading image";
    });

  imgElement.onload = function () {
    this.classList.add("loaded");
  };

  document.body.appendChild(imgElement);
});
