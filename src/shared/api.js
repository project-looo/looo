import { request } from '../js/framework7-custom';

function search({ query = '', page = 1, perPage = 50 }) {
  return request
    .json('https://looo.codersrank.io/api/search', { query, page, perPage })
    .then(({ data }) => {
      return data;
    })
    .catch(({ message }) => {
      return Promise.reject(message);
    });
}

function getCompanyDetails(id) {
  return request
    .json(`https://looo.codersrank.io/api/get_details`, { id })
    .then(({ data }) => {
      return data;
    })
    .catch(({ message }) => {
      return Promise.reject(message);
    });
}

export { search, getCompanyDetails };
