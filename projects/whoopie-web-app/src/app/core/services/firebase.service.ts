import { Injectable } from '@angular/core';
import { Database, ref, onValue, set, push, update } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  setDoc, 
  updateDoc, 
  addDoc,
  deleteDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(
    private database: Database, 
    private firestore: Firestore
  ) {}

  // Fetch data from Firebase Realtime Database
  getData(path: string): Observable<any[]> {
    const dbRef = ref(this.database, path);
    
    return new Observable(observer => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        observer.next(items);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Fetch data from Firestore
  getFirestoreData(collectionPath: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionPath);
    return collectionData(collectionRef, { idField: 'id' });
  }
  
  // Create or update document in Firestore with specified ID
  setFirestoreData(collectionPath: string, id: string, data: any): Observable<void> {
    const docRef = doc(this.firestore, collectionPath, id);
    return from(setDoc(docRef, data, { merge: true }));
  }
  
  // Add new document to Firestore with auto-generated ID
  addFirestoreData(collectionPath: string, data: any): Observable<string> {
    const collectionRef = collection(this.firestore, collectionPath);
    return from(addDoc(collectionRef, data)).pipe(
      map(docRef => docRef.id)
    );
  }
  
  // Update existing Firestore document
  updateFirestoreData(collectionPath: string, id: string, data: any): Observable<void> {
    const docRef = doc(this.firestore, collectionPath, id);
    return from(updateDoc(docRef, data));
  }
  
  // Delete Firestore document
  deleteFirestoreData(collectionPath: string, id: string): Observable<void> {
    const docRef = doc(this.firestore, collectionPath, id);
    return from(deleteDoc(docRef));
  }
  
  // Write data to Realtime Database with specified path
  setRealtimeData(path: string, data: any): Observable<void> {
    const dbRef = ref(this.database, path);
    return from(set(dbRef, data));
  }
  
  // Generate a new child path and write data (for lists)
  pushRealtimeData(path: string, data: any): Observable<string> {
    const dbRef = ref(this.database, path);
    const newChildRef = push(dbRef);
    
    return from(set(newChildRef, data)).pipe(
      map(() => newChildRef.key || '')
    );
  }
  
  // Update specific paths in Realtime Database
  updateRealtimeData(path: string, data: any): Observable<void> {
    const dbRef = ref(this.database, path);
    return from(update(dbRef, data));
  }
}
