import { Button } from "bootstrap";

import React, { useState } from "react";
import { Form } from "react-bootstrap";

const {
  REACT_APP_IMAGGA_API_KEY,
  REACT_APP_IMAGGA_API_SECRET,
  REACT_APP_IMAGGA_AUTH,
  REACT_APP_IMAGGA_API,
} = process.env;

const getTagsFromUrl = (imageUrl) => {
  return (
    `${REACT_APP_IMAGGA_API}/v2/tags?image_url=` + encodeURIComponent(imageUrl)
  );
};

function MainForm({ setTags }) {
  const [img_url, setImg_url] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    preview: "",
    formData: null,
  });

  const { preview, formData } = uploadedImg;

  const handleImgUrl = (e) => {
    setImg_url(e.target.value);
  };

  const getTagsByUrl = async (e) => {
    e.preventDefault();
    try {
      const url = getTagsFromUrl(img_url);

      const res = await fetch(url, {
        headers: {
          apiKey: REACT_APP_IMAGGA_API_KEY,
          apiSecret: REACT_APP_IMAGGA_API_SECRET,
          Authorization: `Basic ${REACT_APP_IMAGGA_AUTH}`,
        },
      });

      console.log(res.body);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = (e) => {
    const previewUrl = URL.createObjectURL(e.target.files[0]);

    const form = new FormData();
    form.append("image", e.target.files[0]);

    setUploadedImg({ preview: previewUrl, formData: form });
  };

  const getTagsByUpload = async (e) => {
    e.preventDefault();
    try {
      const url = `${REACT_APP_IMAGGA_API}/v2/uploads`;
      const res = await fetch(url, {
        headers: {
          apiKey: REACT_APP_IMAGGA_API_KEY,
          apiSecret: REACT_APP_IMAGGA_API_SECRET,
          Authorization: `Basic ${REACT_APP_IMAGGA_AUTH}`,
        },
        method: "post",
        body: formData,
      });
      const data = await res.json();

      const img_id = data?.result?.upload_id;

      if (img_id) {
        const response = await fetch(
          `${REACT_APP_IMAGGA_API}/v2/tags?image_upload_id=${img_id}`,
          {
            headers: {
              apiKey: REACT_APP_IMAGGA_API_KEY,
              apiSecret: REACT_APP_IMAGGA_API_SECRET,
              Authorization: `Basic ${REACT_APP_IMAGGA_AUTH}`,
            },
          }
        );
        const data = await response.json();

        setTags(data.result.tags || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3" controlId="img_url">
        <div className="d-flex">
          <div>
            <Form.Label>Enter image url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image url"
              onChange={handleImgUrl}
            />
          </div>
          <div
            className="d-flex align-items-end"
            style={{ marginLeft: "16px" }}
          >
            <button className="btn btn-primary" onClick={getTagsByUrl}>
              Get tags
            </button>
          </div>
        </div>
        <div className="d-flex align-items-end">
          <div>
            <Form.Label>Upload image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Image file"
              onChange={handlePreview}
            />
          </div>
          <button
            className="btn btn-dark"
            style={{ marginLeft: "16px" }}
            onClick={getTagsByUpload}
          >
            Get tags
          </button>
        </div>

        {preview && (
          <div style={{ marginTop: "16px" }}>
            <img src={preview} style={{ width: "360px", objectFit: "cover" }} />
          </div>
        )}
      </Form.Group>
    </Form>
  );
}

export default MainForm;
