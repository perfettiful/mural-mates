import React from "react";

//Image Slicer component to chop off top half of image
const ImageSlicer = (props) => {
  console.log("props",props);
  
  let newImage=props.image;
  const divStyle = {
    width: '300px',
    height: '20px',
    border: '2px solid #333',
    align: 'bottom',
    backgroundColor: "yellow",
    backgroundImage: 'url(' + newImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "0 100%"
  }

  return <div style={divStyle}></div>
}

export default ImageSlicer;
