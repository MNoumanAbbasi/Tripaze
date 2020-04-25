import React, { useState } from 'react';
import storage from '../../config/fbConfig';

const ImageUpload = (props) => {
  const [image, setImage] = useState(props.imageName);
  const [progress, setProgress] = useState(0);

  const handleChangeImage = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    // image =
    // if (e.target.files[0]) {
    //   const image = e.target.files[0];
    //   this.setState(() => ({ image }));
    // }
  };
  const showComplete = () => {
    if (progress === 100) return <div>Photo uploaded</div>;
  };
  const handleUpload = (e) => {
    console.log(image);
    const uploadTask = storage.ref(`tripImages/${image.name}`).put(image);
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
      }
    );
  };
  const handleDelete = (e) => {
    const deleteRef = storage.ref(`tripImages/${image.name}`);
    // Delete the file
    deleteRef
      .delete()
      .then(function () {
        // File deleted successfully
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.currentTarget.files[0])} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <button type="button" onClick={handleDelete}>
        Remove
      </button>

    </div>
  );
};

export default ImageUpload;
