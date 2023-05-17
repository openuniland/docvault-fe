export interface Notice {
  code: string;
  message: string;
  minimum_required_rank: string;
  your_rank: string;
  your_dedication_score: number;
  minimum_required_score: number;
}

export interface DeleteResponse {
  acknowledged: boolean;
  deletedCount: number;
}
