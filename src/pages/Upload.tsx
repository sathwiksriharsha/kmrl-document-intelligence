import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UploadZone } from '@/components/upload/UploadZone';
import { AISummaryPanel } from '@/components/upload/AISummaryPanel';

interface UploadedFile {
  file: File;
  preview?: string;
}

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFile(file);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Upload Documents</h1>
          <p className="text-muted-foreground text-lg">
            Upload and process documents with AI-powered summarization
          </p>
        </div>

        {/* Main Content - 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
          {/* Left Side - Upload Zone */}
          <UploadZone onFileUpload={handleFileUpload} />
          
          {/* Right Side - AI Summary */}
          <AISummaryPanel uploadedFile={uploadedFile} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;