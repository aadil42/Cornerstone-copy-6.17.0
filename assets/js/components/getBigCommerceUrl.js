export default function getBigCommerceUrl(imageObj, size) {
  if (!imageObj || !imageObj.data) return '';
  return imageObj.data.replace('{:size}', `${size}x${size}`);
};