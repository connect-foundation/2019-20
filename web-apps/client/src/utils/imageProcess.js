const dataURItoFile = (dataURI, fileName) => {
  const arr = dataURI.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, {type: mime});
};

const getResizedImageInDataURI = (
  image,
  max_Width,
  max_Height,
  quality,
  type,
) => {
  const canvas = document.createElement('canvas');

  let width = image.width;
  let height = image.height;

  if (width > height) {
    if (width > max_Width) {
      height = Math.round((height * max_Width) / width);
      width = max_Width;
    }
  } else {
    if (height > max_Height) {
      width = Math.round((width * max_Height) / height);
      height = max_Height;
    }
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL(type, quality);
};

const makeImageByURI = (uri, type) => {
  const image = new Image();
  image.src = uri;
  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
};

const readFileAsURI = async (file) => {
  const name = file.name;
  const type = file.type;
  const reader = new FileReader();

  await reader.readAsDataURL(file);

  return new Promise((resolve) => {
    reader.onload = (event) => {
      const dataURI = event.target.result;
      resolve({dataURI, type, name});
    };
  });
};

export {dataURItoFile, getResizedImageInDataURI, makeImageByURI, readFileAsURI};
