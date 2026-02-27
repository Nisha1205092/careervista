export interface Education {
  institution: string;
  degree?: string;
  dates?: string;
}

export interface Experience {
  company: string;
  role?: string;
  dates?: string;
}

export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  education: Education[];
  experience: Experience[];
  skills?: string[];
  projects?: string[];
  certifications?: string[];
}
