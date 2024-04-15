import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/HighlightOff';
import cls from 'classnames';
import { DFormItemProps } from '../DForm/DForm';

interface DUploadProps extends DFormItemProps<string> {
  className?: string;
}

const DUpload: FC<DUploadProps> = function ({ className, value, onChange, error, helperText }) {
  const [preview, setPreview] = useState('');
  useEffect(() => {
    setPreview(value || '');
  }, [value, setPreview]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { files } }) => {
    if (!files || !files.length) return;

    const val = URL.createObjectURL(files[0]!);
    setPreview(val);
    if (onChange) {
      onChange(val);
    }
  };

  const clearFile = () => {
    setPreview('');
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className="relative">
      {preview ? (
        <div className="relative">
          <img className={className} alt="预览图片" src={preview} />
          <CloseIcon className="absolute top-0 right-0 cursor-pointer text-white" onClick={clearFile} />
        </div>
      ) : (
        <Button
          className={cls('block', className)}
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUpload />}>
          上传
          <input
            className="absolute bottom-0 left-0 whitespace-nowrap overflow-hidden"
            style={{ width: 1, height: 1 }}
            type="file"
            onChange={handleChange}
          />
        </Button>
      )}
      {/* 错误提示 */}
      <div className="form-item-error">{error ? helperText : null}</div>
    </div>
  );
};

export default DUpload;
