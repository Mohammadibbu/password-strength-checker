import React, { useState } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [conditionsMet, setConditionsMet] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [crackTime, setCrackTime] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const calculateCrackTime = (password) => {
    const lowerCase = 26;
    const upperCase = 26;
    const numbers = 10;
    const specialChars = 32;

    let characterSet = lowerCase;
    if (/[A-Z]/.test(password)) characterSet += upperCase;
    if (/\d/.test(password)) characterSet += numbers;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) characterSet += specialChars;

    const combinations = Math.pow(characterSet, password.length);
    const guessesPerSecond = 1e9;
    const timeInSeconds = combinations / guessesPerSecond;

    return convertTime(timeInSeconds);
  };

  const convertTime = (seconds) => {
    const timeUnits = [
      { unit: "quintillion years", value: 1e18 * 365 * 24 * 60 * 60 },
      { unit: "quadrillion years", value: 1e15 * 365 * 24 * 60 * 60 },
      { unit: "trillion years", value: 1e12 * 365 * 24 * 60 * 60 },
      { unit: "billion years", value: 1e9 * 365 * 24 * 60 * 60 },
      { unit: "million years", value: 1e6 * 365 * 24 * 60 * 60 },
      { unit: "centuries", value: 100 * 365 * 24 * 60 * 60 },
      { unit: "decades", value: 10 * 365 * 24 * 60 * 60 },
      { unit: "years", value: 365 * 24 * 60 * 60 },
      { unit: "days", value: 24 * 60 * 60 },
      { unit: "hours", value: 60 * 60 },
      { unit: "minutes", value: 60 },
      { unit: "seconds", value: 1 },
    ];

    let remaining = seconds;
    let formatted = [];

    for (let i = 0; i < timeUnits.length; i++) {
      const { unit, value } = timeUnits[i];
      const count = Math.floor(remaining / value);
      if (count > 0) {
        formatted.push(`${count} ${unit}`);
        remaining %= value;
      }
    }
    return formatted.join(" ") || "Less than a second";
  };

  const checkStrength = (password) => {
    const isLengthValid = password.length >= 8;
    const isLowercaseValid = /[a-z]/.test(password);
    const isUppercaseValid = /[A-Z]/.test(password);
    const isNumberValid = /\d/.test(password);
    const isSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const conditions = {
      length: isLengthValid,
      lowercase: isLowercaseValid,
      uppercase: isUppercaseValid,
      number: isNumberValid,
      specialChar: isSpecialCharValid,
    };

    const noConditionsMet = Object.values(conditions).filter(Boolean).length;

    setConditionsMet(conditions);

    let estimatedTime = "";
    if (password.length > 0) {
      estimatedTime = calculateCrackTime(password);
      setCrackTime(estimatedTime);
    } else {
      setCrackTime("");
      setStrength("");
      return;
    }

    // Parsing the estimated time for better comparison
    const [timeValue, unit] = estimatedTime.split(" ");
    let totalTimeInSeconds = parseFloat(timeValue);

    // Conversion logic
    if (unit.includes("quintillion years"))
      totalTimeInSeconds *= 1e18 * 365 * 24 * 60 * 60;
    else if (unit.includes("quadrillion years"))
      totalTimeInSeconds *= 1e15 * 365 * 24 * 60 * 60;
    else if (unit.includes("trillion years"))
      totalTimeInSeconds *= 1e12 * 365 * 24 * 60 * 60;
    else if (unit.includes("billion years"))
      totalTimeInSeconds *= 1e9 * 365 * 24 * 60 * 60;
    else if (unit.includes("million years"))
      totalTimeInSeconds *= 1e6 * 365 * 24 * 60 * 60;
    else if (unit.includes("centuries"))
      totalTimeInSeconds *= 100 * 365 * 24 * 60 * 60;
    else if (unit.includes("decades"))
      totalTimeInSeconds *= 10 * 365 * 24 * 60 * 60;
    else if (unit.includes("years")) totalTimeInSeconds *= 365 * 24 * 60 * 60;
    else if (unit.includes("days")) totalTimeInSeconds *= 24 * 60 * 60;
    else if (unit.includes("hours")) totalTimeInSeconds *= 60 * 60;
    else if (unit.includes("minutes")) totalTimeInSeconds *= 60;

    let strengthLevel = "";

    if (noConditionsMet < 2 || totalTimeInSeconds < 30) {
      strengthLevel = "weak";
    } else if (noConditionsMet < 4 || totalTimeInSeconds < 3600) {
      strengthLevel = "medium";
    } else {
      strengthLevel = "strong";
    }

    setStrength(strengthLevel);
  };

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
      });
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h3>Password Strength Checker</h3>

        <div className="form-group">
          <div className="field">
            <label htmlFor="password-input">Type password</label>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Type password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkStrength(e.target.value);
              }}
            />
            <span
              className="showBtn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
            <span
              className="copy-password-btn"
              onClick={handleCopyPassword}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              Copy Password
              {copyStatus && (
                <span
                  className="copy-status"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                >
                  {copyStatus}
                </span>
              )}
            </span>
          </div>
          <div className={`indicator ${strength}`}>
            <span
              className={`weak ${
                strength === "weak" ||
                strength === "medium" ||
                strength === "strong"
                  ? "active"
                  : ""
              }`}
            ></span>
            <span
              className={`medium ${
                strength === "medium" || strength === "strong" ? "active" : ""
              }`}
            ></span>
            <span
              className={`strong ${strength === "strong" ? "active" : ""}`}
            ></span>
          </div>
          {strength && (
            <div className={`text ${strength}`}>
              {strength === "weak" && <span>Your password is too weak</span>}
              {strength === "medium" && <span>Your password is medium</span>}
              {strength === "strong" && <span>Your password is strong</span>}
            </div>
          )}
          <div className="character-count">
            <span>Characters typed: {password.length}</span>
          </div>
          <div className="conditions">
            <ul>
              <li className={conditionsMet.length ? "satisfied" : ""}>
                At least 6 characters
              </li>
              <li className={conditionsMet.lowercase ? "satisfied" : ""}>
                At least 1 lowercase letter
              </li>
              <li className={conditionsMet.uppercase ? "satisfied" : ""}>
                At least 1 uppercase letter
              </li>
              <li className={conditionsMet.number ? "satisfied" : ""}>
                At least 1 number
              </li>
              <li className={conditionsMet.specialChar ? "satisfied" : ""}>
                At least 1 special character
              </li>
            </ul>
          </div>
          {crackTime && (
            <div className="crack-time">
              <span>Estimated time to crack:</span>
              <div className="crack-timediv">{crackTime}</div>
            </div>
          )}
        </div>

        <div className="tips-section">
          <button
            onClick={() => setShowTips(!showTips)}
            className="toggle-tips"
            aria-expanded={showTips}
            aria-controls="tips"
          >
            <i className={`fa ${showTips ? "fa-minus" : "fa-plus"}`}></i>
            Password Tips
          </button>
          {showTips && (
            <div className="tips" id="tips">
              <h3>Password Tips</h3>
              <ul>
                <li>
                  <i className="fa fa-check-circle"></i> Use at least 12
                  characters.
                </li>
                <li>
                  <i className="fa fa-check-circle"></i> Include both uppercase
                  and lowercase letters.
                </li>
                <li>
                  <i className="fa fa-check-circle"></i> Add numbers and special
                  characters.
                </li>
                <li>
                  <i className="fa fa-check-circle"></i> Avoid common words or
                  phrases.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer id="contact">{/* Contact info or other footer content */}</footer>
    </div>
  );
}

export default App;
