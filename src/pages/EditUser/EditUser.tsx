import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DForm from '@/components/DForm/DForm';
import DTextField from '@/components/DTextField/DTextField';
import { useSessionContext } from '@/libs/session';
import { useUser } from '@/libs/user';

const EditUser = function () {
  const { session, api } = useSessionContext();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/', {
      replace: true,
    });
  };

  const onSubmit = async (values: Pick<typeof session.user, 'fullName' | 'email' | 'phone'>) => {
    const { data } = await api.post('/api/editUser', {
      did: user!.did,
      ...values,
    });

    if (data) {
      setUser({
        did: data.data.did,
        fullName: data.data.fullName,
        avatar: session.user.avatar,
        phone: data.data.phone,
        email: data.data.email,
      });
      // TODO: 4. 优化提示样式
      alert('保存成功');
      onBack();
    }
  };

  return (
    <DForm
      initialValues={{
        fullName: user!.fullName,
        email: user!.email,
        phone: user!.phone,
      }}
      rules={{
        fullName: {
          required: true,
          message: '姓名不能为空',
        },
        email: {
          required: true,
          message: '邮箱不能为空',
        },
      }}
      onSubmit={onSubmit}>
      <DTextField label="姓名" name="fullName" />
      <DTextField label="邮箱" name="email" />
      <DTextField label="手机号" name="phone" />
      <Stack direction="row" spacing={2} mt={2}>
        <Button fullWidth variant="contained" type="submit">
          保存
        </Button>

        <Button fullWidth variant="outlined" onClick={onBack}>
          返回
        </Button>
      </Stack>
    </DForm>
  );
};

export default EditUser;
