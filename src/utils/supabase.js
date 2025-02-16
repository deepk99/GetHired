import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
  return supabase;
};
export default supabaseClient;

//both env variable are imported here
//@supabase/supabase-js this pckg will make us enable to make api calls to backend
//we wiil be sending token every single time to comapre if user is authorized to login or not
//or any other thing
//ayr ye token apan header ko de rhe hai
