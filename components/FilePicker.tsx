"use client"

import React, { useState, DragEvent, ChangeEvent } from 'react';

const FilePicker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = Array.from(e.target.files as FileList).find(
      (file) => file.type === 'image/png'
    );
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = Array.from(e.dataTransfer.files).find(
      (file: File) => file.type === 'image/png'
    );
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept=".png"
        style={{ display: 'none' }}
      />
      <p>Drag and drop a .png file here, or click to select</p>
      <button
        onClick={() => {
          const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        Select .png File
      </button>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FilePicker;