import { FormHTMLAttributes, ReactElement, useState, FormEventHandler, Children, cloneElement } from 'react';
import Schema, { Rule } from 'async-validator';

// async-validator对每一个rule的校验结果
interface ValidateError<P> {
  field: P;
  message: string;
}

// DFormItem的props
export interface DFormItemProps<P> {
  name?: P /******************************/; // initialValues中的字段名
  value?: any /***************************/; // 字段值
  error?: boolean /***********************/; // 是否发生错误 (来自 DForm 统一注入)
  helperText?: string /*******************/; // 发生错误后的错误提示 (来自 DForm 统一注入)
  getValueFromEvent?: (e: any) => any /***/; // onChange时将 event 的值转换成字段值, 默认直接用Event参数
  onChange?: (value: any) => void /*******/; // onChange事件
}

// DForm的props
export interface DFormProps<T extends Object> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues: T /****************************************************************************/; // 表单初始值，注意这是一个非受控值
  rules?: Partial<Record<keyof T, Rule>> /******************************************************/; // 表单规则，参数可见 async-validator
  children: ReactElement<DFormItemProps<keyof T>> | ReactElement<DFormItemProps<keyof T>>[] /***/; // 自组件必须包含某些props，用于DForm拦截注入
  onSubmit?: (values: T) => any /***************************************************************/; // 表单提交方法
}

// 原本想简化DForm的类型体操，但DForm组件内部也需要用到范型，后续想到方案再做优化。
// type DFormType = <T extends Object>(props: DFormProps<T>) => ReactElement

const DForm = function <T extends Object>({ initialValues, rules, children, onSubmit, ...rest }: DFormProps<T>) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = async () => {
    if (!rules) {
      return true;
    }

    const validator = new Schema(rules as Record<keyof T, Rule>);
    try {
      await validator.validate(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (!err || !Array.isArray(err.errors)) {
        throw err;
      }

      setErrors(
        // async-validator 的结果转成 Record<name, 错误提示> 的键值对
        (err.errors as Array<ValidateError<keyof T>>).reduce<typeof errors>((result, error) => {
          result[error.field] = error.message;
          return result;
        }, {})
      );
      return false;
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid && onSubmit) {
      onSubmit(formData);
    } else {
      // TODOsomething error
    }
  };

  const childElms = Children.map(children, (child) => {
    if (!child.props || !child.props.name) return child;

    const { name, getValueFromEvent } = child.props;
    return cloneElement(child, {
      error: !!errors[name],
      helperText: errors[name],
      value: formData[name],
      onChange: (value: any) => {
        const newValue = getValueFromEvent ? getValueFromEvent(value) : value;
        setFormData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      },
    });
  });

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {childElms}
    </form>
  );
};

export default DForm;
