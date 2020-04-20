import React, { Component } from 'react';
import storage from 'firebase';
class ImageUpload extends Component {
  construct(props) {
    //super(props);
    this.state = {};
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleUpload = this.handleUpload;
  }
  handleChangeImage = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
  handleUpload = () => {
    const { image } = this.state;
    var imgName = image.name;
    const uploadTask = storage.ref('images/pic').put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {}, //Progress
      (error) => {
        //Error function
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(imgName)
          .getDownloadUrl()
          .then((url) => {
            console.log(url);
          });
      } //Complete
    );
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChangeImage} />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default ImageUpload;
