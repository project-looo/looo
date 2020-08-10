import { Request } from '../js/framework7-custom';

function search({ query = '', page = 1, perPage = 50 }) {
  return Request.promise
    .json(
      // 'https://jolly-water-0c2b6cd03.azurestaticapps.net/api/search',
      'http://localhost:7071/api/search',
      { query, page, perPage },
    )
    .then(({ data }) => {
      return data;
    })
    .catch(({ message }) => {
      return Promise.reject(message);
    });
}

function getCompanyDetails(id) {
  return Request.promise
    .json(
      // `https://jolly-water-0c2b6cd03.azurestaticapps.net/api/get_details`,
      `http://localhost:7071/api/get_details`,
      { id },
    )
    .then(({ data }) => {
      return data;
    })
    .catch(({ message }) => {
      return Promise.reject(message);
    });
}

export { search, getCompanyDetails };
