import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [html, setHtml] = useState(
    localStorage.getItem("html") || "<h1>Hello World</h1>"
  );

  const [css, setCss] = useState(
    localStorage.getItem("css") || "body { font-family: Arial; }"
  );

  const [js, setJs] = useState(
    localStorage.getItem("js") || "console.log('Hello');"
  );

  useEffect(() => {
    localStorage.setItem("html", html);
  }, [html]);

  useEffect(() => {
    localStorage.setItem("css", css);
  }, [css]);

  useEffect(() => {
    localStorage.setItem("js", js);
  }, [js]);

  const resetCode = () => {
    setHtml("<h1>Hello World</h1>");
    setCss("body { font-family: Arial; }");
    setJs("console.log('Hello');");
  };

  const downloadProject = () => {
    const fullCode = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}

<script>
${js}
</script>
</body>
</html>
`;

    const blob = new Blob([fullCode], {
      type: "text/html",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "project.html";
    a.click();

    URL.revokeObjectURL(url);
  };

  const loadPortfolioTemplate = () => {
    setHtml(`
<h1>G.Bharath Kumar</h1>
<p>Frontend Developer</p>
<button>Contact Me</button>
`);

    setCss(`
body {
  text-align: center;
  font-family: Arial;
  padding-top: 50px;
}

button {
  padding: 10px 20px;
}
`);

    setJs(`
console.log("Portfolio Loaded");
`);
  };

  const loadCalculatorTemplate = () => {
    setHtml(`
<input id="num1" placeholder="Number 1">
<input id="num2" placeholder="Number 2">
<button onclick="add()">Add</button>
<h2 id="result"></h2>
`);

    setCss(`
body {
  font-family: Arial;
  padding: 20px;
}

input, button {
  margin: 5px;
  padding: 8px;
}
`);

    setJs(`
function add() {
  let a = Number(document.getElementById("num1").value);
  let b = Number(document.getElementById("num2").value);

  document.getElementById("result").innerText = a + b;
}
`);
  };

  const loadTodoTemplate = () => {
    setHtml(`
<input id="task" placeholder="Enter task">
<button onclick="addTask()">Add</button>
<ul id="list"></ul>
`);

    setCss(`
body {
  font-family: Arial;
  padding: 20px;
}

li {
  margin: 10px 0;
}
`);

    setJs(`
function addTask() {
  const task = document.getElementById("task").value;

  const li = document.createElement("li");
  li.innerText = task;

  document.getElementById("list").appendChild(li);
}
`);
  };

  const srcDoc = `
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}

<script>
${js}<\/script>
</body>
</html>
`;

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <h1>🚀 Online Code Editor</h1>

      <div className="top-bar">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button onClick={resetCode}>
          🔄 Reset
        </button>

        <button onClick={downloadProject}>
          📥 Download Project
        </button>

        <button onClick={loadPortfolioTemplate}>
          Portfolio
        </button>

        <button onClick={loadCalculatorTemplate}>
          Calculator
        </button>

        <button onClick={loadTodoTemplate}>
          Todo App
        </button>
      </div>

      <div className="editors">
        <div className="editor-box">
          <h3>HTML</h3>
          <Editor
            height="250px"
            language="html"
            value={html}
            onChange={(value) => setHtml(value || "")}
            theme={darkMode ? "vs-dark" : "light"}
          />
        </div>

        <div className="editor-box">
          <h3>CSS</h3>
          <Editor
            height="250px"
            language="css"
            value={css}
            onChange={(value) => setCss(value || "")}
            theme={darkMode ? "vs-dark" : "light"}
          />
        </div>

        <div className="editor-box">
          <h3>JavaScript</h3>
          <Editor
            height="250px"
            language="javascript"
            value={js}
            onChange={(value) => setJs(value || "")}
            theme={darkMode ? "vs-dark" : "light"}
          />
        </div>
      </div>

      <h2>Live Preview</h2>

      <iframe
        srcDoc={srcDoc}
        title="preview"
        sandbox="allow-scripts"
        width="100%"
        height="450px"
        className="preview"
      />
    </div>
  );
}

export default App;