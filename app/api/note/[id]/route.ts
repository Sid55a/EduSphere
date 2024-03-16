import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,
    {params}:{params:{id:string}}
) {
   
    try{
        const { userId } = auth();
  
        if(!userId){
          return new NextResponse("unauthorized",{status:401})
         }
           if(!params.id){
            return new NextResponse("params not found",{status:401})
           }
   
        const task= await db.note.delete({
          where:{
          userId:userId,
          id:params.id
          }
         })
     return new NextResponse("successfull");
      }catch(error){
          console.log("[NOTE]",error)
          return new NextResponse("internal error",{status:500}) 
      }
}