
import { createClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      notification_settings: {
        Row: {
          id: number;
          created_at: string;
          frequency: string;
          reminder_day: string;
          reminder_time: string;
          product_categories: string[];
          phone_number: string;
          submission_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          frequency: string;
          reminder_day: string;
          reminder_time: string;
          product_categories: string[];
          phone_number: string;
          submission_id: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          frequency?: string;
          reminder_day?: string;
          reminder_time?: string;
          product_categories?: string[];
          phone_number?: string;
          submission_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: number;
          submission_id: string;
          name: string;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          submission_id: string;
          name: string;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          submission_id?: string;
          name?: string;
          quantity?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [key: string]: never;
    };
    Functions: {
      [key: string]: never;
    };
    Enums: {
      [key: string]: never;
    };
    CompositeTypes: {
      [key: string]: never;
    };
  };
};

// Use placeholder credentials if environment variables are not set.
// This allows the application to load without crashing.
// Real database operations will fail gracefully until valid credentials are provided.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ksfrcopxhypjkoigtgru.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZnJjb3B4aHlwamtvaWd0Z3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTk2NzcsImV4cCI6MjA2OTUzNTY3N30.iB2cVz10C_budQ3pF-VlQcPG6Dm9awYFIXz8scs50Pw';

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);