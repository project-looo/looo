import { Request } from '../js/framework7-custom';

function search({ query = '', page = 1, perPage = 50 }) {
  return Request.promise
    .json(
      'https://icy-river-06d0d9a03.azurestaticapps.net/api/search',
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
      `https://icy-river-06d0d9a03.azurestaticapps.net/api/get_details`,
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
