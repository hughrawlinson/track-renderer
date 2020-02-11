import { ChangeEvent } from 'react';

export async function getFileFromEvent(event: ChangeEvent<HTMLInputElement>) {
  if (event.target.files?.[0]) {
    return event.target.files[0];
  }
  throw new Error('File not found');
}