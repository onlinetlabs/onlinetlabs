export type LabStart = {
  lab_link: string
  lab_project_id: string
  lab_port: number
}

export type LabStartParams = {
  lab_id: string
}


export type LabCheckParams = {
  labId: string;
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
