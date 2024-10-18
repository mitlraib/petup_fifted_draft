

import { Express } from "express-serve-static-core";

// modules declarartion:
declare module "express-serve-static-core" {

    export interface Request  {
      user: { _id: string }
      dog?: { _id: string }; 

    }
}
  