export const Role ={
    ADMIN: 'ADMIN',
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER'
};

export const Permission ={
    READ: 'READ',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    UPDATE:'UPDATE'
};

export const ROLE_PERMISSIONS ={
    [Role.ADMIN]: [Permission.READ, Permission.WRITE, Permission.DELETE,Permission.UPDATE],
    [Role.STUDENT]: [Permission.READ, Permission.WRITE],
    [Role.TEACHER]: [Permission.READ,Permission.WRITE]
};