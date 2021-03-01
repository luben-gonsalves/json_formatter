const Number = ({ keyName, type, value }) => {
  return (
    '<li><span class="key">"' +
    keyName +
    '": </span><span class="' +
    type +
    '">'+
    '<input type="number" value="'+value+'"></input>'
     +
    "</span></li>"
  );

};

export default Number;
