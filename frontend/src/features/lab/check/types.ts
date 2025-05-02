export type LabCheckParams = {
  projectId: string;
}

export type LabCheck = {
  passed: boolean;
  logs: {
    [key: string]: boolean;
  }
  // private
  stored: boolean;
}
