import { Suspense, lazy, useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Skeleton } from '@mui/material';
import { OP_TYPE, OP_TYPE_OPTIONS } from './const';

const Decrypt = lazy(() => import('./widgets/Decrypt'));
const Encrypt = lazy(() => import('./widgets/Encrypt'));

const Imagemask = function () {
  const [opType, setOpType] = useState(OP_TYPE.ENCRYPT);

  return (
    <div className="size-full">
      <RadioGroup row name="opType" value={opType} onChange={(e) => setOpType(e.target.value as OP_TYPE)}>
        {OP_TYPE_OPTIONS.map((op) => (
          <FormControlLabel key={op.value} value={op.value} control={<Radio />} label={op.label} />
        ))}
      </RadioGroup>
      <Suspense
        fallback={
          <>
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </>
        }>
        {opType === OP_TYPE.ENCRYPT ? <Encrypt /> : <Decrypt />}
      </Suspense>
    </div>
  );
};

export default Imagemask;
