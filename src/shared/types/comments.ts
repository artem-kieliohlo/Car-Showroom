export type LocalComment = {
  id: string;         
  author: string;
  text: string;
  createdAt: string;  
};

export type StoredCommentsByVehicleId = Record<string, LocalComment[]>;