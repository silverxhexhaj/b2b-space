import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BusinessSearch from '../components/BusinessSearch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Button } from '../components/ui/button';

interface Business {
    id: string;
    name: string;
    location: string;
    industry: string;
    contact_info: string;
}

interface Campaign {
    id: string;
    name: string;
    category: string;
    status: string;
}

export default function CampaignDetails() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchCampaignDetails();
            fetchCampaignBusinesses();
        }
    }, [id]);

    const fetchCampaignDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setCampaign(data);
        } catch (error) {
            console.error('Error fetching campaign details:', error);
        }
    };

    const fetchCampaignBusinesses = async () => {
        try {
            const { data, error } = await supabase
                .from('campaign_businesses')
                .select(`
          business_id,
          businesses (*)
        `)
                .eq('campaign_id', id);

            if (error) throw error;

            // Transform data to match Business interface
            const mappedBusinesses = data.map((item: any) => item.businesses);
            setBusinesses(mappedBusinesses);
        } catch (error) {
            console.error('Error fetching campaign businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    const addBusinessToCampaign = async (business: Business) => {
        try {
            const { error } = await supabase
                .from('campaign_businesses')
                .insert([
                    {
                        campaign_id: id,
                        business_id: business.id
                    }
                ]);

            if (error) {
                if (error.code === '23505') { // Unique violation
                    alert('Business already in campaign');
                } else {
                    throw error;
                }
                return;
            }

            fetchCampaignBusinesses();
        } catch (error) {
            console.error('Error adding business to campaign:', error);
        }
    };

    const removeBusinessFromCampaign = async (businessId: string) => {
        try {
            const { error } = await supabase
                .from('campaign_businesses')
                .delete()
                .eq('campaign_id', id)
                .eq('business_id', businessId);

            if (error) throw error;

            fetchCampaignBusinesses();
        } catch (error) {
            console.error('Error removing business from campaign:', error);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!campaign) return <div className="p-8">Campaign not found</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
            <div className="flex gap-2 mb-6 text-gray-500">
                <span className="capitalize">{campaign.category}</span>
                <span>•</span>
                <span className="capitalize">{campaign.status}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Campaign Businesses</h2>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {businesses.length === 0 ? (
                            <div className="p-6 text-gray-500">No businesses added yet.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {businesses.map((business) => (
                                        <TableRow key={business.id}>
                                            <TableCell>{business.name}</TableCell>
                                            <TableCell>{business.location}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeBusinessFromCampaign(business.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Add Businesses</h2>
                    <div className="bg-white rounded-lg shadow p-6">
                        <BusinessSearch onAddBusiness={addBusinessToCampaign} />
                    </div>
                </div>
            </div>
        </div>
    );
}
