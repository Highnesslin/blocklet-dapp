export const encodeMessage = function (imageFile: File, message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        // Encode message length
        const messageLength = message.length;
        for (let i = 0; i < 32; i++) {
          const bit = (messageLength >> (31 - i)) & 1;
          data[i] = (data[i]! & 0xfe) | bit;
        }

        // Encode message
        for (let i = 0; i < message.length; i++) {
          const charCode = message.charCodeAt(i);
          for (let j = 0; j < 8; j++) {
            const bit = (charCode >> (7 - j)) & 1;
            data[32 + i * 8 + j] = (data[32 + i * 8 + j]! & 0xfe) | bit;
          }
        }

        context.putImageData(imageData, 0, 0);

        const encodedImage = canvas.toDataURL();
        resolve(encodedImage);
      };
      image.onerror = reject;
      image.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};

export const decodeMessage = function (imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        // Decode message length
        let messageLength = 0;
        for (let i = 0; i < 32; i++) {
          messageLength = (messageLength << 1) | (data[i]! & 1);
        }

        // Decode message
        let message = '';
        for (let i = 0; i < messageLength; i++) {
          let charCode = 0;
          for (let j = 0; j < 8; j++) {
            charCode = (charCode << 1) | (data[32 + i * 8 + j]! & 1);
          }
          message += String.fromCharCode(charCode);
        }

        resolve(message);
      };
      image.onerror = reject;
      image.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};
