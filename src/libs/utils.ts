export const download = (url: string) => {
  let a: HTMLAnchorElement | null = document.createElement('a');
  a.href = url;
  a.download = '加密图片';
  a.click();
  a.remove();
  a = null;
};
