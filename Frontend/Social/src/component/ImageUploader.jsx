import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { usePostContext } from "../Reducer/postReducer";
import { useNavigate } from "react-router-dom";

function ImageUploader() {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);
  const [caption, setCaption] = useState("");
  const id = localStorage.getItem("id");

  const { posted } = usePostContext();

  const navigate = useNavigate();

  const { createImagePost } = usePostContext();

  const handleImageChange = (event) => {
    const files = event.target.files;
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setImage((prevFiles) => [...prevFiles, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result);
        setPreview([...urls]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Caption", caption);
    image.forEach((img, i) => formData.append(`post`, img));
    createImagePost(formData, id);
    setCaption("");
    setPreview([]);
    setImage([]);

    if (posted) navigate("/");
  };

  return (
    <>
      <div className="w-full h-full bg-blak scrollbar-hover">
        <div className="w-[95%] mx-auto p-2">
          <form onSubmit={handleForm} encType="multipart/form-data">
            <div className="w-[90%] mx-auto">
              <input
                type="text"
                placeholder="Write Caption...."
                className="w-[100%] mx-auto p-2 rounded-xl bg-transparent border-2 my-2"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            {preview.length > 0 ? (
              <Carousel showStatus={false} showThumbs={false}>
                {preview.map((currElem) => {
                  return (
                    <div
                      className="w-[90%] h-[19em] mx-auto my-1"
                      key={currElem.id}
                    >
                      <img
                        src={currElem}
                        alt=""
                        className="
            h-[55vh] w-[90%] mx-auto object-contain"
                      />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="w-[90%] border-2 border-dashed border-blue-500 border-opacity-55 mx-auto rounded-xl h-[15em] flex items-center justify-center">
                <input
                  type="file"
                  className="hidden"
                  accept="image/"
                  id="upload"
                  multiple
                  onChange={handleImageChange}
                  required
                />
                <label className="bg-blue-500 p-2 rounded-xl" htmlFor="upload">
                  Select files
                </label>
              </div>
            )}
          </form>
        </div>

        <button
          className={`py-2 px-4 bg-blue-500 rounded-xl font-bold text-white float-right mx-6 ${
            preview.length > 0 ? "" : "hidden"
          }`}
          type="submit"
          onClick={handleForm}
        >
          Upload
        </button>
      </div>
    </>
  );
}

export default ImageUploader;
