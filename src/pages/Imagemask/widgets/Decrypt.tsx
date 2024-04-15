import { useState } from 'react';
import { Button } from '@mui/material';
import DForm from '@/components/DForm/DForm';
import DUpload from '@/components/DUpload/DUpload';
import { decodeMessage } from '@/libs/imageColorMask';
import DTextField from '@/components/DTextField/DTextField';

interface FormValue {
  image: string;
}
const Decrypt = function () {
  const [result, setResult] = useState('');

  const onSubmit = async (value: FormValue) => {
    const file = await fetch(value.image)
      .then((response) => response.blob())
      .then((blob) => new File([blob], 'fileName', { type: blob.type }));

    const msg = await decodeMessage(file);

    return setResult(msg);
  };

  return (
    <DForm
      initialValues={{
        image: '',
      }}
      rules={{
        image: {
          required: true,
          message: '图片不能为空',
        },
      }}
      onSubmit={onSubmit}>
      <DUpload className="w-full h-20" name="image" />

      <Button fullWidth variant="contained" type="submit">
        解密
      </Button>

      <div className="mt-4">{result && <DTextField label="解密成功" value={result} />}</div>
    </DForm>
  );
};

export default Decrypt;
