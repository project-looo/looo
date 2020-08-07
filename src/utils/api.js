import { Request } from '../js/framework7-custom';

function search({ query = '', page = 1, perPage = 50 }) {
  return Request.promise
    .json(
      'https://jolly-water-0c2b6cd03.azurestaticapps.net/api/search?code=TLneObblWDykCfMhncqYOi6cM8n6T1x5DFaSVjanbK0jniF0paaarg==',
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
      `https://jolly-water-0c2b6cd03.azurestaticapps.net/api/get_details?code=RvIE/ID2tTyElO7GuSOQNGuxaCfLPmtmnFG5siiUM8pCPDOy/DG8og==`,
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
