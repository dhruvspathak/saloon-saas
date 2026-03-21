import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSiteConfigBySlug } from '@/services/siteService';

export default function EditSitePage({ initialConfig, initialSlug, notFound }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [config, setConfig] = useState(initialConfig?.configData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const accessKey = localStorage.getItem('internalAccessKey');
    const envKey = process.env.NEXT_PUBLIC_INTERNAL_ACCESS_KEY;
    if (accessKey && accessKey === envKey) {
      setIsAuthorized(true);
    } else if (!envKey) {
      setIsAuthorized(true);
    } else {
      const userKey = prompt('Enter internal access key:');
      if (userKey === envKey) {
        localStorage.setItem('internalAccessKey', userKey);
        setIsAuthorized(true);
      }
    }
  }, []);

  if (notFound) {
    return <div className="p-8 text-center text-xl">Site not found</div>;
  }

  if (!isAuthorized) {
    return <div className="p-8 text-center text-xl text-red-600">Access Denied</div>;
  }

  const industryKey = config?.salon?.industry || config?.site?.industry || 'salon';
  const targetObj = config?.[industryKey] || config?.salon || config;
  const gallery = targetObj?.gallery || [];
  const transformations = config?.transformations || [];

  const handleImageUpload = async (e, folderType, pairIndex, pairType) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setLoading(true);
    const uploadedUrls = [];
    const slug = initialSlug;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const payload = new FormData();
        payload.append('file', file);
        payload.append('slug', slug);
        payload.append('folder', folderType);

        const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY || localStorage.getItem('internalAccessKey');
        try {
            const res = await fetch('/api/internal/uploadImage', {
                method: 'POST', headers: { 'x-internal-api-key': apiKey }, body: payload
            });
            const data = await res.json();
            if (data.success) uploadedUrls.push(data.url);
            else setError(data.error);
        } catch (err) {
            console.error('Upload Error', err);
            setError('Upload failed');
        }
    }
    
    // Update local state config
    setConfig(prev => {
        const newConfig = JSON.parse(JSON.stringify(prev));
        const pIndustryKey = newConfig.salon?.industry || newConfig.site?.industry || 'salon';
        const pTargetObj = newConfig[pIndustryKey] || newConfig.salon || newConfig;
        
        if (folderType === 'gallery') {
            const currentGal = pTargetObj.gallery || [];
            const urlsAsObjects = uploadedUrls.map((url, idx) => ({
                id: currentGal.length + idx + 1, image: url, title: 'Uploaded Gallery Image', category: 'General'
            }));
            pTargetObj.gallery = [...currentGal, ...urlsAsObjects];
            if (newConfig[pIndustryKey]) newConfig[pIndustryKey] = pTargetObj;
            else newConfig.salon = pTargetObj;
        } else if (folderType === 'before-after') {
            const pairs = [...(newConfig.transformations || [])];
            if (!pairs[pairIndex]) pairs[pairIndex] = { title: `Transformation ${pairIndex+1}`, before: '', after: '' };
            pairs[pairIndex][pairType] = uploadedUrls[0];
            newConfig.transformations = pairs;
        }
        return newConfig;
    });
    setLoading(false);
  };

  const removeGalleryImage = (index) => {
      setConfig(prev => {
        const newConfig = JSON.parse(JSON.stringify(prev));
        const pIndustryKey = newConfig.salon?.industry || newConfig.site?.industry || 'salon';
        const pTargetObj = newConfig[pIndustryKey] || newConfig.salon || newConfig;
        pTargetObj.gallery.splice(index, 1);
        if (newConfig[pIndustryKey]) newConfig[pIndustryKey] = pTargetObj;
        else newConfig.salon = pTargetObj;
        return newConfig;
      });
  };

  const removeTransformation = (index) => {
      setConfig(prev => {
        const newConfig = JSON.parse(JSON.stringify(prev));
        newConfig.transformations.splice(index, 1);
        return newConfig;
      });
  };

  const handleSaveConfig = async () => {
    setLoading(true); setError(''); setSuccess('');
    try {
      const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY || localStorage.getItem('internalAccessKey');
      const res = await fetch('/api/internal/updateSiteConfig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-api-key': apiKey },
        body: JSON.stringify({ slug: initialSlug, configData: config })
      });
      const data = await res.json();
      if (data.success) {
          setSuccess('Configuration successfully saved to database!');
      } else {
          setError(data.error || 'Failed to update configuration.');
      }
    } catch(err) {
      console.error(err);
      setError('Internal error during save.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Head><title>Edit Site Config | {initialSlug}</title></Head>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
         <h1 className="text-3xl font-bold mb-6">Editing Config for: {initialSlug}</h1>
         
         {error && <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>}
         {success && <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">{success}</div>}

         {/* Gallery Section */}
         <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Gallery Images</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
               {gallery.map((img, i) => (
                  <div key={i} className="relative group">
                     {img.image && <img src={img.image} alt={img.title} className="w-full h-32 object-cover rounded shadow" />}
                     <button onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                  </div>
               ))}
            </div>
            <div className="border p-4 rounded bg-gray-50">
               <label className="block text-sm font-medium mb-2">Upload New Gallery Images</label>
               <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} disabled={loading} />
            </div>
         </section>

         {/* Transformations Section */}
         <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Transformations</h2>
            {transformations.map((pair, idx) => (
               <div key={idx} className="flex gap-6 mb-6 p-4 border rounded relative bg-gray-50">
                  <button onClick={() => removeTransformation(idx)} className="absolute top-2 right-2 text-red-600 font-bold hover:underline">Remove Pair</button>
                  <div>
                      <p className="font-medium text-sm mb-2">Before ({pair.before ? 'Set' : 'Empty'})</p>
                      {pair.before && <img src={pair.before} className="w-32 h-32 object-cover rounded mb-2 shadow" />}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'before-after', idx, 'before')} className="text-xs" disabled={loading} />
                  </div>
                  <div>
                      <p className="font-medium text-sm mb-2">After ({pair.after ? 'Set' : 'Empty'})</p>
                      {pair.after && <img src={pair.after} className="w-32 h-32 object-cover rounded mb-2 shadow" />}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'before-after', idx, 'after')} className="text-xs" disabled={loading} />
                  </div>
               </div>
            ))}
            <button onClick={() => {
                setConfig(prev => {
                    const newConfig = JSON.parse(JSON.stringify(prev));
                    newConfig.transformations = [...(newConfig.transformations||[]), { title: `New Transformation`, before: '', after: '' }];
                    return newConfig;
                });
            }} className="px-4 py-2 bg-blue-100 text-blue-800 rounded font-semibold text-sm hover:bg-blue-200">
               + Add New Transformation Pair
            </button>
         </section>

         <button 
            onClick={handleSaveConfig} 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
         >
            {loading ? 'Saving...' : 'Save Configuration Changes'}
         </button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const initialConfig = await getSiteConfigBySlug(slug);
  
  if (!initialConfig) {
    return { props: { notFound: true, initialSlug: slug } };
  }

  // Passing only necessary JSON data to client component
  return {
    props: {
      initialConfig,
      initialSlug: slug
    }
  };
}
