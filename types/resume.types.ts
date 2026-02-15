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
  education: Education[];
  experience: Experience[];
}
