import "./TouchscreenInputHandler.css";
import { Portal } from "@material-ui/core";

const keyboardLayout = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm".split(""),
];

const TouchscreenInputHandler = () => {
  return (
    <Portal container={document.body}>
      <div className="touchscreen-input-handler-wrapper">
        <div className="touchscreen-input-handler">
          <div className="faux-keyboard">
            {keyboardLayout.map((row) => (
              <div className="row">
                {row.map((key) => (
                  <span className="key">{key}</span>
                ))}
              </div>
            ))}
            <div className="row">
              <span className="key key-big"> Lock/Unlock </span>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TouchscreenInputHandler;
