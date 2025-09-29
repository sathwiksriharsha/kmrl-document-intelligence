import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, File, FileText, Image, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  file: File;
  preview?: string;
}

interface UploadZoneProps {
  onFileUpload: (file: UploadedFile) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uploadedFileData: UploadedFile = { file };
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        uploadedFileData.preview = URL.createObjectURL(file);
      }
      
      setUploadedFile(uploadedFileData);
      setIsUploading(false);
      onFileUpload(uploadedFileData);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="h-8 w-8 text-red-500" />;
    if (file.type.includes('word')) return <FileText className="h-8 w-8 text-blue-600" />;
    if (file.type.startsWith('image/')) return <Image className="h-8 w-8 text-accent" />;
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const detectLanguage = (filename: string) => {
    // Simple heuristic - in real app, this would use AI/NLP
    const malayalamKeywords = ['മലയാളം', 'kerala', 'kochi', 'ernakulam'];
    const lowerFilename = filename.toLowerCase();
    
    if (malayalamKeywords.some(keyword => lowerFilename.includes(keyword))) {
      return 'Malayalam';
    }
    return 'English';
  };

  if (uploadedFile && !isUploading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Document Uploaded
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
            {getFileIcon(uploadedFile.file)}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{uploadedFile.file.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(uploadedFile.file.size)}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  {detectLanguage(uploadedFile.file.name)}
                </Badge>
                <Badge variant="secondary">
                  {uploadedFile.file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                </Badge>
              </div>
            </div>
          </div>
          
          {uploadedFile.preview && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Preview:</p>
              <img 
                src={uploadedFile.preview} 
                alt="Document preview"
                className="w-full h-32 object-cover rounded-lg border"
              />
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setUploadedFile(null);
              if (uploadedFile.preview) {
                URL.revokeObjectURL(uploadedFile.preview);
              }
            }}
          >
            Upload Different File
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudUpload className="h-5 w-5" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-smooth hover:border-primary ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-border'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin mx-auto h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
              <p className="text-sm text-muted-foreground">Processing document...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <CloudUpload className="mx-auto h-12 w-12 text-muted-foreground" />
              
              {isDragActive ? (
                <p className="text-primary font-medium">Drop the file here...</p>
              ) : (
                <>
                  <div>
                    <p className="font-medium">Drag & drop your document here</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports PDF, DOCX, Images (PNG, JPG)
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px bg-border flex-1"></div>
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};