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
      <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Upload Documents</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upload and process documents with AI-powered summarization
          </p>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-h-[600px]">
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