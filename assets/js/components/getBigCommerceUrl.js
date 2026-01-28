export default function getBigCommerceUrl(imageObj, size) {
  if (!imageObj || !imageObj.data) return '';
  if (size) return imageObj.data.replace('{:size}', `${size}x${size}`);
  return imageObj.data.replace('{:size}', `original`);
};