import { Button } from "bootstrap";

import React, { useState } from "react";
import { Form } from "react-bootstrap";

import utils from "../utils/index";

const {
  HEADERS,
  URLs: { getTagsFromUrl, upload, getTagsByID },
} = utils;

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
          ...HEADERS,
        },
      });

      const data = await res.json();
      setTags(data?.result?.tags || []);
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
      const res = await fetch(upload, {
        headers: {
          ...HEADERS,
        },
        method: "post",
        body: formData,
      });
      const data = await res.json();

      const img_id = data?.result?.upload_id;

      if (img_id) {
        const response = await fetch(getTagsByID(img_id), {
          headers: {
            ...HEADERS,
          },
        });
        const data = await response.json();

        setTags(data?.result?.tags || []);
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
        {img_url && (
          <div style={{ marginTop: "16px" }}>
            <img src={img_url} style={{ width: "360px", objectFit: "cover" }} />
          </div>
        )}
        <div className="d-flex align-items-end mt-5">
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
