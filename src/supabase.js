import { createClient } from '@supabase/supabase-js';

// Les clés sont chargées depuis les variables d'environnement .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
