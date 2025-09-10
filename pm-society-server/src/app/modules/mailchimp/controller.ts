
import mailchimp from "@mailchimp/mailchimp_marketing";
import config from "../../config";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

mailchimp.setConfig({
  apiKey: config.MAILCHIMP_API_KEY,
  server: "us14", 
});

const listId = config.MAILCHIMP_AUDIENCE_ID as string;

export const subscribeUser = catchAsync(async (req, res) => {
  const { email, name } = req.body;
  console.log(email, name);

  if (!email)  res.status(400).json({ error: "Email is required" });


    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: { FNAME: name },
    });
    console.log(response);

    res.status(200).json({ success: true, data: response });

}
)