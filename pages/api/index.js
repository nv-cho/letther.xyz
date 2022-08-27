import { createClient } from "urql";

const APIURL = "https://api-mumbai.lens.dev";
// const APIURL = "https://api.lens.dev";

export const client = createClient({ url: APIURL });
