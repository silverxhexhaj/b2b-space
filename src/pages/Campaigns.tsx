import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"

interface Campaign {
    id: string;
    name: string;
    category: string;
    status: string;
    created_at: string;
}

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCampaignName, setNewCampaignName] = useState('');
    const [newCampaignCategory, setNewCampaignCategory] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCampaigns(data || []);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const createCampaign = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('campaigns')
                .insert([
                    {
                        name: newCampaignName,
                        category: newCampaignCategory,
                        user_id: user.id,
                        status: 'draft'
                    }
                ]);

            if (error) throw error;

            setOpen(false);
            setNewCampaignName('');
            setNewCampaignCategory('');
            fetchCampaigns();
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Campaigns</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Campaign</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Campaign</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newCampaignName}
                                    onChange={(e) => setNewCampaignName(e.target.value)}
                                    placeholder="Campaign Name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={setNewCampaignCategory} value={newCampaignCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="outreach">Outreach</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={createCampaign}>Create</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : campaigns.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-500">No campaigns found. Create one to get started.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {campaigns.map((campaign) => (
                        <Link key={campaign.id} to={`/campaigns/${campaign.id}`}>
                            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-semibold">{campaign.name}</h3>
                                <div className="flex gap-2 mt-2 text-sm text-gray-500">
                                    <span className="capitalize">{campaign.category}</span>
                                    <span>•</span>
                                    <span className="capitalize">{campaign.status}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
