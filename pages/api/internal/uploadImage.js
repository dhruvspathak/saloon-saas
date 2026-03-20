import formidable from 'formidable';
import { uploadImage } from '../../../lib/storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API Key
  const apiKey = req.headers['x-internal-api-key'];
  const envKey = process.env.NEXT_PUBLIC_INTERNAL_ACCESS_KEY;
  if (!envKey || apiKey !== envKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const form = formidable({ multiples: true, keepExtensions: true, maxFileSize: 5 * 1024 * 1024 }); // 5MB limit
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ error: 'Failed to parse form or file too large' });
      }

      // Arrays might be returned by formidable for fields/files
      const slug = Array.isArray(fields.slug) ? fields.slug[0] : fields.slug;
      const folder = Array.isArray(fields.folder) ? fields.folder[0] : fields.folder;
      const fileData = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!fileData || !slug || !folder) {
        return res.status(400).json({ error: 'Missing required fields: file, slug, folder' });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(fileData.mimetype)) {
          return res.status(400).json({ error: 'Invalid file type. Only jpg, png, webp allowed.' });
      }

      try {
        const publicUrl = await uploadImage(fileData, slug, folder);
        return res.status(200).json({ success: true, url: publicUrl });
      } catch (uploadError) {
        console.error('Upload failed:', uploadError);
        return res.status(500).json({ error: 'Failed to upload to storage' });
      }
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
