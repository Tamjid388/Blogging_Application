import { env } from "@/env";
import { ur } from "zod/v4/locales";

const API_URL = env.API_URL;

interface BlogParams {
  isFeatured?: boolean;
  search?: string;
}
interface TOptions{
  cache?:RequestCache
  revalidate?:number
}
export const blogService = {
  getBlogPosts: async (params?: BlogParams,Options?:TOptions) => {
    try {
      const url = new URL(`${API_URL}/posts`);
      // url.searchParams.append("key", "value");

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value != undefined && value != null && value != "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const config:RequestInit={}
      if(Options?.cache){
        config.cache=Options.cache
      }
if(Options?.revalidate){
  config.next={revalidate:Options?.revalidate}
}

      const res = await fetch(url.toString(),config);

      const result = await res.json();
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: { messsage: "Something Went Wrong" } };
    }
  },
};
