// 操作类型
export enum OP_TYPE {
  ENCRYPT = '1',
  DECRYPT = '2',
}

export const OP_TYPE_TEXT = {
  [OP_TYPE.ENCRYPT]: '加密',
  [OP_TYPE.DECRYPT]: '解密',
};

export const OP_TYPE_OPTIONS = [
  {
    value: OP_TYPE.ENCRYPT,
    label: OP_TYPE_TEXT[OP_TYPE.ENCRYPT],
  },
  {
    value: OP_TYPE.DECRYPT,
    label: OP_TYPE_TEXT[OP_TYPE.DECRYPT],
  },
];
