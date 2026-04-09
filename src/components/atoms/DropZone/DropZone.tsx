import { clsx } from 'clsx';
import styles from './DropZone.module.scss';
import type { DropZoneProps } from './DropZone.types';
import Typography from '../Typography/Typography';

const DropZone: React.FC<DropZoneProps> = ({ label, accept=".eml,text/plain", handleFiles, additionalClasses}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={clsx(styles["c-dropzone"], additionalClasses)}
    >
      <input
        type="file"
        accept={accept}
        className={styles["c-dropzone__input"]}
        onChange={handleFileInput}
        id="fileInput"
      />
      <Typography as="label" htmlFor="fileInput" className={styles["c-dropzone__label"]}>
        {label}
      </Typography>
    </div>
  );
};

export default DropZone;
