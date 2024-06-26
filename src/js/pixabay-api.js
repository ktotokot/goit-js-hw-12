export function getImages(imageName) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44349742-ecc8a7b60aea5585f0c207813',
    q: imageName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;

  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}