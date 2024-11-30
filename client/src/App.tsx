import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { FileUpload } from './components/FileUpload/FileUpload';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>File Converter</h1>
      <ErrorBoundary>
        <FileUpload />
      </ErrorBoundary>
    </div>
  );
}

export default App;
