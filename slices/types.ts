//---------------------auth types -------------------------------//

export type User = {
    _id: string,
    profileImage: string,
    token: string,
}

export type State = {
    user: User | null,
    error: boolean | null | string | undefined,
    success: boolean,
    loading: boolean, 
}

export type UploadFileParams = {
    projectId: string;
    file: FormData; 
}

export type Segment = {
    id: number;
    source: string;
    target: string;
    status: 'pending' | 'translated';
}
  
export type FileWithSegment = {
    id: string,
    nameFile: string,
    segments: Segment[]
}

export interface FileStoraged {
    createdAt: string
    fileName: string 
    originalFile: string 
    projectId: string
    updatedAt: string
    wordFile: string 
    __v: number
    _id: string
}

export type StateFile = {
    files: FileStoraged[];
    file: object;
    editValue: FileWithSegment[],
    error: boolean | null | string | undefined,
    loading: boolean, 
};

export type userRegister = {
    email: string,
    password: string,
    name: string, 
    confirmPassword: string,
    country: string
};
export type userLogin = {
    email: string,
    password: string,
};


//---------------------Workspace types -------------------------------//

export type workspace = {
    _id: string,
    userId: string,
    nameWorkSpace: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export type StateWorkspace = {
    allWorkspace: workspace[] ,
    error: boolean | null | string | undefined,
    loading: boolean, 
}

//------------------------------------Projects types-------------------------------//

export type Project = {
    _id: string,
    workspaceId: string,
    projectNumber: string,
    projectName: string,
    subject: string,
    progress: number,
    status: "pending" | "in-progress" | "completed" | "archived",
    creator: string,
    languagePair: string[],
    suppliers: object[],
    deadline: string,
    createdAt: string,
    updatedAt: string,
    __v: number 
}

export type StateProject = {
    allProject: Project[],
    project: Project | null,
    error: boolean | null | string | undefined,
    loading: boolean, 
}

export type createProjectType = {
    id: string,
    ProjectData: object
}


//--------------------------------Segments Type --------------------------//

export type Segments = {
    _id: string,
    paragraphId: string,
    fileId: string,
    source: string,
    target: string,
    segmentIndex: number,
    translated: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export type StateSegments = {
    allSegments: Segments[],
    error: boolean | null | string | undefined,
    loading: boolean, 
}