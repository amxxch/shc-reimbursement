// import prisma from "@/prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import { json } from "stream/consumers";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // const body = JSON.parse(req.body);

    // const validation = schema.safeParse(body);
    // if (!validation.success)
    //     return NextResponse.json(validation.error.errors, { status: 400 })
    // console.log('received')
    // res.status(200).json({ message: 'Form submitted successfully' });

    // const newRequest = await prisma.reimbursement_Request.create({
    //     data: {
    //         first_name: body.firstName,
    //         last_name: body.lastName,
    //         email: body.email,
    //         phone_number: body.phoneNo,
    //         uid: body.uid,
    //         event_name: body.eventName,
    //         event_date: body.eventDate,
    //         organizing_committee: body.committee,
    //         num_of_participants: body.numOfParticipants,
    //         location: body.location,
    //         email_poster: body.emailPoster.name,
    //         participant_list: body.participantList.name,
    //         total_amount: body.totalAmount,
    //     }
    // })

    // console.log(newRequest)




    // const newRequest = await prisma.user.create({
    //     data: {
    //         name: body.name,
    //         email: body.email,
    //     }
    // })
    
    // return res.status(201).json(newRequest);
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser
//   },
// };

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form data:', err);
//         return res.status(500).json({ error: 'Failed to parse form data' });
//       }

//       console.log('Parsed fields:', fields);
//       console.log('Parsed files:', files);

//       // Process the fields and files here
//       // For example, save files to disk or database

//       res.status(200).json({ message: 'Form submitted successfully', fields, files });
//     });
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method)
  if (req.method === 'POST') {
    try {
      // Parse the JSON body
      const body = req.body;
      console.log('Received data:', body);

      // Respond with a success message
      res.status(200).json({ message: 'Form submitted successfully', data: body });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}