import React, { Component } from 'react';
import storage from '../../config/fbConfig';
class ImageUpload extends Component {
  construct(props) {
    this.state = {};
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleUpload = this.handleUpload;
    this.progress = 0;
  }
  handleChangeImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
  showComplete = () => {
    if (this.progress == 100) return <div>Photo uploaded</div>;
  };
  handleUpload = (e) => {
    e.preventDefault();
    const { image } = this.state;
    var imgName = image.name;
    const uploadTask = storage.ref(`tripImages/${imgName}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, //Progress
      (error) => {
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
        // this.props.handleImgAdd(this.state.name);
      }
    );
  };
  handleDelete = (e) => {
    e.preventDefault();
    const { image } = this.state;
    var imgName = image.name;
    var deleteRef = storage.ref(`tripImages/${imgName}`);
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
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChangeImage} />
        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.handleDelete}>Delete uploaded photo</button>
      </div>
    );
  }
}

export default ImageUpload;
