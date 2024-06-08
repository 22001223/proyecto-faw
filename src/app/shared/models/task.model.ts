export interface Task {
    id: string
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    description: string;
    creationDate: string;
    creationUser: string;
    status: 'Active' | 'Finalized';
}
