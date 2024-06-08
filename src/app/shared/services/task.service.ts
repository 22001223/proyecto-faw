import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, query, where, orderBy, startAt, endAt } from '@angular/fire/firestore';

import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { SearchParams } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) { }

  getTasks(loggedUser: string, searchParams?: SearchParams): Observable<Task[]> {
    
    const tasksCollection = collection(this.firestore, 'tasks');
    let queryTasks = query(tasksCollection);

    queryTasks = query(queryTasks, where('creationUser', '==', loggedUser));
    
    if(searchParams !== undefined && searchParams.priority !== 'All') {
      queryTasks = query(queryTasks, where('priority', '==', searchParams.priority));
    }
    
    if(searchParams !== undefined && (searchParams.searchKeywords == null || searchParams.searchKeywords == '')) {
      queryTasks = query(queryTasks, orderBy('creationDate', searchParams?.isAscending ? 'asc' : 'desc'));
    }
    else if(searchParams !== undefined && (searchParams.searchKeywords !== null || searchParams.searchKeywords !== '')) {
      queryTasks = query(queryTasks, orderBy('title'));
      queryTasks = query(queryTasks, startAt(searchParams.searchKeywords));
      queryTasks = query(queryTasks, endAt(searchParams.searchKeywords + '\uf8ff'));
    } else {
      queryTasks = query(queryTasks, orderBy('creationDate', 'asc'));
    }

    return collectionData(queryTasks, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(task: Task) {
    const tasksCollection = collection(this.firestore, 'tasks');
    const newTask = await addDoc(tasksCollection, task);
    return newTask;
  }

  updateStatusTask(task: Task) {
    const taskDocument = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDocument, { status: task.status });
  }

}
