
import { createClient } from '@supabase/supabase-js';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
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
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};


// NOTE: The credentials below are placeholders and will not connect to a real database.
// This is done to prevent the application from crashing on startup if environment
// variables are not configured. The app will run, but saving settings will fail
// gracefully until these are replaced with your actual Supabase Project URL and Public Anon Key.
const supabaseUrl = 'https://ksfrcopxhypjkoigtgru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZnJjb3B4aHlwamtvaWd0Z3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTk2NzcsImV4cCI6MjA2OTUzNTY3N30.iB2cVz10C_budQ3pF-VlQcPG6Dm9awYFIXz8scs50Pw';


// Initialize the Supabase client with the placeholder credentials.
// This will allow the application to load without error.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
