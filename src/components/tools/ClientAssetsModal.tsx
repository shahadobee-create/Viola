import React from 'react';
import { ClientFile } from '../../types';
import { UDriveView } from '../udrive/UDriveView';
import { VIOLA_CLIENTS } from '../../data/mockData';

interface ClientAssetsModalProps {
  files: ClientFile[];
  onClose: () => void;
  onUploadFile: (newFile: ClientFile) => void;
  onUploadNewVersion: (fileId: string, note: string) => void;
  onToggleArchive: (fileId: string) => void;
  initialClientId?: string;
  initialFolderName?: string;
}

export const ClientAssetsModal: React.FC<ClientAssetsModalProps> = ({
  files,
  onClose,
  onUploadFile,
  onUploadNewVersion,
  onToggleArchive,
  initialClientId,
  initialFolderName,
}) => {
  return (
    <div 
      id="client-assets-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
    >
      <div className="flex-1 h-full w-full overflow-hidden flex flex-col bg-zinc-50 dark:bg-[#0A0A0B]">
        <UDriveView
          clients={VIOLA_CLIENTS}
          files={files}
          onClose={onClose}
          onUploadFile={onUploadFile}
          onUploadNewVersion={onUploadNewVersion}
          onToggleArchive={onToggleArchive}
          initialClientId={initialClientId}
          initialFolderName={initialFolderName}
        />
      </div>
    </div>
  );
};
