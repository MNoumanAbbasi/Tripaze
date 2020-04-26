import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';

const ImageThumb = ({ image }) => {
  return (
    <div className="image-thumb border" style={{ width: '200px' }}>
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    </div>
  );
};

const ImageSection = (props) => {
  const [image, setImage] = useState(props.imageName);
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [progress, setProgress] = useState(0);
  let isUploaded = progress === 100;

  const handleUpload = (e) => {
    setIsFileChosen(true);
    setImage(e.currentTarget.files[0]);
    console.log('image', image);

    // Uploading file
    const uploadTask = storage
      .ref(`tripImages/${e.currentTarget.files[0].name}`)
      .put(e.currentTarget.files[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle Progress (store as int)
        setProgress(
          parseInt((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
        );
      },
      (error) => {
        // Handle Errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Handle Successful Upload
        console.log('Successfull upload of image');
        props.handleImgNameChange(image.name);
        isUploaded = true;
      }
    );
  };

  const handleDelete = () => {
    setImage('');
    setIsFileChosen(false);
    const deleteRef = storage.ref(`tripImages/${image.name}`);
    // Delete the file
    deleteRef
      .delete()
      .then(function () {
        // File deleted successfully
        console.log('Successfull deletion of image');
        props.handleImgNameChange('');
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  };

  if (!isFileChosen) {
    return (
      <div>
        <em>A default image will be assigned if you don't assign your own.</em>
        <br />
        <input type="file" onChange={(e) => handleUpload(e)} />
      </div>
    );
  } else {
    return (
      <div className="border" style={{width: "200px"}}>
        <ImageThumb image={image} />
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        {isUploaded && (
          <button type="button" onClick={handleDelete}>
            Remove
          </button>
        )}
      </div>
    );
  }
};
export default ImageSection;
