import React from 'react';

const FileFieldStyle = ({ content }) => (
  <style jsx>{`
    label {
      text-rendering: geometricPrecision;
      font-family: Muli;
      font-weight: 700;
      font-size: 16px;
      display: block;
      color: #393F50;
    }

    .required:after {
      color: #EB4E2C;
      content: "*";
    }

    .desc {
      display: inline;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #6F6F6F;
      margin-right: 50px;
    }

    .file-input {
      color: transparent;
    }

    .file-input::-webkit-file-upload-button {
      visibility: hidden;
    }

    .file-input::before {
      content: "${content}";
      font-family: Muli;
      font-size: 16px;
      font-weight: 700;
      color: #00239D;
      cursor: pointer;
      padding: 10px 41px 11px 40px;
      border: 1px solid #00239D;
      border-radius: 50px;
      display: inline-block;
    }

    .error {
      font-family: Muli;
      font-weight: 700;
      font-size: 12px;
      display: block;
      color: #EB4E2C;
      text-rendering: optimizeLegibility;
    }
  `}</style>
)

const FileField = ({ label, buttonLabel, description, required, error, onFileSelected }) => {
  const handleChange = (event) => {
    alert(`successfuly uploaded ${event.target.files[0].name}`);
    onFileSelected(event.target.files);
  }

  return (
    <div>
      <label className={required ? 'required' : ''}>{ label }</label>
      <label className="desc">{ description }</label>
      <input className="file-input" type="file" onChange={handleChange} />
      <FileFieldStyle content={buttonLabel} />
      { error && <span className="error">{ error }</span> }
    </div>
  );
}

export default FileField;
