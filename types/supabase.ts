export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      talkers: {
        Row: {
          created_at: string
          id: string
          talkerId: string
          talkerName: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          talkerId?: string
          talkerName?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          talkerId?: string
          talkerName?: string | null
        }
        Relationships: []
      }
      talks: {
        Row: {
          created_at: string
          id: string
          talk: string
          talkerId: string
        }
        Insert: {
          created_at?: string
          id?: string
          talk: string
          talkerId?: string
        }
        Update: {
          created_at?: string
          id?: string
          talk?: string
          talkerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "talks_talkerId_fkey"
            columns: ["talkerId"]
            referencedRelation: "talkers"
            referencedColumns: ["talkerId"]
          }
        ]
      }
      talksComments: {
        Row: {
          comment: string
          created_at: string
          id: string
          talkerId: string
          talkId: string
          talkTalkerId: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          talkerId?: string
          talkId: string
          talkTalkerId?: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          talkerId?: string
          talkId?: string
          talkTalkerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "talksComments_talkerId_fkey"
            columns: ["talkerId"]
            referencedRelation: "talkers"
            referencedColumns: ["talkerId"]
          },
          {
            foreignKeyName: "talksComments_talkId_fkey"
            columns: ["talkId"]
            referencedRelation: "talks"
            referencedColumns: ["id"]
          }
        ]
      }
      talksHearters: {
        Row: {
          created_at: string
          hearterId: string
          id: string
          talkId: string
        }
        Insert: {
          created_at?: string
          hearterId?: string
          id?: string
          talkId: string
        }
        Update: {
          created_at?: string
          hearterId?: string
          id?: string
          talkId?: string
        }
        Relationships: [
          {
            foreignKeyName: "talksHearters_hearterId_fkey"
            columns: ["hearterId"]
            referencedRelation: "talkers"
            referencedColumns: ["talkerId"]
          },
          {
            foreignKeyName: "talksHearters_talkId_fkey"
            columns: ["talkId"]
            referencedRelation: "talks"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
