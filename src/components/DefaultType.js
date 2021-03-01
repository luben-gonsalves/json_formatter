const DefaultType = ({ keyName, type, value }) => {
  return (
    '<li ><span class="key">"' +
    keyName +
    '": </span><span class="' +
    type +
    '">"' +
    value +
    '"</span></li>'
  );
};

export default DefaultType;
