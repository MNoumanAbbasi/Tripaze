import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';

// class Thumb extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) {
//       return;
//     }

//     this.setState({ loading: true }, () => {
//       let reader = new FileReader();

//       reader.onloadend = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };

//       reader.readAsDataURL(nextProps.file);
//     });
//   }

//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;

//     if (!file) {
//       return null;
//     }

//     if (loading) {
//       return <p>loading...</p>;
//     }

//     return (
//       <img
//         src={thumb}
//         alt={file.name}
//         className="img-thumbnail mt-2"
//         height={200}
//         width={200}
//       />
//     );
//   }
// }
const ImageThumb = ({ image, handleImgNameChange }) => {
  const [progress, setProgress] = useState(0);
  let isUploaded = progress === 100;

  // useEffect is called on first time render to upload file
  useEffect(() => {
    // Uploading file
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
        handleImgNameChange(image.name);
        isUploaded = true;
      }
    );
  }, []);

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
  console.log('img name', image)
  return (
    <div className="image-thumb border" style={{ width: "200px" }}>
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
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
};

const ImageSection = (props) => {
  const [image, setImage] = useState(props.imageName);
  const [isFileChosen, setIsFileChosen] = useState(false);

  const handleFileChoosing = (e) => {
    setImage(e.currentTarget.files[0]);
    setIsFileChosen(true);
  };

  if (!isFileChosen) {
    return (
      <div>
        <input type="file" onChange={handleFileChoosing} />
      </div>
    );
  } else {
    return (
      <div>
        <ImageThumb
          image={image}
          handleImgNameChange={props.handleImgNameChange}
        />
      </div>
    );
  }
};
export default ImageSection;
