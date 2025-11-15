export enum UserRole {
  GUEST = 'guest',
  FARMER = 'farmer',
  MERCHANT = 'merchant',
}

export interface User {
  id: string;
  name:string;
  username: string;
  role: UserRole;
  phone?: string;
}

// Interface for the mock user database, including password/phone
export interface StoredUser extends User {
  password?: string;
}

export interface DiagnosisResult {
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  recommendedTreatment: string;
  preventiveMeasures: string;
}

export interface SavedDiagnosis {
  id: string;
  userId: string;
  image: string; // base64 string
  result: DiagnosisResult;
  savedAt: string; // ISO string date
}

export interface TreatmentProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  merchantId: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Order {
  id: string;
  productId: string;
  farmerId: string;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  cropId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FarmingTip {
  id: string;
  title: string;
  content: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  description: string;
  treatment: string;
}

export interface CropInfo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  farmingInfo: string;
}

export interface Notification {
  id: string;
  userId?: string; // For user-specific notifications like orders
  role?: UserRole; // For role-specific notifications like general tips for farmers
  type: 'info' | 'alert' | 'order';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string; // Using string to avoid Date object complexity in mock data
}