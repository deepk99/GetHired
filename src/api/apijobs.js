import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}`);
  }

  const { data, error } = await query;
  if (error) {
    console.log("there is error");
    return null;
  }
  return data;
}

export async function saveJob(token, { alreadySaved }, savedData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", savedData.job_id);
    if (deleteError) {
      console.log("there is error in deleting saved job");
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([savedData])
      .select();

    if (insertError) {
      console.log("there is error in deleting saved job");
      return null;
    }
    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications:applications(*)")
    .eq("id", job_id)
    .single();

  const { data, error } = await query;
  if (error) {
    console.log("there is error in fetching company detail", error);
    return null;
  }
  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  const { data, error } = await query;
  if (error) {
    console.log("there is error in fetching job detail", error);
    return null;
  }
  return data;
}

export async function GetSavedJobs(token) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))");

  const { data, error } = await query;
  if (error) {
    console.log("there is error in fetching saved jobs", error);
    return null;
  }
  return data;
}

export async function GetMyCreatedJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  const { data, error } = await query;
  if (error) {
    console.log("there is error in fetching jobs", error);
    return null;
  }
  return data;
}

export async function DeleteMyJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").delete().eq("id", job_id).select();

  const { data, error } = await query;
  if (error) {
    console.log("there is error in deleting jobs", error);
    return null;
  }
  return data;
}

//token is coming from supabase
//we have also passes token in supabase.js file
//supabase.from means from which table we supposed to take data
//eq is use to compare value inside table
//return only those particulat columns which matches with location
//any columns insdie table with location key if its equal to location which i am sending
// query = query.ilike("title", `%${searchQuery}`);
//if title of job is same as `%${searchQuery}` then woh data dikha do
