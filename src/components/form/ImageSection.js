import React, { useState } from 'react';
import storage from '../../config/fbConfig';

let date = new Date();
let fileName = date.getTime().toString() + '.jpg';

const ImageThumb = ({ image }) => {
  return (
    <div className="image-thumb border">
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
  const [isUploaded, setIsUploaded] = useState(false);
  const folderName = props.imageCategory + 'Images/';

  const handleUpload = (e) => {
    setIsFileChosen(true);
    const image = e.currentTarget.files[0];
    setImage(image);

    // Uploading file
    const uploadTask = storage.ref(`${folderName + fileName}`).put(image);
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
            console.log(error.code);
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log(error.code);
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log(error.code);
            break;
          default:
            console.log(error.code);
            break;
        }
      },
      () => {
        // Handle Successful Upload
        console.log('Successfull upload of image', image.name);
        props.handleImgNameChange(fileName);
        setIsUploaded(true);
      }
    );
  };

  const handleDelete = () => {
    setImage('');
    setIsFileChosen(false);
    const deleteRef = storage.ref(`${folderName + image.name}`);
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
        <label class="btn form-rounded r-green-button">
          Upload{' '}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          ></input>
        </label>
        <br />
        <em>A default image will be assigned if you don't assign your own.</em>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="">
          <ImageThumb image={image} />
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            >
              {isUploaded ? 'Uploaded' : `${progress}%`}
            </div>
          </div>
        </div>
        <div style={{ width: '200px' }}>
          {isUploaded && (
            <button
              className="btn btn-sm btn-circle ml-3 mt-0 bg-white border-danger"
              type="button"
              onClick={handleDelete}
            >
              <i class="fa fa-times text-danger"></i>
            </button>
          )}
        </div>
      </div>
    );
  }
};
export default ImageSection;
