import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
      bodyParser: false,
  },
}
          
cloudinary.config({ 
  cloud_name: 'dslwzd7bm', 
  api_key: '355522884999566', 
  api_secret: 'ZQ-ANwLaNfVPjoD7zylKiDD39h8' 
});

export async function POST(request:any) {
  const data = await request.formData();

  if (data.get('file') == undefined) {
    return NextResponse.json("No se ha subido ninguna imagen", {status: 400})
  } 

  //save in memory
  const bytes = await data.get('file').arrayBuffer()
  const buffer = Buffer.from(bytes)

  //save in a file
  // const filePath = path.join(process.cwd(), "public", data.get('file').name);
  // await writeFile(filePath, buffer);

  const response : any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    }).end(buffer)
  })


  return NextResponse.json({
    url: response.secure_url,
  });
}
