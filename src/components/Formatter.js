import React, { useState } from "react";
import Object from "./Object";
import Number from "./Number";
import ReactDOMServer from "react-dom/server";
import Boolean from "./Boolean";
import String from "./String";
import DefaultType from "./DefaultType";

const Formatter = (props) => {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [formattedJSON, setFromattedJSON] = useState("");
  const [ifError, setError] = useState(false);

  const formatJson = () => {
    setError(false);

    if (userInput.length === 0) {
      alert("The JSON data field is required.");
      return;
    }

    try {
      let parsedData = JSON.parse(userInput);
      let stringifyJSON = JSON.stringify(parsedData, null, 2);
      setFromattedJSON(stringifyJSON); // store for copy feature.
      setOutput(json2html(parsedData));
    } catch (err) {
      setError(true);
      setOutput(err.message);
    }
  };

  const json2html = (json) => {
    let html = "";
    if(typeof json === "string") {
          html += '<li><span class="string">'+json +"</span></li>"
    } else if(typeof json === "boolean") {
      html += '<li><span class="boolean">'+json +"</span></li>"
    } else {
      for (let key in json) {
        let value = json[key],
          type = typeof json[key];
  
        html = html + createElement(key, value, type);
      }
    }
    return html;
  };

   const isArray = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor === Array;
  };

  const decodeHTMLEntities = (text) => {
    let entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x2F", "/"],
      ["#47", "/"],
      ["lt", "<"],
      ["gt", ">"], 
      ["nbsp", " "],
      ["quot", '"'],
    ];

    for (let i = 0, max = entities.length; i < max; ++i)
      text = text.replace(
        new RegExp("&" + entities[i][0] + ";", "g"), 
        entities[i][1]
      );
    return text;
  };
  

  const createElement = (key, value, type) => {
    let className = "object",
      open = "{",
      close = "}";

    if (isArray(value)) {
      className = "array";
      open = "[";
      close = "]";
    }

    if (value === null) {
      return (
        '<li><span class="key">"' +
        key +
        '": </span><span class="' +
        null +
        '">' +
        value +
        "</span></li>"
      );
    }

    switch (type) {
      case "object":
        let object = decodeHTMLEntities(
          ReactDOMServer.renderToStaticMarkup(
            <Object
              keyName={key}
              value={value}
              className={className}
              open={open}
              type={type}
            />
          )
        );
        object = object + json2html(value);
        return object + "</ul><span>" + close + "</span></li>";

      case "number":
        return decodeHTMLEntities(
          ReactDOMServer.renderToStaticMarkup(
            <Number keyName={key} value={value} open={open} type={type} />
          )
        );

      case "boolean":
        return decodeHTMLEntities(
          ReactDOMServer.renderToStaticMarkup(
            <Boolean keyName={key} value={value} open={open} type={type} />
          )
        );

      case "string":
        return decodeHTMLEntities(
          ReactDOMServer.renderToStaticMarkup(
            <String keyName={key} value={value} open={open} type={type} />
          )
        );

      default:
        return decodeHTMLEntities(
          ReactDOMServer.renderToStaticMarkup(
            <DefaultType keyName={key} value={value} open={open} type={type} />
          )
        );
    }
  };

  const copy = () => {
    if (userInput.length === 0) {
      alert("The JSON data field is required.");
      return;
    }
    // web api granted for pages when they are in active tab
    navigator.clipboard.writeText(formattedJSON);
    alert("Copy Successfull");
  };

  return (
    <>
      <h1 style={{ marginLeft: "20px" }} className="text-primary">
        JSON Viewer
      </h1>
      <div
        style={{
          display: "flex",
          margin: "20px",
        }}
        className="json-container"
      >
        {/* Input */}
        <div>
          <textarea
            cols="100"
            rows="35"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        {/* Actions buttons */}
        <div className="d-flex flex-column w-100 " style={{ margin: "5px" }}>
          <button
            onClick={formatJson}
            className="btn btn-info "
            style={{ width: "100%" }}
          >
            Parse
          </button>
          <button
            onClick={props.changeTheme}
            className="btn btn-info"
            style={{ marginTop: "5px" }}
          >
            Dark/Light theme
          </button>
          <button
            onClick={copy}
            className="btn btn-info"
            style={{ marginTop: "5px", width: "100%" }}
          >
            Copy
          </button>
        </div>

        {/* JSON output */}
        <div
          style={{
            width: "100%",
            height: "684px",
            border: "1px solid black",
            overflowY: "scroll",
            backgroundColor: "white",
            paddingLeft: "20px",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: output }}
            style={{ marginRight: "5px", color: ifError ? "red" : "" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Formatter;
