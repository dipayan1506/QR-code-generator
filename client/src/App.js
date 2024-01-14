import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [inputData, setInputData] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [qrCodeColor, setQrCodeColor] = useState('#000000'); // Default color is black

  const generateQRCode = async () => {
    const response = await fetch(`/api/generate-qr?data=${encodeURIComponent(inputData)}`);
    const { qrImageData } = await response.json();
    setQrCodeData(qrImageData);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = 'qrcode.png';
    link.click();
  };

  const handleColorChange = (e) => {
    setQrCodeColor(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="font-bold text-xl">QR Code Generator</span>
          </div>
          <div>
            {/* Add your login/signup options here */}
            <button className="mr-4">Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p>
            A QR code (Quick Response code) is a two-dimensional barcode that can store various
            information types, including URLs, text, and contact details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Procedure</h2>
          <p>
            To generate a QR code, enter the URL or text in the input field and click "Generate QR
            Code". You can customize the QR code color before generating it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Generate QR Code</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="p-3 border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter URL or Text"
            />
            <button onClick={generateQRCode} className="ml-4 p-3 bg-blue-500 text-white rounded">
              Generate QR Code
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Customize QR Code Color:</label>
            <input
              type="color"
              value={qrCodeColor}
              onChange={handleColorChange}
              className="p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {qrCodeData && (
            <div className="text-center">
              <QRCode value={qrCodeData} bgColor={qrCodeColor} />
              <button
                onClick={downloadQRCode}
                className="mt-4 p-3 bg-green-500 text-white rounded"
              >
                Download QR Code
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrCodeData);
                  alert('QR Code copied to clipboard!');
                }}
                className="ml-4 p-3 bg-yellow-500 text-white rounded"
              >
                Copy QR Code
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
