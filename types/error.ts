export type CustomErrorResponse = {
    success: boolean;
    message: string;
    data: any;
    errors?: Record<string, string[]>;
  };