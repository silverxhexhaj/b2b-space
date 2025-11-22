import { useState } from 'react';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';

export default function DataDownload() {
    const [downloading, setDownloading] = useState(false);

    const downloadData = async () => {
        setDownloading(true);
        try {
            const { data, error } = await supabase
                .from('businesses')
                .select('*');

            if (error) throw error;

            if (!data || data.length === 0) {
                alert('No data to download');
                return;
            }

            // Convert to CSV
            const headers = Object.keys(data[0]).join(',');
            const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
            const csv = [headers, ...rows].join('\n');

            // Download file
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'businesses.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading data:', error);
            alert('Failed to download data');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Data Download</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="mb-4">Download all business data as CSV.</p>
                <Button onClick={downloadData} disabled={downloading}>
                    {downloading ? 'Downloading...' : 'Download CSV'}
                </Button>
            </div>
        </div>
    );
}
