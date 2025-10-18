export type Application = {
  _id: string;
  client?: { name: string };
  visaType: string;
  applicationStatus: string;
  processedBy?: { name: string };
  processingPriority?: string;
  issueDate?: string;
  expiryDate?: string;
  invoice?: { paid?: boolean };
  documents?: { [key: string]: string };
    createdAt?: string; // <-- Add this line
  // Add other fields as needed
};