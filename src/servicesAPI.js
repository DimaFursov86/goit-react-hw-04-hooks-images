function fetchImages(
  text,
  page = 1,
  per_page = 12,
  API_KEY = "23001140-4461295a2c2bf2ca42afdabe3"
) {
  return fetch(
    `https://pixabay.com/api/?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

const serviceAPI = { fetchImages };

export default serviceAPI;
