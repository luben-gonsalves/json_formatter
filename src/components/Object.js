const Object = ({ keyName, open, className }) => {
  return (
    '<li><span class="key">"' +
    keyName +
    '": </span> <span class="">' +
    open +
    '</span> <ul class="' +
    className +
    '">'
  );
};

export default Object;
