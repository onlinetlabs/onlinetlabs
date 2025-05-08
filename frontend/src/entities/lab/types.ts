
export type UserProject = {
  labId: string;
  projectId: string;
  createdAt: string;
}

export type UserChecklogsParams = {
  project_id: string;
}

export type UserChecklog = {
  labId: string;
  passed: boolean;
  checklog: {
    [key: string]: boolean;
  }
  createdAt: string;
  // private
  stored: boolean;
}

export type ProjectInfo = {
  labId: string;
  labUser: string;
  labPasswd: string;
  checkInProgress: boolean;
}

export type ProjectInfoParams = {
  projectId: string;
}