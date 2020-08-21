import { Request } from '../js/framework7-custom';

let apiUrl = process.env.API_URL

function search({ query = '', page = 1, perPage = 50 }) {
  return Request.promise
    .json(
      apiUrl + '/search',
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
      apiUrl + `/get_details`,
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
