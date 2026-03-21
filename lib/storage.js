import fs from 'fs';
import { getSupabaseServerClient, supabase } from './supabase';

export async function uploadImage(file, slug, folder) {
  try {
    const client = typeof window === 'undefined' ? getSupabaseServerClient() : supabase;
    if (!client) throw new Error('Supabase client not configured');

    // Read the file buffer form formidable temp path
    const fileContent = fs.readFileSync(file.filepath);
    const extension = file.originalFilename ? file.originalFilename.split('.').pop() : 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const filePath = `sites/${slug}/${folder}/${fileName}`;

    const { data, error } = await client
      .storage
      .from('sites')
      .upload(filePath, fileContent, {
        contentType: file.mimetype || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    return getPublicUrl(data.path);
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}

export function getPublicUrl(filePath) {
  const client = typeof window === 'undefined' ? getSupabaseServerClient() : supabase;
  if (!client) return null;

  const { data } = client.storage.from('sites').getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteImage(filePath) {
  try {
    const client = typeof window === 'undefined' ? getSupabaseServerClient() : supabase;
    if (!client) throw new Error('Supabase client not configured');

    // Remove origin and bucket from filePath if passed as a full URL
    let pathObj = filePath;
    if (pathObj.includes('/storage/v1/object/public/sites/')) {
        pathObj = pathObj.split('/storage/v1/object/public/sites/')[1];
    }

    const { error } = await client.storage.from('sites').remove([pathObj]);
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
}
