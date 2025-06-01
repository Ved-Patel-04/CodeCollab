// src/components/Editor.js
import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

import { db } from '../firebase';  // Import the initialized db instance
import { ref, onValue, set } from 'firebase/database';


function Editor() {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, CodeCollab!")`);
  const [output, setOutput] = useState('Loading Python runtime...');
  const pyodideRef = useRef(null);

  // To avoid echo loop: flag to know if change comes from Firebase or local typing
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    async function loadPyodideAndPackages() {
      const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
      });
      pyodideRef.current = pyodide;
      setOutput('Python runtime loaded. Ready to run your code!');
    }
    loadPyodideAndPackages();
  }, []);

  // Listen for code changes in Firebase and update local code accordingly
  useEffect(() => {
    const codeRef = ref(db, 'editor/code');

    const unsubscribe = onValue(codeRef, (snapshot) => {
      const remoteCode = snapshot.val();
      if (remoteCode !== null && remoteCode !== code) {
        // Mark this update as remote to prevent loop
        isRemoteUpdate.current = true;
        setCode(remoteCode);
      }
    });

    return () => unsubscribe();
  }, [code]);

  // On local code change, update Firebase unless it came from remote update
  const onCodeChange = (value) => {
    if (isRemoteUpdate.current) {
      // This change came from Firebase update, just reset flag and skip updating Firebase
      isRemoteUpdate.current = false;
      return;
    }
    setCode(value);
    // Update Firebase
    const codeRef = ref(db, 'editor/code');
    set(codeRef, value);
  };

  async function runCode() {
    if (!pyodideRef.current) {
      setOutput('Python runtime not loaded yet.');
      return;
    }
    try {
      // Redirect stdout to capture print outputs
      pyodideRef.current.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
        sys.stderr = StringIO()
      `);

      // Run the user's code asynchronously
      await pyodideRef.current.runPythonAsync(code);

      // Get stdout and stderr content
      const output = pyodideRef.current.runPython('sys.stdout.getvalue()');
      const error = pyodideRef.current.runPython('sys.stderr.getvalue()');

      // Show errors if any, else show output
      setOutput(error ? error : output);
    } catch (err) {
      setOutput(err.toString());
    }
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        color: '#fff',
        fontFamily: 'monospace',
      }}
    >
      <h2 style={{ marginBottom: '10px', fontSize: '16px', color: '#ccc', marginTop: '0px' }}>Code Editor</h2>

      <div style={{ flex: 1 }}>
        <CodeMirror
          value={code}
          height="100%"
          extensions={[python()]}
          theme={oneDark}
          onChange={onCodeChange}
        />
      </div>

      <button
        onClick={runCode}
        style={{
          marginTop: '10px',
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: '#1E2A47',
          color: 'white',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        Run Python
      </button>

      <pre
        style={{
          marginTop: '10px',
          backgroundColor: '#2a2a2a',
          padding: '10px',
          borderRadius: '5px',
          minHeight: '120px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          color: '#ccc',
          border: '1px solid #444',
        }}
      >
        {output}
      </pre>
    </div>
  );
}

export default Editor;
