import { useState } from 'react';

export function FileInput({ setFile }: { setFile: (file: File | null) => void }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    setFile(file);
  };

  return (
    <div className="mb-2">
      <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="cursor-pointer inline-block bg-gray-200 px-4 py-2 rounded-lg">
        {fileName || 'Pilih file'}
      </label>
    </div>
  );
}
