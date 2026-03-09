export interface EulogyFormData {
  // Step 1: Deceased details
  deceasedName: string;
  age: string;
  occupation: string;
  hometown: string;
  // Step 2: Relationship and memories
  relationship: string;
  memories: string;
  // Step 3: Personality and family
  personalityTraits: string;
  achievements: string;
  familyInfo: string;
  // Step 4: Style preferences
  tone: 'warm' | 'formal' | 'religious' | 'secular';
  length: 'short' | 'medium' | 'long';
  // Step 5: Email (lead gen gate)
  email: string;
}

export interface GenerationResult {
  eulogy: string;
  blocked?: boolean;
  message?: string;
  error?: string;
}

export interface AlternativesResult {
  variations: {
    tone: string;
    eulogy: string;
  }[];
  error?: string;
}

export type TierStatus = 'free' | 'paid' | 'unknown';
