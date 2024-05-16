declare global {
  interface IAuthentication {
    uid: string;
    username: string;
    domain: string;
  }

  interface ApiResponse<T = any> {
    code: number;
    message: string;
    timestamp: string;
    requestId: string;
    path: string;
    error?: {
      code: number;
      message: string;
    };
    data?: T;
  }
}

export {};
