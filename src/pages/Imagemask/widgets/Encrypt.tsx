import { useState } from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DForm from '@/components/DForm/DForm';
import DUpload from '@/components/DUpload/DUpload';
import DTextField from '@/components/DTextField/DTextField';
import { encodeMessage } from '@/libs/imageColorMask';
import { download } from '@/libs/utils';

interface FormValue {
  image: string;
  text: string;
}
const Encrypt = function () {
  const [preview, setPreview] = useState('');

  const onSubmit = async (value: FormValue) => {
    const file = await fetch(value.image)
      .then((response) => response.blob())
      .then((blob) => new File([blob], 'fileName', { type: blob.type }));

    const url = await encodeMessage(file, value.text);

    return setPreview(url);
  };

  return (
    <DForm
      initialValues={{
        image: '',
        text: '',
      }}
      rules={{
        image: {
          required: true,
          message: '图片不能为空',
        },
        text: {
          required: true,
          message: '要加密的内容不能为空',
        },
      }}
      onSubmit={onSubmit}>
      <DUpload className="w-full h-20" name="image" />

      <DTextField label="密文(暂不支持中文)" name="text" multiline />

      <Button fullWidth variant="contained" type="submit">
        加密
      </Button>

      <div className="mt-4">
        {preview && (
          <div onClick={() => download(preview)}>
            <DownloadIcon />
            <span>加密成功，点击下载</span>
          </div>
        )}
      </div>
    </DForm>
  );
};

export default Encrypt;
