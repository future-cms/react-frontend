const siteConfig = require('../.config');
const config = siteConfig.default();
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

const initialState = {
  currentPage: {rows:[],meta:{}}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      };

    default:
      return state;
  }
};

export const getCurrentPage = path => dispatch => {
  let fetchPath = config.fetchFrom[config.env].replace('{PATH}',path);
  fetch(fetchPath)
    .then(res => res.json())
    .then(
      result => {
        dispatch({
          type: SET_CURRENT_PAGE,
          page: result
        });
      },
      error => {
        dispatch({
          type: SET_CURRENT_PAGE,
          page: error
        });
        console.log("Message : " + error.message);
      }
    );
}


export const removeCurrentPage = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: SET_CURRENT_PAGE,
      page: {
        rows:[],
        meta:{
          title:null,
          description:null,
          image:null,
          contentType:null,
          twitter:null,
          facebookAppId:null,
          noCrawl:null,
          published:null,
          updated:null,
          category:null,
          tags:null
        }
      }
    });
    resolve({rows:[],meta:{}});
  });
