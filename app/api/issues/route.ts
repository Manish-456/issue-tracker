import { createIssueSchema } from '@/app/validators/issue-validator-schema';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request : Request){
  try {
    const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if(!validation.success) return NextResponse.json(validation.error.format(), {
    status : 400
  });

  const newIssue = await prisma.issue.create({
    data : {
        title : body.title,
        description : body.description
    }
  });

  return NextResponse.json(newIssue, {status : 201});
  } catch (error) {
    console.error(`[ISSUE_POST]`, error);
    return NextResponse.json({message : "Something went wrong"}, {
        status : 500
    });
  }

}