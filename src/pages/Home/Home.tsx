import { Typography } from '@mui/material';

const Home = function () {
  return (
    <div className="size-full">
      <Typography variant="h6">图片隐写术-简介</Typography>

      <Typography variant="subtitle1" gutterBottom>
        图片隐写术是一种信息隐藏技术，它的原理是在数字图像中嵌入隐藏信息，而这些信息对于肉眼来说是不可见的。
      </Typography>

      <Typography variant="h6">在该案例的实现思路</Typography>
      <Typography variant="subtitle1" gutterBottom>
        1.加密流程是将待隐藏消息的长度编码到图像的前32个像素中，然后将消息的每个字符的ASCII码转换为二进制数据，并逐位嵌入到图像像素数据的RGB通道的最低位中。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.而解密则会读取图像前32个像素，然后提取隐藏在图像中的二进制数据，并将其转换为原始消息。
      </Typography>

      <Typography variant="h6">应用场景</Typography>
      <Typography variant="subtitle1" gutterBottom>
        <div>1. 防伪验证</div>
        <div>2. 水印保护</div>
        <div>3. 数据标记</div>
      </Typography>
    </div>
  );
};

export default Home;
