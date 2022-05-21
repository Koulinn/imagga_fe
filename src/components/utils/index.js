const {
  REACT_APP_IMAGGA_API_KEY,
  REACT_APP_IMAGGA_API_SECRET,
  REACT_APP_IMAGGA_AUTH,
  REACT_APP_IMAGGA_API,
} = process.env;

export const getTagsFromUrl = (imageUrl) => {
  return (
    `${REACT_APP_IMAGGA_API}/v2/tags?image_url=` + encodeURIComponent(imageUrl)
  );
};

export const getTagsByID = (id) => {
  return `${REACT_APP_IMAGGA_API}/v2/tags?image_upload_id=${id}`;
};

export const URLs = {
  upload: `${REACT_APP_IMAGGA_API}/v2/uploads`,
  getTagsByID,
  getTagsFromUrl,
};

export const HEADERS = {
  apiKey: REACT_APP_IMAGGA_API_KEY,
  apiSecret: REACT_APP_IMAGGA_API_SECRET,
  Authorization: `Basic ${REACT_APP_IMAGGA_AUTH}`,
};

const utils = {
  HEADERS,
  URLs,
};

export default utils;
