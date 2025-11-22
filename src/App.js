import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Check, X, ChevronDown, ChevronUp } from "lucide-react";

// --- CSS STYLES ---
const styles = `
  @import url("https://fonts.googleapis.com/css?family=Orbitron&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Orbitron", sans-serif;
  }

  body {
    color: #00ff00;
    background: rgb(19, 36, 0);
    background: linear-gradient(
      333deg,
      rgba(19, 36, 0, 1) 0%,
      rgba(5, 5, 23, 1) 39%,
      rgba(26, 136, 48, 1) 100%
    );
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Animated Background */
  .area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(2, 230, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  /* ... reusing your specific circle animations ... */
  .circles li:nth-child(1) { left: 25%; width: 70px; height: 70px; animation-delay: 0s; }
  .circles li:nth-child(2) { left: 10%; width: 30px; height: 30px; animation-delay: 2s; animation-duration: 12s; }
  .circles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
  .circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
  .circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
  .circles li:nth-child(6) { left: 75%; width: 100px; height: 100px; animation-delay: 3s; }
  .circles li:nth-child(7) { left: 35%; width: 130px; height: 130px; animation-delay: 7s; }
  .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
  .circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
  .circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

  @keyframes animate {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; border-radius: 0; }
    100% { transform: translateY(-1000px) rotate(720deg); opacity: 0; border-radius: 50%; }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .content {
    background: rgba(0, 0, 0, 0.85);
    padding: 30px;
    width: 100%;
    max-width: 650px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.4);
    animation: neon-flicker 2s infinite alternate;
  }

  @keyframes neon-flicker {
    0% { box-shadow: 0 0 2px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.4); }
    50% { box-shadow: 0 0 2px rgba(56, 112, 56, 0.8), 0 0 20px rgba(0, 255, 0, 0.6); }
    100% { box-shadow: 0 0 2px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.4); }
  }

  h1, h3 { margin-bottom: 20px; text-align: center; color: #00ff00; text-transform: uppercase; letter-spacing: 2px; }

  .field { position: relative; margin-bottom: 20px; }
  
  .field input {
    width: 100%;
    height: 55px;
    border: 1px solid #00ff00;
    padding-left: 15px;
    padding-right: 110px;
    outline: none;
    border-radius: 5px;
    font-size: 18px;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0.6);
    color: #00ff00;
    font-family: monospace; 
  }
  
  .field input:focus { border-color: #00ff00; box-shadow: 0 0 8px #00ff00; }

  .input-actions {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .action-btn {
    background: rgba(0, 50, 0, 0.5);
    border: 1px solid #005500;
    border-radius: 4px;
    cursor: pointer;
    color: #00ff00;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    transition: 0.3s;
  }

  .action-btn:hover { 
    background: #00ff00; 
    color: #000; 
    box-shadow: 0 0 10px #00ff00; 
  }

  .indicator {
    height: 12px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .indicator span {
    position: relative;
    height: 100%;
    width: 100%;
    background: #1a2e1a;
    border-radius: 5px;
    transition: 0.3s;
  }

  .indicator span.active:before {
    position: absolute;
    content: "";
    top: 0; left: 0;
    height: 100%; width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 15px currentColor;
  }

  .indicator span.weak.active:before { background-color: #ff4757; color: #ff4757; }
  .indicator span.medium.active:before { background-color: orange; color: orange; }
  .indicator span.strong.active:before { background-color: #23ad5c; color: #23ad5c; }

  .text { font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: right; text-transform: uppercase; }
  .text.weak { color: #ff4757; text-shadow: 0 0 5px #ff4757; }
  .text.medium { color: orange; text-shadow: 0 0 5px orange; }
  .text.strong { color: #23ad5c; text-shadow: 0 0 5px #23ad5c; }

  .conditions { margin-top: 20px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px; }
  .conditions ul { list-style-type: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .conditions li {
    font-size: 14px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s;
  }
  .conditions li.satisfied { color: #23ad5c; text-shadow: 0 0 8px #23ad5c; }

  .crack-time { 
    margin-top: 25px; 
    border-top: 1px solid #004400; 
    padding-top: 15px; 
  }
  
  .crack-time-label {
    display: block;
    font-size: 12px;
    color: #00aa00;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }

  .crack-timediv {
    font-family: monospace;
    font-size: 15px;
    color: #00ff00;
    background: rgba(0, 20, 0, 0.8);
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #00ff00;
    box-shadow: inset 0 0 10px rgba(0,255,0,0.2);
    word-break: break-word;
    line-height: 1.4;
  }

  .tips-section { margin-top: 25px; }
  
  .toggle-tips {
    background: none;
    border: 1px dashed #005500;
    color: #00aa00;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
  }
  
  .toggle-tips:hover { color: #00ff00; border-color: #00ff00; }

  .tips {
    margin-top: 10px;
    padding: 15px;
    background-color: rgba(0, 20, 0, 0.9);
    border: 1px solid #005500;
    border-radius: 5px;
  }
  .tips ul { list-style: none; }
  .tips li { margin: 8px 0; color: #aaffaa; font-size: 14px; display: flex; gap: 8px; }

  .copy-status {
    position: absolute;
    top: -25px;
    right: 0;
    font-size: 12px;
    color: #23ad5c;
    background: rgba(0,0,0,0.8);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const App = () => {
  const [password, setPassword] = useState("");
  const [strengthScore, setStrengthScore] = useState(0); 
  const [showPassword, setShowPassword] = useState(false);
  const [crackTime, setCrackTime] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [showTips, setShowTips] = useState(false);

  const [criteria, setCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });


  const convertTime = (seconds) => {
    if (seconds <= 0) return "Instantly";
    
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

   
    let unitsFound = 0;

    for (let i = 0; i < timeUnits.length; i++) {
      if (unitsFound >= 2) break;
      const { unit, value } = timeUnits[i];
      const count = Math.floor(remaining / value);
      if (count > 0) {
        formatted.push(`${count} ${unit}`);
        remaining %= value;
        unitsFound++;
      }
    }
    return formatted.join(" ") || "Less than a second";
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let newPass = "";
    for (let i = 0; i < 16; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    });
  };

  useEffect(() => {
  
    const newCriteria = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setCriteria(newCriteria);

    if (password.length === 0) {
      setStrengthScore(0);
      setCrackTime("");
      return;
    }

  
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/\d/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  
    if (poolSize === 0) poolSize = 1;

    const combinations = Math.pow(poolSize, password.length);
    const guessesPerSecond = 1e9; // 1 Billion guesses/sec
    const seconds = combinations / guessesPerSecond;
    
    setCrackTime(convertTime(seconds));

   
    const unmetConditions = Object.values(newCriteria).filter(val => !val).length;
    let newStrength = 0;

    if (unmetConditions > 3 || seconds < 30) {
      newStrength = 1; 
    } else if (unmetConditions > 1 || seconds < 31536000) { 
      newStrength = 2; 
    } else {
      newStrength = 3;
    }

    setStrengthScore(newStrength);

  }, [password]);

  const getStrengthText = () => {
    if (!password) return "";
    if (strengthScore === 1) return "Weak";
    if (strengthScore === 2) return "Medium";
    if (strengthScore === 3) return "Strong";
    return "";
  };

  return (
    <div className="container">
      <style>{styles}</style>
      
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, i) => <li key={i}></li>)}
        </ul>
      </div>

      <div className="content">
        <h3>Matrix Password Shield</h3>

        <div className="form-group">
          <div className="field">
            {copyStatus && <span className="copy-status">{copyStatus}</span>}
            
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="input-actions">
               {password && (
                <button className="action-btn" onClick={handleCopy} title="Copy">
                  <Copy size={16} />
                </button>
               )}
               <button className="action-btn" onClick={generatePassword} title="Generate">
                 <RefreshCw size={16} />
               </button>
               <button className="action-btn" onClick={() => setShowPassword(!showPassword)} title="Show/Hide">
                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
               </button>
            </div>
          </div>

          <div className="indicator">
            <span className={`weak ${strengthScore >= 1 ? "active" : ""}`}></span>
            <span className={`medium ${strengthScore >= 2 ? "active" : ""}`}></span>
            <span className={`strong ${strengthScore >= 3 ? "active" : ""}`}></span>
          </div>

          <div className={`text ${getStrengthText().toLowerCase()}`}>
            {getStrengthText() && <span>{getStrengthText()}</span>}
          </div>

          <div className="conditions">
            <ul>
              <li className={criteria.length ? "satisfied" : ""}>
                {criteria.length ? <Check size={14} /> : <X size={14} />} 8+ Characters
              </li>
              <li className={criteria.lowercase ? "satisfied" : ""}>
                 {criteria.lowercase ? <Check size={14} /> : <X size={14} />} Lowercase
              </li>
              <li className={criteria.uppercase ? "satisfied" : ""}>
                 {criteria.uppercase ? <Check size={14} /> : <X size={14} />} Uppercase
              </li>
              <li className={criteria.number ? "satisfied" : ""}>
                 {criteria.number ? <Check size={14} /> : <X size={14} />} Numbers
              </li>
              <li className={criteria.special ? "satisfied" : ""}>
                 {criteria.special ? <Check size={14} /> : <X size={14} />} Special Char
              </li>
            </ul>
          </div>

          {crackTime && (
            <div className="crack-time">
              <span className="crack-time-label">ESTIMATED TIME TO CRACK:</span>
              <div className="crack-timediv">{crackTime}</div>
            </div>
          )}

        
          <div className="tips-section">
            <button
              onClick={() => setShowTips(!showTips)}
              className="toggle-tips"
            >
              {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              Password Tips
            </button>
            {showTips && (
              <div className="tips">
                <ul>
                  <li><Check size={14} color="#23ad5c" /> Use at least 12 characters.</li>
                  <li><Check size={14} color="#23ad5c" /> Include upper & lowercase.</li>
                  <li><Check size={14} color="#23ad5c" /> Add numbers & symbols.</li>
                  <li><Check size={14} color="#23ad5c" /> Avoid common dictionary words.</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
