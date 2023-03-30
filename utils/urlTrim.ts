export const urlTrim = (url: string) => {
  if (url[url.length -1] === '/') {
    const urlArr = url.split('');
    urlArr.splice(urlArr.length-1, 1);
    return urlArr.join('');
  }

  return url;
}
