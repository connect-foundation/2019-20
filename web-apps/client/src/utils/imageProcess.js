const dataURItoFile = (dataURI, fileName) => {
  const arr = dataURI.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n > 0) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, {type: mime});
};

const getResizedImageInDataURI = (image, rate, type) => {
  const canvas = document.createElement('canvas');
  const width = image.width * rate;
  const height = image.height * rate;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL(type);
};

const makeImageObjectByURI = (uri) => {
  const image = new Image();
  image.src = uri;
  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
};

const readFileAsURI = async (file) => {
  const {name, type} = file;
  const reader = new FileReader();

  await reader.readAsDataURL(file);

  return new Promise((resolve) => {
    reader.onload = (event) => {
      const dataURI = event.target.result;
      resolve({dataURI, type, name});
    };
  });
};

export {
  dataURItoFile,
  getResizedImageInDataURI,
  makeImageObjectByURI,
  readFileAsURI,
};
