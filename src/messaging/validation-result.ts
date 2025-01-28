export interface ValidationResult {
  duration: number;
  id: string;
  success: boolean;
  msg?: string;
  middlewares: Array<string>,
}

export default ValidationResult;
