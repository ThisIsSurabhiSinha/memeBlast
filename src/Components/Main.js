import React, { useEffect, useState, useRef } from "react";
import dummy_img from "../images/dummy-img.png";

export default function Main() {
  const [memeInfo, setMemeInfo] = useState({
    imageUrl: dummy_img,
    top_text: "",
    bottom_text: ""
  });

  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    textColor: "#000000" 
  });

  const [memesArray, setMemesArray] = useState([]);
  const canvasRef = useRef(null); 

  useEffect(() => {
    const fetchMemesData = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setMemesArray(data.data.memes);
      } catch (error) {
        console.error("Error fetching meme data:", error);
      }
    };

    fetchMemesData();

    return () => {}; // cleanup function
  }, []);

  function getMemeImage() {
    if (memesArray.length > 0) {
      const randomNumber = Math.floor(Math.random() * memesArray.length);
      const randomMeme = memesArray[randomNumber];

      setMemeInfo((prevMemeInfo) => ({
        ...prevMemeInfo,
        imageUrl: randomMeme.url,
        top_text: formData.topText,
        bottom_text: formData.bottomText
      }));
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMemeInfo((prevMemeInfo) => ({
      ...prevMemeInfo,
      top_text: formData.topText,
      bottom_text: formData.bottomText
    }));
  }

  // Function to download the meme as an image
  function downloadMeme() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = memeInfo.imageUrl;
    image.crossOrigin = "anonymous"; 

    image.onload = () => {
     
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set canvas size to match image size
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = formData.textColor;
      ctx.font = "30px Impact";
      ctx.textAlign = "center";

      ctx.fillText(formData.topText, canvas.width / 2, 40);

      ctx.fillText(formData.bottomText, canvas.width / 2, canvas.height - 20);

      // Download the image
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "meme.png"; 
      a.click();
    };
  }

  return (
    <div className="container-fluid my-5 col-6">
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="topText" className="form-label h5">
              What's the punchline?
            </label>
            <input
              type="text"
              className="form-control"
              id="topText"
              name="topText"
              value={formData.topText}
              onChange={handleInputChange}
              placeholder="Enter top text"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="bottomText" className="form-label h5">
              Drop the mic!
            </label>
            <input
              type="text"
              className="form-control"
              id="bottomText"
              name="bottomText"
              value={formData.bottomText}
              onChange={handleInputChange}
              placeholder="Enter bottom text"
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="textColor" className="form-label">
              Choose text color
            </label>
            <input
              type="color"
              className="form-control"
              id="textColor"
              name="textColor"
              value={formData.textColor}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="card col-12 mb-3 meme-card">
          <img
            src={memeInfo.imageUrl}
            className="card-img-top meme-image"
            alt="Meme"
          />
          <p className="meme-text top-text" style={{ color: formData.textColor }}>
            {formData.topText}
          </p>
          <p className="meme-text bottom-text" style={{ color: formData.textColor }}>
            {formData.bottomText}
          </p>
        </div>

        <button
  type="button"
  onClick={getMemeImage}
  className="btn mx-auto w-100 mb-2"
  style={{ backgroundColor: "blueviolet" ,color:"white"}}
>
  Generate Meme
</button>

        <button
          type="button"
          onClick={downloadMeme}
          className="btn  mx-auto w-100  mb-1"
          style={{ backgroundColor: "blueviolet" ,color:"white"}}
        >
          Download Meme
        </button>
      </form>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}


