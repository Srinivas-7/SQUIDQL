declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function setDoc(reference: any, data: any, options?: any): Promise<void>;
  export function getDoc(reference: any): Promise<any>;
  export interface Firestore { [key: string]: any; }
}
