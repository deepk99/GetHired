import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setdata] = useState(undefined);
  const [loading, setloading] = useState(null);
  const [error, seterror] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setloading(true);
    seterror(null);


    try {
         const supabaseAccessToken = await session.getToken({
              template: "supabase",
            });

            const response=await cb(supabaseAccessToken,options,...args)
            setdata(response)
            seterror(null)

    } catch (error) {
        seterror(error)
    }finally{
      setloading(false)  
    }
  };
  return {fn,data,loading,error}
};
export default useFetch

//we are fetchi data from supabase
//const useFetch = (cb, options = {}) => {
//isme cb is callback function which we will calll and fetch the api and options pass kia
//(...args) extra arguments coming from user
//cb is coming from params like this cb can for eg.fetchjob()

//getjob function ko token dena pdega toh woh token ayega usesession se
//menas we will get token from clerk and provide it to supabase
